"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/25";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(result?.error ?? "发送失败，请稍后再试");
      }
    } catch {
      setStatus("error");
      setError("网络有点问题，请稍后再试");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center">
        <div className="text-4xl">🌱</div>
        <p className="mt-3 text-lg font-semibold text-accent-strong">留言已收到！</p>
        <p className="mt-1 text-sm text-muted">谢谢你的消息，我会尽快回复。</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-medium text-muted underline-offset-4 hover:underline"
        >
          再写一条
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">姓名</span>
          <input
            name="name"
            type="text"
            required
            maxLength={80}
            placeholder="怎么称呼你"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">邮箱</span>
          <input
            name="email"
            type="email"
            required
            placeholder="方便我回复你"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">留言</span>
        <textarea
          name="message"
          required
          maxLength={2000}
          rows={5}
          placeholder="想说点什么？"
          className={`${fieldClass} resize-y`}
        />
      </label>

      {error && (
        <p role="alert" className="rounded-lg border border-red-300/40 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "发送中…" : "发送留言"}
      </button>
    </form>
  );
}
