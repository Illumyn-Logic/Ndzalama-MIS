import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role as string | undefined;
  const pathname = nextUrl.pathname;

  // 👀 DEBUG: Watch your terminal to see the middleware intercept requests
  console.log(`[Middleware] Path: ${pathname} | Logged In: ${isLoggedIn} | Role: ${userRole || 'None'}`);

  // 1. Legacy redirects (apply before other checks)
  if (pathname === '/apply') {
    console.log(`♻️ [Middleware] Legacy redirect: ${pathname} → /register`);
    return NextResponse.redirect(new URL('/register', nextUrl));
  }
  if (pathname === '/learner' || pathname.startsWith('/learner/')) {
    console.log(`♻️ [Middleware] Legacy redirect: ${pathname} → /learn/dashboard`);
    return NextResponse.redirect(new URL('/learn/dashboard', nextUrl));
  }
  // Consolidate all login pages to /login
  if (pathname === '/learn/login') {
    console.log(`♻️ [Middleware] Consolidating auth: /learn/login → /login`);
    return NextResponse.redirect(new URL('/login', nextUrl));
  }
  if (pathname === '/learn/register') {
    console.log(`♻️ [Middleware] Consolidating auth: /learn/register → /register`);
    return NextResponse.redirect(new URL('/register', nextUrl));
  }

  // 2. Public routes (accessible to everyone)
  const publicRoutes = [
    "/",
    "/courses",
    "/posts",
    "/verify",
    "/about",
    "/contact",
    "/schedules",
    "/qualifications",
    "/training-courses",
    "/accreditation-services",
    "/why-choose-us",
    "/faq",
    "/privacy-policy",
    "/terms-of-use",
    "/forgot-password",
    "/learn",           // LMS portal homepage (public landing)
    "/learn/courses",   // Browse courses (public)
    "/learn/about",     // About the LMS (public)
  ];
  
  const isPublicRoute = 
    publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`)) || 
    pathname.startsWith("/api/auth");
  
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 3. Auth pages - redirect if already logged in
  const authPages = ["/login", "/register"];
  if (authPages.includes(pathname)) {
    if (isLoggedIn) {
      console.log(`♻️ [Middleware] Already logged in, redirecting to dashboard`);
      return NextResponse.redirect(new URL(getDefaultRoute(userRole), nextUrl));
    }
    return NextResponse.next();
  }

  // 4. Redirect to single login if NOT authenticated
  if (!isLoggedIn) {
    console.log(`🔒 [Middleware] Unauthenticated, redirecting to /login`);
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 5. ROLE-BASED ACCESS CONTROL (RBAC)
  const roleRouteMap: Record<string, string[]> = {
    "/admin": ["SUPER_ADMIN", "ADMIN", "REGISTRAR", "FINANCE_OFFICER"],
    "/facilitator": ["SUPER_ADMIN", "ADMIN", "FACILITATOR"],
    "/assessor": ["SUPER_ADMIN", "ADMIN", "ASSESSOR"],
    "/moderator": ["SUPER_ADMIN", "ADMIN", "MODERATOR"],
    "/mentor": ["SUPER_ADMIN", "ADMIN", "SME_MENTOR"],
    "/employer": ["SUPER_ADMIN", "ADMIN", "HOST_EMPLOYER"],
    "/learn/dashboard": ["LEARNER", "SUPER_ADMIN", "ADMIN"], // Learner workspace + admin override
    "/learn/my-courses": ["LEARNER", "SUPER_ADMIN", "ADMIN"],
    "/learn/assessments": ["LEARNER", "SUPER_ADMIN", "ADMIN"],
    "/learn/certificates": ["LEARNER", "SUPER_ADMIN", "ADMIN"],
    "/learn/profile": ["LEARNER", "SUPER_ADMIN", "ADMIN"],
    "/learn/support": ["LEARNER", "SUPER_ADMIN", "ADMIN"],
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

  // 6. Fallback for generic /dashboard routing or unmatched authenticated routes
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
      return "/learn/dashboard";
    default:
      return "/";
  }
}

// Ensure middleware runs on all routes except static assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};