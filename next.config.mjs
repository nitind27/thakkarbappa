import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "localhost",
            "thakkarbappa.vercel.app"

        ],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        qualities: [25, 50, 75],
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


