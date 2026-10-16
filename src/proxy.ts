import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  });

  const { nextUrl } = request;
  const isLoggedIn = !!token;
  const userRole = token?.role as string | undefined;
  const pathname = nextUrl.pathname;

  // 👀 DEBUG: Watch your terminal to see the middleware intercept requests
  console.log(`[Proxy] Path: ${pathname} | Logged In: ${isLoggedIn} | Role: ${userRole || "None"}`);

  // 1. Legacy redirects (apply before other checks)
  if (pathname === "/apply") {
    console.log(`♻️ [Proxy] Legacy redirect: ${pathname} → /register`);
    return NextResponse.redirect(new URL("/register", nextUrl));
  }
  if (pathname === "/learner" || pathname.startsWith("/learner/")) {
    console.log(`♻️ [Proxy] Legacy redirect: ${pathname} → /learn/dashboard`);
    return NextResponse.redirect(new URL("/learn/dashboard", nextUrl));
  }
  // Consolidate all login pages to /login
  if (pathname === "/learn/login") {
    console.log(`♻️ [Proxy] Consolidating auth: /learn/login → /login`);
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  if (pathname === "/learn/register") {
    console.log(`♻️ [Proxy] Consolidating auth: /learn/register → /register`);
    return NextResponse.redirect(new URL("/register", nextUrl));
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
    "/learn",
    "/learn/courses",
    "/learn/about",
  ];

  const isPublicRoute =
    publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`)) ||
    pathname.startsWith("/api/auth");

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 3. Auth pages - redirect if already logged in
  const authPages = ["/login", "/register"];
  if (authPages.includes(pathname)) {
    if (isLoggedIn) {
      console.log(`♻️ [Proxy] Already logged in, redirecting to dashboard`);
      return NextResponse.redirect(new URL(getDefaultRoute(userRole), nextUrl));
    }
    return NextResponse.next();
  }

  // 4. Redirect to single login if NOT authenticated
  if (!isLoggedIn) {
    console.log(`🔒 [Proxy] Unauthenticated, redirecting to /login`);
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 5. ROLE-BASED ACCESS CONTROL (RBAC)
  const roleRouteMap: Record<string, string[]> = {
    "/admin/programmes": ["SUPER_ADMIN", "ADMIN", "REGISTRAR"],
    "/admin/modules": ["SUPER_ADMIN", "ADMIN", "REGISTRAR"],
    "/admin": ["SUPER_ADMIN", "ADMIN", "REGISTRAR", "FINANCE_OFFICER"],
    "/facilitator": ["SUPER_ADMIN", "ADMIN", "FACILITATOR"],
    "/assessor": ["SUPER_ADMIN", "ADMIN", "ASSESSOR"],
    "/moderator": ["SUPER_ADMIN", "ADMIN", "MODERATOR"],
    "/mentor": ["SUPER_ADMIN", "ADMIN", "SME_MENTOR"],
    "/employer": ["SUPER_ADMIN", "ADMIN", "HOST_EMPLOYER"],
    "/learn/dashboard": ["LEARNER", "SUPER_ADMIN", "ADMIN"],
    "/learn/my-courses": ["LEARNER", "SUPER_ADMIN", "ADMIN"],
    "/learn/assessments": ["LEARNER", "SUPER_ADMIN", "ADMIN"],
    "/learn/certificates": ["LEARNER", "SUPER_ADMIN", "ADMIN"],
    "/learn/profile": ["LEARNER", "SUPER_ADMIN", "ADMIN"],
    "/learn/support": ["LEARNER", "SUPER_ADMIN", "ADMIN"],
  };

  // Check if the requested path matches any restricted prefix
  for (const [routePrefix, allowedRoles] of Object.entries(roleRouteMap)) {
    if (pathname === routePrefix || pathname.startsWith(`${routePrefix}/`)) {
      if (!userRole || !allowedRoles.includes(userRole)) {
        console.log(`🚫 [Proxy] BLOCKED: ${userRole} tried to access ${pathname}`);
        return NextResponse.redirect(new URL(getDefaultRoute(userRole), nextUrl));
      }

      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

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

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};
