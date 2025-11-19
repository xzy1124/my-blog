// app/posts/[slug]/page.tsx
// "use client"
import { getPost, getAllSlugs } from "@/lib/posts";
import Comment from "@/components/Comment";
type ParamsPromise = Promise<{ slug: string }>;

export async function generateStaticParams() {
    // 返回形如 [{ slug: 'hello-nextjs' }, { slug: 'blog-with-love' }]
    return getAllSlugs().map((slug) => ({ slug }));
}

type PageProps = {
    params: ParamsPromise; // Next.js 15: params 是 Promise
};

export default async function PostDetail({ params }: PageProps) {
    // ⭐ 非常关键：params 是 Promise，必须 await
    const { slug } = await params;

    // 从你之前写的 lib/posts.ts 中读取 Markdown 并转换为 HTML
    const post = await getPost(slug);

    if (!post) {
        return (
            <div className="p-8 max-w-2xl mx-auto text-center text-red-600">
                文章不存在
            </div>
        );
    }

    return (
        <main className="max-w-3xl mx-auto p-8 bg-gray-100">
            <article className="prose bg-white p-6 rounded shadow">
                <h1>{post.title}</h1>
                <p className="text-sm text-gray-500">{post.date}</p>
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </article>

            {/* 🔹 评论组件 */}
            <Comment postId={slug} />
        </main>
    );
}
