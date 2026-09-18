import { NextResponse } from "next/server";
import { getPrisma, isDatabaseConfigured } from "@/lib/db";

const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // 数据库没配好时返回 503，前端会显示友好提示而不是抛错。
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "留言功能暂未启用（还没配置数据库）" },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "请求格式不正确" }, { status: 400 });
  }

  const raw = (body ?? {}) as { name?: unknown; email?: unknown; message?: unknown };
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "请填写姓名、邮箱和留言内容" },
      { status: 400 },
    );
  }
  if (name.length > 80) {
    return NextResponse.json({ ok: false, error: "姓名不能超过 80 个字符" }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ ok: false, error: "邮箱格式不正确" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { ok: false, error: `留言不能超过 ${MAX_MESSAGE_LENGTH} 个字符` },
      { status: 400 },
    );
  }

  try {
    await getPrisma().message.create({
      data: { name, email, message },
    });
  } catch (error) {
    console.error("保存留言失败:", error);
    return NextResponse.json(
      { ok: false, error: "保存失败，请稍后再试" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
