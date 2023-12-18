"use client"

import Link from "next/link"

const NavItem = ({ title, path, active }: { title: string; path: string; active: boolean }) => {
    return (
        <Link
            href={path}
            className={`nav__link block px-3 py-2  ${
                active ? "dark:text-blue-500" : "dark:text-gray"
            } rounded  hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white md:p-0  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500
            `}
        >
            {title}
        </Link>
    )
}

export default NavItem
