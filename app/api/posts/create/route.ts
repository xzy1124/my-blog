import { NextResponse } from 'next/server'
import slugify from 'slugify'
import { supabaseServer } from '@/lib/supabase.server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// ⚠ 使用 service role key
const supabase = supabaseServer

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) return NextResponse.json({ message: '未登录' }, { status: 401 })

        const formData = await req.formData()
        const title = formData.get('title') as string
        const content = formData.get('content') as string
        const tags = (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean)
        const coverFile = formData.get('cover') as Blob | null

        if (!title || !content) return NextResponse.json({ message: '标题和内容必填' }, { status: 400 })

        let cover_url: string | null = null
        if (coverFile && coverFile.size > 0) {
            const buffer = Buffer.from(await coverFile.arrayBuffer())

            // 如果 coverFile 没有 name，就自己生成随机文件名
            const ext = (coverFile as File).name?.split('.').pop() || 'png'
            const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage.from('covers').upload(filePath, buffer)
            if (uploadError) return NextResponse.json({ message: '封面上传失败', error: uploadError }, { status: 500 })

            const { data } = supabase.storage.from('covers').getPublicUrl(filePath)
            cover_url = data.publicUrl
        }

        // slug
        const baseSlug = slugify(title, { lower: true, strict: true }) || 'post'
        let slug = baseSlug
        let count = 1
        while (true) {
            const { data: exist } = await supabase.from('articles').select('id').eq('slug', slug).limit(1)
            if (!exist || exist.length === 0) break
            slug = `${baseSlug}-${count++}`
        }


        // 插入文章
        const { data: article, error: insertError } = await supabase
            .from('articles')
            .insert([{
                user_id: session.user.id,
                title,
                slug,
                content,
                cover_url,
                tags
            }])
            .select()
            .single()

        if (insertError) return NextResponse.json({ message: '插入文章失败', error: insertError }, { status: 500 })

        return NextResponse.json({ message: 'ok', article })

    } catch (err: unknown) {
        console.error(err)
        return NextResponse.json({ message: err instanceof Error ? err.message : '未知错误' }, { status: 500 })
    }
}
