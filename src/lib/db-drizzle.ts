// Database utility functions for Drizzle ORM
import { db } from '@/db/connection';
import { users, posts, pages } from '@/db/schema';
import { eq, desc, and, count, sql } from 'drizzle-orm';
import type { User, Post, Page, NewUser, NewPost, NewPage } from '@/db/schema';

// User operations
export async function createUser(userData: NewUser): Promise<User> {
  const [user] = await db.insert(users).values(userData).returning();
  return user;
}

export async function getUserById(id: string): Promise<User | null> {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user || null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return user || null;
}

export async function getAllUsers() {
  return await db.query.users.findMany({
    orderBy: desc(users.createdAt),
  });
}

export async function getUsersWithCounts() {
  return await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      isActive: users.isActive,
      createdAt: users.createdAt,
      postCount: count(posts.id),
    })
    .from(users)
    .leftJoin(posts, eq(users.id, posts.authorId))
    .groupBy(users.id)
    .orderBy(desc(users.createdAt));
}

// Post operations
export async function createPost(postData: NewPost): Promise<Post> {
  const [post] = await db.insert(posts).values(postData).returning();
  return post;
}

export async function getPostById(id: string): Promise<Post | null> {
  const [post] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return post || null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const cleanSlug = slug.replace(/^\/posts\//, '');
  const [post] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, cleanSlug), eq(posts.published, true)))
    .limit(1);
  return post || null;
}

export async function getAllPosts() {
  return await db.query.posts.findMany({
    where: eq(posts.published, true),
    orderBy: desc(posts.publishedAt),
    with: {
      author: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function getPostsForAdmin() {
  return await db.query.posts.findMany({
    orderBy: desc(posts.updatedAt),
    with: {
      author: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function updatePost(id: string, postData: Partial<NewPost>): Promise<Post> {
  const [post] = await db
    .update(posts)
    .set({ ...postData, updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning();
  return post;
}

export async function deletePost(id: string): Promise<void> {
  await db.delete(posts).where(eq(posts.id, id));
}

// Page operations
export async function createPage(pageData: NewPage): Promise<Page> {
  const [page] = await db.insert(pages).values(pageData).returning();
  return page;
}

export async function getPageById(id: string): Promise<Page | null> {
  const [page] = await db.select().from(pages).where(eq(pages.id, id)).limit(1);
  return page || null;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const cleanSlug = slug.replace(/^\//, '');
  const [page] = await db
    .select()
    .from(pages)
    .where(and(eq(pages.slug, cleanSlug), eq(pages.published, true)))
    .limit(1);
  return page || null;
}

export async function getAllPages() {
  return await db.query.pages.findMany({
    where: eq(pages.published, true),
    orderBy: desc(pages.updatedAt),
    with: {
      author: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function getPagesForAdmin() {
  return await db.query.pages.findMany({
    orderBy: desc(pages.updatedAt),
    with: {
      author: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function updatePage(id: string, pageData: Partial<NewPage>): Promise<Page> {
  const [page] = await db
    .update(pages)
    .set({ ...pageData, updatedAt: new Date() })
    .where(eq(pages.id, id))
    .returning();
  return page;
}

export async function deletePage(id: string): Promise<void> {
  await db.delete(pages).where(eq(pages.id, id));
}

// Statistics functions
export async function getDashboardStats() {
  const [userStats] = await db
    .select({ count: count(users.id) })
    .from(users);

  const [postStats] = await db
    .select({ count: count(posts.id) })
    .from(posts);

  const [publishedPostStats] = await db
    .select({ count: count(posts.id) })
    .from(posts)
    .where(eq(posts.published, true));

  const [pageStats] = await db
    .select({ count: count(pages.id) })
    .from(pages);

  return {
    totalUsers: userStats.count,
    totalPosts: postStats.count,
    publishedPosts: publishedPostStats.count,
    totalPages: pageStats.count,
  };
}