import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"

export async function GET(request: Request) {
    const session = await auth()

    if (!session) {
        return new NextResponse(JSON.stringify({ status: "fail", message: "You are not logged in" }), { status: 401 })
    }

    return NextResponse.json({
        authenticated: !!session,
        session,
    })
}

export const runtime = "nodejs"
