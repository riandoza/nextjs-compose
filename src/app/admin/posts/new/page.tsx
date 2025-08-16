import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth-utils"
import { createPost as createPostDb } from "@/lib/db-drizzle"
import PostForm from "@/components/admin/PostForm"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

async function createPost(formData: FormData) {
  "use server"
  
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not authenticated")
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "on"

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  const post = await createPostDb({
    title,
    slug,
    description,
    content,
    published,
    publishedAt: published ? new Date() : null,
    authorId: user.id,
  })

  redirect(`/admin/posts/${post.id}`)
}

export default async function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create New Post
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Fill in the details below to create a new blog post.
        </p>
      </div>

      <PostForm action={createPost} />
    </div>
  )
}