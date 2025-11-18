import { getAllSlugs, getPost } from "./posts"
import { Post } from "./posts";
// 创建分页函数，接收page参数，返回分页数据
export async function getPaginatedPosts(page: number, pageSize = 3){
    // 先从隔壁posts取出所有文章
    const slugs = getAllSlugs();
    // 获取所有文章的详细信息
    const postsData = await Promise.all(slugs.map((slug) => getPost(slug)))
    // 过滤掉 null,使得posts的类型是NonNullable<typeof post>
    const posts: Post[] = postsData.filter((post): post is NonNullable<typeof post> => post !== null)
    // 排序
    posts.sort((a, b) => (a.date > b.date ? -1 : 1))
    // 计算总页数
    const totalPosts = posts.length
    // 上取整计算总页数
    const totalPages = Math.ceil(totalPosts / pageSize)
    // 计算当前页的文章,page-1是因为数组索引从0开始，但是我们的分页是从1开始的
    const startIndex = (page - 1) * pageSize
    // 展示的文章就是从startIndex开始，取pageSize个,前闭后开
    // 比如我们要查看第一页，startIndex=0,pageSize=5,所以展示的文章就是从0开始，取5个
    // 比如我们要查看第二页，startIndex=5,pageSize=5,所以展示的文章就是从5开始，取5个
    const currentPosts = posts.slice(startIndex, startIndex + pageSize)
    return {
        // 返回页码,数据,总页数
        currentPosts,
        totalPages,
        currentPage: page,
    }
}