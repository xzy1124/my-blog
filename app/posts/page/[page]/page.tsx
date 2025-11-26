import Link from "next/link";
import { getPaginatedPosts } from "@/lib/pagination";
import Banner from "@/components/Banner";
import PostCard from "@/components/PostCard";
import SearchBox from "@/components/SearchBox";
import LoginButton from "@/components/LoginButton";
type Props = {
    params: Promise<{page: string;}>;
};

export default async function PostsPage({ params }: Props) {
    const { page } = await params;
    // 这里的10是十进制，等价于Number(page)
    const pageNumber = parseInt(page, 10);

    // 分页数据
    const { currentPosts, totalPages } = await getPaginatedPosts(pageNumber);

    return (
        <div className="max-w-4xl mx-auto p-8">
            <LoginButton />
            <Banner />
            <SearchBox />
            <h1 className="text-4xl font-bold mb-8">所有文章</h1>

            <ul className="grid grid-cols-1 gap-6">
                {currentPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
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
