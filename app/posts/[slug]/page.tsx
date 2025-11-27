import { supabaseServer } from '@/lib/supabase.server'
import Comment from '@/components/Comment'
import { formatDateTime } from '@/lib/date'
import ReactMarkdown from 'react-markdown'
//这是每一个文章的详情页,根据slug来获取文章的详情(标题内容和图片的)[slug]代表文章标题
type PageProps = { params: { slug: string } | Promise<{ slug: string }> }

// ⭐ 从 Supabase 获取文章
async function fetchPost(params: PageProps['params']) {
    const resolvedParams = await params
    const { data, error } = await supabaseServer
        .from('articles')
        .select('slug, title, content, cover_url, tags, created_at')
        .eq('slug', resolvedParams.slug)
        .single()

    if (error || !data) return null

    return {
        slug: data.slug,
        title: data.title,
        contentHtml: data.content, // 前端直接用 content
        coverImage: data.cover_url || '',
        tags: data.tags || [],
        date: data.created_at,
    }
}

// 1️⃣ 静态路径生成
export async function generateStaticParams() {
    const { data: articles } = await supabaseServer.from('articles').select('slug')
    if (!articles) return []
    return articles.map((a: { slug: string }) => ({ slug: a.slug }))
}

// 2️⃣ SEO Metadata
export async function generateMetadata({ params }: PageProps) {
    const post = await fetchPost(params)
    if (!post) return {}
    const coverUrl = post.coverImage || '/windows.svg'
    return {
        title: post.title,
        description: post.contentHtml.slice(0, 100),
        openGraph: {
            title: post.title,
            description: post.contentHtml.slice(0, 100),
            url: `/posts/${post.slug}`,
            images: [{ url: coverUrl, width: 800, height: 600 }],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.contentHtml.slice(0, 100),
            images: coverUrl,
        },
    }
}

// 3️⃣ 页面主体
export default async function PostDetail({ params }: PageProps) {
    const post = await fetchPost(params)
    if (!post) return <div className="p-8 max-w-2xl mx-auto text-center text-red-600">文章不存在</div>

    return (
        <main className="max-w-3xl mx-auto p-8 bg-gray-100">
            <article className="prose bg-white p-6 rounded shadow">
                {/* <LoginButton /> */}
                {/* 不再显示封面，只在列表页&分享页展示 */}

                <h1>{post.title}</h1>
                <p className="text-sm text-gray-500">{formatDateTime(post.date)}</p>
                {/* ✅ 使用 react-markdown 渲染 content */}
                <ReactMarkdown>{post.contentHtml}</ReactMarkdown>

            </article>
            <Comment postId={post.slug} />
        </main>
    )
}
