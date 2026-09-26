import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Update/verify Supabase session via cookies
  const { user, response } = await updateSession(request);

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  // Case 1: User is AUTHENTICATED (Admin or Moderator)
  if (user) {
    // If authenticated user visits /admin/login, redirect to /admin dashboard
    if (isLoginPage) {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = "/admin";
      return NextResponse.redirect(dashboardUrl);
    }

    // If authenticated user visits ANY public website route, STRICTLY redirect to /admin dashboard!
    // The user MUST explicitly log out before accessing the public site.
    if (!isAdminRoute) {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = "/admin";
      const redirectResponse = NextResponse.redirect(dashboardUrl);
      redirectResponse.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
      return redirectResponse;
    }

    // Authenticated user accessing dashboard routes: prevent browser caching
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    return response;
  }

  // Case 2: User is UNAUTHENTICATED
  if (!user) {
    // If unauthenticated user tries to access any dashboard route other than login, redirect to /admin/login
    if (isAdminRoute && !isLoginPage) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }

    // Public website routes are freely accessible to unauthenticated visitors
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public asset folder files (svg, png, jpg, webp, avif)
     */
    "/((?!_next/static|_next/image|favicon.ico|onp.svg|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
