You're building a single unified application that serves three distinct interfaces based on the user's role:

Public Website – No login required (brochure, marketing, enrollment).

Admin LMIS – Full management system (admins managing learners, courses, accreditation).

Learner LMS – Dashboard for enrolled learners (courses, assessments, certificates).

Since you're using Next.js App Router, you can organize this beautifully using route groups and parallel routes.

🏗️ The Ultimate Next.js Folder Structure
Here's how to structure your src/app/ folder for a single-URL multi-role system:

text
src/app/
├── (public)/                          # PUBLIC WEBSITE (No auth required)
│   ├── page.tsx                       # Homepage
│   ├── courses/
│   │   ├── page.tsx                   # Course listing
│   │   └── [slug]/
│   │       └── page.tsx               # Course detail
│   ├── apply/
│   │   └── page.tsx                   # Enrollment form
│   ├── contact/
│   │   └── page.tsx                   # Contact page
│   └── about/
│       └── page.tsx                   # Company profile
│
├── (auth)/                            # AUTHENTICATION PAGES (No session required)
│   ├── login/
│   │   └── page.tsx                   # Login page
│   ├── register/
│   │   └── page.tsx                   # Registration page
│   └── forgot-password/
│       └── page.tsx                   # Forgot password page
│
├── (dashboard)/                       # PROTECTED DASHBOARD (Auth required)
│   ├── layout.tsx                     # Shared dashboard layout with sidebar
│   │
│   ├── admin/                         # ADMIN LMIS (Role: ADMIN, SUPER_ADMIN)
│   │   ├── page.tsx                   # Admin dashboard overview
│   │   ├── learners/
│   │   │   ├── page.tsx               # Learner management
│   │   │   └── [id]/
│   │   │       └── page.tsx           # Learner detail
│   │   ├── courses/
│   │   │   ├── page.tsx               # Course management
│   │   │   └── [id]/
│   │   │       └── page.tsx           # Course detail
│   │   ├── enrollments/
│   │   │   └── page.tsx               # Enrollment management
│   │   ├── facilitators/
│   │   │   └── page.tsx               # Facilitator management
│   │   ├── assessors/
│   │   │   └── page.tsx               # Assessor management
│   │   ├── moderators/
│   │   │   └── page.tsx               # Moderator management
│   │   ├── schedules/
│   │   │   └── page.tsx               # Schedule management
│   │   ├── accreditation/
│   │   │   └── page.tsx               # Accreditation tracking
│   │   ├── reports/
│   │   │   └── page.tsx               # Reporting & exports (SETA)
│   │   ├── settings/
│   │   │   └── page.tsx               # System settings
│   │   └── audit/
│   │       └── page.tsx               # Audit logs
│   │
│   ├── facilitator/                   # FACILITATOR DASHBOARD (Role: FACILITATOR)
│   │   ├── page.tsx                   # Facilitator overview
│   │   ├── interventions/
│   │   │   └── page.tsx               # My assigned courses
│   │   ├── learners/
│   │   │   └── page.tsx               # My learners
│   │   ├── attendance/
│   │   │   └── page.tsx               # Attendance tracking
│   │   └── resources/
│   │       └── page.tsx               # Upload resources
│   │
│   ├── assessor/                      # ASSESSOR DASHBOARD (Role: ASSESSOR)
│   │   ├── page.tsx                   # Assessor overview
│   │   ├── assessments/
│   │   │   └── page.tsx               # Assessments to review
│   │   ├── poe/
│   │   │   └── page.tsx               # POEs to assess
│   │   └── feedback/
│   │       └── page.tsx               # Feedback history
│   │
│   ├── moderator/                     # MODERATOR DASHBOARD (Role: MODERATOR)
│   │   ├── page.tsx                   # Moderator overview
│   │   ├── moderation/
│   │   │   └── page.tsx               # Assessments to moderate
│   │   └── reports/
│   │       └── page.tsx               # Quality assurance reports
│   │
│   ├── learner/                       # LEARNER LMS (Role: LEARNER)
│   │   ├── page.tsx                   # Learner dashboard
│   │   ├── courses/
│   │   │   └── page.tsx               # My enrolled courses
│   │   ├── modules/
│   │   │   └── [id]/
│   │   │       └── page.tsx           # Module detail & resources
│   │   ├── poe/
│   │   │   ├── page.tsx               # My POEs
│   │   │   └── upload/
│   │   │       └── page.tsx           # Upload POE
│   │   ├── assessments/
│   │   │   └── page.tsx               # My assessment results
│   │   └── certificates/
│   │       └── page.tsx               # My certificates
│   │
│   └── unauthorized/
│       └── page.tsx                   # 403 - Access denied
│
├── api/                               # API ROUTES (Serverless)
│   ├── auth/
│   │   ├── login/
│   │   │   └── route.ts
│   │   ├── register/
│   │   │   └── route.ts
│   │   └── logout/
│   │       └── route.ts
│   ├── courses/
│   │   ├── route.ts                    # GET all courses, POST create
│   │   └── [id]/
│   │       └── route.ts                # GET, PUT, DELETE course
│   ├── enrollments/
│   │   ├── route.ts                    # GET all enrollments, POST enroll
│   │   └── [id]/
│   │       └── route.ts                # GET, PUT, DELETE enrollment
│   ├── learners/
│   │   ├── route.ts                    # GET all learners
│   │   └── [id]/
│   │       └── route.ts                # GET, PUT learner
│   ├── poe/
│   │   ├── route.ts                    # POST upload POE
│   │   └── [id]/
│   │       ├── route.ts                # GET, PUT assessment
│   │       └── assess/
│   │           └── route.ts            # POST assess POE
│   ├── reports/
│   │   └── seta/
│   │       └── route.ts                # GET SETA export
│   └── users/
│       └── route.ts                    # GET users, POST user
│
├── layout.tsx                          # Root layout (global)
├── globals.css                         # Global styles
└── middleware.ts                       # Auth & RBAC middleware
📂 Supporting Folders (Outside app/)
text
src/
├── components/
│   ├── ui/                            # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── container.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── ...
│   ├── layout/                        # Layout components
│   │   ├── public-header.tsx
│   │   ├── public-footer.tsx
│   │   ├── dashboard-header.tsx
│   │   ├── dashboard-sidebar.tsx
│   │   └── dashboard-layout.tsx
│   ├── admin/                         # Admin-specific components
│   │   ├── learner-table.tsx
│   │   ├── course-form.tsx
│   │   └── ...
│   ├── facilitator/                   # Facilitator-specific components
│   │   ├── intervention-card.tsx
│   │   └── ...
│   ├── learner/                       # Learner-specific components
│   │   ├── course-progress.tsx
│   │   ├── poe-upload.tsx
│   │   └── ...
│   └── shared/                        # Shared across roles
│       ├── role-based.tsx
│       └── loading.tsx
│
├── lib/
│   ├── db.ts                          # Prisma client
│   ├── auth.ts                        # NextAuth config
│   ├── validations.ts                 # Zod schemas
│   └── utils.ts                       # Helpers
│
├── services/
│   ├── course.service.ts
│   ├── enrollment.service.ts
│   ├── assessment.service.ts
│   ├── learner.service.ts
│   ├── report.service.ts
│   └── accreditation.service.ts
│
├── hooks/
│   ├── use-auth.ts
│   ├── use-role.ts
│   ├── use-courses.ts
│   └── use-enrollments.ts
│
├── types/
│   └── index.ts                       # TypeScript types
│
├── data/                              # Hardcoded data (Phase 1)
│   ├── courses.ts
│   ├── schedules.ts
│   ├── testimonials.ts
│   └── navLinks.ts
│
└── utils/
    ├── helpers.ts
    └── constants.ts
🔑 Key Middleware Logic
src/middleware.ts – This is the gatekeeper that routes users to the correct dashboard based on their role:

typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const roleRedirects: Record<string, string> = {
  ADMIN: "/dashboard/admin",
  SUPER_ADMIN: "/dashboard/admin",
  FACILITATOR: "/dashboard/facilitator",
  ASSESSOR: "/dashboard/assessor",
  MODERATOR: "/dashboard/moderator",
  LEARNER: "/dashboard/learner",
};

const rolePaths: Record<string, string[]> = {
  ADMIN: ["/dashboard/admin", "/api/admin"],
  SUPER_ADMIN: ["/dashboard/admin", "/api/admin"],
  FACILITATOR: ["/dashboard/facilitator", "/api/facilitator"],
  ASSESSOR: ["/dashboard/assessor", "/api/assessor"],
  MODERATOR: ["/dashboard/moderator", "/api/moderator"],
  LEARNER: ["/dashboard/learner", "/api/learner"],
};

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // 1. Public routes - accessible to everyone
  const publicPaths = ["/", "/courses", "/apply", "/contact", "/about", "/auth/login", "/auth/register"];
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // 2. Auth pages - redirect to dashboard if already logged in
  const authPaths = ["/auth/login", "/auth/register", "/auth/forgot-password"];
  if (authPaths.some((p) => pathname.startsWith(p))) {
    if (session) {
      const role = session.user?.role || "LEARNER";
      return NextResponse.redirect(new URL(roleRedirects[role] || "/dashboard/learner", request.url));
    }
    return NextResponse.next();
  }

  // 3. Protected routes - require authentication
  if (!session) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // 4. Role-based access control
  const userRole = session.user?.role || "LEARNER";
  const allowedPaths = rolePaths[userRole] || [];

  // Special case: /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // If user tries to access another role's dashboard, redirect to their own
    if (!pathname.startsWith(`/dashboard/${userRole.toLowerCase()}`) && userRole !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL(roleRedirects[userRole] || "/dashboard/learner", request.url));
    }
  }

  // Check if user has permission for this path
  const isAllowed = allowedPaths.some((p) => pathname.startsWith(p));
  if (!isAllowed && !(userRole === "SUPER_ADMIN" && pathname.startsWith("/dashboard/admin"))) {
    return NextResponse.redirect(new URL("/dashboard/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
🎯 Dashboard Layout with Role-Based Sidebar
src/app/(dashboard)/layout.tsx – Shared dashboard layout:

tsx
"use client";

import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const role = session?.user?.role || "LEARNER";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader role={role} />
      <div className="flex">
        <DashboardSidebar role={role} />
        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
📱 Role-Based Sidebar Navigation
src/components/layout/dashboard-sidebar.tsx:

tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: Record<string, NavItem[]> = {
  ADMIN: [
    { label: "Dashboard", href: "/dashboard/admin", icon: "📊" },
    { label: "Learners", href: "/dashboard/admin/learners", icon: "👤" },
    { label: "Courses", href: "/dashboard/admin/courses", icon: "📚" },
    { label: "Enrollments", href: "/dashboard/admin/enrollments", icon: "📝" },
    { label: "Facilitators", href: "/dashboard/admin/facilitators", icon: "🧑‍🏫" },
    { label: "Assessors", href: "/dashboard/admin/assessors", icon: "✅" },
    { label: "Schedules", href: "/dashboard/admin/schedules", icon: "📅" },
    { label: "Accreditation", href: "/dashboard/admin/accreditation", icon: "🏅" },
    { label: "Reports", href: "/dashboard/admin/reports", icon: "📄" },
    { label: "Settings", href: "/dashboard/admin/settings", icon: "⚙️" },
  ],
  FACILITATOR: [
    { label: "Dashboard", href: "/dashboard/facilitator", icon: "📊" },
    { label: "Interventions", href: "/dashboard/facilitator/interventions", icon: "📋" },
    { label: "Learners", href: "/dashboard/facilitator/learners", icon: "👤" },
    { label: "Attendance", href: "/dashboard/facilitator/attendance", icon: "✅" },
    { label: "Resources", href: "/dashboard/facilitator/resources", icon: "📁" },
  ],
  ASSESSOR: [
    { label: "Dashboard", href: "/dashboard/assessor", icon: "📊" },
    { label: "Assessments", href: "/dashboard/assessor/assessments", icon: "📝" },
    { label: "POEs", href: "/dashboard/assessor/poe", icon: "📄" },
    { label: "Feedback", href: "/dashboard/assessor/feedback", icon: "💬" },
  ],
  MODERATOR: [
    { label: "Dashboard", href: "/dashboard/moderator", icon: "📊" },
    { label: "Moderation", href: "/dashboard/moderator/moderation", icon: "🔍" },
    { label: "Reports", href: "/dashboard/moderator/reports", icon: "📄" },
  ],
  LEARNER: [
    { label: "Dashboard", href: "/dashboard/learner", icon: "📊" },
    { label: "My Courses", href: "/dashboard/learner/courses", icon: "📚" },
    { label: "My POEs", href: "/dashboard/learner/poe", icon: "📄" },
    { label: "Assessments", href: "/dashboard/learner/assessments", icon: "📝" },
    { label: "Certificates", href: "/dashboard/learner/certificates", icon: "🎓" },
  ],
};

export function DashboardSidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const items = navItems[role] || navItems.LEARNER;

  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 hidden lg:block">
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#84ba3f]/10 text-[#84ba3f] dark:bg-[#84ba3f]/20"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
🔀 Parallel Routing for Role Switching
You can also use Parallel Routes for a dashboard that changes content based on role without full page reload, but the above approach (separate route groups) is simpler and more SEO-friendly for the public parts.

✅ Summary: What This Structure Gives You
Feature	Implementation
Single URL	Same domain for all roles
Role-Based Access	Middleware redirects and protects routes
Separate Dashboards	Different nav and content per role
Shared Components	UI library reused across all parts
SEO-Friendly	Public pages are Server Components
Scalable	Easy to add new roles (e.g., Mentor, QA Officer)
API First	Clean separation between frontend and API routes