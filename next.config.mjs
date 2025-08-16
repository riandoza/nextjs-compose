import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        serverActions: {
            bodySizeLimit: "2mb",
        },
        serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
        turbo: {
            rules: {
                "*.md": [
                    {
                        loader: "@mdx-js/loader",
                        options: {
                            format: "md",
                        },
                    },
                ],
                "*.mdx": ["@mdx-js/loader"],
            },
        },
    },
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
            },
        ],
    },
}

const withMDX = createMDX({
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
})

export default withMDX(nextConfig)