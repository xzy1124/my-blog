import { createClient } from '@supabase/supabase-js'

// 这是仅供前端使用的 supabase 客户端（使用公开的 NEXT_PUBLIC_* 环境变量）
export const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)