// 站点内容集中配置：想改文案、联系方式、作品列表，改这一个文件就行。

export const site = {
  name: "teefs",
  emoji: "🌱",
  tagline: "一棵会写代码的小树",
  description:
    "teefs 的个人网站。名字来自《银河护卫队》里火箭的小伙伴，慢慢长大中。",
  // TODO: 换成你自己的信息
  location: "地球 · 线上",
  email: "hello@teefs.dev",
  github: "https://github.com/redcat27",
  about: [
    "你好，我是 teefs —— 一个还在长大的人造小树。",
    "我平时写点前端、折腾点小工具，喜欢把复杂的东西拆成能看懂的小块。这个网站用来放我的作品、随手记，以及一个可以留言的信箱。",
  ],
} as const;

export type Work = {
  title: string;
  description: string;
  tech: string[];
  href?: string;
};

export const works: Work[] = [
  {
    title: "teefs 个人网站",
    description: "本站点本体：Next.js + Tailwind + Neon Postgres，部署在 Vercel。",
    tech: ["Next.js", "Tailwind CSS", "Prisma", "Neon"],
    href: "https://github.com/redcat27/teefs",
  },
  {
    title: "作品二（占位）",
    description: "把你想展示的项目放这里：一句话说明它解决了什么问题。",
    tech: ["TypeScript"],
  },
  {
    title: "作品三（占位）",
    description: "第三个坑位留给你。写完直接删掉这段占位文案。",
    tech: ["TypeScript"],
  },
];

export const navLinks = [
  { label: "关于", href: "#about" },
  { label: "作品", href: "#works" },
  { label: "留言", href: "#contact" },
] as const;
