import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role as string | undefined;
  const pathname = nextUrl.pathname;

  // 👀 DEBUG: Watch your terminal to see the middleware intercept requests
  console.log(`[Middleware] Path: ${pathname} | Logged In: ${isLoggedIn} | Role: ${userRole || 'None'}`);

  // 1. Allow public routes
  const publicRoutes = ["/", "/login", "/register", "/courses", "/posts", "/verify", "/apply", "/about", "/contact"];
  const isPublicRoute = 
    publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`)) || 
    pathname.startsWith("/api/auth");
  
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 2. Redirect to login if NOT authenticated
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 3. ROLE-BASED ACCESS CONTROL (RBAC)
  const roleRouteMap: Record<string, string[]> = {
    "/admin": ["SUPER_ADMIN", "ADMIN", "REGISTRAR", "FINANCE_OFFICER"],
    "/facilitator": ["SUPER_ADMIN", "ADMIN", "FACILITATOR"],
    "/assessor": ["SUPER_ADMIN", "ADMIN", "ASSESSOR"],
    "/moderator": ["SUPER_ADMIN", "ADMIN", "MODERATOR"],
    "/mentor": ["SUPER_ADMIN", "ADMIN", "SME_MENTOR"],
    "/employer": ["SUPER_ADMIN", "ADMIN", "HOST_EMPLOYER"],
    "/learner": ["LEARNER"],
  };

  // Check if the requested path matches any restricted prefix
  for (const [routePrefix, allowedRoles] of Object.entries(roleRouteMap)) {
    if (pathname === routePrefix || pathname.startsWith(`${routePrefix}/`)) {
      
      // If the user's role is NOT in the allowed list, block them!
      if (!userRole || !allowedRoles.includes(userRole)) {
        console.log(`🚫 [Middleware] BLOCKED: ${userRole} tried to access ${pathname}`);
        // Redirect them to their own default dashboard
        return NextResponse.redirect(new URL(getDefaultRoute(userRole), nextUrl));
      }
      
      // Role is authorized, allow the request
      return NextResponse.next();
    }
  }

  // 4. Fallback for generic /dashboard routing
  return NextResponse.next();
});

// Helper to route users to their correct home base
function getDefaultRoute(role?: string): string {
  if (!role) return "/login";
  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
    case "REGISTRAR":
    case "FINANCE_OFFICER":
      return "/admin";
    case "FACILITATOR":
      return "/facilitator";
    case "ASSESSOR":
      return "/assessor";
    case "MODERATOR":
      return "/moderator";
    case "SME_MENTOR":
      return "/mentor";
    case "HOST_EMPLOYER":
      return "/employer";
    case "LEARNER":
      return "/learner";
    default:
      return "/";
  }
}

// Ensure middleware runs on all routes except static assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};