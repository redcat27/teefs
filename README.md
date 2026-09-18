# teefs 🌱

一棵会写代码的小树。teefs 来自《银河护卫队》里火箭的小伙伴，正在慢慢长大。

这是 teefs 的个人网站：自我介绍、作品展示、留言信箱。

## 技术栈

| 层 | 选择 |
| --- | --- |
| 框架 | Next.js 16（App Router）+ React 19 + TypeScript |
| 样式 | Tailwind CSS 4 |
| ORM | Prisma 6（`@prisma/adapter-pg` 驱动适配器） |
| 数据库 | Neon Postgres（免费档） |
| 代码托管 | GitHub |
| 部署 | Vercel |
| 包管理器 | pnpm |

## 本地开发

```bash
pnpm install          # 会自动执行 prisma generate
cp .env.example .env  # 然后填入 Neon 连接串
pnpm dev              # http://localhost:3000
```

不填 `DATABASE_URL` 也能跑：网站正常显示，只是留言表单会提示「留言功能暂未启用」。

## 数据库（Neon）

1. 到 [Neon Console](https://console.neon.tech) 用 GitHub 登录，创建一个 Project（免费档即可）。
2. 进入 Project → **Dashboard** → **Connect**，复制连接串。
3. 把连接串写进 `.env` 的 `DATABASE_URL`。
4. 建表：

```bash
pnpm db:migrate       # 首次会生成 prisma/migrations 并应用
pnpm db:studio        # 图形化查看数据（可选）
```

之后每次改 `prisma/schema.prisma`，都要跑一次 `pnpm db:migrate` 把改动同步到 Neon。

## 部署到 Vercel

1. 在 [Vercel](https://vercel.com) 用 GitHub 登录。
2. **Add New → Project** → 选择 `redcat27/teefs` 仓库 → Deploy。
3. 在部署页的 **Environment Variables** 里加上 `DATABASE_URL`（值和本地 `.env` 一样）。
4. 推送代码到 `main` 就会自动重新部署。

> 说明：`pnpm install` 会触发 `postinstall: prisma generate`，所以 Vercel 构建时不需要额外配置 Prisma。

## 目录结构

```
prisma/schema.prisma        # 数据库表结构
src/app/                    # 页面与路由
  page.tsx                  # 首页（Hero / 关于 / 作品 / 留言）
  layout.tsx                # 全局布局与站点元信息
  globals.css               # 主题色（Tailwind v4 token）
  api/contact/route.ts      # POST /api/contact 存留言
src/components/
  contact-form.tsx          # 留言表单（客户端组件）
src/lib/
  site.ts                   # ★ 文案 / 联系方式 / 作品列表都改这里
  db.ts                     # Prisma 单例
```

## 常用脚本

```bash
pnpm dev          # 开发服务器
pnpm build        # 生产构建
pnpm lint         # ESLint
pnpm db:generate  # 重新生成 Prisma Client
pnpm db:migrate   # 开发环境迁移
pnpm db:push      # 直接同步 schema（不用 migrations 时）
pnpm db:studio    # 查看数据库
```

## 接下来可以加

- 博客 / 笔记（Prisma 加 `Post` 表 + MDX）
- 留言自动发邮件（Resend / SendGrid）
- 访客留言列表展示（`GET /api/contact`）
- 作品从数据库读，而不是写死在 `site.ts`
- 自定义域名（Vercel → Project → Settings → Domains）
