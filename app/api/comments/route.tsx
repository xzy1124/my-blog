import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    // 获取查询参数中的postId
    const postId = req.nextUrl.searchParams.get("postId");
    // prisma的作用是使用内置的查询方法来查询评论
    // 1.如果有postId，就查询该文章的所有评论
    // 2.如果没有postId，就查询所有评论
    const comments = await prisma.comment.findMany({
        where: postId ? { postId } : {},
        orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { postId, content } = await req.json();
    if (!postId || !content)
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    // 使用prisma的create方法创建评论
    // 1.将评论内容、文章ID、用户ID和用户名存储到数据库中
    // 2.返回创建的评论对象
    const newComment = await prisma.comment.create({
        data: {
            postId,
            content,
            userId: session.user.id,
            userName: session.user.name || "用户",
        },
    });

    return NextResponse.json(newComment);
}


/**
 * 前端只需要用fetch发起POST请求，然后请求体中包含postId和content字段即可
 * 尽管调用接口，不必在意fs.readFileSync和fs.writeFileSync的实现细节
 * 接口在哪里，就是这个route所在的路径，这就是Next.js的API路由
 */