import Link from "next/link";
import { getPaginatedPosts } from "@/lib/pagination";
import { Post, getPost, getAllSlugs, getSummary } from "@/lib/posts";

type Props = {
    params: Promise<{page: string;}>;
};

export default async function PostsPage({ params }: Props) {
    const { page } = await params;
    const pageNumber = parseInt(page, 3);

    // 分页数据
    const { currentPosts, totalPages } = await getPaginatedPosts(pageNumber);

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">所有文章</h1>

            <ul className="grid grid-cols-1 gap-6">
                {currentPosts.map((post) => (
                    <li key={post.slug} className="border rounded-lg p-6 shadow hover:shadow-lg transition">
                        <Link href={`/posts/${post.slug}`} className="text-2xl font-bold text-blue-600 hover:underline">
                            {post.title}
                        </Link>

                        <p className="text-sm text-gray-500 mt-1">{post.date}</p>

                        {/* 🔥 使用纯文本摘要，不再用 dangerouslySetInnerHTML */}
                        <p className="text-gray-700 mt-3">{getSummary(post.contentHtml, 120)}</p>

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
                ))}
            </ul>

            {/* 分页 */}
            <div className="flex justify-between mt-10 text-blue-600">
                {pageNumber > 1 ? (
                    <Link href={`/posts/page/${pageNumber - 1}`} className="hover:underline">
                        &larr; 上一页
                    </Link>
                ) : (
                    <span />
                )}

                {pageNumber < totalPages ? (
                    <Link href={`/posts/page/${pageNumber + 1}`} className="hover:underline">
                        下一页 &rarr;
                    </Link>
                ) : (
                    <span />
                )}
            </div>
        </div>
    );
}
