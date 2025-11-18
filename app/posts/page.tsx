import Link from 'next/link'
import {getAllSlugs, getPost } from "@/lib/posts"
import { Post } from "@/lib/posts";
export default async function PostPage() {
    // 获取所有文章的slug也就是文件名也就是路径
    const slugs = getAllSlugs()
    // 读取所有文章的metadata,也就是标题和日期
    const postsData = await Promise.all(
        slugs.map(async (slug) => {
            const post = await getPost(slug)
            return post
        })
    )
    // 过滤掉 null,类型守卫，告诉 TypeScript 过滤后的数组中不会有 null
    const posts: Post[] = postsData.filter((post): post is NonNullable<typeof post> => post !== null);

    // 按照日期倒叙排列
    posts.sort((a, b) => (a.date > b.date ? -1 : 1))
    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">所有文章</h1>
            <ul className="space-y-6">
                {posts.map((post) => (
                    <li key={post.slug} className="border rounded-lg p-6 shadow hover:shadow-lg transition">
                        <Link href={`/posts/${post.slug}`} className="text-2xl font-bold text-blue-600 hover:underline">
                            {post.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                        <p className="text-gray-700 mt-3 line-clamp-3">{post.contentHtml.replace(/<[^>]+>/g, "")}</p>
                        {/* 🌟 标签显示 */}
                        <ul className="flex flex-wrap gap-2 mt-3">
                            {post.tags.map((tag) => (
                                <li key={tag}>
                                    <Link
                                        href={`/tags/${encodeURIComponent(tag)}`}
                                        className="text-sm text-blue-500 hover:underline"
                                    >
                                        #{tag}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>

                ))}
            </ul>
        </div>
    );
}