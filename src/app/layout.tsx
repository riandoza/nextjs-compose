import React from "react"
import { Inter } from "next/font/google"

import { MainNav } from "@/components/MainNav"
import Navbar from "@/components/Navbar"
import Head from "@/app/head"
import { NextAuthProvider } from "@/app/providers"
import ToastProvider from "@/app/toast.provider"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="id" className="dark" suppressHydrationWarning>
            <Head />
            <body
                className={`min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50 ${inter.className}`}
            >
                <div className="relative top-24 mx-auto max-w-screen-xl">
                    <NextAuthProvider>
                        <header className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
                            <Navbar />
                        </header>

                        {/* <MainNav /> */}
                        <ToastProvider>{children}</ToastProvider>
                    </NextAuthProvider>
                </div>
            </body>
        </html>
    )
}
