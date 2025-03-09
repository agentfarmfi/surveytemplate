import createMiddleware from 'next-intl/middleware';
import { localePrefix } from './navigation';
import { locales } from './config/site';
import { NextResponse, NextRequest } from 'next/server';

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'en'
});

// Our main middleware handler
export default async function middleware(request: NextRequest) {
  // Apply the i18n middleware
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/(en|ar|de|es|fr|id|it|no|pt|sv|uk|da|fi|hi|is|ja|pl|ru|th|zh)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
