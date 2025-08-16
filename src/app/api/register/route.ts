import { NextResponse } from "next/server"
import { hash } from "bcryptjs"

import { createUser } from "@/lib/db-drizzle"

export async function POST(req: Request) {
    try {
        const { name, email, password } = (await req.json()) as {
            name: string
            email: string
            password: string
        }
        const hashed_password = await hash(password, 12)

        const user = await createUser({
            name,
            email: email.toLowerCase(),
            password: hashed_password,
        })

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
            },
        })
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        )
    }
}

export const runtime = "nodejs"
