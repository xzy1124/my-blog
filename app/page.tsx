"use client"
import LoginButton from "@/components/LoginButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter()
  // 已登录的用户自动跳转文章页面
  useEffect(() => {
    if (session) {
      router.push("/posts/page/1")
    }
  }, [session, router])
  // 未登陆的用户显示登录页面
  if(session) return null
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900">言宝的个人博客</h1>
      <p className="mt-4 text-gray-600">用 Next.js 全栈开发，从零开始。</p>
      <LoginButton />
    </main>
  );
}
