"use client";

import LoginButton from "@/components/LoginButton";
import { useSession } from "next-auth/react";
import TagCloud from "@/components/TagCloud";
import Banner from "@/components/Banner";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <Banner />
      <h1 className="text-4xl font-bold text-gray-900 mb-6">言宝的个人博客</h1>
      <p className="text-gray-600 mb-6">用 Next.js 全栈开发，从零开始。</p>

      {!session && <LoginButton />}

      <div className="flex w-full max-w-6xl mt-8 gap-8">
        {/* 左侧标签云 */}
        <div className="flex-1">
          <TagCloud />
        </div>

        {/* 右侧社区推荐 */}
        <div className="w-80">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">社区推荐</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-blue-600 transition-colors"
                >
                  React 官网
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-blue-600 transition-colors"
                >
                  Next.js 官网
                </a>
              </li>
              <li>
                <a
                  href="https://www.nextjs.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-blue-600 transition-colors"
                >
                  Next.js 中文网
                </a>
              </li>
              <li>
                <a
                  href="https://supabase.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-blue-600 transition-colors"
                >
                  Supabase 中文网
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-blue-600 transition-colors"
                >
                  Vercel 官网
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-blue-600 transition-colors"
                >
                  TailwindCSS 官网
                </a>
              </li>
            </ul>


          </div>
        </div>
      </div>
    </main>
  );
}
