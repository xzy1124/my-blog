import { supabaseClient } from "@/lib/supabase";

export async function getPaginatedArticles(page: number, pageSize = 10) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await supabaseClient
        .from("articles")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

    if (error) throw error;

    return {
        currentPosts: data ?? [],
        totalPages: Math.ceil((count ?? 0) / pageSize),
        currentPage: page,
    };
}
