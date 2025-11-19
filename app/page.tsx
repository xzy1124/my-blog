import { redirect } from "next/navigation"
import LoginButton from "@/components/LoginButton";
export default function Home() {
  // redirect("/posts")
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900">言宝的个人博客</h1>
      <p className="mt-4 text-gray-600">用 Next.js 全栈开发，从零开始。</p>
      <LoginButton />
    </main>
  );
}

