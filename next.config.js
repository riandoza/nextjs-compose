const { withContentlayer } = require("next-contentlayer")
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    // Other configuration
    experimental: {
        serverActions: {
            bodySizeLimit: "2mb",
        },
        serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
        turbo: {
            rules: {
                // Option format
                "*.md": [
                    {
                        loader: "@mdx-js/loader",
                        options: {
                            format: "md",
                        },
                    },
                ],
                // Option-less format
                "*.mdx": ["@mdx-js/loader"],
            },
        },
    },
    swcMinify: true,
    images: {
        // remotePatterns: [
        //     {
        //         protocol: "https",
        //         hostname: "**",
        //     },
        // ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
            },
        ],
    },
    // logging: {
    //     fetches: {
    //     fullUrl: true,
    //     },
    // },
}

module.exports = withContentlayer(nextConfig)
