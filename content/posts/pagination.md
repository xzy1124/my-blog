---
title: "分页"
date: "2025-11-18"
tags: ["nextjs", "blog", "pagination"]
---
# 理解分页
分页是指将大量内容分割成多个页面，以提高用户体验和性能。

--- 
## 定义分页路径
在 Next.js 中，可以通过查询参数或动态路由来实现分页。例如：
- 查询参数：`/posts?page=2`
- 动态路由：`/posts/page/2`
---
## 路由划分
现有的目录结构是
```css
app/posts/
 ├── page.tsx         ← 文章列表首页
 └── [slug]/page.tsx  ← 文章详情页
```
我们要添加一个分页目录
```css
app/posts/
 ├── page.tsx         ← 文章列表首页
 ├── [slug]/page.tsx  ← 文章详情页
 └── page/[page]/page.tsx  ← 分页首页
```
为什么要增加page文件夹而不是直接在posts下添加[page]/page.tsx
因为如果直接在posts下添加[page]/page.tsx，那么就会和[slug]/page.tsx冲突，导致404错误。
因为Next.js的动态路由不能和已有的page.tsx冲突，所以我们要在posts下添加一个page文件夹，用来存放分页首页。