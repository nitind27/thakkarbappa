import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "localhost",
            "thakkarbappa.vercel.app"

        ],

        remotePatterns: [
            {
                hostname: "thakkarbappa.nrcjewels.com",
                pathname: '/uploads/**',
            },
            {
                hostname: "thakkarbappa.nrcjewels.com",
                pathname: '/uploads/**',
            },
            
        ],
    },
};

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const finalConfig = withNextIntl(nextConfig);

export default finalConfig;


