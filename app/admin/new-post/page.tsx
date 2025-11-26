'use client'

import { useState, useRef, useEffect } from 'react'
import MDEditor from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

export default function NewPostPage() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')
    const [coverFile, setCoverFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const editorContainerRef = useRef<HTMLDivElement | null>(null)
    const imageUploadInputRef = useRef<HTMLInputElement | null>(null)

        
    useEffect(() => {
        const container = editorContainerRef.current
        if (!container) return

        const textarea = container.querySelector<HTMLTextAreaElement>('textarea')
        if (textarea) {
            textarea.setAttribute('data-gramm', 'false')
            textarea.setAttribute('data-gramm_editor', 'false')
            textarea.setAttribute('data-enable-grammarly', 'false')
            textarea.spellcheck = false
        }

        const editable = container.querySelector<HTMLElement>('[contenteditable="true"]')
        if (editable) {
            editable.setAttribute('data-gramm', 'false')
            editable.setAttribute('data-gramm_editor', 'false')
            editable.setAttribute('data-enable-grammarly', 'false')
            editable.setAttribute('spellcheck', 'false')
        }
    }, [])

    // 🔥 使用新建 API 上传 Markdown 图片
    const handleMarkdownImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file){
            alert('请先选择文件')
            return
        }

        const formData = new FormData()
        formData.append('image', file)

        try {
            const res = await fetch('/api/posts/upload-image', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            if (!res.ok) {
                alert(data.message || '图片上传失败')
                return
            }

            // 上传成功，插入到 Markdown
            setContent(prev => `${ prev }\n\n![](${ data.url })`)
        } catch (err) {
            alert('图片上传失败')
            console.error(err)
        }

        // 清空文件选择
        if (imageUploadInputRef.current) imageUploadInputRef.current.value = ''
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('content', content)
            formData.append('tags', tags)
            if (coverFile) formData.append('cover', coverFile)

            const res = await fetch('/api/posts/create', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            setLoading(false)

            if (!res.ok) {
                setError(data.message || '发布失败')
                return
            }

            // 新窗口打开文章
            window.open(`/posts/${ data.article.slug } `)

            // 清空表单
            setTitle('')
            setContent('')
            setTags('')
            setCoverFile(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
        } catch (err) {
            setLoading(false)
            setError((err as Error).message || '未知错误')
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">新建文章</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500">{error}</p>}

                <div>
                    <label className="block mb-1 font-medium">标题</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full border p-2"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">标签 (逗号分隔)</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                        className="w-full border p-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">封面</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setCoverFile(e.target.files?.[0] || null)}
                        ref={fileInputRef}
                    />
                </div>

                {/* 隐藏 Markdown 图片上传 input */}
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    ref={imageUploadInputRef}
                    onChange={handleMarkdownImageUpload}
                />

                <div>
                    <label className="block mb-1 font-medium">内容 (Markdown)</label>
                    <div ref={editorContainerRef}>
                        <MDEditor
                            value={content}
                            onChange={val => setContent(val || '')}
                            height={400}
                            commandsFilter={(cmd) => {
                                if (cmd.name === 'image') {
                                    return {
                                        ...cmd,
                                        execute() {
                                            imageUploadInputRef.current?.click()
                                        }
                                    }
                                }
                                return cmd
                            }}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {loading ? '发布中...' : '发布文章'}
                </button>
            </form>
        </div>
    )


    }
