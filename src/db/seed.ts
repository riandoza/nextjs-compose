import { hash } from "bcryptjs"
import { db } from './connection'
import { users, posts, pages } from './schema'

async function main() {
  console.log('🌱 Starting Drizzle seeding...')

  try {
    // Create admin user
    const hashedPassword = await hash('password123', 12)
    
    const [adminUser] = await db
      .insert(users)
      .values({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      })
      .returning()

    console.log('✅ Created admin user:', adminUser.email)

    // Create sample user
    const userPassword = await hash('user123', 12)
    
    const [sampleUser] = await db
      .insert(users)
      .values({
        name: 'Sample User',
        email: 'user@example.com',
        password: userPassword,
        role: 'USER',
        isActive: true,
      })
      .returning()

    console.log('✅ Created sample user:', sampleUser.email)

    // Create sample posts
    const postsToCreate = [
      {
        title: 'Welcome to the New Site',
        slug: 'welcome-to-the-new-site',
        description: 'This is our first blog post with the new CMS system.',
        content: `# Welcome to the New Site

This is our first blog post with the new CMS system. We're excited to share more content with you soon!

## Features

- Modern design
- Fast performance
- Easy content management
- SEO optimized

Thank you for visiting!`,
        published: true,
        authorId: adminUser.id,
        publishedAt: new Date(),
      },
      {
        title: 'Getting Started Guide',
        slug: 'getting-started-guide',
        description: 'Learn how to use all the features of our platform.',
        content: `# Getting Started Guide

Welcome to our platform! This guide will help you get started quickly.

## Step 1: Create an Account

First, you'll need to create an account...

## Step 2: Set Up Your Profile

Once you have an account...

## Step 3: Start Creating

Now you're ready to start creating content!`,
        published: true,
        authorId: sampleUser.id,
        publishedAt: new Date(),
      },
      {
        title: 'Draft Post Example',
        slug: 'draft-post-example',
        description: 'This is an example of a draft post.',
        content: `# Draft Post Example

This post is still being worked on and isn't published yet.

## TODO
- [ ] Add more content
- [ ] Review and edit
- [ ] Add images
- [ ] Publish when ready`,
        published: false,
        authorId: adminUser.id,
      },
    ]

    for (const postData of postsToCreate) {
      const [post] = await db.insert(posts).values(postData).returning()
      console.log('✅ Created post:', post.title)
    }

    // Create sample pages
    const pagesToCreate = [
      {
        title: 'About Us',
        slug: 'about',
        description: 'Learn more about our company and mission.',
        content: `# About Us

We are a team of passionate developers and designers creating amazing web experiences.

## Our Mission

To build modern, fast, and accessible web applications that users love.

## Our Team

Our diverse team brings together expertise in:
- Frontend development
- Backend systems
- UI/UX design
- DevOps and infrastructure

## Contact Us

Feel free to reach out if you have any questions!`,
        published: true,
        authorId: adminUser.id,
        publishedAt: new Date(),
      },
      {
        title: 'Privacy Policy',
        slug: 'privacy',
        description: 'Our privacy policy and data handling practices.',
        content: `# Privacy Policy

Last updated: ${new Date().toLocaleDateString()}

## Information We Collect

We collect information you provide directly to us...

## How We Use Your Information

We use the information we collect to...

## Information Sharing

We do not sell, trade, or otherwise transfer your information...

## Data Security

We implement appropriate security measures...

## Contact Information

If you have questions about this privacy policy, please contact us.`,
        published: true,
        authorId: adminUser.id,
        publishedAt: new Date(),
      },
    ]

    for (const pageData of pagesToCreate) {
      const [page] = await db.insert(pages).values(pageData).returning()
      console.log('✅ Created page:', page.title)
    }

    console.log('🌱 Drizzle seeding completed successfully!')
    
    console.log('\n📊 Seeded data summary:')
    console.log('- 2 users (1 admin, 1 regular user)')
    console.log('- 3 posts (2 published, 1 draft)')
    console.log('- 2 pages (both published)')
    console.log('\n🔑 Login credentials:')
    console.log('Admin: admin@example.com / password123')
    console.log('User: user@example.com / user123')

  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  main()
    .catch(console.error)
    .finally(() => {
      process.exit(0)
    })
}

export { main as seedDatabase }