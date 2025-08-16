import { Suspense } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { allPages, getPageBySlug } from "@/lib/content"

import { Mdx } from "@/components/mdx-components"

interface PageProps {
    params: Promise<{
        slug: string[]
    }>
}

async function getPageFromParams(params: PageProps["params"]) {
    const resolvedParams = await params
    const slug = `/${resolvedParams?.slug?.join("/")}`
    const page = getPageBySlug(slug)

    if (!page) {
        return null
    }

    return page
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const page = await getPageFromParams(params)

    if (!page) {
        return {}
    }
    const image = null
    const pageUrl = `${process.env.NEXT_PUBLIC_URL}${page.slug}`
    return {
        title: {
            template: `%s | ${page.title}`,
            default: `${page.title}`, // a default is required when creating a template
        },
        description: page.description,
        alternates: {
            canonical: `${pageUrl}`,
        },
        metadataBase: new URL(pageUrl),
        openGraph: {
            title: `${page.title}`,
            description: page.description || `${process.env.NEXT_PUBLIC_EXCERPT}`,
            url: `${pageUrl}`,
            siteName: `${process.env.NEXT_PUBLIC_AUTHOR}`,
            images: image ? [image] : [`${process.env.NEXT_PUBLIC_BANNER}`],
            locale: "id_ID",
            type: "website",
        },
        twitter: {
            title: `${page.title}`,
            card: "summary_large_image",
            images: image ? [image] : [`${process.env.NEXT_PUBLIC_BANNER}`],
        },
    }
}

export async function generateStaticParams() {
    return allPages.map((page) => ({
        slug: page.slug.replace('/', '').split("/"),
    }))
}

export default async function PagePage({ params }: PageProps) {
    const page = await getPageFromParams(params)

    if (!page) {
        notFound()
    }

    return (
        <main className="container mx-auto px-4 text-sm">
            <Suspense fallback={<p>Loading feed...</p>}>
                <article className="prose max-w-full dark:prose-invert">
                    <h1>{page.title}</h1>
                    {page.description && <p className="text-xl">{page.description}</p>}
                    <hr />
                    <Mdx>{page.content}</Mdx>
                </article>
            </Suspense>
        </main>
    )
}
