import { Suspense } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { allPages } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"

interface PageProps {
    params: {
        slug: string[]
    }
}

async function getPageFromParams(params: PageProps["params"]) {
    const slug = params?.slug?.join("/")
    const page = allPages.find((page) => page.slugAsParams === slug)

    if (!page) {
        null
    }

    return page
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const page = await getPageFromParams(params)

    if (!page) {
        return {}
    }
    const image = null
    const pageUrl = `${process.env.NEXT_PUBLIC_URL}/${page.slugAsParams}`
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

export async function generateStaticParams(): Promise<PageProps["params"][]> {
    return allPages.map((page) => ({
        slug: page.slugAsParams.split("/"),
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
                    <Mdx code={page.body.code} />
                </article>
            </Suspense>
        </main>
    )
}
