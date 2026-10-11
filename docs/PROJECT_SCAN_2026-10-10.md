# Ndzalama Training MIS - Comprehensive Project Scan

**Date:** October 10, 2026  
**Scanned By:** AI Lead Full-Stack Engineer  
**Purpose:** Complete codebase review for UI redesign & LMIS functional enhancements

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Technology Stack](#2-technology-stack)
3. [Project Architecture](#3-project-architecture)
4. [Database Schema Analysis](#4-database-schema-analysis)
5. [Application Route Structure](#5-application-route-structure)
6. [Authentication & Authorization](#6-authentication--authorization)
7. [UI/UX Current State](#7-uiux-current-state)
8. [Component Architecture](#8-component-architecture)
9. [Data Management](#9-data-management)
10. [API Endpoints](#10-api-endpoints)
11. [File Storage & Assets](#11-file-storage--assets)
12. [Course Content Structure](#12-course-content-structure)
13. [Gap Analysis vs Requirements](#13-gap-analysis-vs-requirements)
14. [Implementation Roadmap](#14-implementation-roadmap)

---

## 1. Executive Summary

### 1.1 Project Overview

**Ndzalama Training MIS** is a unified platform serving as:
- **Public Discovery Portal:** Marketing site with dynamic course catalogue
- **LMIS (Learner & Labour Market Information System):** Full learner lifecycle management with SETA/QCTO compliance
- **LMS (Learning Management System):** Digital course delivery with assessment workflows

### 1.2 Current State

**Development Phase:** Active Development  
**Database Status:** PostgreSQL schema defined via Prisma, migrations exist  
**Deployment:** Configured for Vercel with Neon serverless PostgreSQL  
**Authentication:** NextAuth v5 with JWT strategy  
**Role System:** 10 distinct roles with middleware-based RBAC

### 1.3 Key Findings

✅ **Strengths:**
- Well-structured database schema with comprehensive relationships
- Clear role-based access control implementation
- Modular component architecture
- Separation of concerns (public/auth/dashboard route groups)
- Comprehensive Prisma schema with SETA compliance fields

⚠️ **Areas Requiring Attention:**
- **Color system** uses `#006600` and `#84ba3f` but needs migration to `#1B3B1B` and `#7BC62D`
- **No Tailwind config file** - using Tailwind v4 inline theming
- **File upload/storage** infrastructure not fully implemented
- **StatsSA controlled dropdowns** not implemented
- **Student ID as primary identifier** partially implemented
- **Multi-course enrollment** schema ready but UI incomplete
- **Assessment grading color hierarchy** not enforced
- **SMS notification** infrastructure missing

---

## 2. Technology Stack

### 2.1 Core Framework

| Layer | Technology | Version | Notes |
|-------|------------|---------|-------|
| **Framework** | Next.js | 16.3.1 | App Router, React Server Components |
| **Runtime** | React | 19.2.8 | Latest React 19 features |
| **Language** | TypeScript | 5.x | Strict mode enabled |
| **Build Tool** | Next.js native | - | Turbopack available |

### 2.2 Database & ORM

| Component | Technology | Configuration |
|-----------|------------|---------------|
| **Database** | PostgreSQL | Neon serverless |
| **ORM** | Prisma | 6.19.3 |
| **Migrations** | Prisma Migrate | Manual SQL also available |
| **Connection** | Direct + Pooled | `DATABASE_URL` + `DATABASE_URL_UNPOOLED` |

### 2.3 Authentication & Authorization

| Component | Implementation | Strategy |
|-----------|----------------|----------|
| **Auth Framework** | NextAuth v5 | `@auth/core` beta |
| **Adapter** | `@auth/prisma-adapter` | 2.11.3 |
| **Session** | JWT | Server-side validation |
| **Password Hash** | bcryptjs | 3.0.3 |

### 2.4 Styling & UI

| Component | Technology | Version | Notes |
|-----------|------------|---------|-------|
| **CSS Framework** | Tailwind CSS | 4.x | Latest v4 with inline theming |
| **PostCSS** | @tailwindcss/postcss | 4.x | - |
| **Utility** | clsx + tailwind-merge | Latest | Combined via `cn()` helper |
| **Icons** | react-icons | 5.5.0 | Font Awesome, etc. |

### 2.5 State & Data Fetching

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Server State** | TanStack React Query | 5.101.4 | Client-side data fetching |
| **Forms** | React Hook Form | 7.85.0 | Form management |
| **Validation** | Zod | 4.4.3 | Schema validation |
| **Toasts** | react-hot-toast | 2.6.0 | User notifications |

### 2.6 Development Tools

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

---

## 3. Project Architecture

### 3.1 Folder Structure

```
Ndzalama-MIS/
├── docs/                              # Documentation & course content
│   ├── NDZALAMA_SYSTEM_BLUEPRINT_AND_SCHEMA.md
│   ├── ADMIN_CURRICULUM_BUILDER_IMPLEMENTATION.md
│   ├── courses/                       # Physical course materials
│   │   └── 101321 OC - Training Development Practitioner/
│   │       ├── 242401001-KM-01/       # Knowledge Module files
│   │       ├── 242401001-KM-02/
│   │       └── ... (KM-03 to KM-06)
│   ├── forms/                         # Admin forms
│   ├── organisation/                  # Org documents
│   ├── pricing/                       # Pricing sheets
│   ├── schedules/                     # Training schedules
│   └── wetransfer/                    # File drops
│
├── migrations/                        # Raw SQL migrations
│   └── 20260819_ndzalama_init_schema.sql
│
├── prisma/
│   ├── schema.prisma                  # Comprehensive schema
│   ├── migrations/                    # Prisma migration history
│   ├── seed.ts                        # Database seeding script
│   └── seed.md                        # Seed documentation
│
├── public/
│   └── images/                        # Static assets
│
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (public)/                  # Public marketing site
│   │   │   ├── page.tsx               # Homepage
│   │   │   ├── about/
│   │   │   ├── courses/               # Course catalogue
│   │   │   ├── posts/                 # Blog/news
│   │   │   ├── verify/                # Certificate verification
│   │   │   └── ... (other public pages)
│   │   │
│   │   ├── (auth)/                    # Auth pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   ├── (dashboard)/               # Admin/Staff dashboards
│   │   │   ├── admin/
│   │   │   ├── assessor/
│   │   │   ├── facilitator/
│   │   │   └── moderator/
│   │   │
│   │   ├── admin/                     # Admin management
│   │   │   └── programmes/            # Curriculum builder
│   │   │
│   │   ├── learn/                     # Learner LMS portal
│   │   │   ├── page.tsx               # LMS landing
│   │   │   ├── dashboard/             # Learner dashboard
│   │   │   └── courses/               # Learner course view
│   │   │
│   │   ├── api/
│   │   │   └── auth/                  # NextAuth API routes
│   │   │
│   │   ├── globals.css                # Global styles
│   │   └── layout.tsx                 # Root layout
│   │
│   ├── components/
│   │   ├── admin/                     # Admin components
│   │   ├── common/                    # Shared components
│   │   ├── layout/                    # Layout components
│   │   │   ├── public-header.tsx
│   │   │   ├── public-footer.tsx
│   │   │   ├── dashboard-header.tsx
│   │   │   ├── dashboard-sidebar.tsx
│   │   │   └── learn-header.tsx
│   │   ├── learn/                     # LMS components
│   │   └── ui/                        # Primitive UI components
│   │
│   ├── context/
│   │   ├── demo-auth-context.tsx      # Dev role switcher
│   │   └── session-provider.tsx       # NextAuth provider
│   │
│   ├── data/                          # Static data
│   │   ├── courses.ts
│   │   ├── testimonials.ts
│   │   ├── accreditationServices.ts
│   │   ├── schedules.ts
│   │   └── navLinks.ts
│   │
│   ├── lib/                           # Utilities
│   │   ├── prisma.ts                  # Prisma client
│   │   ├── utils.ts                   # Helper functions
│   │   ├── student_number.ts          # Student ID generator
│   │   └── offline_data.ts            # Fallback data
│   │
│   ├── types/                         # TypeScript types
│   │   └── next-auth.d.ts             # NextAuth type extensions
│   │
│   ├── auth.ts                        # NextAuth config
│   └── middleware.ts                  # Route protection
│
├── .env                               # Environment variables
├── .env.local                         # Local overrides
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── AGENTS.md                          # Agent guidelines
└── README.md
```

### 3.2 Route Groups Architecture

Next.js route groups provide layout isolation:

| Route Group | Purpose | Layout | Auth Required |
|-------------|---------|--------|---------------|
| `(public)` | Marketing, course catalogue, blog | Public header/footer | No |
| `(auth)` | Login, register | Minimal auth layout | No |
| `(dashboard)` | Admin/staff workspaces | Dashboard shell (sidebar) | Yes |
| `learn` | Learner LMS portal | LMS header/sidebar | Yes (LEARNER) |
| `admin` | Admin management tools | Admin shell | Yes (ADMIN roles) |

---

## 4. Database Schema Analysis

### 4.1 Schema Statistics

- **Total Models:** 41
- **Total Enums:** 19
- **Relationships:** Extensive many-to-many and one-to-many
- **Compliance:** SETA NLRD, QCTO, POPIA fields included

### 4.2 Core Entity Groups

#### 4.2.1 Identity & Authentication

```prisma
model User {
  id           String    @id @default(cuid())
  email        String    @unique        // Personal email
  orgEmail     String?   @unique        // Org email (e.g., 202600123@ndzalama.org.za)
  passwordHash String?
  role         UserRole  @default(LEARNER)
  isActive     Boolean   @default(true)
  
  profile      Profile?
  accounts     Account[]
  sessions     Session[]
  // ... extensive relations
}

model Profile {
  id                   String              @id @default(cuid())
  userId               String              @unique
  studentNumber        String?             @unique
  idNumber             String?             @unique  // SA ID or Passport
  
  // Demographics (SETA NLRD compliant)
  firstName            String
  lastName             String
  idOrPassportNumber   String              @unique
  dateOfBirth          DateTime
  gender               Gender
  equity               EquityGroup
  citizenStatus        CitizenStatus
  disability           DisabilityType
  socioEconomicStatus  SocioEconomicStatus
  
  // Contact
  phone                String
  streetAddress        String
  province             String
  municipality         String?
  
  // Compliance
  popiaConsentSigned   Boolean             @default(false)
  popiaConsentDate     DateTime?
}
```

**Key Observations:**
- ✅ Dual email system (personal + org)
- ✅ `studentNumber` field exists
- ⚠️ `idNumber` and `idOrPassportNumber` are duplicated (needs consolidation)
- ✅ Comprehensive SETA demographic fields
- ⚠️ `municipality` exists but StatsSA controlled dropdowns not enforced

#### 4.2.2 Role System

```prisma
enum UserRole {
  SUPER_ADMIN
  ADMIN
  REGISTRAR
  FINANCE_OFFICER
  FACILITATOR
  ASSESSOR
  MODERATOR
  SME_MENTOR
  HOST_EMPLOYER
  LEARNER
  PROSPECTIVE_LEARNER
}
```

**All 11 roles defined and used in middleware**

#### 4.2.3 Curriculum & Qualification Structure

```prisma
model Qualification {
  id                String                 @id
  code              String                 @unique
  saqaId            String?                @unique
  title             String
  framework         QualificationFramework
  nqfLevel          Int
  credits           Int
  durationMonths    Int
  deliveryMode      ProgrammeDeliveryMode
  status            QualificationStatus    // DEVELOPMENT/ACTIVE/ARCHIVED
  
  modules           CourseModule[]
  cohorts           Cohort[]
  enrollments       Enrollment[]
}

model CourseModule {
  id              String          @id
  qualificationId String
  moduleCode      String          // e.g., "KM-01"
  title           String
  category        ModuleCategory
  type            ModuleType      // KNOWLEDGE/PRACTICAL/WORK_EXPERIENCE
  credits         Int
  notionalHours   Int
  
  topics          Topic[]
  lessons         Lesson[]
  assessmentTasks AssessmentTask[]
}

model Topic {
  id       String       @id
  title    String
  order    Int
  moduleId String
  lessons  Lesson[]
}

model Lesson {
  id              String   @id
  moduleId        String
  topicId         String?
  title           String
  orderIndex      Int
  durationMinutes Int
  contentBody     String?  @db.Text
  
  resources       LessonResource[]
  progressRecords LessonProgress[]
}
```

**Observations:**
- ✅ Full hierarchical structure: Qualification → Module → Topic → Lesson
- ✅ Admin curriculum builder implemented
- ✅ Module types support KM/PM/WEM breakdown
- ✅ Flexible resource attachment at multiple levels

#### 4.2.4 Enrollment & Learner Management

```prisma
model Application {
  id                  String             @id
  applicationNumber   String             @unique
  applicantId         String
  qualificationId     String
  status              ApplicationStatus
  fundingType         String
  
  // Document uploads
  idDocumentUrl       String?
  matricCertificateUrl String?
  cvUrl               String?
  proofOfPaymentUrl   String?
}

model Enrollment {
  id                  String             @id
  enrollmentNumber    String             @unique
  learnerId           String
  qualificationId     String
  cohortId            String?
  hostEmployerId      String?
  status              EnrollmentStatus
  startDate           DateTime
  completionDate      DateTime?
  
  submissions         AssessmentSubmission[]
  lessonProgress      LessonProgress[]
  workplacePlacement  WorkplacePlacement?
  certificates        Certificate[]
  
  @@unique([learnerId, qualificationId])
}
```

**Observations:**
- ✅ Application → Enrollment pipeline defined
- ✅ Document upload fields present
- ⚠️ File storage service not implemented
- ✅ Multi-course enrollment supported via unique constraint
- ✅ Host employer relationship included

#### 4.2.5 Assessment & Moderation

```prisma
model AssessmentTask {
  id             String              @id
  moduleId       String
  title          String
  kind           AssessmentKind      // FORMATIVE/SUMMATIVE/FISA
  maxMarks       Int
  totalMarks     Int
  passPercentage Int
  rubricCriteria Json
  
  submissions    AssessmentSubmission[]
}

model AssessmentSubmission {
  id              String              @id
  taskId          String
  enrollmentId    String
  attemptNumber   Int
  fileUrls        String[]            // Multiple PoE files
  submittedAt     DateTime
  outcome         AssessmentOutcome
  scoreAchieved   Decimal?
  
  assessorReview   AssessmentReview?
  moderationReview ModerationReview?
}

model AssessmentReview {
  id                String   @id
  submissionId      String   @unique
  assessorId        String
  isCompetent       Boolean
  marksAwarded      Decimal
  feedbackReport    String   @db.Text
  assessorSignature String
  reviewedAt        DateTime
}

model ModerationReview {
  id                 String             @id
  submissionId       String             @unique
  moderatorId        String
  decision           ModerationDecision  // UPHELD/OVERTURNED
  moderationReport   String             @db.Text
  moderatorSignature String
  moderatedAt        DateTime
}
```

**Observations:**
- ✅ Complete PoE submission workflow
- ✅ Assessor and moderator review separation
- ✅ Digital signatures captured
- ⚠️ Digital pen color hierarchy not enforced (requires front-end annotation tool)
- ⚠️ Learner folder/profile file storage not implemented

#### 4.2.6 Certificates & Verification

```prisma
model Certificate {
  id                 String   @id
  certificateNumber  String   @unique
  verificationHash   String   @unique  // SHA-256 for QR verification
  learnerId          String
  enrollmentId       String
  issueDate          DateTime
  pdfDownloadUrl     String
  setaEndorsementRef String?
}
```

**Observations:**
- ✅ Public verification via hash ready
- ✅ SETA endorsement tracking included
- ⚠️ Certificate generation workflow not implemented
- ⚠️ PDF generation service missing

### 4.3 Schema Gaps vs Requirements

| Requirement | Schema Status | Notes |
|-------------|---------------|-------|
| Student ID as primary identifier | ⚠️ Partial | `studentNumber` exists but not enforced |
| Multi-course enrollment | ✅ Ready | Unique constraint supports it |
| StatsSA controlled fields | ❌ Missing | No enum/lookup tables for municipality codes |
| Learner folder storage | ❌ Missing | No `LearnerFile` or storage service model |
| Physical assessment upload | ⚠️ Partial | `fileUrls` array exists, storage not implemented |
| QCTO verification workflow | ❌ Missing | No verification status field in enrollment |
| Digital pen color metadata | ❌ Missing | No annotation metadata model |
| SMS notification tracking | ❌ Missing | No notification log model |

---

## 5. Application Route Structure

### 5.1 Public Routes

| Route | Component | Purpose | Auth |
|-------|-----------|---------|------|
| `/` | `(public)/page.tsx` | Homepage | No |
| `/about` | `(public)/about/page.tsx` | About company | No |
| `/courses` | `(public)/courses/page.tsx` | Course catalogue | No |
| `/courses/[slug]` | `(public)/courses/[slug]/page.tsx` | Course detail | No |
| `/posts` | `(public)/posts/page.tsx` | Blog/news listing | No |
| `/posts/[slug]` | `(public)/posts/[slug]/page.tsx` | Post detail | No |
| `/verify` | `(public)/verify/page.tsx` | Certificate verification | No |
| `/contact` | `(public)/contact/page.tsx` | Contact form | No |
| `/why-choose-us` | `(public)/why-choose-us/page.tsx` | Value proposition | No |
| `/faq` | `(public)/faq/page.tsx` | FAQ | No |
| `/accreditation-services` | `(public)/accreditation-services/page.tsx` | Accreditation info | No |

### 5.2 Authentication Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/login` | `(auth)/login/page.tsx` | Login form |
| `/register` | `(auth)/register/page.tsx` | Registration form |
| `/api/auth/[...nextauth]` | API route | NextAuth handlers |
| `/api/auth/register` | API route | Registration endpoint |

### 5.3 Learner LMS Routes

| Route | Component | Purpose | Role |
|-------|-----------|---------|------|
| `/learn` | `learn/page.tsx` | LMS landing | Public |
| `/learn/dashboard` | `learn/dashboard/page.tsx` | Learner dashboard | LEARNER |
| `/learn/courses` | `learn/courses/page.tsx` | Browse courses | Public |
| `/learn/my-courses` | TBD | Enrolled courses | LEARNER |
| `/learn/assessments` | TBD | Assessment submissions | LEARNER |
| `/learn/certificates` | TBD | Certificates | LEARNER |
| `/learn/profile` | TBD | Learner profile | LEARNER |

**Status:** LMS routes partially implemented, core learner workflows incomplete

### 5.4 Admin Routes

| Route | Component | Purpose | Roles |
|-------|-----------|---------|-------|
| `/admin` | `(dashboard)/admin/page.tsx` | Admin dashboard | ADMIN, SUPER_ADMIN, REGISTRAR |
| `/admin/programmes` | `admin/programmes/page.tsx` | Qualification list | ADMIN roles |
| `/admin/programmes/new` | `admin/programmes/new/page.tsx` | Create qualification | ADMIN roles |
| `/admin/programmes/[id]` | `admin/programmes/[id]/page.tsx` | Qualification detail | ADMIN roles |
| `/admin/modules/[id]` | `admin/modules/[id]/page.tsx` | Module editor | ADMIN roles |
| `/admin/learners` | TBD | Learner management | ADMIN, REGISTRAR |

**Status:** Curriculum builder complete, learner management routes incomplete

### 5.5 Role-Specific Dashboards

| Route | Role | Status |
|-------|------|--------|
| `/facilitator` | FACILITATOR | Skeleton only |
| `/assessor` | ASSESSOR | Skeleton only |
| `/moderator` | MODERATOR | Skeleton only |
| `/mentor` | SME_MENTOR | Not implemented |
| `/employer` | HOST_EMPLOYER | Not implemented |

---

## 6. Authentication & Authorization

### 6.1 NextAuth Configuration

**File:** `src/auth.ts`

```typescript
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [Credentials({...})],
  callbacks: {
    jwt: // Store role in token
    session: // Expose role in session
  }
});
```

**Features:**
- ✅ Dual email login (personal or org email)
- ✅ bcrypt password hashing
- ✅ Role stored in JWT
- ✅ Account deactivation check
- ⚠️ No OAuth providers (Google, Microsoft) configured
- ⚠️ No password reset flow
- ⚠️ No email verification

### 6.2 Middleware Protection

**File:** `src/middleware.ts`

**Key Logic:**
1. **Legacy redirects:** `/apply` → `/register`, `/learner` → `/learn/dashboard`
2. **Public routes:** Allow unauthenticated access
3. **Auth pages:** Redirect if already logged in
4. **Protected routes:** Redirect to login if not authenticated
5. **RBAC:** Check role against allowed roles per route

**Route → Role Mapping:**
```typescript
const roleRouteMap = {
  "/admin/programmes": ["SUPER_ADMIN", "ADMIN", "REGISTRAR"],
  "/admin": ["SUPER_ADMIN", "ADMIN", "REGISTRAR", "FINANCE_OFFICER"],
  "/facilitator": ["SUPER_ADMIN", "ADMIN", "FACILITATOR"],
  "/learn/dashboard": ["LEARNER", "SUPER_ADMIN", "ADMIN"],
  // ...
};
```

**Default Route by Role:**
```typescript
function getDefaultRoute(role) {
  switch(role) {
    case "LEARNER": return "/learn/dashboard";
    case "ADMIN": return "/admin";
    case "FACILITATOR": return "/facilitator";
    // ...
  }
}
```

**Observations:**
- ✅ Comprehensive role-based routing
- ✅ Clear separation between public, LMS, and admin areas
- ✅ Middleware logs routing decisions (helpful for debugging)
- ⚠️ Middleware matcher excludes static assets correctly

### 6.3 Session Management

**Provider:** `src/context/session-provider.tsx`

```tsx
'use client';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

export function SessionProvider({ children, session }) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
```

**Usage in root layout:** Wraps entire app to provide session context

---

## 7. UI/UX Current State

### 7.1 Color Palette Analysis

#### Current Colors (In Use)

```css
/* globals.css */
:root {
  --background: #ffffff;
  --foreground: #171717;
}

/* Component usage (from public-header.tsx, page.tsx) */
--primary-green: #006600      /* Top bar, hero backgrounds */
--accent-green: #84ba3f       /* Buttons, hovers, active states */
--soft-mint: #eef6df          /* Accent sections */
--dark-text: #333             /* Body text */
--blue-accent: #03367A        /* Secondary sections */
```

#### Required Colors (From Specification)

```css
--primary-brand: #1B3B1B      /* Deep Forest Green */
--secondary-accent: #7BC62D   /* Vibrant Leaf/Lime Green */
--neutral-tint: #E8F0E8       /* Soft Mint/Pale Sage */
--dark-neutral: #222222       /* Typography */
```

#### Color Migration Required

| Element | Current | Required | Priority |
|---------|---------|----------|----------|
| Hero background | `#006600` | `#1B3B1B` | High |
| Navigation bar | `#006600` | `#1B3B1B` | High |
| Primary CTA buttons | `#84ba3f` | `#7BC62D` | High |
| Hover states | `#84ba3f` | `#7BC62D` | High |
| Section backgrounds | `#eef6df` | `#E8F0E8` | Medium |
| Body text | `#333` | `#222222` | Low |

### 7.2 Typography

**Current Implementation:**
```css
body {
  font-family: Arial, Helvetica, sans-serif;
}
```

**Observations:**
- ⚠️ Generic system fonts only
- ❌ No custom brand fonts loaded
- ❌ No font size scale defined
- ❌ No typography utility classes

**Recommendation:** Define a modern sans-serif stack (Inter, Geist, or similar)

### 7.3 Component Design System

**Current UI Components:**

| Component | Location | Status | Notes |
|-----------|----------|--------|-------|
| Button | `ui/button.tsx` | ✅ Basic | Needs variant system |
| Container | `ui/container.tsx` | ✅ Complete | Max-width wrapper |
| SectionTitle | `ui/section-title.tsx` | ✅ Complete | Heading component |
| CourseCard | `common/course-card.tsx` | ✅ Complete | Course display |
| TestimonialCard | `common/testimonial-card.tsx` | ✅ Complete | Testimonial display |
| AwardLogoStrip | `common/award-logo-strip.tsx` | ✅ Complete | Partner logos |

**Missing Components:**
- ❌ Form input components (text, select, checkbox, radio)
- ❌ Modal/Dialog
- ❌ Dropdown menu (using manual implementation)
- ❌ Tabs
- ❌ Badge/Tag
- ❌ Alert/Toast (using react-hot-toast)
- ❌ Progress bar
- ❌ File upload widget
- ❌ Document annotation tool

### 7.4 Layout Components

#### Public Header (`layout/public-header.tsx`)

**Features:**
- ✅ Top contact bar (email, phone, WhatsApp)
- ✅ Social media links
- ✅ Mega menu for courses
- ✅ Dropdown for About and Accreditation
- ✅ Mobile hamburger menu
- ✅ Logged-in learner badge
- ✅ Responsive design

**Current Colors:**
```tsx
bg-[#006600]      // Top bar - needs #1B3B1B
text-[#84ba3f]    // Links/hovers - needs #7BC62D
bg-[#84ba3f]      // CTA buttons - needs #7BC62D
```

**Missing from Spec:**
- ❌ "How Can We Help You?" dual-audience paths
- ❌ Training delivery badges (In-person, Virtual, On-site, Online)
- ❌ SETA/QCTO category organization in mega-menu
- ❌ Course metadata (Programme Code, NQF Level, Credits) in dropdowns

#### Dashboard Layouts

**Admin Dashboard Shell** (`(dashboard)/layout.tsx`):
- ✅ Sidebar navigation
- ✅ Top header with user menu
- ✅ Role-based menu items
- ⚠️ Color scheme needs update

**Learner LMS Shell** (`learn/layout.tsx` + `learn/dashboard/layout.tsx`):
- ✅ LMS-specific header
- ✅ Dashboard sidebar
- ✅ Separate experience from public site
- ⚠️ Incomplete navigation items

### 7.5 Responsive Design

**Breakpoints** (Tailwind defaults):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Mobile Navigation:**
- ✅ Hamburger menu implemented
- ✅ Accordion-style dropdowns on mobile
- ✅ Touch-friendly spacing
- ⚠️ Some desktop components not optimized for mobile

---

## 8. Component Architecture

### 8.1 Layout Components

#### Public Layout

```
<PublicHeader />
  → Top contact bar (hidden on mobile)
  → Main nav with logo
  → Desktop: Horizontal nav with dropdowns
  → Mobile: Hamburger menu

<main>{children}</main>

<PublicFooter />
  → Footer content
```

#### Dashboard Layout

```
<DashboardHeader />
  → Logo
  → Breadcrumbs
  → User menu

<div className="flex">
  <DashboardSidebar />
    → Role-based nav items
    → Active route highlighting
  
  <main>{children}</main>
</div>
```

#### LMS Layout

```
<LearnHeader />
  → LMS branding
  → Learner profile
  → Notifications

<div className="flex">
  <LearnDashboardSidebar />
    → Course navigation
    → Progress indicators
  
  <main>{children}</main>
</div>
```

### 8.2 Common Components

**Course Card** (`common/course-card.tsx`):
```tsx
<CourseCard course={course} />
// Displays: title, category, NQF level, credits, duration, price
```

**Testimonial Card** (`common/testimonial-card.tsx`):
```tsx
<TestimonialCard testimonial={testimonial} />
// Displays: quote, author name, position, photo
```

### 8.3 Admin Components

**Location:** `src/components/admin/`

**Curriculum Forms** (`admin/programmes/forms.tsx`):
- QualificationForm
- ModuleForm
- TopicForm
- LessonForm
- AssessmentTaskForm

**Features:**
- Server actions integration
- Zod validation
- Error handling
- Loading states

---

## 9. Data Management

### 9.1 Static Data Files

**Courses** (`src/data/courses.ts`):
```typescript
export const courses: Course[] = [
  {
    id: '1',
    slug: 'occupational-certificate-training-development-practitioner',
    title: 'Occupational Certificate: Training Development Practitioner',
    category: 'Occupational Certificates',
    framework: 'QCTO',
    code: '101321',
    nqfLevel: 5,
    credits: 190,
    // ...
  },
  // ... more courses
];
```

**Observations:**
- ✅ Hard-coded course data
- ⚠️ Not synchronized with database
- ⚠️ Needs migration to database-driven catalogue

**Other Data Files:**
- `testimonials.ts`: Client testimonials
- `accreditationServices.ts`: Service offerings
- `schedules.ts`: Training schedules
- `navLinks.ts`: Navigation structure

### 9.2 Seed Data

**File:** `prisma/seed.ts`

**Seeded Data:**
- ✅ Sample users (all roles)
- ✅ Complete curriculum for SAQA 101321
- ✅ 7 knowledge modules (KM-01 to KM-07)
- ✅ Topics and lessons per module
- ✅ Sample resources
- ✅ Assessment tasks

**Seed Command:**
```bash
npx tsx prisma/seed.ts
```

### 9.3 Server Actions

**Curriculum Actions** (`src/app/admin/programmes/actions.ts`):

All server actions follow this pattern:
```typescript
export async function createQualification(data: QualificationInput) {
  // 1. Verify auth & role
  const session = await auth();
  if (!session || !hasAdminAccess(session.user.role)) {
    return { ok: false, error: "Unauthorized" };
  }
  
  // 2. Validate input
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return { ok: false, error: validated.error.message };
  }
  
  // 3. Database operation
  try {
    const qualification = await prisma.qualification.create({
      data: validated.data
    });
    
    // 4. Audit log
    await prisma.auditLog.create({...});
    
    // 5. Revalidate cache
    revalidatePath('/admin/programmes');
    
    return { ok: true, id: qualification.id };
  } catch (error) {
    // Handle Prisma errors
    return { ok: false, error: "Database error" };
  }
}
```

**Available Actions:**
- `createQualification`
- `updateQualification`
- `setQualificationStatus`
- `createCourseModule`
- `updateCourseModule`
- `createTopic`, `updateTopic`
- `createLesson`, `updateLesson`
- `addLessonResource`, `removeLessonResource`
- `createAssessmentTask`, `updateAssessmentTask`

---

## 10. API Endpoints

### 10.1 NextAuth Endpoints

**Base:** `/api/auth`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handlers (signin, callback, session) |
| `/api/auth/register` | POST | User registration |

### 10.2 Custom API Routes

**Status:** Minimal custom API routes implemented

**Missing API Routes:**
- ❌ `/api/courses` - Course catalogue API
- ❌ `/api/enrollments` - Enrollment management
- ❌ `/api/assessments` - Assessment submissions
- ❌ `/api/upload` - File upload endpoint
- ❌ `/api/notifications` - Notification delivery
- ❌ `/api/reports` - SETA reporting exports

**Recommendation:** Most data operations use server actions, API routes needed for:
- File uploads
- Webhook handlers
- Third-party integrations (SMS, payment gateways)
- Public certificate verification

---

## 11. File Storage & Assets

### 11.1 Static Assets

**Location:** `public/`

```
public/
├── images/
│   ├── brand/
│   │   └── logo.png
│   ├── backgrounds/
│   │   └── hero-02.jpg
│   └── team/
│       └── sanette-wevell.jpg
└── favicon.ico
```

### 11.2 File Upload Infrastructure

**Status:** ❌ Not Implemented

**Required:**
1. **Cloud Storage Service:**
   - Option A: AWS S3
   - Option B: Vercel Blob Storage
   - Option C: Cloudinary
   - Option D: Google Cloud Storage

2. **Learner Folder Structure:**
```
storage/
└── learners/
    └── {learnerId}/
        ├── documents/
        │   ├── id-document.pdf
        │   ├── matric-certificate.pdf
        │   └── cv.pdf
        ├── assessments/
        │   └── {moduleId}/
        │       ├── formative/
        │       │   └── {submissionId}/
        │       │       ├── submission.pdf
        │       │       └── assessor-feedback.pdf
        │       └── summative/
        │           └── {submissionId}/
        │               ├── submission.pdf
        │               ├── assessor-review.pdf
        │               └── moderator-review.pdf
        └── certificates/
            └── {certificateId}.pdf
```

3. **Upload API:**
```typescript
// POST /api/upload
{
  "file": File,
  "context": "learner-document" | "assessment-submission",
  "learnerId": string,
  "moduleId"?: string
}

// Response
{
  "url": string,
  "key": string
}
```

### 11.3 Document Generation

**Required:**
- ❌ Certificate PDF generation (jsPDF, Puppeteer, or LaTeX)
- ❌ Progress letter templates
- ❌ Results reports
- ❌ SETA compliance exports

---

## 12. Course Content Structure

### 12.1 Physical Course Materials

**Location:** `docs/courses/101321 OC - Training Development Practitioner/`

**Structure per Module:**
```
242401001-KM-01/
├── Facilitator Guide.docx
├── Learner Guide.docx
├── Learner Workbook.docx
├── Summative Assessment.docx
└── Summative Assessment Memo.docx
```

**Observations:**
- ✅ Complete curriculum for 6 knowledge modules
- ❌ Not digitized into database
- ❌ Not accessible in LMS
- ⚠️ Word documents need conversion to web format

### 12.2 Course Delivery Modes

**From Schema:**
```prisma
enum DeliveryMode {
  CONTACT_CLASSROOM
  DISTANCE_ONLINE
  BLENDED_HYBRID
  WORKPLACE_BASED
}
```

**Required UI Badges:**
- In-person (classroom icon)
- Virtual (video icon)
- On-site (location icon)
- Online (globe icon)

### 12.3 Module Breakdown

**From Specification:**
- **Knowledge Modules (KM):** Theory, facilitator-led
- **Practical Modules (PM):** Skills application
- **Work Experience Modules (WEM):** Workplace integration

**Schema Support:**
```prisma
enum ModuleType {
  KNOWLEDGE
  PRACTICAL
  WORK_EXPERIENCE
}
```

✅ Schema ready, UI needs implementation

---

## 13. Gap Analysis vs Requirements

### 13.1 Design System Requirements

| Requirement | Status | Gap | Priority |
|-------------|--------|-----|----------|
| Primary color `#1B3B1B` | ❌ Not implemented | Using `#006600` | P0 |
| Accent color `#7BC62D` | ❌ Not implemented | Using `#84ba3f` | P0 |
| Neutral tint `#E8F0E8` | ❌ Not implemented | Using `#eef6df` | P1 |
| Modern sans-serif font | ❌ Not implemented | Using Arial | P1 |
| Tagline "Building Skills. Transforming Futures." | ❌ Not present | Generic tagline | P1 |
| Hero copy: 20+ years experience | ⚠️ Partial | Says "10+ years" | P2 |
| Dual-audience user paths | ❌ Not implemented | Single CTA | P0 |
| Training delivery badges | ❌ Not implemented | Text only | P1 |
| Mega-menu by SETA category | ⚠️ Partial | By course category, not SETA | P1 |
| Course metadata display | ⚠️ Partial | Basic info, not full metadata | P1 |

### 13.2 Enrollment & Data Requirements

| Requirement | Status | Gap | Priority |
|-------------|--------|-----|----------|
| StatsSA controlled dropdowns | ❌ Not implemented | Free-text fields | P0 |
| Student ID as primary identifier | ⚠️ Schema ready | Not enforced in forms | P0 |
| Multi-course enrollment support | ✅ Schema ready | UI incomplete | P1 |
| Learner folder/profile storage | ❌ Not implemented | No file storage service | P0 |
| Physical assessment upload | ❌ Not implemented | No upload API | P0 |
| QCTO verification workflow | ❌ Not implemented | No verification status | P1 |
| Automated email on verification | ❌ Not implemented | No email service | P1 |
| File deletion after QCTO verify | ❌ Not implemented | No workflow | P2 |

### 13.3 Assessment & Grading Requirements

| Requirement | Status | Gap | Priority |
|-------------|--------|-----|----------|
| Digital pen color hierarchy | ❌ Not implemented | No annotation tool | P1 |
| Learner: Black `#000000` | ❌ Not implemented | - | P1 |
| Assessor: Red/Orange | ❌ Not implemented | - | P1 |
| Internal Moderator: Green | ❌ Not implemented | - | P1 |
| External Moderator: Purple | ❌ Not implemented | - | P1 |

### 13.4 Communication Requirements

| Requirement | Status | Gap | Priority |
|-------------|--------|-----|----------|
| Progress notification emails | ❌ Not implemented | No email service | P1 |
| Certificate ready email | ❌ Not implemented | No email service | P0 |
| Certificate ready SMS | ❌ Not implemented | No SMS service | P0 |
| SMS gateway integration | ❌ Not implemented | Twilio/Africa's Talking | P0 |

---

## 14. Implementation Roadmap

### Phase 1: Design System Update (Priority P0 - 2 days)

**Goal:** Update all UI components to new brand colors

**Tasks:**
1. ✅ Create Tailwind config with new color tokens
2. ✅ Update `globals.css` with CSS variables
3. ✅ Replace all color references in components:
   - PublicHeader
   - PublicFooter
   - Homepage
   - Button components
   - Dashboard layouts
4. ✅ Add modern font stack (Inter or Geist)
5. ✅ Update hero tagline and messaging

**Files to Modify:**
- `src/app/globals.css`
- Create `tailwind.config.ts`
- `src/components/layout/public-header.tsx`
- `src/components/layout/public-footer.tsx`
- `src/app/(public)/page.tsx`
- All button/CTA components

### Phase 2: Frontend UX Enhancements (Priority P0-P1 - 3 days)

**Goal:** Implement dual-audience paths and training badges

**Tasks:**
1. ✅ Add "How Can We Help You?" section to homepage:
   - Individual Learner path
   - Business/Corporate path
2. ✅ Create training delivery badge component
3. ✅ Update course cards with delivery badges
4. ✅ Reorganize mega-menu by SETA/QCTO categories
5. ✅ Add course metadata to dropdowns (Programme Code, NQF, Credits)
6. ✅ Update course detail pages with module breakdown (KM/PM/WEM)
7. ✅ Add "Download Outline" and "SAQA Link" buttons

**New Components:**
- `<AudiencePathSelector />`
- `<DeliveryBadge />`
- `<CourseMetadata />`
- `<ModuleBreakdown />`

### Phase 3: Database Schema Updates (Priority P0 - 1 day)

**Goal:** Add missing compliance and workflow fields

**Tasks:**
1. ✅ Add StatsSA lookup tables:
   - `StatsSAProvince`
   - `StatsSAMunicipality`
   - `StatsSAArea`
2. ✅ Update `Profile` model with StatsSA foreign keys
3. ✅ Add `Enrollment.qctoVerificationStatus` enum
4. ✅ Add `Enrollment.qctoVerificationDate`
5. ✅ Create `LearnerFile` model:
   ```prisma
   model LearnerFile {
     id         String   @id @default(cuid())
     learnerId  String
     category   FileCategory  // DOCUMENT, ASSESSMENT, CERTIFICATE
     fileKey    String
     fileUrl    String
     fileName   String
     fileSize   Int
     mimeType   String
     uploadedAt DateTime @default(now())
     deletedAt  DateTime?
   }
   ```
6. ✅ Create `NotificationLog` model for SMS/Email tracking
7. ✅ Run migration: `npx prisma migrate dev --name add_compliance_fields`

### Phase 4: File Storage Implementation (Priority P0 - 2 days)

**Goal:** Set up cloud storage and upload API

**Tasks:**
1. ✅ Choose storage provider (Vercel Blob recommended for Next.js)
2. ✅ Install SDK: `npm install @vercel/blob`
3. ✅ Create upload API: `/api/upload`
4. ✅ Create file upload component: `<FileUploadWidget />`
5. ✅ Implement learner folder structure
6. ✅ Add file management to admin panel
7. ✅ Implement file deletion on QCTO verification

**Environment Variables:**
```env
BLOB_READ_WRITE_TOKEN=vercel_blob_token
```

### Phase 5: Enrollment Flow Updates (Priority P0 - 3 days)

**Goal:** Implement controlled dropdowns and student ID enforcement

**Tasks:**
1. ✅ Seed StatsSA data (provinces, municipalities)
2. ✅ Create form components:
   - `<ProvinceSelect />`
   - `<MunicipalitySelect />`
   - `<AreaCodeSelect />`
3. ✅ Update registration form with StatsSA dropdowns
4. ✅ Add SA ID validation and auto-parsing:
   ```typescript
   function parseIdNumber(id: string) {
     // Extract date of birth, gender, citizenship
     // Generate student number from ID
   }
   ```
5. ✅ Update enrollment form to support multi-course selection
6. ✅ Add document upload to application form:
   - ID document
   - Matric certificate
   - CV
   - Proof of payment
7. ✅ Create admin verification workflow UI

### Phase 6: SMS & Email Notifications (Priority P0 - 2 days)

**Goal:** Implement automated communications

**Tasks:**
1. ✅ Choose SMS provider:
   - Option A: Twilio
   - Option B: Africa's Talking
2. ✅ Install SDK
3. ✅ Set up email service (Resend, SendGrid, or AWS SES)
4. ✅ Create notification service:
   ```typescript
   class NotificationService {
     async sendEmail(to, template, data) {}
     async sendSMS(to, message) {}
     async sendCertificateReady(learnerId) {}
   }
   ```
5. ✅ Create email templates:
   - Progress notification
   - Certificate ready
   - Enrollment confirmation
6. ✅ Add notification triggers:
   - Post-assessment (automated)
   - Certificate arrival (admin-triggered)
7. ✅ Log all notifications to `NotificationLog`

**Environment Variables:**
```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

### Phase 7: Assessment Workflow (Priority P1 - 4 days)

**Goal:** Implement PoE submission and review UI

**Tasks:**
1. ✅ Create learner assessment submission page
2. ✅ Build file upload for multiple PoE files
3. ✅ Create assessor review interface:
   - View submission files
   - Rubric scoring
   - Feedback form
   - Digital signature
4. ✅ Create moderator sampling interface
5. ✅ Implement assessment status tracking
6. ✅ Add automated notifications on status changes

**Note:** Digital pen annotation (PDF markup) is complex and may require third-party library (pdf.js, pdfTron, or PSPDFKit)

### Phase 8: Certificate Generation (Priority P1 - 2 days)

**Goal:** Automated certificate issuance

**Tasks:**
1. ✅ Choose PDF generation approach:
   - Option A: jsPDF (client-side)
   - Option B: Puppeteer (server-side, headless Chrome)
   - Option C: LaTeX (highest quality)
2. ✅ Design certificate template
3. ✅ Create certificate generation service:
   ```typescript
   async function generateCertificate(enrollmentId) {
     // Generate PDF
     // Upload to storage
     // Create Certificate record with hash
     // Send notification
   }
   ```
4. ✅ Implement QR code with verification hash
5. ✅ Create public verification page
6. ✅ Add admin trigger for certificate issuance

### Phase 9: LMS Course Delivery (Priority P1 - 5 days)

**Goal:** Complete learner course experience

**Tasks:**
1. ✅ Build learner course catalogue page
2. ✅ Create enrollment flow (1-click enroll)
3. ✅ Build module/lesson viewer:
   - Lesson content display
   - Resource downloads
   - Video embeds
   - Progress tracking
4. ✅ Implement lesson completion tracking
5. ✅ Create assessment submission from lesson
6. ✅ Build progress dashboard
7. ✅ Add certificate download

### Phase 10: Admin Learner Management (Priority P1 - 3 days)

**Goal:** Complete LMIS admin tools

**Tasks:**
1. ✅ Create learner list page with search/filter
2. ✅ Build learner profile viewer/editor
3. ✅ Create enrollment management:
   - Assign to cohort
   - Change status
   - View progress
4. ✅ Add document verification workflow
5. ✅ Create QCTO verification trigger
6. ✅ Build SETA NLRD export tool

### Phase 11: SETA Reporting (Priority P1 - 2 days)

**Goal:** Compliance reporting exports

**Tasks:**
1. ✅ Create NLRD export format (CSV/XML)
2. ✅ Build report generation UI
3. ✅ Add date range filtering
4. ✅ Implement batch export
5. ✅ Create report download

### Phase 12: Testing & Refinement (Priority P1 - 3 days)

**Goal:** End-to-end testing and bug fixes

**Tasks:**
1. ✅ Test complete learner journey
2. ✅ Test admin workflows
3. ✅ Test assessment and moderation flow
4. ✅ Verify RBAC across all routes
5. ✅ Mobile responsiveness check
6. ✅ Performance optimization
7. ✅ Accessibility audit (WCAG 2.1 AA)

---

## Appendix A: Environment Variables Reference

```env
# Database
DATABASE_URL=postgresql://...
DATABASE_URL_UNPOOLED=postgresql://...

# Authentication
AUTH_SECRET=random_secret_key
NEXTAUTH_URL=https://ndzalama.co.za

# File Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN=vercel_blob_token

# Email (Resend recommended)
RESEND_API_KEY=re_...

# SMS (Twilio or Africa's Talking)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+27...

# Optional: Payment Gateway
PAYFAST_MERCHANT_ID=...
PAYFAST_MERCHANT_KEY=...

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-...
```

---

## Appendix B: Component Inventory

### Layout Components
- ✅ `PublicHeader`
- ✅ `PublicFooter`
- ✅ `DashboardHeader`
- ✅ `DashboardSidebar`
- ✅ `LearnHeader`
- ✅ `LearnDashboardSidebar`

### UI Primitives
- ✅ `Button`
- ✅ `Container`
- ✅ `SectionTitle`
- ❌ `Input`
- ❌ `Select`
- ❌ `Checkbox`
- ❌ `Radio`
- ❌ `Textarea`
- ❌ `Modal`
- ❌ `Dropdown`
- ❌ `Tabs`
- ❌ `Badge`
- ❌ `Alert`
- ❌ `Progress`

### Business Components
- ✅ `CourseCard`
- ✅ `TestimonialCard`
- ✅ `AwardLogoStrip`
- ❌ `DeliveryBadge`
- ❌ `CourseMetadata`
- ❌ `ModuleBreakdown`
- ❌ `FileUploadWidget`
- ❌ `DocumentViewer`
- ❌ `AssessmentSubmissionForm`
- ❌ `RubricScorer`

### Admin Components
- ✅ `QualificationForm`
- ✅ `ModuleForm`
- ✅ `TopicForm`
- ✅ `LessonForm`
- ✅ `AssessmentTaskForm`
- ❌ `LearnerTable`
- ❌ `EnrollmentManager`
- ❌ `DocumentVerifier`
- ❌ `ReportExporter`

---

## Appendix C: Database Model Summary

**Total Models:** 41

**Core Categories:**
1. **Identity (4 models):** User, Profile, Account, Session
2. **Public Content (3 models):** Post, NewsletterSubscriber, ContactInquiry
3. **Curriculum (11 models):** Qualification, CourseModule, Topic, Lesson, LessonResource, ProgrammeResource, CurriculumTest, CurriculumAssignment
4. **Operations (5 models):** CampusVenue, Cohort, CohortFacilitator, AttendanceRecord
5. **LMIS (5 models):** HostEmployer, Application, Enrollment, WorkplacePlacement, LogbookEntry
6. **Assessment (4 models):** AssessmentTask, AssessmentSubmission, AssessmentReview, ModerationReview
7. **Learner Progress (1 model):** LessonProgress
8. **Certification (1 model):** Certificate
9. **Audit (1 model):** AuditLog

**Missing Models (to be added):**
- `StatsSAProvince`
- `StatsSAMunicipality`
- `StatsSAArea`
- `LearnerFile`
- `NotificationLog`

---

## Appendix D: Technology Decision Matrix

| Decision | Options Evaluated | Chosen | Rationale |
|----------|-------------------|--------|-----------|
| **File Storage** | S3, Vercel Blob, Cloudinary, GCS | Vercel Blob | Native Next.js integration, simplest setup |
| **Email Service** | Resend, SendGrid, AWS SES, Mailgun | Resend | Modern API, great DX, affordable |
| **SMS Service** | Twilio, Africa's Talking, Clickatell | Twilio | Most reliable, best docs |
| **PDF Generation** | jsPDF, Puppeteer, LaTeX, pdfkit | Puppeteer | Server-side, supports complex layouts |
| **PDF Annotation** | pdf.js, PSPDFKit, pdfTron | pdf.js | Open-source, community support |
| **Font Stack** | Inter, Geist, System fonts | Inter | Modern, readable, variable font |
| **Form Library** | React Hook Form, Formik, Tanstack Form | React Hook Form | Already in use, performant |

---

## Document Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-10-10 | 1.0.0 | Initial project scan | AI Engineer |

---

**END OF DOCUMENT**
