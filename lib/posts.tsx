import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

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
    // 1. 拼接文件路径
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    // 2. 检查文件是否存在,如果不存在,返回null
    if (!fs.existsSync(fullPath)) {
        return null;
    }
    // 3. 读取文件内容
    const file = fs.readFileSync(fullPath, "utf-8");
    // 4. 解析文件内容,提取元数据和Markdown内容
    const { data, content } = matter(file);
    // 5. 转换Markdown为HTML
    const processed = await remark().use(html).process(content);
    // 6. 转换HTML为字符串
    const contentHtml = processed.toString();
    // 7. 提取纯文本作为内容
    const contentText = extractPlainText(contentHtml);
    // 8. 提取前 N 个字符作为摘要
    const summary = getSummary(contentHtml);

    return {
        slug,
        title: data.title,
        date: data.date,
        contentHtml: processed.toString(),
        tags: data.tags || [],
        contentText, //纯文本内容
        summary, //摘要
        coverImage: data.cover || "", //封面图片
    };
}

export function getAllSlugs() {
    return fs.readdirSync(postsDirectory).map((file) => file.replace(/\.md$/, ""));
}
