import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getErrorResponse } from "./lib/helpers";
export default withAuth(
    async function middleware(request) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
            cookieName: process.env.ACCESS_TOKEN,
        });
        //console.log(request.nextauth.token);
        //console.log(request.cookies.get("next-auth.session-token"));
        const isIndexpage = request.nextUrl.pathname === "/";
        const isAuthRoute = authRoutes.some((route) =>
            request.nextUrl.pathname.startsWith(route)
        );
        // const isVerifyRoute = verifyRoutes.some((route) =>
        //     request.nextUrl.pathname.startsWith(route)
        // );
        const isGuestRoute = guestRoutes.some((route) =>
            request.nextUrl.pathname.startsWith(route)
        );

        if (!token && isAuthRoute) {
            if (request.nextUrl.pathname.startsWith("/api")) {
                return getErrorResponse(
                    401,
                    "Token is invalid or user doesn't exists"
                );
            }
            const redirectUrl = new URL("/login", request.url);
            redirectUrl.searchParams.set("callbackUrl", request.nextUrl.href);
            return NextResponse.redirect(redirectUrl);
        }

        //const response = NextResponse.next();

        if (token) {
            if (
                request.nextUrl.pathname.startsWith("/login") ||
                request.nextUrl.pathname.startsWith("/register")
            ) {
                return NextResponse.redirect(
                    new URL("/apps/domain", request.url)
                );
            }

            //     // if (!token.email_verified_at && !isVerifyRoute) {
            //     //     return NextResponse.redirect(
            //     //         new URL("/request-email-verification", request.url)
            //     //     );
            //     // }
            //     // if (isIndexpage || isGuestRoute || isVerifyRoute) {
            //     //     return NextResponse.redirect(
            //     //         new URL("/apps/domain", request.url)
            //     //     );
            //     // }
        }
    },
    {
        callbacks: {
            async authorized({ req, token }) {
                //console.log(token);
                return true;
            },
        },
    }
);

const authRoutes = ["/apps/dashboard", "/apps/profile", "/api/session"];
//const verifyRoutes: string[] = [];
const guestRoutes = ["/", "/login", ""];

// export const config = {
//     matcher: [
//         "/api/:path*",
//         "/apps/:path*",
//     ],
// };
