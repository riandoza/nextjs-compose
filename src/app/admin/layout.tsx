import { redirect } from "next/navigation"
import { Suspense } from "react"

import { requireAdmin } from "@/lib/auth-utils"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    await requireAdmin()
  } catch (error) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}