import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcryptjs"
import NextAuth, { CookiesOptions, type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { prisma } from "@/lib/prisma"

const cookies: Partial<CookiesOptions> = {
    sessionToken: {
        name: `${process.env.ACCESS_TOKEN}`,
        options: {
            httpOnly: true,
            sameSite: "none",
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

export const authOptions: NextAuthOptions = {
    // This is a temporary fix for prisma client.
    // @see https://github.com/prisma/prisma/issues/16117
    adapter: PrismaAdapter(prisma as any),
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    cookies: cookies,
    providers: [
        CredentialsProvider({
            name: "Sign in",
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

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                })

                if (!user || !(await compare(credentials.password, user.password!))) {
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    randomKey: "Hey cool",
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
                    id: token.id,
                    randomKey: token.randomKey,
                },
            }
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey,
                }
            }
            return token
        },
    },
}

export default NextAuth(authOptions)
