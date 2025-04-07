import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const sessionToken = await auth.api.getSession({
		headers: await headers(),
	});

	const dashboardPath = "/dashboard";
	const loginPath = "/login";
	const registerPath = "/register";
	const forgotPasswordPath = "/forgot-password";
	const resetPasswordPath = "/reset-password";

	if (request.nextUrl.pathname.startsWith(dashboardPath)) {
		if (!sessionToken) {
			// Redirect to login if no session token
			const url = request.nextUrl.clone();
			url.pathname = loginPath;
			// url.search = `?callbackUrl=${request.nextUrl.pathname}`; // Add original path as callbackUrl
			return NextResponse.redirect(url);
		}
		//If has token, let request continue
		return NextResponse.next();
	}

	// Allow access to login and register pages if no session token is present
	if (
		(request.nextUrl.pathname === loginPath ||
			request.nextUrl.pathname === registerPath ||
			request.nextUrl.pathname === forgotPasswordPath ||
			request.nextUrl.pathname === resetPasswordPath) &&
		sessionToken
	) {
		const url = request.nextUrl.clone();
		url.pathname = dashboardPath;
		return NextResponse.redirect(url);
	}

	// For all other routes, allow access
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		"/dashboard/:path*",
		"/login",
		"/register",
		"/forgot-password",
		"/reset-password",
	],
};
