---
title: "Promise 详解"
date: "2025-11-18"
tags: ["javascript", "blog"]
---
# 理解 Promise
Promise 是 JavaScript 中用于处理异步操作的一种机制。它表示一个可能在未来某个时间点完成或失败的操作。

---
## ✨ Promise 的状态
一个 Promise 有三种状态：
- **Pending（待定）**: 初始状态，既不是成功也不是失败。
- **Fulfilled（已兑现）**: 操作成功完成。
- **Rejected（已拒绝）**: 操作失败。
---
### 一个例子
```typescript
export default async function PostPage() {
    // 获取所有文章的slug也就是文件名也就是路径
    const slugs = getAllSlugs()
    // 读取所有文章的metadata,也就是标题和日期
    const postsData = await Promise.all(
        slugs.map(async (slug) => {
            const post = await getPost(slug)
            return post
        })
    )
```
