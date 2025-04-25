import createNextIntlPlugin from 'next-intl/plugin';
import { join } from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "thakkarbappa.vercel.app", "thakkarbappa.nrcjewels.com"],
  },

  // 👇 Add this rewrite
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/uploads/:path*',
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const finalConfig = withNextIntl(nextConfig);

export default finalConfig;
