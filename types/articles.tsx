export type Article = {
    id: string;          // uuid
    user_id: string;     // 作者 id
    title: string;       // 文章标题
    slug: string;        // 唯一 slug，用于 URL
    content: string;     // 文章正文
    cover_url?: string;  // 封面图片，可选
    tags?: string[];     // 标签数组，可选
    created_at: string;  // 创建时间
    updated_at: string;  // 更新时间
};
