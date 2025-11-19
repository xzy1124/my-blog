"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import type { Comment } from "@/types/comment";
/**
 * 1.评论组件就是一个输入框，点击按钮能发布评论
 * 2.评论组件需要一个状态来存储评论内容
 * 3.评论组件需要一个函数来处理提交事件
 * 4.评论组件需要一个props来接收文章id
 */
export default function Comment({postId}: {postId: string}){
    const {data: session} = useSession();
    const [input, setInput] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    // 拉取评论
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comments?postId=${postId}`);
                const result = await res.json();
                // Supabase 返回对象包含 data 和 error
                setComments(Array.isArray(result) ? result : []);
            } catch (err) {
                console.error("获取评论失败:", err);
                setComments([]);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [postId]);
    // 提交评论
    const handleSubmit = async () => {
        if (!input.trim() || !session) return;

        try {
            const res = await fetch("/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postId, content: input }),
            });
            const result = await res.json();
            // 修复：直接使用result作为数据，而不是result.data
            const newComment = Array.isArray(result) && result.length > 0 ? result[0] : null;
            if (newComment) {
                setComments((prev) => [...prev, newComment]);
                setInput("");
            }
        } catch (err) {
            console.error("发表评论失败:", err);
        }
    };

    return (
        <div className="mt-6 w-full max-w-xl">
            <h2 className="font-bold mb-2">评论</h2>

            {loading ? (
                <p className="text-gray-500">加载中...</p>
            ) : comments.length === 0 ? (
                <p className="text-gray-500">暂无评论</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} className="border-b py-2">
                        <span className="font-semibold">{comment.user_id}:</span> {comment.content}
                        <div className="text-xs text-gray-400">
                            {new Date(comment.created_at).toLocaleString()}
                        </div>
                    </div>
                ))
            )}

            {session ? (
                <div className="flex mt-2">
                    <input
                        className="flex-1 border px-2 py-1"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                    />
                    <button
                        className="ml-2 px-4 py-1 bg-blue-500 text-white"
                        onClick={handleSubmit}
                    >
                        发送
                    </button>
                </div>
            ) : (
                <p className="mt-2 text-gray-500">请先登录评论</p>
            )}
        </div>
    );
}