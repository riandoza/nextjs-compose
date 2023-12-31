"use client"

import * as React from "react"
import Link from "next/link"
import { cva } from "class-variance-authority"
import { allPosts } from "contentlayer/generated"
import { ChevronRight, Menu } from "lucide-react"
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
} from "./ui/navigation-menu"
import { toast } from "./ui/use-toast"

export default function Navbar() {
    const { data: session } = useSession()
    const [state, setState] = React.useState(true)
    const menus = [
        { title: "HOME", path: "/" },
        { title: "BLOG", path: "/posts" },
        { title: "ABOUT", path: "/about" },
        { title: "POKEMON", path: "/pokemon" },
    ]
    const user = session?.user
    let latestPosts = allPosts.slice(0, 4)

    const navigationMenuTriggerStyle = cva(
        "group inline-flex h-10 md:w-max w-full items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
    )

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
                <NavigationMenu className="relative z-10 max-w-full flex-1 items-center justify-center sm:flex-none md:max-w-max lg:flex">
                    <NavigationMenuList className="group group flex max-w-screen-xl flex-1 list-none flex-wrap items-center justify-center space-x-0 space-y-1 pt-4 md:flex-none md:flex-row md:space-x-1 md:space-y-0 md:pt-0 lg:flex lg:space-x-1">
                        <NavigationMenuItem className="block w-full md:w-max">
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`}>
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        {latestPosts.length > 0 && (
                            <>
                                <NavigationMenuItem className="block w-full md:w-max">
                                    <NavigationMenuTrigger className="w-full">
                                        <Link href="/posts" legacyBehavior passHref>
                                            <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`}>
                                                Blog
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-full gap-3 p-2 md:w-[460px] md:grid-cols-2 lg:w-[600px] ">
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

                        <NavigationMenuItem className="block w-full md:w-max">
                            <Link href="/about" legacyBehavior passHref>
                                <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`}>
                                    About
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="block w-full md:w-max">
                            <Link href="/pokemon" legacyBehavior passHref>
                                <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`}>
                                    Pokemon
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="block w-full md:w-max">
                            <Link href="" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={`${buttonVariants({
                                        variant: "destructive",
                                    })} ${navigationMenuTriggerStyle()}`}
                                    onClick={() => {
                                        toast({
                                            title: "Scheduled: Catch up",
                                            description: "Friday, February 10, 2023 at 5:57 PM",
                                        })
                                    }}
                                >
                                    Action <ChevronRight className="absolute right-4 h-4 w-4 md:relative md:right-0" />
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
