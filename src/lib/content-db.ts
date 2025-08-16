// Database-driven content system to replace static content
import { eq, desc } from "drizzle-orm"
import { db } from "@/db/connection"
import { posts, pages } from "@/db/schema"
import type { Post as DbPost, Page as DbPage } from "@/db/schema"

export interface Post {
  slug: string
  title: string
  description?: string | null
  date: string
  content: string
  _id: string
  published: boolean
}

export interface Page {
  slug: string
  title: string
  description?: string | null
  content: string
  _id: string
  published: boolean
}

export async function getAllPosts(): Promise<Post[]> {
  const dbPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt))

  return dbPosts.map((post: DbPost) => ({
    slug: `/posts/${post.slug}`,
    title: post.title,
    description: post.description,
    date: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    content: post.content,
    _id: post.id,
    published: post.published,
  }))
}

export async function getAllPages(): Promise<Page[]> {
  const dbPages = await db
    .select()
    .from(pages)
    .where(eq(pages.published, true))
    .orderBy(desc(pages.updatedAt))

  return dbPages.map((page: DbPage) => ({
    slug: `/${page.slug}`,
    title: page.title,
    description: page.description,
    content: page.content,
    _id: page.id,
    published: page.published,
  }))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const result = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1)

  const post = result[0]
  if (!post) return null

  return {
    slug: `/posts/${post.slug}`,
    title: post.title,
    description: post.description,
    date: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    content: post.content,
    _id: post.id,
    published: post.published,
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const result = await db
    .select()
    .from(pages)
    .where(eq(pages.slug, slug))
    .limit(1)

  const page = result[0]
  if (!page) return null

  return {
    slug: `/${page.slug}`,
    title: page.title,
    description: page.description,
    content: page.content,
    _id: page.id,
    published: page.published,
  }
}