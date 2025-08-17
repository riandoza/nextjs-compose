"use client"

import React, { ChangeEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

export const LoginForm = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState("")

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/apps/profile"

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError("")

            const res = await signIn("credentials", {
                redirect: false,
                email: formValues.email,
                password: formValues.password,
                callbackUrl,
            })

            setFormValues({ email: "", password: "" })

            setLoading(false)

            if (!res?.error) {
                router.push(callbackUrl)
            } else {
                setError("invalid email or password")
            }
        } catch (error: any) {
            setLoading(false)
            setError(error)
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormValues({ ...formValues, [name]: value })
    }

    const input_style =
        "form-control block w-full px-4 py-5 text-sm font-normal bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-300 focus:border-blue-600 focus:outline-none grow-[4] rounded-l-lg border-0 bg-gray-900 text-gray-100 placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400"

    return (
        <form onSubmit={onSubmit}>
            {error && <p className="mb-6 rounded bg-red-300 py-4 text-center">{error}</p>}
            <div className="mb-6">
                <input
                    required
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`${input_style}`}
                />
            </div>
            <div className="mb-6">
                <input
                    required
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`${input_style}`}
                />
            </div>
            <button
                type="submit"
                style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
                className="inline-block w-full rounded bg-blue-600 px-7 py-4 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                disabled={loading}
            >
                {loading ? "loading..." : "Sign In"}
            </button>
        </form>
    )
}
