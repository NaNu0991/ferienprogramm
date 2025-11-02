import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
    async rewrites() {
        return isDev
            ? [
                {
                    source: '/api/:path*',
                    destination: 'http://localhost:8080/api/:path*',
                },
            ]
            : [];
    },
};

export default nextConfig;
