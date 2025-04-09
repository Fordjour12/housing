import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
;


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const sessionToken = getSessionCookie(request, {
    // Optionally pass config if cookie name or prefix is customized in auth config.
    cookieName: "session_token",
    cookiePrefix: "better-auth"
  });


  const dashboardPath = "/dashboard";
  const propertiesPath = "/properties";
  const loginPath = "/login";
  const registerPath = "/register";
  const forgotPasswordPath = "/forgot-password";
  const resetPasswordPath = "/reset-password";
  const onboardingPath = "/onboarding";

  // If user tries to access dashboard or properties pages
  if (
    request.nextUrl.pathname.startsWith(dashboardPath) ||
    request.nextUrl.pathname.startsWith(propertiesPath)
  ) {
    // Check if user has valid session token
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

  // If user is already logged in and tries to access auth pages (login, register, etc),
  // redirect them to dashboard instead
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

  // If user tries to access onboarding without being logged in,
  // redirect to login page
  if (request.nextUrl.pathname === onboardingPath && !sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = loginPath;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // runtime: "nodejs",
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/properties/:path*",
    "/onboarding"
  ],
};
