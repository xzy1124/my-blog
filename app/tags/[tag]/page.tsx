import PostCard from "@/components/PostCard";
import { supabaseClient } from "@/lib/supabase";
// 这是标签页,根据标签来获取文章列表,默认是第一页,[tag]代表标签
type Props = { params: Promise<{ tag: string }> };

export default async function TagPage({ params }: Props) {
    // 组件中使用,就是从postCard中传递过来的tag,从URL中解码后得到的标签
    const { tag } = await params;

    /**
     * 指定我们要查询的表即 articles 表
     * 选取表中的所有字段
     * 使用 contains 方法过滤包含指定标签的文章,就是从tags数组中筛选出包含tag的文章
     * 这里的[]不是动态路由那里的[],而是表示数组的JS语法,表示我们要查询的是tags数组中包含tag的文章
     * 最后按创建时间降序排序
     */
    const { data: articles, error } = await supabaseClient
        .from("articles")
        .select("*")
        .contains("tags", [tag])
        .order("created_at", { ascending: false });

    if (error) throw error;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">{tag}相关文章</h1>
            {articles?.length ? (
                <ul className="space-y-6">
                    {articles.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </ul>
            ) : (
                <p>暂无文章</p>
            )}
        </div>
    );
}
