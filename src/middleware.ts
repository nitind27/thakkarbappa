import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['mr', 'en', 'hi'],  // Supported locales
  defaultLocale: 'mr',          // Default locale set to Marathi
});

export const config = {
  matcher: [
    '/',
    '/(hi|mr|en)/:path*',
    '/(hi|mr|en)/dashboard',
    '/(hi|mr|en)/manage/:path*'
  ],
}