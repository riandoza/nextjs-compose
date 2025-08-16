import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export default async function Profile() {
    // const { status } = useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         redirect("/api/auth/signin");
    //     },
    // });

    // if (status === "loading") {
    //     return <p>Loading....</p>;
    // }

    const session = await auth()
    const user = session?.user
    if (!user) return redirect("/api/auth/signin")
    return (
        <>
            <section className="bg-ct-blue-600  min-h-screen pt-20">
                <div className="bg-ct-dark-100 mx-auto flex h-[20rem] max-w-4xl items-center justify-center rounded-md">
                    <div>
                        <p className="mb-3 text-center text-5xl font-semibold">Profile Page</p>
                        {!user ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="flex items-center gap-8">
                                <div className="mt-8">
                                    <p className="mb-3">Name: {user.name}</p>
                                    <p className="mb-3">Email: {user.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
