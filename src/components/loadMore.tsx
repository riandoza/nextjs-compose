"use client"

import * as React from "react"

import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"

type loadMoreAction<T extends string | number = any> = T extends number
    ? (offset: T) => Promise<readonly [React.JSX.Element, number | null]>
    : T extends string
    ? (offset: T) => Promise<readonly [React.JSX.Element, string | null]>
    : any

const LoadMore = <T extends string | number = any>({
    children,
    initialOffset,
    loadMoreAction,
}: React.PropsWithChildren<{
    initialOffset: T
    loadMoreAction: loadMoreAction<T>
}>) => {
    const ref = React.useRef<HTMLButtonElement>(null)
    const [loadMoreNodes, setLoadMoreNodes] = React.useState<React.JSX.Element[]>([])

    const [disabled, setDisabled] = React.useState(false)
    const currentOffsetRef = React.useRef<number | string | undefined>(initialOffset)
    const [scrollLoad, setScrollLoad] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    const loadMore = React.useCallback(
        async (abortController?: AbortController) => {
            setLoading(true)

            // @ts-expect-error Can't yet figure out how to type this
            loadMoreAction(currentOffsetRef.current)
                .then(([node, next]) => {
                    if (abortController?.signal.aborted) return

                    setLoadMoreNodes((prev) => [...prev, node])
                    if (next === null) {
                        currentOffsetRef.current ??= undefined
                        setDisabled(true)
                        return
                    }

                    currentOffsetRef.current = next
                })
                .catch(() => {})
                .finally(() => setLoading(false))
        },
        [loadMoreAction]
    )

    React.useEffect(() => {
        const signal = new AbortController()

        const element = ref.current

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && element?.disabled === false) {
                loadMore(signal)
            }
        })

        if (element && scrollLoad) {
            observer.observe(element)
        }

        return () => {
            signal.abort()
            if (element) {
                observer.unobserve(element)
            }
        }
    }, [loadMore, scrollLoad])

    return (
        <>
            <div className="flex ">
                <Label htmlFor="scrollLoad" className="cursor-pointer">
                    <Card className="m-2 flex w-max items-center gap-4 p-4">
                        <Switch
                            id="scrollLoad"
                            onCheckedChange={() => setScrollLoad((prev) => !prev)}
                            checked={scrollLoad}
                        ></Switch>
                        <span>Fetch on scroll</span>
                    </Card>
                </Label>
            </div>
            <div className="relative grid grid-cols-1 gap-4 pt-12 sm:grid-cols-2 lg:grid-cols-4">
                <React.Suspense fallback={<p>Loading feed...</p>}>{children}</React.Suspense>
                {loadMoreNodes}
            </div>
            <Button variant="outline" size="lg" ref={ref} disabled={disabled || loading} onClick={() => loadMore()}>
                {loading ? "Loading..." : "Load More"}
            </Button>
        </>
    )
}

export default LoadMore
