import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'hi', 'mr'],
  defaultLocale: 'en',
});

export const config = {
  matcher: [
    '/',
    '/(hi|mr|en)/:path*',
    '/(hi|mr|en)/dashboard',
    '/(hi|mr|en)/manage/:path*'
  ],
};