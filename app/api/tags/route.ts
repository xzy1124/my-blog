// 都写到这一步了应该明白是怎么一回事了,api下面的都是用来写后端的,前端调用的都是这个文件
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase.server";

// 创建一个GET方法用来前端发起`/api/tags`请求,用来获取所有文章的标签
export async function GET() {
    const { data: articles, error } = await supabaseServer
        .from("articles")
        .select("tags");

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const tagCountMap: Record<string, number> = {};

    // 遍历每一篇文章的 tags 数组
    articles.forEach((article) => {
        if (article.tags && Array.isArray(article.tags)) {
            article.tags.forEach((tag: string) => {
                const key = tag.trim();
                if (!key) return;
                tagCountMap[key] = (tagCountMap[key] || 0) + 1;
            });
        }
    });

    // 转成数组格式
    const tags = Object.entries(tagCountMap).map(([name, count]) => ({
        name,
        count,
    }));

    return NextResponse.json({ tags });
}
