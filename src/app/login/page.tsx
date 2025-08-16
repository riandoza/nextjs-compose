import { Suspense } from "react"
import { LoginForm } from "./form"

export default function LoginPage() {
    return (
        <>
            <section className="bg-ct-blue-600 min-h-screen pt-20">
                <div className="container mx-auto h-full items-center justify-center px-6 py-12 lg:flex">
                    <div className="px-8 py-10 md:w-8/12 lg:w-5/12">
                        <Suspense fallback={<div>Loading...</div>}>
                            <LoginForm />
                        </Suspense>
                    </div>
                </div>
            </section>
        </>
    )
}
