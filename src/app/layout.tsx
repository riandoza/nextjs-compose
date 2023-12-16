import Head from "@/app/head";
import { NextAuthProvider } from "@/app/providers";
import ToastProvider from "@/app/toast.provider";
import Header from "@/components/header.component";
import Navbar from "@/components/navbar-component";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

const siteUrl: string = `${process.env.NEXT_PUBLIC_URL}`;
const siteName: string = `${process.env.NEXT_PUBLIC_SITENAME}`;
const publishedAt: string = "2023-11-01T00:00:00.000Z";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id" className="dark" suppressHydrationWarning>
            <Head />
            <body
                className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
            >
                <div className="max-w-screen-xl mx-auto relative top-24">
                    <NextAuthProvider>
                        <Navbar />
                        <ToastProvider>{children}</ToastProvider>
                    </NextAuthProvider>
                </div>
            </body>
        </html>
    );
}
