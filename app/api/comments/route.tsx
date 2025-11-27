import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";
import { supabaseServer as supabase } from "@/lib/supabase.server";

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId");

  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId || "")
      .order("created_at", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.json();
  const { postId, content } = body as { postId?: string; content?: string };

  if (!postId || !content)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    try {
        const { data, error } = await supabase  
            .from("comments")
            .insert([{ post_id: postId, content, user_id: session.user.id }])
            .select();

        if (error) {
            console.error("Supabase insert error:", error);
            throw error;
        }

        return NextResponse.json(data);
    } catch (err: unknown) {
        console.error("POST /api/comments error:", err);
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }

}


/**
 * 前端只需要用fetch发起POST请求，然后请求体中包含postId和content字段即可
 * 尽管调用接口，不必在意fs.readFileSync和fs.writeFileSync的实现细节
 * 接口在哪里，就是这个route所在的路径，这就是Next.js的API路由
 */
/**
 * 现在这个版本使用的是supbase数据库，已经在平台创建了一个comments表，
 * 表中包含id、post_id、content、user_id、updated_at、created_at字段
 * supbase的语法与prisma有些类似，但是更简单一些
 */