import Link from "next/link"
import { getPostsForAdmin } from "@/lib/db-drizzle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

async function getPosts() {
  return await getPostsForAdmin()
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Posts
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage blog posts and articles
          </p>
        </div>
        <Link href="/admin/posts/new">
          <Button>Create New Post</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                No posts yet
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Get started by creating your first post.
              </p>
              <Link href="/admin/posts/new" className="mt-4">
                <Button>Create New Post</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    {post.description && (
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {post.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.published
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div>
                    <span>By {post.author.name}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : 'Unknown'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/admin/posts/${post.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    {post.published && (
                      <Link href={post.slug} target="_blank">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}