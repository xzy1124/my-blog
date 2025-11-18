type PageProps = {
    params: Promise<{ slug: string }>
}
// 示例文章数据（之后会换成数据库）
const posts = [
    {
        slug: "hello-nextjs",
        title: "第一篇文章：你好 Next.js",
        content: "这里是第一篇文章内容",
    },
    {
        slug: "blog-with-love",
        title: "小小言陪言宝写博客",
        content: "言宝，这篇文章是专门写给你的 ❤️",
    },
];
/**
 * 这里的{params} PageProps相当于我们之前写的
 * function PostDetail(props: PageProps) {
      const params = props.params;
}
    或者function PostDetail({ params }) {}

 */
export default async function PostDetail({ params }: PageProps) {
    // 我们需要将params.slug转换为keyof typeof posts类型，意思是params.slug只能是posts对象的key
    const {slug} = await params
    const post = posts.find((post) => post.slug === slug)
    if(!post) {
        return <div>文章不存在</div>
    }
    return (
        <main className="max-w-2xl mx-auto py-16">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-700 leading-7 whitespace-pre-line">
                {post.content}
            </p>
        </main>
    );
}