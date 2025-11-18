import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type Post = {
    slug: string;
    title: string;
    date: string;
    contentHtml: string;
    tags: string[];
}
// 去掉 HTML 标签，保留纯文本
export function extractPlainText(html: string) {
    return html.replace(/<[^>]+>/g, "");
}

// 获取前 N 个字符作为摘要
export function getSummary(html: string, length = 120) {
    const plain = extractPlainText(html);
    return plain.length > length ? plain.slice(0, length) + "..." : plain;
}

export async function getPost(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const file = fs.readFileSync(fullPath, "utf-8");

    const { data, content } = matter(file);

    const processed = await remark().use(html).process(content);

    return {
        slug,
        title: data.title,
        date: data.date,
        contentHtml: processed.toString(),
        tags: data.tags || []
    };
}

export function getAllSlugs() {
    return fs.readdirSync(postsDirectory).map((file) => file.replace(/\.md$/, ""));
}
