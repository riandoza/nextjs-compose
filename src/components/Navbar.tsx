"use client"

import { title } from "process"
import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import { ChevronRight, Loader2, Menu, Search } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { cn } from "@/lib/utils"

import Logo from "./logo"
import { Button, buttonVariants } from "./ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import { toast } from "./ui/use-toast"

export default function Navbar() {
    const { data: session } = useSession()
    const [state, setState] = React.useState(false)
    const menus = [
        { title: "Home", path: "/" },
        { title: "Blog", path: "/posts" },
        { title: "About", path: "/about" },
        { title: "Pokemon", path: "/pokemon" },
    ]
    const user = session?.user
    let latestPosts = allPosts.slice(0, 4)

    return (
        <div className=" mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
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
                <NavigationMenu>
                    <NavigationMenuList className="group flex list-none flex-wrap items-center justify-center pt-4 md:flex-row md:pt-0  lg:space-x-1">
                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        {latestPosts.length > 0 && (
                            <>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>
                                        <Link href="/posts" legacyBehavior passHref>
                                            <NavigationMenuLink>Blog</NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            {latestPosts.map((component) => (
                                                <ListItem
                                                    key={component.title}
                                                    title={component.title}
                                                    href={component.slug}
                                                >
                                                    {component.description}
                                                </ListItem>
                                            ))}
                                            <ListItem
                                                key="more_blogs"
                                                title="Read more all blog posts..."
                                                href="/posts"
                                            ></ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </>
                        )}

                        <NavigationMenuItem>
                            <Link href="/about" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/pokemon" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Pokemon
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={buttonVariants({ variant: "destructive" })}
                                    onClick={() => {
                                        toast({
                                            title: "Scheduled: Catch up",
                                            description: "Friday, February 10, 2023 at 5:57 PM",
                                        })
                                    }}
                                >
                                    Action <ChevronRight className="h-4 w-4" />
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                    </a>
                </NavigationMenuLink>
            </li>
        )
    }
)
ListItem.displayName = "ListItem"
