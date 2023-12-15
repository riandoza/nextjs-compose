import { Metadata } from "next";

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  [key: string]: any;
}

export function genPageMetadata({ title, description, image, ...rest }: PageSEOProps): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL || ""),
    openGraph: {
      title: `${process.env.NEXT_PUBLIC_TITLE}`,
      description: description || `${process.env.NEXT_PUBLIC_EXCERPT}`,
      url: `${process.env.NEXT_PUBLIC_URL}`,
      siteName: `${process.env.NEXT_PUBLIC_AUTHOR}`,
      images: image ? [image] : [`${process.env.NEXT_PUBLIC_BANNER}`],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      title: `${process.env.NEXT_PUBLIC_TITLE}`,
      card: "summary_large_image",
      images: image ? [image] : [`${process.env.NEXT_PUBLIC_BANNER}`],
    },
    ...rest,
  };
}
