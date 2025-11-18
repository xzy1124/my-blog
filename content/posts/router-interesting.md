---
title: "路由有趣的地方"
date: "2025-11-18"
tags: ["nextjs", "router"]
---
# Next.js 路由系统的有趣之处
Next.js 的路由系统基于文件系统，这使得创建和管理路由变得非常直观和简单。

---
## ✨ 文件系统路由
在 Next.js 中，`app` 目录下的每个文件和文件夹都会自动映射到一个 URL 路径。例如：
- `app/page.tsx` 映射到 `/`
- `app/about/page.tsx` 映射到 `/about`
- `app/blog/[slug]/page.tsx` 映射到动态路由 `/blog/:slug`
---
### 动态路由
- 一个我们书写的例子
- 我们在app/tags/[tag]/page.tsx写成了pages.tsx就会报错404
- Next.js App Router的规则
- 动态路由文件夹 [param] 下，必须有 page.tsx
- 文件名 不能加 s，不能叫 pages.tsx
例如：
```css
app/
├─ tags/
│  └─ [tag]/
│     └─ page.tsx   ← 这里必须叫 page.tsx
```