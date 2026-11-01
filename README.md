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

The repository is currently structured as follows (generated folders such as `.next` and `node_modules` are omitted unless specifically relevant):

```text
Ndzalama-MIS/
├── .env.local                 # Local runtime configuration (gitignored)
├── .gitignore
├── .kiro/                     # Local project tooling metadata
├── .vscode/
├── AGENTS.md
├── Build
├── CLAUDE.md
├── README.md
├── TESTING.md
├── eslint.config.mjs
├── hello.ts
├── neon.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── docs/
│   ├── _/
│   │   ├── ARCHITECTURE.md
│   │   ├── AUTHENTICATION.md
│   │   ├── DATABASE.md
│   │   ├── DEPLOYMENT.md
│   │   ├── LMS-FUNCTIONAL-SPEC.md
│   │   ├── todo.md
│   │   ├── Design/
│   │   └── inspo/
│   ├── ADMIN_CURRICULUM_BUILDER_IMPLEMENTATION.md
│   ├── IMPLEMENTATION_GUIDE.md
│   ├── NAV_REDESIGN_SUMMARY.md
│   ├── NDZALAMA_SYSTEM_BLUEPRINT_AND_SCHEMA.md
│   ├── PHASE1_COMPLETE.md
│   ├── PHASE1_PROGRESS.md
│   ├── PROJECT_SCAN_2026-10-10.md
│   ├── courses/
│   │   ├── 101321 OC - Training Development Practitioner/
│   │   ├── 97154 - OC - Occupational Trainer/
│   │   ├── 97542 - OC - Early Childhood Development Practitioner/
│   │   ├── SP-201201-Workplace Preparation/
│   │   ├── SP-211009-Workplace Essential Skills/
│   │   └── work-based-learning-and-development-practitioner/
│   ├── forms/
│   ├── organisation/
│   ├── pricing/
│   ├── schedules/
│   └── wetransfer/
├── migrations/
│   ├── 20260819_ndzalama_init_schema.sql
│   └── sqlite/
├── prisma/
│   ├── migrations/
│   ├── readme.md
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   ├── admin/
│   │   │   ├── assessor/
│   │   │   ├── dashboard/
│   │   │   ├── facilitator/
│   │   │   └── moderator/
│   │   ├── (public)/
│   │   │   ├── about/
│   │   │   ├── accreditation-services/
│   │   │   ├── apply/
│   │   │   ├── contact/
│   │   │   ├── courses/
│   │   │   ├── faq/
│   │   │   ├── posts/
│   │   │   ├── privacy-policy/
│   │   │   ├── thank-you/
│   │   │   ├── verify/
│   │   │   └── why-choose-us/
│   │   ├── admin/
│   │   ├── api/
│   │   ├── learn/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── auth.ts
│   ├── components/
│   │   ├── admin/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── learn/
│   │   └── ui/
│   ├── context/
│   ├── data/
│   │   ├── accreditationServices.ts
│   │   ├── courses.ts
│   │   ├── navLinks.ts
│   │   ├── schedules.ts
│   │   └── testimonials.ts
│   ├── lib/
│   │   ├── brand-colors.ts
│   │   ├── compliance.ts
│   │   ├── offline_data.ts
│   │   ├── prisma.ts
│   │   ├── student_number.ts
│   │   └── utils.ts
│   ├── proxy.ts
│   └── types/
├── node_modules/            # generated dependency tree
├── .next/                   # generated Next.js build output
└── .git/                    # Git metadata
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
