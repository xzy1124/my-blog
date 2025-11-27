'use client'

export default function AboutPage() {
    const techStack = [
        { name: 'React', url: '[https://reactjs.org/](https://reactjs.org/)' },
        { name: 'Next.js', url: '[https://nextjs.org/](https://nextjs.org/)' },
        { name: 'Tailwind CSS', url: '[https://tailwindcss.com/](https://tailwindcss.com/)' },
        { name: 'Supabase', url: '[https://supabase.com/](https://supabase.com/)' },
        { name: 'TypeScript', url: '[https://www.typescriptlang.org/](https://www.typescriptlang.org/)' },
    ]

    const socialLinks = [
        { name: 'GitHub', url: '[https://github.com/yourusername](https://github.com/yourusername)', icon: '🐱' },
        { name: 'LinkedIn', url: '[https://linkedin.com/in/yourusername](https://linkedin.com/in/yourusername)', icon: '💼' },
        { name: 'Email', url: 'mailto:your@email.com', icon: '✉️' },
    ]

    return (<div className="max-w-4xl mx-auto p-6"> <div className="flex flex-col items-center text-center"> <img
        src="/avatar.png"
        alt="Avatar"
        className="w-32 h-32 rounded-full mb-4 shadow-lg"
    /> <h1 className="text-4xl font-bold mb-2">言宝</h1> <p className="text-gray-700 mb-2">
            前端开发者，热衷于 React、Next.js 和现代前端技术栈的研究与分享。 </p> <p className="text-gray-600 mb-4">
            在这个博客中，我会分享技术文章、项目经验和学习笔记，希望对大家有所帮助。 </p>

        ```
        <div className="flex space-x-4 mb-6">
            {socialLinks.map(link => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-gray-100 rounded hover:bg-blue-500 hover:text-white transition flex items-center gap-1"
                >
                    <span>{link.icon}</span> {link.name}
                </a>
            ))}
        </div>

        <h2 className="text-2xl font-semibold mb-3">技术栈</h2>
        <div className="flex flex-wrap justify-center gap-3">
            {techStack.map(tech => (
                <a
                    key={tech.name}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border rounded hover:bg-blue-500 hover:text-white transition"
                >
                    {tech.name}
                </a>
            ))}
        </div>
    </div>

        <div className="mt-10 text-gray-600 space-y-2">
            <p>
                未来计划：持续更新前端技术文章，增加项目实战案例，分享更多学习心得。
            </p>
            <p>
                版权声明：本站内容仅用于技术分享，如涉及引用，请注明来源。
            </p>
        </div>
    </div>


)
}
