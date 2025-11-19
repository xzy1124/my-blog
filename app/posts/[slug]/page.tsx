// app/posts/[slug]/page.tsx
// "use client"
import { getPost, getAllSlugs } from "@/lib/posts";
import Comment from "@/components/Comment";
import Image from "next/image";
type ParamsPromise = Promise<{ slug: string }>;

// 1. 生成静态路由参数
export async function generateStaticParams() {
    // 返回形如 [{ slug: 'hello-nextjs' }, { slug: 'blog-with-love' }]
    return getAllSlugs().map((slug) => ({ slug }));
}

// 2.为文章生成SEO/分享Meta标签
export async function generateMetadata({ params }: { params: ParamsPromise }) {
    // const post = await getPost(params.slug)
    const {slug} = await params //先等待params解析完成，拿到slug
    const post = await getPost(slug) //再根据slug获取文章详情
    if(!post) return {}
    // 封面完整 URL
    const coverUrl = post.coverImage
        ? `https://nasopalatine-contrastedly-marci.ngrok-free.dev${post.coverImage}`
        : "https://nasopalatine-contrastedly-marci.ngrok-free.dev/windows.svg";

    return {
        title: post.title,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            url: `https://nasopalatine-contrastedly-marci.ngrok-free.dev/posts/${slug}`,
            images: [
                {
                    url: coverUrl,
                    width: 800,
                    height: 600,
                }
            ],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.summary,
            images: coverUrl,
        }
    }

}
// 3.页面主体
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
                {post.coverImage && (
                    <Image
                        src={post.coverImage}
                        alt="封面"
                        width={50} //指定宽高，next.js会自动处理图片缩放
                        height={25}
                        className="mb-4 runded"
                    />
                )}
                <h1>{post.title}</h1>
                <p className="text-sm text-gray-500">{post.date}</p>
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </article>

            {/* 🔹 评论组件 */}
            <Comment postId={slug} />
        </main>
    );
}
