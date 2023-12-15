"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <header className="">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">
                            {process.env["NEXT_PUBLIC_AUTHOR"]}
                        </span>
                        <Image
                            className="h-8 w-auto invert"
                            src="/next.svg"
                            alt={String(process.env["NEXT_PUBLIC_TITLE"])}
                            width="320"
                            height="126"
                            priority
                        />
                    </a>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <div className="relative"></div>
                </div>
                <div className="lg:flex lg:flex-1 lg:justify-end">
                    {user && (
                        <>
                            <Link
                                href="#"
                                onClick={() => signOut()}
                                className="text-sm font-semibold leading-6 cursor-pointer"
                            >
                                Logout <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
