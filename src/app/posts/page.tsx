import { genPageMetadata } from "@/app/seo";
import { allPosts } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

export const metadata = genPageMetadata({
    title: "Blog",
    description: "Description",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_URL}/posts`,
    },
});

export default function Home() {
    return (
        <main className="container mx-auto text-sm px-4">
            <div className="prose dark:prose-invert max-w-full">
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
    );
}
