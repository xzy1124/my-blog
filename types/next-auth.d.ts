// 放在项目根目录 /types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

// 扩展 session.user 类型，增加 id
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        } & DefaultSession["user"];
    }
}
