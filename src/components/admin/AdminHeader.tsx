"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

export default function AdminHeader() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-800">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden dark:text-gray-400"
        onClick={() => setMobileMenuOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden dark:bg-gray-700" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Profile section */}
          <div className="flex items-center gap-x-2">
            <div className="hidden lg:flex lg:flex-col lg:items-end lg:leading-6">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {session?.user?.name}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {session?.user?.role}
              </div>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}