const { PrismaClient } = require("./prisma/.prisma/client")
const { hash } = require("bcryptjs")

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create admin user
  const adminPassword = await hash("admin123", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
      isActive: true,
    },
  })

  // Create regular user
  const userPassword = await hash("user123", 12)
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com", 
      name: "Test User",
      password: userPassword,
      role: "USER",
      isActive: true,
    },
  })

  // Create sample posts
  const posts = [
    {
      title: "Deploying Next.js Apps",
      slug: "deploying-next-apps",
      description: "Learn how to deploy Next.js applications to various platforms.",
      content: `# Deploying Next.js Apps

Next.js applications can be deployed to various platforms including Vercel, Netlify, and traditional hosting providers.

## Vercel Deployment

Vercel offers the simplest deployment experience for Next.js apps:

1. Connect your GitHub repository
2. Configure build settings
3. Deploy with zero configuration

## Self-hosted Options

For more control, you can deploy to your own infrastructure:

- Docker containers
- Traditional VPS
- Cloud providers like AWS, Google Cloud, or Azure

The key is understanding Next.js output modes and optimizing for your target environment.`,
      published: true,
      publishedAt: new Date("2023-12-01"),
      authorId: admin.id,
    },
    {
      title: "Dynamic Routing & Static Regeneration",
      slug: "dynamic-routing-static-regeneration",
      description: "Understanding dynamic routing and ISR in Next.js.",
      content: `# Dynamic Routing & Static Regeneration

Next.js provides powerful routing capabilities with dynamic routes and Incremental Static Regeneration (ISR).

## Dynamic Routes

Create dynamic pages using file-based routing:

\`\`\`
pages/posts/[slug].js
pages/posts/[...slug].js
\`\`\`

## Static Regeneration

ISR allows you to update static pages after build time:

\`\`\`javascript
export async function getStaticProps() {
  return {
    props: { data },
    revalidate: 60, // Revalidate every 60 seconds
  }
}
\`\`\`

This combines the benefits of static generation with dynamic content updates.`,
      published: true,
      publishedAt: new Date("2023-11-15"),
      authorId: admin.id,
    },
    {
      title: "Preview Mode for Headless CMS",
      slug: "preview-mode-headless-cms",
      description: "Implementing preview mode with headless CMS.",
      content: `# Preview Mode for Headless CMS

Preview mode allows content creators to see unpublished content before it goes live.

## Setting Up Preview Mode

Enable preview mode in your API routes:

\`\`\`javascript
export default function handler(req, res) {
  res.setPreviewData({})
  res.redirect('/preview-page')
}
\`\`\`

## CMS Integration

Most headless CMS platforms support preview URLs:

- Contentful
- Strapi  
- Sanity
- Ghost

Configure webhook URLs to trigger preview mode when content is updated in your CMS.`,
      published: true, 
      publishedAt: new Date("2023-11-01"),
      authorId: admin.id,
    },
    {
      title: "Server vs Client Components",
      slug: "server-client-components",
      description: "Understanding the difference between server and client components.",
      content: `# Server vs Client Components

Next.js 13+ introduces the App Router with server and client components.

## Server Components

Server components run on the server and can:

- Access databases directly
- Keep sensitive data secure
- Reduce client bundle size
- Improve SEO

## Client Components

Client components run in the browser and enable:

- Interactivity and event handlers
- Browser-only APIs
- State management
- Real-time updates

## Choosing the Right Component

Default to server components and only use client components when you need browser-specific features.`,
      published: true,
      publishedAt: new Date("2023-10-15"), 
      authorId: admin.id,
    },
  ]

  for (const postData of posts) {
    await prisma.post.upsert({
      where: { slug: postData.slug },
      update: {},
      create: postData,
    })
  }

  // Create sample pages
  const pages = [
    {
      title: "About",
      slug: "about",
      description: "Learn more about this project.",
      content: `# About

This is a Next.js 15 application with Docker Compose support, featuring:

- **Modern Architecture**: Built with Next.js 15, React 18, and TypeScript
- **Authentication**: NextAuth.js with role-based access control
- **Database**: Prisma ORM with SQLite
- **Admin Panel**: Full-featured content management system
- **Styling**: Tailwind CSS with Shadcn/UI components
- **Development**: Docker Compose for development and production

## Features

- User authentication and authorization
- Admin panel for content management
- Blog posts and static pages
- SEO optimization
- Dark mode support
- Responsive design

## Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Backend**: NextAuth.js, Prisma ORM
- **Database**: SQLite (easily configurable for PostgreSQL/MySQL)
- **Deployment**: Docker, Docker Compose

This project serves as a starting point for modern web applications requiring authentication, content management, and scalable architecture.`,
      published: true,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  ]

  for (const pageData of pages) {
    await prisma.page.upsert({
      where: { slug: pageData.slug },
      update: {},
      create: pageData,
    })
  }

  console.log("✅ Database seeded successfully!")
  console.log("👤 Admin user: admin@example.com / admin123")
  console.log("👤 Test user: user@example.com / user123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })