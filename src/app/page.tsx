import { ContactForm } from "@/components/contact-form";
import { navLinks, site, works } from "@/lib/site";

export default function Home() {
  return (
    <div className="relative">
      {/* 固定导航 */}
      <header className="sticky top-0 z-40 border-b border-line/70 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="text-lg">{site.emoji}</span>
            <span className="font-mono tracking-tight">{site.name}</span>
          </a>
          <div className="flex items-center gap-5 text-sm text-muted">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="top" className="relative mx-auto w-full max-w-3xl px-5">
        {/* Hero */}
        <section className="relative py-24 sm:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-24 -left-24 h-56 w-56 rounded-full bg-wood/15 blur-3xl"
          />

          <div className="relative">
            <p className="font-mono text-sm text-accent">
              Hello, I am {site.name} {site.emoji}
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              {site.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#works"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-strong"
              >
                看看作品
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition hover:border-accent/50"
              >
                给我留言
              </a>
            </div>
          </div>
        </section>

        {/* 关于 */}
        <section id="about" className="border-t border-line py-16">
          <p className="font-mono text-sm text-accent">about</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">关于我</h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div className="flex items-baseline gap-2">
              <dt className="font-mono text-muted">位置</dt>
              <dd>{site.location}</dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="font-mono text-muted">邮箱</dt>
              <dd>
                <a
                  href={`mailto:${site.email}`}
                  className="underline-offset-4 hover:text-accent hover:underline"
                >
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        {/* 作品 */}
        <section id="works" className="border-t border-line py-16">
          <p className="font-mono text-sm text-accent">works</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">作品</h2>
          <p className="mt-3 text-sm text-muted">
            作品列表写在 <code className="font-mono">src/lib/site.ts</code>，加一条就出一张卡片。
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {works.map((work) => (
              <article
                key={work.title}
                className="flex flex-col rounded-2xl border border-line bg-surface p-5 transition hover:border-accent/50"
              >
                <h3 className="font-semibold">{work.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {work.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {work.tech.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-background px-2.5 py-0.5 font-mono text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {work.href && (
                  <a
                    href={work.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    查看项目
                    <span aria-hidden>↗</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* 留言 */}
        <section id="contact" className="border-t border-line py-16">
          <p className="font-mono text-sm text-accent">contact</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">给我留言</h2>
          <p className="mt-3 text-sm text-muted">
            留言会存进 Neon Postgres，不会自动发邮件给我 —— 邮箱见上方「关于」。
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {site.name} {site.emoji} 慢慢长大中
          </p>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono underline-offset-4 hover:text-accent hover:underline"
          >
            github.com/redcat27
          </a>
        </div>
      </footer>
    </div>
  );
}
