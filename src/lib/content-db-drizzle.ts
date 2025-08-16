// Database-driven content system using Drizzle ORM
import { db } from '@/db/connection';
import { posts, pages } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export interface Post {
  slug: string;
  title: string;
  description?: string | null;
  date: string;
  content: string;
  _id: string;
  published: boolean;
}

export interface Page {
  slug: string;
  title: string;
  description?: string | null;
  content: string;
  _id: string;
  published: boolean;
}

export async function getAllPosts(): Promise<Post[]> {
  const allPosts = await db.query.posts.findMany({
    where: eq(posts.published, true),
    orderBy: desc(posts.publishedAt),
  });

  return allPosts.map(post => ({
    slug: `/posts/${post.slug}`,
    title: post.title,
    description: post.description,
    date: post.publishedAt?.toISOString() || post.createdAt?.toISOString() || new Date().toISOString(),
    content: post.content,
    _id: post.id,
    published: post.published,
  }));
}

export async function getAllPages(): Promise<Page[]> {
  const allPages = await db.query.pages.findMany({
    where: eq(pages.published, true),
    orderBy: desc(pages.updatedAt),
  });

  return allPages.map(page => ({
    slug: `/${page.slug}`,
    title: page.title,
    description: page.description,
    content: page.content,
    _id: page.id,
    published: page.published,
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Remove /posts/ prefix if present
  const postSlug = slug.replace(/^\/posts\//, '');
  
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, postSlug))
    .limit(1);

  if (!post || !post.published) return null;

  return {
    slug: `/posts/${post.slug}`,
    title: post.title,
    description: post.description,
    date: post.publishedAt?.toISOString() || post.createdAt?.toISOString() || new Date().toISOString(),
    content: post.content,
    _id: post.id,
    published: post.published,
  };
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  // Remove leading slash if present
  const pageSlug = slug.replace(/^\//, '');
  
  const [page] = await db
    .select()
    .from(pages)
    .where(eq(pages.slug, pageSlug))
    .limit(1);

  if (!page || !page.published) return null;

  return {
    slug: `/${page.slug}`,
    title: page.title,
    description: page.description,
    content: page.content,
    _id: page.id,
    published: page.published,
  };
}

// For backwards compatibility, export as allPosts and allPages
// Note: These will need to be called as functions in the components
export const allPosts = getAllPosts();
export const allPages = getAllPages();