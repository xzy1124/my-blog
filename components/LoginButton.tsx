"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
export default function LoginButton() {
    const { data: session } = useSession()
    if(!session) {
        return (
            <button onClick={() => signIn("github")}>
                Sign In
            </button>
        )
    }
    return (
        <div>
            <span>你好，{session.user?.name}</span>
            <button onClick={() => signOut()}>退出登录</button>
        </div>
    )
}