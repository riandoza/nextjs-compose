import { genPageMetadata } from "@/components/seo"

export const metadata = genPageMetadata({
    title: `${process.env["NEXT_PUBLIC_TITLE"]}`,
    description: `${process.env["NEXT_PUBLIC_EXCERPT"]}`,
    icons: {},
})
export default function Head() {
    return (
        <>
            <meta httpEquiv="Permissions-Policy" content="interest-cohort=()"></meta>

            <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
            <meta name="msapplication-TileColor" content="#000000" />

            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
            <meta content="width=device-width, initial-scale=1" name="viewport" />

            <meta name="author" content={process.env["NEXT_PUBLIC_AUTHOR"]} />
        </>
    )
}
