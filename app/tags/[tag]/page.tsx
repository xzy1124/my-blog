"use server"
import { getAllSlugs, getPost } from "@/lib/posts";
import Link from "next/link";

// 这是因为在app路由中，动态参数params现在是异步的，不能直接同步解构
type Props = { params: Promise<{ tag: string }> };

export default async function TagPage({ params }: Props) {
    const { tag } =await params;

    const slugs = getAllSlugs();
    const postsData = await Promise.all(slugs.map((slug) => getPost(slug)));
    const posts = postsData.filter((post): post is NonNullable<typeof post> => post !== null);

    // 只保留含有当前标签的文章
    const filteredPosts = posts.filter((post) => post.tags.includes(tag));

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">标签: {tag}</h1>
            <ul className="space-y-6">
                {filteredPosts.map((post) => (
                    <li key={post.slug} className="border rounded-lg p-6 shadow hover:shadow-lg transition">
                        <Link href={`/posts/${post.slug}`} className="text-2xl font-semibold text-blue-600 hover:underline">
                            {post.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                        <p className="text-gray-700 mt-2 line-clamp-3">{post.contentHtml.replace(/<[^>]+>/g, "")}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
