import React from "react"
import Image from "next/image"
import Link from "next/link"

const Logo = () => {
    return (
        <div className="logo">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image
                    className="h-8 w-auto invert"
                    src="/next.svg"
                    alt={String(process.env["NEXT_PUBLIC_TITLE"])}
                    width="320"
                    height="126"
                    priority
                />
            </Link>
        </div>
    )
}

export default Logo
