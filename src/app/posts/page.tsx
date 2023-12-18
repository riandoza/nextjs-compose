import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { Label } from "@/components/ui/label"
import { genPageMetadata } from "@/app/seo"

export const metadata = genPageMetadata({
    title: "Blog",
    description: "Description",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_URL}/posts`,
    },
})

export default function Home() {
    if (!allPosts) return notFound()
    return (
        <main className="container mx-auto px-4 text-sm">
            <div className="prose max-w-full dark:prose-invert">
                {allPosts.map((post) => (
                    <article key={post._id}>
                        <Link href={post.slug}>
                            <h2>{post.title}</h2>
                        </Link>
                        {post.description && <p>{post.description}</p>}
                    </article>
                ))}
            </div>
        </main>
    )
}
