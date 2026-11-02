import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

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

const canonicalSubdomains = {
  auth: "https://auth.ndzalama.co.za",
  apply: "https://apply.ndzalama.co.za",
  admin: "https://admin.ndzalama.co.za",
  learn: "https://learn.ndzalama.co.za",
  lmis: "https://learn.ndzalama.co.za",
} as const;

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

function isLocalHost(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".localhost");
}

function getSubdomainLabel(hostname: string): string {
  return hostname.split(".")[0]?.toLowerCase() ?? "";
}

function normalizeSubdomainPath(hostname: string, pathname: string): URL | null {
  if (isLocalHost(hostname)) return null;

  const label = getSubdomainLabel(hostname);
  const canonicalBase = canonicalSubdomains[label as keyof typeof canonicalSubdomains];

  if (!canonicalBase) {
    return null;
  }

  if (label === "auth") {
    if (pathname === "/") return new URL("/login", canonicalBase);
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) return null;
    return new URL("/login", canonicalBase);
  }

  if (label === "apply") {
    if (pathname === "/") return new URL("/apply", canonicalBase);
    if (pathname.startsWith("/apply")) return null;
    return new URL("/apply", canonicalBase);
  }

  if (label === "admin") {
    if (pathname === "/") return new URL("/admin", canonicalBase);
    if (pathname === "/dashboard") return new URL("/admin", canonicalBase);
    if (pathname.startsWith("/admin")) return null;
    if (pathname.startsWith("/dashboard")) return new URL(pathname.replace(/^\/dashboard/, "/admin"), canonicalBase);
    return new URL(`/admin${pathname === "/" ? "" : pathname}`, canonicalBase);
  }

  if (label === "learn") {
    if (pathname === "/") return new URL("/learn", canonicalBase);
    if (pathname.startsWith("/learn")) return null;
    return new URL(`/learn${pathname}`, canonicalBase);
  }

  if (label === "lmis") {
    if (pathname === "/") return new URL("/learn", canonicalBase);
    if (pathname.startsWith("/learn")) return new URL(pathname, canonicalBase);
    return new URL(`/learn${pathname}`, canonicalBase);
  }

  return null;
}

export async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const hostname = request.headers.get("host")?.split(":")[0].toLowerCase() ?? nextUrl.hostname.toLowerCase();
  const pathname = nextUrl.pathname;
  const search = nextUrl.search;

  const canonicalUrl = normalizeSubdomainPath(hostname, pathname);
  if (canonicalUrl && pathname !== canonicalUrl.pathname) {
    canonicalUrl.search = search;
    return NextResponse.redirect(canonicalUrl);
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const userRole = token?.role as string | undefined;

  // Legacy redirects
  if (pathname === "/apply") {
    console.log(`♻️ [Proxy] Legacy redirect: ${pathname} → /register`);
    return NextResponse.redirect(new URL("/register", nextUrl));
  }
  if (pathname === "/learner" || pathname.startsWith("/learner/")) {
    console.log(`♻️ [Proxy] Legacy redirect: ${pathname} → /learn/dashboard`);
    return NextResponse.redirect(new URL("/learn/dashboard", nextUrl));
  }
  if (pathname === "/learn/login") {
    console.log(`♻️ [Proxy] Consolidating auth: /learn/login → /login`);
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  if (pathname === "/learn/register") {
    console.log(`♻️ [Proxy] Consolidating auth: /learn/register → /register`);
    return NextResponse.redirect(new URL("/register", nextUrl));
  }

  const isPublicRoute =
    publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`)) ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/courses") ||
    pathname.startsWith("/posts") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/faq") ||
    pathname.startsWith("/privacy-policy") ||
    pathname.startsWith("/terms-of-use") ||
    pathname.startsWith("/schedules") ||
    pathname.startsWith("/accreditation-services") ||
    pathname.startsWith("/why-choose-us") ||
    pathname.startsWith("/learn") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/apply") ||
    pathname.startsWith("/forgot-password");

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const authPages = ["/login", "/register"];
  if (authPages.includes(pathname)) {
    if (isLoggedIn) {
      console.log(`♻️ [Proxy] Already logged in, redirecting to dashboard`);
      return NextResponse.redirect(new URL(getDefaultRoute(userRole), nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    console.log(`🔒 [Proxy] Unauthenticated, redirecting to /login`);
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

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

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};
