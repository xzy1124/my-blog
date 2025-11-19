import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// 评论存储文件
const COMMENTS_FILE = path.join(process.cwd(), "data/comments.json");

// 定义评论类型
export type Comment = {
    id: string;
    postId: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: string;
};

// GET 获取评论
export async function GET(req: NextRequest) {
    const postId = req.nextUrl.searchParams.get("postId");
    const comments: Comment[] = JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf-8"));
    const filtered = postId ? comments.filter(c => c.postId === postId) : comments;
    return NextResponse.json(filtered);
}

// POST 提交评论
export async function POST(req: NextRequest) {
    // 手动指定泛型，保证 session.user 有类型
    const session = await getServerSession<typeof authOptions>(authOptions);
    if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { postId, content } = await req.json();
    if (!content || !postId) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const comments: Comment[] = JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf-8"));

    const newComment: Comment = {
        id: uuidv4(),
        postId,
        content,
        userId: session.user.id,
        userName: session.user.name!,
        createdAt: new Date().toISOString(),
    };

    comments.push(newComment);
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));

    return NextResponse.json(newComment);
}

/**
 * 前端只需要用fetch发起POST请求，然后请求体中包含postId和content字段即可
 * 尽管调用接口，不必在意fs.readFileSync和fs.writeFileSync的实现细节
 * 接口在哪里，就是这个route所在的路径，这就是Next.js的API路由
 */