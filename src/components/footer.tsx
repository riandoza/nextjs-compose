"use client"

import Link from "next/link"
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
    return (
        <footer>
            <div className="container mx-auto flex flex-wrap items-center justify-center px-4 pt-12 lg:justify-between">
                <div className="flex flex-wrap justify-center">
                    <ul className="mt-4 grid grid-cols-2 text-left text-sm md:grid-cols-4">
                        <li>
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link href={"/about"}>About</Link>
                        </li>
                        <li>
                            <Link href={"/contact"}>Contact US</Link>
                        </li>
                        <li>
                            <Link href={"/terms"}>Terms & Condition</Link>
                        </li>
                    </ul>
                </div>
                <div className="mt-4 flex justify-center space-x-4 lg:mt-0">
                    <Link href={"https://www.facebook.com/"}>
                        <Facebook />
                    </Link>
                    <Link href={"https://twitter.com/"}>
                        <Twitter />
                    </Link>
                    <Link href={"https://www.instagram.com/"}>
                        <Instagram />
                    </Link>
                    <Link href={"https://www.linkedin.com/"}>
                        <Linkedin />
                    </Link>
                    <Link href={"https://www.github.com/"}>
                        <Github />
                    </Link>
                </div>
            </div>
            <div className="px-4 pb-2 pt-8">
                <p className="text-center md:text-left">@2024 All rights reserved</p>
            </div>
        </footer>
    )
}
