import Header from "@/components/header.component";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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

    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) return redirect("/api/auth/signin");
    return (
        <>
            <Header />
            <section className="bg-ct-blue-600  min-h-screen pt-20">
                <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
                    <div>
                        <p className="mb-3 text-5xl text-center font-semibold">
                            Profile Page
                        </p>
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
    );
}