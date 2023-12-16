"use client";
import Logo from "@/components/logo";
import NavItem from "@/components/navitem-component";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const MENU_LIST = [
    { text: "Home", href: "/" },
    { text: "Blog", href: "/posts" },
    { text: "About", href: "/about" },
];
const Navbar = () => {
    const { data: session } = useSession();
    const [navActive, setNavActive] = useState<true | false>(false);
    const [activeIdx, setActiveIdx] = useState(-1);
    const user = session?.user;

    return (
        <header className="top-0 bg-white dark:bg-gray-900 fixed w-full z-20 start-0 border-b border-gray-200 dark:border-gray-600">
            <nav
                className={`nav max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4`}
            >
                <Link
                    href="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <Image
                        className="h-8 w-auto invert"
                        src="/next.svg"
                        alt={String(process.env["NEXT_PUBLIC_TITLE"])}
                        width="320"
                        height="126"
                        priority
                    />
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {user && (
                        <>
                            <button
                                onClick={() => signOut()}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                            >
                                Logout <span aria-hidden="true">&rarr;</span>
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => alert("clicked")}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                    >
                        Action <span aria-hidden="true">&rarr;</span>
                    </button>
                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                        onClick={() => setNavActive(!navActive)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className={`${
                        navActive ? "visible" : "hidden"
                    } nav__menu-bar items-center justify-between w-full md:flex md:w-auto md:order-1`}
                    id="navbar-sticky"
                >
                    <ul
                        className={`${
                            navActive ? "active" : ""
                        } nav__menu-list flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700`}
                    >
                        {MENU_LIST.map((menu, idx) => (
                            <li
                                onClick={() => {
                                    setActiveIdx(idx);
                                    setNavActive(false);
                                }}
                                key={menu.text}
                            >
                                <NavItem active={activeIdx === idx} {...menu} />
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
