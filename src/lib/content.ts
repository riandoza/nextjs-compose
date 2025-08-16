// Static content data - generated at build time

export interface Post {
  slug: string
  title: string
  description?: string
  date: string
  content: string
  _id: string
}

export interface Page {
  slug: string
  title: string
  description?: string
  content: string
  _id: string
}

// Mock data for now - this will be replaced with actual content from MDX files
export const allPosts: Post[] = [
  {
    slug: '/posts/deploying-next-apps',
    title: 'Deploying Next.js Apps',
    description: 'Learn how to deploy Next.js applications to various platforms.',
    date: '2023-12-01',
    content: 'Content for deploying Next.js apps...',
    _id: 'posts-deploying-next-apps'
  },
  {
    slug: '/posts/dynamic-routing-static-regeneration',
    title: 'Dynamic Routing & Static Regeneration',
    description: 'Understanding dynamic routing and ISR in Next.js.',
    date: '2023-11-15',
    content: 'Content about dynamic routing...',
    _id: 'posts-dynamic-routing-static-regeneration'
  },
  {
    slug: '/posts/preview-mode-headless-cms',
    title: 'Preview Mode for Headless CMS',
    description: 'Implementing preview mode with headless CMS.',
    date: '2023-11-01',
    content: 'Content about preview mode...',
    _id: 'posts-preview-mode-headless-cms'
  },
  {
    slug: '/posts/server-client-components',
    title: 'Server vs Client Components',
    description: 'Understanding the difference between server and client components.',
    date: '2023-10-15',
    content: 'Content about server and client components...',
    _id: 'posts-server-client-components'
  }
]

export const allPages: Page[] = [
  {
    slug: '/about',
    title: 'About',
    description: 'Learn more about this project.',
    content: 'About page content...',
    _id: 'pages-about'
  }
]

export function getPostBySlug(slug: string): Post | null {
  return allPosts.find(post => post.slug === slug) || null
}

export function getPageBySlug(slug: string): Page | null {
  return allPages.find(page => page.slug === slug) || null
}