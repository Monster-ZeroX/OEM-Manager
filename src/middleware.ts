import { NextResponse, NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'e0f7e1b590fa1db4ad5c490a61250269f826315263d898a3e790bf7e820c74fb';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Exclude public assets, static files, and icons
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 2. Exclude public API endpoints (API V1 is protected via its own API key validation inside the route)
  if (pathname.startsWith('/api/v1')) {
    return NextResponse.next();
  }

  // 3. Exclude login page and login API endpoint
  if (pathname === '/login' || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // 4. Retrieve session token
  const token = request.cookies.get('oem_session')?.value;

  // 5. Verify token
  let decoded = null;
  if (token) {
    decoded = await verifyJWT(token, JWT_SECRET);
  }

  // 6. Handle unauthorized access
  if (!decoded) {
    // If request is for an internal API endpoint, return 401 Unauthorized JSON
    if (pathname.startsWith('/api/')) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized: Session expired or invalid' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // If request is for a frontend page, redirect to the login page
    const loginUrl = new URL('/login', request.url);
    // Add current pathname as redirect parameter if desirable
    return NextResponse.redirect(loginUrl);
  }

  // 7. Token is valid, continue
  return NextResponse.next();
}

// Configure paths that middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/v1 (public API)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/v1|_next/static|_next/image|favicon.ico).*)',
  ],
};
