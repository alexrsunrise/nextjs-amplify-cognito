import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(
    `CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID}.LastAuthUser`,
  );
  const isLoggedIn = !!cookie;
  const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  if (isOnDashboard) {
    if (isLoggedIn) return;
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  } else if (isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
