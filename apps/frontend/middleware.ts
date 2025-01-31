import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isTokenValid } from './actions/auth';

export async function middleware(request: NextRequest) {
	// If no token or token is invalid, redirect to the login page
	if (!(await isTokenValid())) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// If token is valid, allow the request to proceed
	return NextResponse.next();
}

// Apply the middleware only to protected routes
export const config = {
	matcher: ['/home', '/dashboard', '/request', '/users', '/verlof'], // Replace with your actual protected routes
};
