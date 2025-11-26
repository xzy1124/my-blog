import { createClient } from '@supabase/supabase-js'

// 服务器端专用的 Supabase 客户端，使用 service role key（只在 server-side 使用）
export const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
