import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabaseServer } from '@/lib/supabase.server'

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } | Promise<{ id: string }> }
) {

    try {
        // params is a Promise in app-route context — must await it before using
        const resolvedParams = await params
        console.log('params.id:', resolvedParams.id) // 打印前端传过来的文章 ID
        const session = await getServerSession(authOptions)
        console.log('session:', session) // 打印 session 对象
        if (!session?.user?.id) {
            return NextResponse.json({ error: '用户未登录' }, { status: 401 })
        }

        const articleId = resolvedParams.id

        // 检查文章是否属于当前用户
        // Debug: log the incoming id so you can confirm what the client sent
        console.log('DELETE /api/posts/delete/:id called with id =', articleId)

        // Try to find the article by id
        let article: { id: string; slug: string; user_id: string } | null = null
        let articleError: unknown | null = null
        const articleRes = await supabaseServer
            .from('articles')
            .select('id, slug, user_id')
            .eq('id', articleId)
            .single()
        article = articleRes.data ?? null
        articleError = articleRes.error ?? null

        // If not found by id, try to fallback and search by slug (helps detect if slug was passed)
        if (!article && !articleError) {
            console.log('No article found by id, trying fallback search by slug =', articleId)
            const { data: bySlug, error: slugError } = await supabaseServer
                .from('articles')
                .select('id, slug, user_id')
                .eq('slug', String(articleId))
                .single()

            if (slugError) {
                console.log('fallback slug query error:', slugError)
            }

            if (bySlug) {
                console.log('Found article by slug during fallback, id=', bySlug.id)
                // Use the found record as the article (so we don't falsely 404)
                // and continue deletion checks against the found record.
                article = bySlug
            }
        }

        if (articleError || !article) {
        return NextResponse.json({ error: '文章不存在' }, { status: 404 })
        }

        // guard in case session.user is missing
        const currentUserId = session.user.id as string
        

        if (article.user_id !== currentUserId) {
        return NextResponse.json({ error: '无权限删除该文章' }, { status: 403 })
        }

        // 删除文章 -- use the actual found id (if we matched by slug fallback, article.id will be the real id)
        const deleteId = article.id
        console.log('Deleting article id =', deleteId)
        const { error: deleteError } = await supabaseServer.from('articles').delete().eq('id', deleteId)

        if (deleteError) {
        return NextResponse.json({ error: '删除文章失败' }, { status: 500 })
        }

        return NextResponse.json({ message: '文章删除成功' })
        

    } catch (err) {
            console.error('删除文章错误:', err)
            return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
        }
}
