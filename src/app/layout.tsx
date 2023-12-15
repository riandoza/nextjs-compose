import Head from "@/app/head";
import { NextAuthProvider } from "@/app/providers";
import ToastProvider from "@/app/toast.provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: `${process.env["NEXT_PUBLIC_TITLE"]}`,
    description: `${process.env["NEXT_PUBLIC_EXCERPT"]}`,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id" className="dark" suppressHydrationWarning>
            <Head />
            <body className={inter.className}>
                <NextAuthProvider>
                    <ToastProvider>{children}</ToastProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}
