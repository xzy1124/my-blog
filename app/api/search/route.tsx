// 接收前端的搜索请求，调用searchPosts函数，返回搜索结果
import { NextRequest, NextResponse } from "next/server"
import searchPosts from "@/lib/search"
export async function GET(req: NextRequest) {
    // 把请求URL转成URL对象，方便提取参数
    const {searchParams} = new URL(req.url)
    // 取出URL的查询参数，例如/api/search?keyword=react --->就是取出react，如果没有就用空字符串
    const keyword = searchParams.get("keyword") || ""
    if (!keyword) {
        // 直接返回空数组，就是res.json([])
        return NextResponse.json([])
    }
    // 否则就可以调用搜索函数了
    const posts = await searchPosts(keyword)
    return NextResponse.json(posts)

}