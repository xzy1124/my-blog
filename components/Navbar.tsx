"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
    const router = useRouter();
    const [keyword, setKeyword] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [open, setOpen ] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // 获取 GitHub OAuth 登录状态
    const { data: session } = useSession();
    const user = session?.user; // user: { name, email, image }

    // 点击外部关闭菜单
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function onSearch(e: React.FormEvent) {
        e.preventDefault();
        const q = keyword.trim();
        if (!q) return;
        router.push(`/search?keyword=${encodeURIComponent(q)}`);
        setMobileOpen(false);
    }

    return (
        <header className="w-full border-b bg-white dark:bg-slate-900 dark:border-slate-800">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">

                {/* 左：Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        Y
                    </div>
                    <div className="hidden sm:block">
                        <div className="font-semibold">言宝的博客</div>
                        <div className="text-xs text-slate-500">记录与沉淀</div>
                    </div>
                </Link>

                {/* 中：主导航 */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="hover:underline">首页</Link>
                    <Link href="/posts/page/1" className="hover:underline">文章</Link>
                    {/* <Link href="/tags" className="hover:underline">标签</Link> */}
                    <Link href="/about" className="hover:underline">关于</Link>
                </nav>

                {/* 右：搜索 + 登录状态 */}
                <div className="flex items-center gap-3">

                    {/* 搜索框 */}
                    <form onSubmit={onSearch} className="hidden sm:flex items-center border rounded-md overflow-hidden">
                        <input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="px-3 py-1 w-44 focus:outline-none bg-transparent"
                            placeholder="搜索文章、标签..."
                        />
                        <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200" type="submit">
                            搜索
                        </button>
                    </form>

                    {/* 移动端菜单按钮 */}
                    <button
                        onClick={() => setMobileOpen((v) => !v)}
                        className="md:hidden p-2 rounded-md hover:bg-slate-100"
                        aria-label="菜单"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 5h14M3 10h14M3 15h14" />
                        </svg>
                    </button>

                    {/* 登录状态区域 */}
                    {!user ? (
                        /* 未登录 → GitHub 登录按钮 */
                        <button
                            onClick={() => signIn("github")}
                            className="px-3 py-1 bg-black text-white rounded-md text-sm"
                        >
                            使用 GitHub 登录
                        </button>
                    ) : (
                    /* 已登录 → 显示头像 + 名字 */
                        <div className="relative" ref={menuRef}>
                            {/* 点击头像 → 切换菜单开关 */}
                            <button onClick={() => setOpen(!open)} className="flex items-center">
                                <img
                                    src={user.image ?? "/avatar-placeholder.png"}
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="hidden sm:inline">{user.name}</span>
                            </button>

                            {/* 下拉菜单 */}
                            {open && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border py-2 z-50">
                                    <Link
                                        href="/admin/new-post"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setOpen(false)}
                                    >
                                        ✏️ 写文章
                                    </Link>

                                    <button
                                        onClick={() => signOut()}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        🚪 退出登录
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* 移动端面板 */}
            {mobileOpen && (
                <div className="md:hidden border-t bg-white dark:bg-slate-900">
                    <div className="container mx-auto px-4 py-3 flex flex-col gap-3">

                        <form onSubmit={onSearch} className="flex items-center gap-2">
                            <input
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="flex-1 px-3 py-2 border rounded-md bg-transparent"
                                placeholder="搜索文章"
                            />
                            <button className="px-3 py-2 bg-slate-100 rounded-md" type="submit">
                                搜索
                            </button>
                        </form>

                        <Link href="/posts/page/1" className="py-2">文章</Link>
                        {/* <Link href="/tags" className="py-2">标签</Link> */}
                        <Link href="/about" className="py-2">关于</Link>

                        {!user ? (
                            <button
                                onClick={() => signIn("github")}
                                className="mt-2 px-3 py-2 bg-black text-white rounded-md"
                            >
                                使用 GitHub 登录
                            </button>
                        ) : (
                            <>
                                <Link href="/admin/new-post" className="px-3 py-2 bg-black text-white rounded-md">
                                    ✏️ 写文章
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="px-3 py-2 border rounded-md mt-2"
                                >
                                    退出登录
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
