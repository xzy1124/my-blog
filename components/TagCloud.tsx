'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export type TagCount = {
    name: string;
    count: number;
};

type TagCloudProps = {
    tags?: TagCount[]; // 可选，如果传了就用 props，否则内部 fetch
};

export default function TagCloud({ tags: initialTags }: TagCloudProps) {
    const [tags, setTags] = useState<TagCount[]>(initialTags || []);

    useEffect(() => {
        if (initialTags && initialTags.length) return; // 已有 props 就不再 fetch

        async function fetchTags() {
            try {
                const res = await fetch('/api/tags', { cache: 'no-store' });
                const data = await res.json();
                setTags(data.tags || []);
            } catch (err) {
                console.error('获取标签失败:', err);
            }
        }

        fetchTags();
    }, [initialTags]);

    if (!tags.length) return null;

    return (
        <div className="bg-white rounded-lg shadow p-4"> 
            <h2 className="text-xl font-bold mb-4">分类</h2> 
            <div className="flex flex-wrap items-start gap-2"> 
                {tags.map(({ name, count }) => {
                    // 尝试解析 JSON，如果解析失败就返回原始 name
                    let displayName = name;
                    try {
                        const parsed = JSON.parse(name);
                        if (Array.isArray(parsed)) displayName = parsed.join(', ');
                    } catch (err) {
                        // 不是 JSON 就保持原样
                        console.log('不是 JSON 格式:', err);
                    }

                    return (
                        <Link
                            key={name}
                            href={`/tags/${encodeURIComponent(displayName)}`}
                            className="px-2 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm transition"
                            // style={{ fontSize: `${12 + Math.min(count * 2, 20)}px` }}
                        >
                            {displayName} ({count})
                        </Link>
                    );
                })}

            </div> 
        </div>
    );


}
