"use client"

import React, { useEffect, useState, startTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabaseClient } from '@/lib/supabase'
import type { Article } from '@/types/articles'

export default function SearchClient() {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')?.trim() || ''

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!keyword) return

    startTransition(() => {
      setLoading(true)
    })

    supabaseClient
      .from('articles')
      .select('id, user_id, title, slug, content, cover_url, tags, created_at, updated_at')
      .or(`title.ilike.%${keyword}%,content.ilike.%${keyword}%`)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        startTransition(() => {
          if (!error && data) setArticles(data)
          setLoading(false)
        })
      })
  }, [keyword])

  if (!keyword) return (
    <div className="p-6">
      <h2 className="text-xl font-bold">请输入关键词</h2>
    </div>
  )

  if (loading) return <div className="p-6">搜索中...</div>
  if (!articles.length) return <div className="p-6">没有找到相关文章</div>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">搜索结果：{keyword}({articles.length} 篇)</h2>
      <ul className="space-y-3">
        {articles.map((a) => (
          <li key={a.id}>
            <a href={`/posts/${a.slug}`} className="text-blue-600 underline">{a.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
