import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Everything under /admin and the admin API is protected. The public
// marketing site and the sign-in route stay open.
const isProtected = createRouteMatcher(['/admin(.*)', '/api/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) {
    const { userId } = await auth();
    if (!userId) {
      const signIn = new URL('/sign-in', req.url);
      signIn.searchParams.set('redirect_url', req.nextUrl.pathname);
      return NextResponse.redirect(signIn);
    }
  }
});

export const config = {
  matcher: [
    // Run on everything except static files and Next internals
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
