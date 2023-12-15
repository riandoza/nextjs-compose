import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl: string = `${process.env.NEXT_PUBLIC_URL}`;
  const routes = [""].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  //return [...routes, ...blogRoutes]
  // return [...routes]
  return [...routes];
}
