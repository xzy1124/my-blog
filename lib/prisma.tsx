import { PrismaClient } from "@prisma/client";
// 这里是为了在 热重载（dev 模式） 下防止 PrismaClient 被重复创建
// 1. 声明：告诉TS全局对象上可能有prisma属性
const globalForPrisma = global as unknown as { prisma: PrismaClient };
// 2. 使用：检查是否已存在prisma实例，没有就创建
export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
    });
// 开发模式把 PrismaClient 缓存在 global 里，防止 HMR（热重载）反复创建
// 3. 缓存：如果是开发模式，把新创建的实例挂回全局对象
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;// 现在global对象真的有了prisma属性！
