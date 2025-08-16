import { Suspense } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { allPosts, getPostBySlug } from "@/lib/content"

import { Mdx } from "@/components/mdx-components"

interface PostProps {
    params: Promise<{
        slug: string[]
    }>
}

async function getPostFromParams(params: PostProps["params"]) {
    const resolvedParams = await params
    const slug = `/posts/${resolvedParams?.slug?.join("/")}`
    const post = getPostBySlug(slug)

    if (!post) {
        return null
    }

    return post
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
    const post = await getPostFromParams(params)

    if (!post) {
        return {}
    }
    const postUrl = `${process.env.NEXT_PUBLIC_URL}${post.slug}`
    return {
        title: {
            template: `%s | ${post.title}`,
            default: `${post.title}`, // a default is required when creating a template
        },
        description: post.description,
        alternates: {
            canonical: `${postUrl}`,
        },
        metadataBase: new URL(postUrl),
        openGraph: {
            title: `${post.title}`,
            description: post.description || `${process.env.NEXT_PUBLIC_EXCERPT}`,
            url: `${postUrl}`,
            siteName: `${process.env.NEXT_PUBLIC_AUTHOR}`,
            //images: image ? [image] : [`${process.env.NEXT_PUBLIC_BANNER}`],
            locale: "id_ID",
            type: "website",
        },
        twitter: {
            title: `${post.title}`,
            card: "summary_large_image",
            //images: image ? [image] : [`${process.env.NEXT_PUBLIC_BANNER}`],
        },
    }
}

export async function generateStaticParams() {
    return allPosts.map((post) => ({
        slug: post.slug.replace('/posts/', '').split("/"),
    }))
}

export default async function PostPage({ params }: PostProps) {
    const post = await getPostFromParams(params)

    if (!post) {
        notFound()
    }

    return (
        <main className="container mx-auto px-4 text-sm">
            <Suspense fallback={<p>Loading feed...</p>}>
                <article className="prose max-w-full dark:prose-invert">
                    <h1 className="mb-2">{post.title}</h1>
                    {post.description && (
                        <p className="mt-0 text-xl text-slate-700 dark:text-slate-200">{post.description}</p>
                    )}
                    <hr className="my-4" />
                    <Mdx>{post.content}</Mdx>
                </article>
            </Suspense>
        </main>
    )
}
