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
  // Skip API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Apply the i18n middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  // Match all paths except API routes, static files, etc.
  matcher: [
    '/',
    '/(en|ar|de|es|fr|id|it|no|pt|sv|uk|da|fi|hi|is|ja|pl|ru|th|zh)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
