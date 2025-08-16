// Database-driven content system to replace static content
import { prisma } from "./prisma"

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
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
  })

  return posts.map(post => ({
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
  const pages = await prisma.page.findMany({
    where: {
      published: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return pages.map(page => ({
    slug: `/${page.slug}`,
    title: page.title,
    description: page.description,
    content: page.content,
    _id: page.id,
    published: page.published,
  }))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Remove /posts/ prefix if present
  const postSlug = slug.replace(/^\/posts\//, '')
  
  const post = await prisma.post.findUnique({
    where: {
      slug: postSlug,
      published: true,
    },
  })

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
  // Remove leading slash if present
  const pageSlug = slug.replace(/^\//, '')
  
  const page = await prisma.page.findUnique({
    where: {
      slug: pageSlug,
      published: true,
    },
  })

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

// For backwards compatibility, export as allPosts and allPages
// Note: These will need to be called as functions in the components
export const allPosts = getAllPosts()
export const allPages = getAllPages()