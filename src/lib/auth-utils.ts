import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN"

export interface ExtendedUser {
  id: string
  email?: string | null
  name?: string | null
  role: UserRole
  isActive: boolean
}

export async function getServerAuthSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser(): Promise<ExtendedUser | null> {
  const session = await getServerAuthSession()
  return session?.user ? (session.user as ExtendedUser) : null
}

export async function requireAuth(): Promise<ExtendedUser> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}

export async function requireAdmin(): Promise<ExtendedUser> {
  const user = await requireAuth()
  if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    throw new Error("Admin access required")
  }
  if (!user.isActive) {
    throw new Error("Account is inactive")
  }
  return user
}

export async function requireSuperAdmin(): Promise<ExtendedUser> {
  const user = await requireAuth()
  if (user.role !== "SUPER_ADMIN") {
    throw new Error("Super admin access required")
  }
  if (!user.isActive) {
    throw new Error("Account is inactive")
  }
  return user
}

export function isAdmin(user: ExtendedUser | null): boolean {
  return user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
}

export function isSuperAdmin(user: ExtendedUser | null): boolean {
  return user?.role === "SUPER_ADMIN"
}

export function hasAdminAccess(user: ExtendedUser | null): boolean {
  return user ? isAdmin(user) && user.isActive : false
}