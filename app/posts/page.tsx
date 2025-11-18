import Link from 'next/link'
const posts = [
    { title: "第一篇文章：Hello Next.js", slug: "hello-nextjs" },
    { title: "第二篇文章：小小言带我做的", slug: "blog-with-love" },
]
export default function PostPage() {
    return (
        <main className='max-w-2xl mx-auto py-16'>
            <h1 className='text-3xl font-bold mb-8'>所有文章</h1>
            <ul className='space-y-4'>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link href={`[posts/${post.slug}]`} className="text-xl text-blue-600 hover:underline">
                            {post.title}
                        </Link>
                    </li>
                ))}

            </ul>
        </main>
    )
}