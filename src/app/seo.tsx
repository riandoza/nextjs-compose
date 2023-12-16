import { Metadata } from "next";

interface PageSEOProps {
    title: string;
    description?: string;
    image?: string;
    [key: string]: any;
}

export function genPageMetadata({
    title,
    description,
    image,
    ...rest
}: PageSEOProps): Metadata {
    let pageUrl = "";
    if (typeof rest.alternates?.canonical != undefined) {
        pageUrl = rest.alternates?.canonical;
    }
    return {
        title: {
            template: `%s | ${title}`,
            default: `${title}`, // a default is required when creating a template
        },
        description,
        metadataBase: new URL(pageUrl || `${process.env.NEXT_PUBLIC_URL}`),
        openGraph: {
            title: `${title}`,
            description: description || `${process.env.NEXT_PUBLIC_EXCERPT}`,
            url: pageUrl || `${process.env.NEXT_PUBLIC_URL}`,
            siteName: `${process.env.NEXT_PUBLIC_AUTHOR}`,
            images: image ? [image] : [`${process.env.NEXT_PUBLIC_BANNER}`],
            locale: "id_ID",
            type: "website",
        },
        twitter: {
            title: `${title}`,
            card: "summary_large_image",
            images: image ? [image] : [`${process.env.NEXT_PUBLIC_BANNER}`],
        },
        ...rest,
    };
}
