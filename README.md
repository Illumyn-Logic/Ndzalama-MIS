# Ndzalama Training MIS

**Ndzalama Training Management Information System** — a unified public portal, LMIS, and LMS built for an accredited South African training provider.

The platform operates under a single domain (`ndzalama.co.za` / `ndzalama.org.za`) and delivers three integrated engines:

1. **Public Discovery Portal** — marketing site, dynamic course catalogue, intake schedules, online applications, and public certificate verification.
2. **Learner & Labour Market Information System (LMIS)** — full learner lifecycle management, SETA NLRD / QCTO compliance reporting, host employer management, logbook tracking, and stipend administration.
3. **Learning Management System (LMS)** — digital course delivery for occupational qualifications and short courses, Portfolio of Evidence (PoE) workflows, assessor/moderator QA, and automated cryptographic certificate issuance.

**Accreditation:** ETDP SETA (`ETDP0204`), SAQA ODETDP `50334`, QCTO

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Auth | NextAuth v5 (`@auth/prisma-adapter`) |
| ORM | Prisma 6 |
| Database | PostgreSQL (Neon serverless) |
| Styling | Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack React Query v5 |
| Deployment | Vercel |

---

## Role-Based Access Control

All users enter through the same domain. Next.js Middleware inspects the session token and routes each role to its dedicated workspace.

| Role | Dashboard Route | Primary Responsibilities |
| :--- | :--- | :--- |
| SUPER_ADMIN / ADMIN | `/admin` | Platform config, user management, accreditation, SETA reporting |
| REGISTRAR | `/admin` | Learner registrations, cohort scheduling |
| FINANCE_OFFICER | `/finance` | Invoicing, payment reconciliation, SDL tracking |
| FACILITATOR | `/facilitator` | Cohort attendance, class resources, completion tracking |
| ASSESSOR | `/assessor` | PoE evaluation against SAQA/QCTO rubrics |
| MODERATOR | `/moderator` | QA sampling, moderation reports |
| SME_MENTOR | `/mentor` | Workplace practical oversight, logbook verification |
| HOST_EMPLOYER | `/employer` | Sponsored learner monitoring, SDL progress |
| LEARNER | `/learner` | Course modules, PoE uploads, results, certificates |
| PROSPECTIVE_LEARNER | Public | Browse, apply, verify credentials |

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (or Neon serverless connection string)

### Environment Variables

Copy `.env.local` and populate the following:

```env
DATABASE_URL=          # PostgreSQL / Neon connection string
AUTH_SECRET=           # NextAuth secret
NEXTAUTH_URL=          # App URL (e.g. http://localhost:3000)
```

### Install & Run

```bash
npm install

# Push database schema
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Commands

```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
npx prisma studio  # Visual database browser
```

---

## Folder Structure

```
Ndzalama-MIS/
├── docs/                              # Project documentation & reference materials
│   ├── NDZALAMA_SYSTEM_BLUEPRINT_AND_SCHEMA.md   # Master system blueprint & DB schema spec
│   ├── courses/                       # Course content documents (facilitator/learner guides, assessments)
│   │   └── 101321 OC - Training Development Practitioner/
│   │       ├── 242401001-KM-01/       # Knowledge Module 01 materials
│   │       ├── 242401001-KM-02/       # Knowledge Module 02 materials
│   │       ├── 242401001-KM-03/       # Knowledge Module 03 materials
│   │       ├── 242401001-KM-04/       # Knowledge Module 04 materials
│   │       ├── 242401001-KM-05/       # Knowledge Module 05 materials
│   │       └── 242401001-KM-06/       # Knowledge Module 06 materials
│   ├── forms/                         # Printable/fillable admin & learner forms
│   ├── organisation/                  # Org charts, policy documents
│   ├── pricing/                       # Pricing sheets
│   ├── schedules/                     # Training schedule documents
│   └── wetransfer/                    # Inbound file drops / shared resources
│
├── migrations/                        # Raw SQL migration files (Neon / Supabase compatible)
│   ├── 20260819_ndzalama_init_schema.sql
│   └── sqlite/                        # SQLite variant migrations (dev/testing)
│
├── prisma/
│   ├── schema.prisma                  # Prisma schema (PostgreSQL, RBAC models)
│   ├── migrations/                    # Prisma-managed migration history
│   └── readme.md                      # Prisma-specific notes
│
├── public/                            # Static assets served at root
│   └── images/                        # Site images
│
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── layout.tsx                 # Root layout
│   │   ├── globals.css                # Global styles (Tailwind entry)
│   │   │
│   │   ├── (public)/                  # Public-facing marketing site (no auth required)
│   │   │   ├── page.tsx               # Homepage
│   │   │   ├── layout.tsx             # Public layout (header + footer)
│   │   │   ├── about/
│   │   │   ├── accreditation-services/
│   │   │   ├── apply/                 # Prospective learner intake form
│   │   │   ├── contact/
│   │   │   ├── courses/               # Public course catalogue
│   │   │   ├── faq/
│   │   │   ├── posts/                 # Dynamic news & blog posts
│   │   │   ├── privacy-policy/
│   │   │   ├── terms-of-use/
│   │   │   ├── thank-you/
│   │   │   ├── verify/                # Public certificate verification
│   │   │   └── why-choose-us/
│   │   │
│   │   ├── (auth)/                    # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   └── (dashboard)/               # Protected role-based dashboards (auth required)
│   │       ├── layout.tsx             # Dashboard shell (sidebar + header)
│   │       ├── admin/                 # Admin / Registrar workspace
│   │       │   ├── page.tsx
│   │       │   ├── courses/           # Course management
│   │       │   └── learners/          # Learner management
│   │       ├── assessor/
│   │       │   └── page.tsx
│   │       ├── facilitator/
│   │       │   └── page.tsx
│   │       ├── learner/
│   │       │   └── page.tsx
│   │       └── moderator/
│   │           └── page.tsx
│   │
│   ├── auth.ts                        # NextAuth v5 configuration
│   │
│   ├── components/
│   │   ├── common/                    # Shared business components
│   │   │   ├── award-logo-strip.tsx
│   │   │   ├── course-card.tsx
│   │   │   ├── demo-role-switcher.tsx
│   │   │   └── testimonial-card.tsx
│   │   ├── layout/                    # Shell / chrome components
│   │   │   ├── dashboard-header.tsx
│   │   │   ├── dashboard-sidebar.tsx
│   │   │   ├── public-footer.tsx
│   │   │   └── public-header.tsx
│   │   └── ui/                        # Primitive UI building blocks
│   │       ├── button.tsx
│   │       ├── container.tsx
│   │       └── section-title.tsx
│   │
│   ├── context/
│   │   └── demo-auth-context.tsx      # Demo role-switching context (dev only)
│   │
│   ├── data/                          # Static/seed data modules
│   │   ├── accreditationServices.ts
│   │   ├── courses.ts
│   │   ├── navLinks.ts
│   │   ├── schedules.ts
│   │   └── testimonials.ts
│   │
│   └── lib/                           # Shared utilities & server clients
│       ├── prisma.ts                  # Prisma client singleton
│       ├── utils.ts                   # General utility helpers
│       └── offline-data.ts            # Offline / fallback data layer
│
├── types/                             # Global TypeScript declarations
│   ├── cache-life.d.ts
│   ├── root-params.d.ts
│   ├── routes.d.ts
│   └── validator.ts
│
├── .env                               # Environment variables (do not commit secrets)
├── .env.local                         # Local overrides (git-ignored)
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## Key Concepts

**Route Groups** — The three `(public)`, `(auth)`, and `(dashboard)` folders are Next.js route groups. The parentheses keep them out of the URL path while letting each group share its own layout, loading states, and middleware.

**RBAC Middleware** — `src/auth.ts` and Next.js Middleware protect dashboard routes, inspecting the session role claim and redirecting unauthorised access back to login.

**Prisma + Neon** — The schema in `prisma/schema.prisma` targets PostgreSQL. Raw SQL equivalents live in `migrations/` for direct Neon / Supabase deployment without the Prisma migration engine.

**Demo Role Switcher** — `src/context/demo-auth-context.tsx` and `src/components/common/demo-role-switcher.tsx` allow toggling between roles in development without needing separate accounts.

---

## Documentation

- [`docs/NDZALAMA_SYSTEM_BLUEPRINT_AND_SCHEMA.md`](./docs/NDZALAMA_SYSTEM_BLUEPRINT_AND_SCHEMA.md) — Full system blueprint, DB schema specification, and RBAC design.
- [`prisma/readme.md`](./prisma/readme.md) — Prisma-specific setup notes.
- [`docs/readme.md`](./docs/readme.md) — Documentation index.
