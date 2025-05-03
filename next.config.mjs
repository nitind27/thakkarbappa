import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ["localhost", "thakkarbappa.nrcjewels.com", "itdpdeori.weclocks.online"],
    },

};

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const finalConfig = withNextIntl(nextConfig);

export default finalConfig;


