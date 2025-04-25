import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
    
        images: {
            domains: ["localhost", "thakkarbappa.vercel.app","thakkarbappa.nrcjewels.com"],
        },



};

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const finalConfig = withNextIntl(nextConfig);

export default finalConfig;


