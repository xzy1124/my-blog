# 📝 my-blog (Next.js 全栈)

![License](https://img.shields.io/badge/license-MIT-green) ![Vercel](https://img.shields.io/badge/deployed-on-Vercel-blue)

**My Blog** 是一个全栈博客系统，基于 **Next.js** + **Supabase** 实现，支持 GitHub OAuth 登录、文章展示、评论功能，部署在 Vercel 上。线上展示：https://my-blog-gules-eta-47.vercel.app/

---

## 🔹 功能特点

- **用户认证**：
  - GitHub OAuth 登录
  - 用户信息自动存储
- **文章管理**：
  - 使用 Markdown 文件管理文章内容
  - 静态生成（SSG）或动态渲染 HTML
  - 搜索和分类筛选
  - 自动提取 meta 信息（标题、摘要、封面图）用于微信分享卡片
- **评论系统**：
  - 登录用户可评论文章
  - 仅允许用户删除自己的评论
  - 评论通过 **Next.js API Routes + Supabase** 管理
- **全栈支持**：
  - 前端：React + Tailwind
  - 后端：Next.js API Routes 调用 Supabase
- **部署**：
  - Vercel 一键部署
  - 支持自动 CI/CD

---

## 🔹 技术栈

| 层级         | 技术/工具           | 描述 |
|--------------|-------------------|------|
| 前端         | Next.js + TypeScript | 页面和前端逻辑 |
| 样式         | Tailwind CSS       | 响应式 UI |
| 数据管理     | Markdown + HTML    | 文章内容管理与渲染 |
| 评论/用户    | Supabase           | 存储用户和评论数据 |
| 身份认证     | GitHub OAuth       | 第三方登录 |
| 后端         | Next.js API Routes | 评论 CRUD API |
| 部署         | Vercel             | 全栈部署 + serverless 支持 |
| 辅助工具     | remark, remark-html | Markdown 转 HTML |

---

## 🔹 项目结构

```

my-blog/
├─ src/
│  ├─ app/                # Next.js App Router 页面
│  ├─ components/         # 公共组件 (Banner, SearchBox, Comment)
│  ├─ pages/api/           # Next.js API Routes (评论接口)
│  ├─ lib/                 # Supabase 客户端、OAuth 配置
│  ├─ store/               # Zustand 状态管理
│  └─ utils/               # Markdown 解析、meta 提取等工具函数
├─ public/                 # 静态资源
├─ package.json
└─ next.config.js

````

---

## 🔹 安装与运行

### 1. 克隆仓库
```bash
git clone https://github.com/你的用户名/my-blog.git
cd my-blog
````

### 2. 安装依赖

```bash
npm install
# 或 yarn
```

### 3. 配置环境变量

在项目根目录创建 `.env.local`：

```env
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名Key
GITHUB_CLIENT_ID=你的GitHub OAuth客户端ID
GITHUB_CLIENT_SECRET=你的GitHub OAuth客户端密钥
NEXTAUTH_SECRET=任意安全字符串，用于加密 Session
```

### 4. 启动开发

```bash
npm run dev
# 或 yarn dev
```

### 5. 构建生产版本

```bash
npm run build
npm run start
```

---

## 🔹 部署

* 平台：**Vercel**
* 流程：

  1. 连接 GitHub 仓库
  2. 配置 `.env` 环境变量
  3. Vercel 自动构建 + 部署
* 部署后 URL 示例：

```
https://my-blog.vercel.app
```

---

## 🔹 可扩展功能

* 点赞/收藏文章
* 多级评论、评论回复
* 用户个人主页与文章管理
* 后台管理系统（文章审核、评论管理）

---

## 🔹 贡献

欢迎提交 Issues 或 PR，改进博客功能或样式。

---
