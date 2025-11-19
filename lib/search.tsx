// 首先导入所有的文章，文章详情，文章类型
import { getAllSlugs, getPost } from './posts'
import { Post } from '@/types/articles'

export default async function searchPosts(keyword: string) : Promise<Post[]> {
    const slugs = getAllSlugs()
    const postsDate = await Promise.all(slugs.map(async(slug) => await getPost(slug)))
    const posts: Post[] = postsDate.filter((post): post is NonNullable<typeof post> => post !== null)
    const lowerKeyword = keyword.toLowerCase()
    return posts.filter(
        post => 
            post.title.toLowerCase().includes(lowerKeyword) ||
        post.contentHtml.toLowerCase().includes(lowerKeyword)
    )
}