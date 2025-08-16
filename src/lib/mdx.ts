import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

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

function getContentFiles(dir: string, extension: string): string[] {
  const fullPath = path.join(contentDirectory, dir)
  if (!fs.existsSync(fullPath)) {
    return []
  }
  return fs.readdirSync(fullPath)
    .filter(file => file.endsWith(extension))
    .map(file => path.join(dir, file))
}

function parseContentFile(filePath: string): any {
  const fullPath = path.join(contentDirectory, filePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const slug = `/${filePath.replace(/\.mdx?$/, '')}`
  const _id = filePath.replace(/\.mdx?$/, '').replace(/\//g, '-')
  
  return {
    ...data,
    content,
    slug,
    _id,
  }
}

export function getAllPosts(): Post[] {
  const postFiles = getContentFiles('posts', '.mdx')
  return postFiles
    .map(parseContentFile)
    .filter(post => post.title && post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllPages(): Page[] {
  const pageFiles = getContentFiles('pages', '.mdx')
  return pageFiles
    .map(parseContentFile)
    .filter(page => page.title)
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export function getPageBySlug(slug: string): Page | null {
  const pages = getAllPages()
  return pages.find(page => page.slug === slug) || null
}

// Export collections for compatibility
export const allPosts = getAllPosts()
export const allPages = getAllPages()