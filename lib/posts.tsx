import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

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
    };
}

export function getAllSlugs() {
    return fs.readdirSync(postsDirectory).map((file) => file.replace(/\.md$/, ""));
}
