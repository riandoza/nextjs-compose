"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface PostFormProps {
  action: (formData: FormData) => Promise<void>
  initialData?: {
    title?: string
    description?: string
    content?: string
    published?: boolean
  }
}

export default function PostForm({ action, initialData }: PostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      await action(formData)
    } catch (error) {
      console.error("Error submitting form:", error)
    }
    setIsSubmitting(false)
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>Post Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={initialData?.title}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter post title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              defaultValue={initialData?.description}
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Brief description of the post"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <textarea
              id="content"
              name="content"
              defaultValue={initialData?.content}
              required
              rows={15}
              className="flex min-h-[400px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Write your post content here... (supports Markdown)"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch 
              id="published" 
              name="published"
              defaultChecked={initialData?.published}
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}