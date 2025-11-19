export type Post = {
    slug: string;
    title: string;
    date: string;
    contentHtml: string;
    tags: string[];
    contentText: string; //纯文本内容
    summary: string; //摘要
    coverImage?: string; //封面图片
}