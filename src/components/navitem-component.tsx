"use client";
import Link from "next/link";
const NavItem = ({
    text,
    href,
    active,
}: {
    text: string;
    href: string;
    active: boolean;
}) => {
    return (
        <Link
            href={href}
            className={`nav__link block py-2 px-3  ${
                active ? "dark:text-blue-500" : "dark:text-white"
            } text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700
            `}
        >
            {text}
        </Link>
    );
};

export default NavItem;
