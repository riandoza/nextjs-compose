import { MetadataRoute } from "next"
import { allPosts } from "@/lib/content"

const blogRoutes: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_URL}${post.slug}`,
    lastModified: post.date,
}))

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl: string = `${process.env.NEXT_PUBLIC_URL}`
    const routes = ["", "blog"].map((route) => ({
        url: `${siteUrl}/${route}`,
        lastModified: new Date().toISOString().split("T")[0],
    }))

    //return [...routes, ...blogRoutes]
    // return [...routes]
    return [...routes, ...blogRoutes]
}
