import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { compare } from "bcryptjs"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { db } from "@/db/connection"
import { getUserByEmail } from "@/lib/db-drizzle"

const cookies = {
    sessionToken: {
        name: `${process.env.ACCESS_TOKEN}`,
        options: {
            httpOnly: true,
            sameSite: "none" as const,
            path: "/",
            domain: process.env.NEXT_PUBLIC_DOMAIN,
            secure: true,
        },
    },
}

// export const config = {
//     providers: [], // rest of your config
// } satisfies NextAuthOptions;

// export function auth(
//     ...args:
//         | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
//         | [NextApiRequest, NextApiResponse]
//         | []
// ) {
//     return getServerSession(...args, config);
// }

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    cookies: cookies,
    trustHost: true,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null
                }

                const user = await getUserByEmail(credentials.email as string)

                if (!user || !user.password || !(await compare(credentials.password as string, user.password))) {
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    isActive: user.isActive,
                }
            },
        }),
    ],

    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string,
                    role: token.role as string,
                    isActive: token.isActive as boolean,
                },
            }
        },
        jwt: ({ token, user }) => {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    role: user.role,
                    isActive: user.isActive,
                }
            }
            return token
        },
    },
})
