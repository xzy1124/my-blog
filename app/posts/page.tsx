// app/posts/page.tsx
import { redirect } from "next/navigation";

export default function PostsIndexPage() {
    redirect("/posts/page/1");
}
