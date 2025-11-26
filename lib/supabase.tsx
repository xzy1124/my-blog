import { createClient } from '@supabase/supabase-js';

// 这是supabase客户端，用于前端页面调用的，后端调用需要使用服务角色密钥
export const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
