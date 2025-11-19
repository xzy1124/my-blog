import { Post } from "@/types/articles";
import Link from "next/link";
interface PostCardProps {
    // 这个接口定义了PostCard组件的props
    post: Post;
}
export default function PostCard({post}: PostCardProps) {
    return (
        <li className="border rounded-lg p-6 shadow hover:shadow-lg transition">
            {/* 注意这里的posts前面没有/就是相对路径是当前路径+posts/后面 */}
            {/* 加上/就是绝对路径，会直接跳到/posts/${post.slug} */}
            <Link href={`/posts/${post.slug}`}
                  className="text-2xl font-bold text-blue-600 hover:underline"
            >
                {post.title}
            </Link>
            {/* 日期 */}
            <p className="text-sm text-gray-500 mt-1">{post.date}</p>
            {/* 摘要 */}
            <p className="text-gray-700mt-3 line-clamp-3">
                {post.contentHtml.replace(/<[^>]+>/g, "")}
            </p>
            {/* 标签 */}
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
    )
}