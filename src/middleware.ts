import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

import { getErrorResponse } from "./lib/helpers"

export default async function middleware(request: NextRequest) {
    const token = await getToken({ 
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })

    const isIndexpage = request.nextUrl.pathname === "/"
    const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
    const isAdminRoute = adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
    const isGuestRoute = guestRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

    if (!token && (isAuthRoute || isAdminRoute)) {
        if (request.nextUrl.pathname.startsWith("/api")) {
            return getErrorResponse(401, "Token is invalid or user doesn't exists")
        }
        const redirectUrl = new URL("/login", request.url)
        redirectUrl.searchParams.set("callbackUrl", request.nextUrl.href)
        return NextResponse.redirect(redirectUrl)
    }

    // Check admin access
    if (token && isAdminRoute) {
        const userRole = token.role as string
        const isActive = token.isActive as boolean
        
        if (!isActive) {
            if (request.nextUrl.pathname.startsWith("/api")) {
                return getErrorResponse(403, "Account is inactive")
            }
            return NextResponse.redirect(new URL("/login", request.url))
        }
        
        if (userRole !== "ADMIN" && userRole !== "SUPER_ADMIN") {
            if (request.nextUrl.pathname.startsWith("/api")) {
                return getErrorResponse(403, "Admin access required")
            }
            return NextResponse.redirect(new URL("/apps/profile", request.url))
        }
    }

    if (token) {
        if (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")) {
            return NextResponse.redirect(new URL("/apps/domain", request.url))
        }
    }

    return NextResponse.next()
}

const authRoutes = ["/apps/profile", "/api/session"]
const adminRoutes = ["/admin", "/api/admin"]
const guestRoutes = ["/", "/login", ""]

export const config = {
    matcher: [
        "/api/:path*",
        "/apps/:path*",
        "/admin/:path*"
    ],
}
