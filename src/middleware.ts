import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

function generateGuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Try to get the existing user_id cookie
  const userId = request.cookies.get('user_id');

  if (userId) {
    // If cookie exists, set it in the response to refresh expiry
    response.cookies.set('user_id', userId.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  } else {
    // If no cookie exists, create a new GUID and set it
    const newUserId = generateGuid();
    response.cookies.set('user_id', newUserId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
