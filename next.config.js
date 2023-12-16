const { withContentlayer } = require("next-contentlayer");
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
    },
    swcMinify: true,
};

module.exports = withContentlayer(nextConfig);
