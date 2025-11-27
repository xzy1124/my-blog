"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
    articleId: string | number
    onDeleted?: () => void
}

export default function DeleteButton({ articleId, onDeleted }: DeleteButtonProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm('确定要删除这篇文章吗？')) return
        setLoading(true)
        try {
            const res = await fetch(`/api/posts/delete/${articleId}`, {
                method: 'DELETE',
            })
            const data = await res.json()
            console.log('删除文章响应:', data)
            
            setLoading(false)

            if (!res.ok) {
                alert(data.error || '删除失败')
                return
            }

            // 删除成功后跳转回文章列表（首页）
            if (onDeleted) {
                onDeleted()
            } else {
                router.push('/posts/page/1')
            }
        } catch (err) {
            setLoading(false)
            alert('删除失败')
            console.error(err)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="border border-red-200 px-3 py-1 bg-white-500 text-black rounded hover:bg-red-200 transition"
        >
            {loading ? '删除中...' : '删除文章'}
        </button>
    )
}
