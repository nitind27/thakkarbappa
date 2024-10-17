import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "localhost"
        ],
        remotePatterns: [
            {
                hostname: process.env.IMAGE_HOSTNAME,
            },
            {
                hostname: process.env.AWS_IMAGE_HOSTNAME,
            },
        ],
    },
};

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const finalConfig = withNextIntl(nextConfig);

export default finalConfig;