"use client"
import { useState } from "react"
import PostCard from "./PostCard"
import { Post } from "@/lib/posts"
export default function SearchBox(){
    const [keyword, setKeyword] = useState("") //用来实时监测输入框的变化
    const [loading, setLoading] = useState(false) //用来监测搜索是否正在进行
    const [results, setResults] = useState<Post[]>([]) //用来存储搜索结果
    // 实现按下Enter键盘出发搜索函数
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    }
    // 搜索函数
    const handleSearch = async () => {
        if(!keyword.trim()) return 
        try {
            const res = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`);
            const data = await res.json()
            setResults(data)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="mb-6">
            <div className="flex gap-2">
                <input 
                    type="text" 
                    className="border p-2 flex-1 rounded"
                    placeholder="搜索文章..."
                    //使得表单是受控的，所以需要 onChange 事件
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    onClick={handleSearch}
                >
                    搜索
                </button>

            </div>
            {loading && <p className="mt-2 text-gray-500">搜索中...</p>}
            <ul className="nt-4 space-y-4">
                {results.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </ul>

        </div>
    )
}