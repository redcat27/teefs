import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL 未配置：请先在 Neon 创建数据库并把连接串写入 .env");
  }

  // 通过 pg 驱动适配器连接，走 Neon 的 pooled 连接串，适合 serverless 环境。
  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });
}

// 懒加载：只有真正要读写数据库时才创建客户端。
// 这样即使 DATABASE_URL 还没配好，网站本身也能正常构建和运行。
export function getPrisma(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const client = createClient();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
