"use client";

import { useState, useEffect, startTransition } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseClient } from "@/lib/supabase"; // 你的客户端 supabase
import type { Article } from "@/types/articles";
// 这是搜索页,根据关键词来搜索文章,也就是搜索之后展示的页面
export default function SearchPage() {
    const searchParams = useSearchParams();
    const keyword = searchParams.get("keyword")?.trim() || "";

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!keyword) return;
        // startTransition 包裹 setState 调用,确保 UI 更新在后台进行,即这次的更新不是很急,等其他更新完成后再更新
        // 它可以作为低优先级更新,不会阻塞其他紧急更新
        startTransition(() => {
            setLoading(true);
        });

        supabaseClient
            .from("articles")
            .select("id, user_id, title, slug, content, cover_url, tags, created_at, updated_at")
            .or(`title.ilike.%${keyword}%,content.ilike.%${keyword}%`)
            .order("created_at", { ascending: false })
            .then(({ data, error }) => {
                startTransition(() => {
                    if (!error && data) setArticles(data);
                    setLoading(false);
                });
            });
    }, [keyword]);

    if (!keyword) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-bold">请输入关键词</h2>
            </div>
        );
    }

    if (loading) return <div className="p-6">搜索中...</div>;
    if (!articles.length) return <div className="p-6">没有找到相关文章</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
                搜索结果：{keyword}({articles.length} 篇)
            </h2>

            <ul className="space-y-3">
                {articles.map((a) => (
                    <li key={a.id}>
                        {/* 搜索到的一大批文章应该以map的形式展示，每个文章的链接是 /posts/${a.slug} 因为
                        我们之前是使用文章的 id 作为 URL 的一部分,但现在我们要使用 slug 作为 URL 的一部分,
                        因为 slug 是唯一的,不会改变,而 id 是会改变的,所以我们要使用 slug 作为 URL 的一部分,
                        这样可以确保文章的 URL 是稳定的,不会因为 id 改变而改变*/}
                        <a href={`/posts/${a.slug}`} className="text-blue-600 underline">
                            {a.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
