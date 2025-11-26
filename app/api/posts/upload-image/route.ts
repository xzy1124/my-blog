import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// 使用服务端 Key
const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get('image') as Blob
        if (!file || (file as File).size === 0) {
            return NextResponse.json({ message: '文件为空' }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const ext = (file as File).name?.split('.').pop() || 'png'
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

        // 上传到 article-images bucket
        const { error: uploadError } = await supabase.storage
            .from('article-images')
            .upload(fileName, buffer, { contentType: (file as File).type })

        if (uploadError) return NextResponse.json({ message: '上传失败', error: uploadError }, { status: 500 })

        const { data } = supabase.storage.from('article-images').getPublicUrl(fileName)
        return NextResponse.json({ url: data.publicUrl })
    } catch (err: unknown) {
        console.error(err)
        return NextResponse.json({ message: err instanceof Error ? err.message : '未知错误' }, { status: 500 })
    }
}
