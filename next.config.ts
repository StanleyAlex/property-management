import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        dirs: ['app', 'components'],
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            pathname: '**',
          },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            }
        ]
    }
};

export default nextConfig;
