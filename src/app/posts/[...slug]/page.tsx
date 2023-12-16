import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

import { Mdx } from "@/components/mdx-components";
import { Metadata } from "next";

interface PostProps {
    params: {
        slug: string[];
    };
}

async function getPostFromParams(params: PostProps["params"]) {
    const slug = params?.slug?.join("/");
    const post = allPosts.find((post) => post.slugAsParams === slug);

    if (!post) {
        null;
    }

    return post;
}

export async function generateMetadata({
    params,
}: PostProps): Promise<Metadata> {
    const post = await getPostFromParams(params);

    if (!post) {
        return {};
    }
    const postUrl = `${process.env.NEXT_PUBLIC_URL}/posts/${post.slugAsParams}`;
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
            description:
                post.description || `${process.env.NEXT_PUBLIC_EXCERPT}`,
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
    };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
    return allPosts.map((post) => ({
        slug: post.slugAsParams.split("/"),
    }));
}

export default async function PostPage({ params }: PostProps) {
    const post = await getPostFromParams(params);

    if (!post) {
        notFound();
    }

    return (
        <main className="container mx-auto text-sm px-4">
            <article className="prose dark:prose-invert max-w-full">
                <h1 className="mb-2">{post.title}</h1>
                {post.description && (
                    <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
                        {post.description}
                    </p>
                )}
                <hr className="my-4" />
                <Mdx code={post.body.code} />
            </article>
        </main>
    );
}
