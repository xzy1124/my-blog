import type { Article } from "@/types/articles";
import Link from "next/link";

interface PostCardProps {
    post: Article;
}
// 这是一个文章卡片组件，用于展示文章的标题、日期、内容摘要和标签
export default function PostCard({ post }: PostCardProps) {
    // 优先使用封面
    let imageUrl = post.cover_url
    // 如果没有封面就使用内容的第一站图片
    if(!imageUrl) {
        const match = post.content.match(/!\[.*?\]\((.*?)\)/);
        if(match) imageUrl = match[1]
    }
    // 截取纯文本摘要
    const summary = post.content.replace(/!\[.*?\]\(.*?\)/g, "").slice(0, 200)
    return (
        <li className="border rounded-lg p-6 shadow hover:shadow-lg transition">
            <div className="flex justify-between gap-4">
                {/* 左边文字 */}
                <div className="flex-1 flex flex-col">
                    <Link
                        href={`/posts/${post.slug}`}
                        className="text-black hover:text-blue-600 no-underline text-2xl font-bold"
                    >
                        {post.title}
                    </Link>

                    <p className="text-sm text-gray-500 mt-1">
                        {new Date(post.created_at).toLocaleDateString()}
                    </p>

                    <p className="text-gray-700 mt-3 line-clamp-3">
                        {summary} {post.content.length > 200 ? "..." : ""}
                    </p>

                    <ul className="flex flex-wrap gap-2 mt-3">
                        {post.tags?.map((tag) => (
                            <li key={tag}>
                                <Link
                                // 这里的编码是把标签中的空格替换为%20,变得合法
                                /**
                                 * 假设 tag = "React & Next.js"
                                 * encodeURIComponent(tag) → "React%20%26%20Next.js"
                                 * 浏览器 URL → /tags/React%20%26%20Next.js
                                 * Next.js 匹配路由:
                                 * 用户访问 /tags/React%20%26%20Next.js
                                 * Next.js 看到文件 tags/[tag]/page.tsx
                                 * 自动把 URL 中 /tags/React%20%26%20Next.js 的 "React & Next.js" 解码后，
                                 * 赋值给 params.tag
                                 */
                                    href={`/tags/${encodeURIComponent(tag)}`}
                                    className="text-sm text-blue-500 hover:underline"
                                >
                                    #{tag}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 右边缩略图 */}
                {imageUrl && (
                    <div className="flex-shrink-0 w-32 h-32 rounded overflow-hidden">
                        <img
                        // 我们这次没有用ReactMarkdown渲染markdown语法，我们是直接截取的url放进这个img里进行渲染
                        // 这样也好管理宽高
                            src={imageUrl}
                            alt="文章图片"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>
        </li>
    );
}
