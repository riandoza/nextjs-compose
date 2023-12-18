"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { cn } from "@/lib/utils"

import Logo from "./logo"
import NavItem from "./NavItem"
import { Button, buttonVariants } from "./ui/button"
import { toast } from "./ui/use-toast"

export default function Navbar() {
    const { data: session } = useSession()
    const [state, setState] = React.useState(false)
    const [navActive, setNavActive] = useState<true | false>(false)
    const [activeIdx, setActiveIdx] = useState(-1)
    const menus = [
        { title: "Home", path: "/" },
        { title: "Blog", path: "/posts" },
        { title: "About", path: "/about" },
        { title: "Pokemon", path: "/pokemon" },
    ]
    const user = session?.user

    return (
        <nav className="nav mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <Logo />
            <div className="flex items-center justify-between md:block md:py-5">
                <div className="md:hidden">
                    <Button
                        variant="outline"
                        className="text-gray-1x00 rounded-md p-2 outline-none focus:border focus:border-gray-400"
                        onClick={() => setState(!state)}
                    >
                        <Menu />
                    </Button>
                </div>
            </div>
            <div
                className={`w-full items-center justify-between pb-3 md:order-1 md:mt-0 md:block md:w-auto md:pb-0 ${
                    state ? "block" : "hidden"
                }`}
            >
                <ul className="items-center justify-center space-y-4 md:flex md:space-x-6 md:space-y-0 ">
                    {menus.map((item, idx) => (
                        <li
                            onClick={() => {
                                setActiveIdx(idx)
                                setNavActive(false)
                                setState(!state)
                            }}
                            key={idx}
                            className="text-gray-100 hover:text-indigo-600"
                        >
                            <NavItem active={activeIdx === idx} {...item} />
                        </li>
                    ))}
                    {/* <form className="flex items-center  space-x-2 rounded-md border p-2">
                        <Search className="h-5 w-5 flex-none text-gray-300" />
                        <input
                            className="w-full appearance-none text-gray-500 placeholder-gray-500 outline-none sm:w-auto"
                            type="text"
                            placeholder="Search"
                        />
                    </form> */}
                    {user && (
                        <>
                            <Button
                                onClick={() => signOut()}
                                className="cursor-pointer rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Logout <span aria-hidden="true">&rarr;</span>
                            </Button>
                        </>
                    )}
                    <Link
                        className={buttonVariants({ variant: "outline" })}
                        href={""}
                        onClick={() => {
                            toast({
                                title: "Scheduled: Catch up",
                                description: "Friday, February 10, 2023 at 5:57 PM",
                            })
                        }}
                    >
                        Action
                    </Link>
                </ul>
            </div>
        </nav>
    )
}
