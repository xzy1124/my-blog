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
    // 组件一挂载就先拉取所有评论
    useEffect(() => {
        fetch(`/api/comments?postId=${postId}`)
        .then(res => res.json())
        .then(setComments)
    }, [postId])
    const handleSubmit = async () => {
        // 这里是提交评论的逻辑，就是把内容作为请求体发送到服务器
        if (input.trim() === "") {
            return;
        }
        // 要发请求就是异步的
        const res = await fetch("/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({postId, content: input})
        })
        const newComment = await res.json()
        setComments(prev => [...prev, newComment])
        setInput("")
    }
    return (
        <div className="mt-6 w-full max-w-xl">
            <h2 className="font-bold mb-2">评论</h2>
            {comments.map(comment => (
                <div key={comment.id} className="border-b py-2">
                    <span>{comment.userName}:</span> {comment.content}
                </div>
            ))}
            {session ? (
                <div className="flex mt-2">
                    <input
                        className="flex-1 border px-2 py-1"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        // 支持回车发送评论
                        onKeyDown={(e) => {
                            if(e.key === 'Enter'){
                                e.preventDefault()
                                handleSubmit()
                            }
                        }}
                    />
                    <button className="ml-2 px-4 py-1 bg-blue-500 text-white" onClick={handleSubmit}>
                        发送
                    </button>
                </div>
            ) : (
                <p className="mt-2 text-gray-500">请先登录评论</p>
            )}
        </div>
    )
}