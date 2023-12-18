"use client"

import Link from "next/link"
import { signIn, signOut } from "next-auth/react"

export const LoginButton = () => {
    return (
        <button style={{ marginRight: 10 }} onClick={() => signIn()}>
            Sign in
        </button>
    )
}

export const RegisterButton = () => {
    return (
        <Link href="/register" style={{ marginRight: 10 }}>
            Register
        </Link>
    )
}

export const LogoutButton = () => {
    return (
        <button style={{ marginRight: 10 }} onClick={() => signOut()}>
            Sign Out
        </button>
    )
}

export const ProfileButton = () => {
    return <Link href="/apps/profile">Profile</Link>
}
