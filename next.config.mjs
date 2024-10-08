// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// @type {import('next').NextConfig}
const nextConfig = {
    images: {
        domains: [
            "localhost"
            // "dev.talentslist.com",
            // "talentslist-staging.s3.us-east-2.amazonaws.com",
            // "192.168.1.27",
            // "talentslist-staging.s3.us-east-2.amazonaws.com",
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
    i18n: {
        locales: ['en', 'hi', 'mr'], // Supported languages
        defaultLocale: 'en', // Default language
    },
};

export default nextConfig;