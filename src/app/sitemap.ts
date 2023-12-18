import { MetadataRoute } from "next"
import { allPosts } from "contentlayer/generated"

const blogRoutes: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_URL}/${post._raw.flattenedPath}`,
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
