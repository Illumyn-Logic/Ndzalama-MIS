# Ndzalama LMS / LMIS Architecture

## 1. Purpose

Ndzalama LMS/LMIS is a commercial learning platform that combines a public-facing acquisition website with a secure, role-based learning management and information system. The public layer supports marketing, course discovery, applications, and enquiries, while the authenticated LMS layer manages learner administration, course delivery, assessment, moderation, reporting, and certification.

This architecture is designed to be:

- fully owned by the business
- extensible for future modules and compliance requirements
- compatible with Next.js App Router and Prisma
- ready for Vercel or self-hosted deployment
- compliant with role and identity control requirements for education and training operations

---

## 2. System Goals

### Business goals

- Sell and promote accredited programmes and short courses
- Manage learner records, enrollments, and progress
- Handle assessment and Portfolio of Evidence (PoE) workflows
- Support facilitators, assessors, moderators, and administrators
- Produce certificates and audit-ready operational records
- Keep all critical platform accounts and data controlled by the business

### Technical goals

- Single application for public website + private LMS
- Clear boundary between marketing, operations, and data management
- Secure authentication and authorization per role
- Strong validation and audit logging
- Database-first architecture using PostgreSQL and Prisma

---

## 3. High-Level Architecture

```text
                          ┌────────────────────────────┐
                          │ Public Website             │
                          │ Courses / Apply / About    │
                          │ Contact / Homepage         │
                          └──────────────┬─────────────┘
                                         │
                                         ▼
                          ┌────────────────────────────┐
                          │ Next.js App Router         │
                          │ UI + API Routes + SSR      │
                          └──────────────┬─────────────┘
                                         │
            ┌────────────────────────────┼────────────────────────────┐
            │                            │                            │
            ▼                            ▼                            ▼
   ┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
   │ Auth / Session   │       │ Business Logic   │       │ RBAC / Access    │
   │ NextAuth/Auth.js │       │ Services / APIs  │       │ Policies         │
   └────────┬─────────┘       └────────┬─────────┘       └────────┬─────────┘
            │                            │                            │
            ▼                            ▼                            ▼
   ┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
   │ Prisma ORM       │       │ File Storage     │       │ Email Gateway    │
   │ PostgreSQL       │       │ R2 / S3 / signed│       │ Resend / SMTP   │
   └────────┬─────────┘       │ URLs            │       └──────────────────┘
            │                    └──────────────────┘
            ▼
   ┌──────────────────┐
   │ PostgreSQL DB    │
   │ Learners / Enrol │
   │ Courses / Assess │
   │ Certificates     │
   └──────────────────┘
```

---

## 4. Application Domains

### 4.1 Public web domain

Includes:

- homepage
- course catalogue
- course details
- application forms
- contact and inquiry flow
- accreditation and company information

This layer is primarily a marketing and conversion engine for the LMS.

### 4.2 Learner domain

Includes:

- profile and account management
- enrollment and course access
- course progress tracking
- assessments and PoE submissions
- feedback and moderation outcomes
- certificates and verification

### 4.3 Faculty and assessment domain

Includes:

- facilitator intervention workflow
- assessor evaluation and decision-making
- moderator quality assurance
- support for evidence review and resubmission cycles

### 4.4 Administration domain

Includes:

- user management
- learner management
- program and course management
- enrollment controls
- audit log review
- reporting and operational oversight

---

## 5. Core Roles

| Role | Main Responsibility |
| --- | --- |
| LEARNER | learning, enrollment, PoE submission |
| FACILITATOR | learner support and progress monitoring |
| ASSESSOR | marking and review of assessments |
| MODERATOR | moderation and QA decisions |
| SME_MENTOR | workplace or subject expertise support |
| ADMIN | operational administration |
| SUPER_ADMIN | unrestricted access |

Role-based access should be enforced in:

- middleware for route protection
- server-side API checks
- service-layer authorization
- database and business rules for ownership checks

---

## 6. Functional Boundaries

### Frontend

Built with Next.js App Router and TypeScript. Public pages and dashboard pages are separated to keep commercial and operational experiences distinct.

### Backend

Server-side logic sits in:

- route handlers under src/app/api
- service modules under src/services
- domain-type definitions under src/types
- Prisma access via src/lib/db.ts

### Data layer

PostgreSQL stores all canonical operational data. Prisma provides type-safe access and schema governance.

### Security layer

Responsibilities include:

- NextAuth session management
- bcrypt password hashing
- role permission checks
- request validation via Zod
- signed URLs and private object storage for learner evidence files
- audit logging for high-risk actions

---

## 7. Primary Modules

### Identity and learners

- User
- Profile
- Enrollment
- Role assignment

### Learning and curriculum

- Program
- Course
- Module
- Course slug for public course URLs

### Assessment and evidence

- Assessment
- Submission metadata
- Rubric scoring
- PoE upload tracking

### Certification and compliance

- Certificate
- AuditLog
- status and moderation histories

---

## 8. Recommended Structure

```text
src/
  app/
    (public)/
    (dashboard)/
    auth/
    api/
    globals.css
    layout.tsx
  components/
    ui/
    layout/
    forms/
    shared/
  lib/
    auth.ts
    db.ts
    validations.ts
  services/
    course.service.ts
    enrollment.service.ts
    assessment.service.ts
    certificate.service.ts
    learner.service.ts
  types/
    index.ts
  utils/
    helpers.ts
prisma/
  schema.prisma
  seed.ts
docs/
  ARCHITECTURE.md
  DATABASE.md
  AUTHENTICATION.md
  LMS-FUNCTIONAL-SPEC.md
  DEPLOYMENT.md
```

---

## 9. Deployment Model

### Preferred production setup

- Frontend: Vercel or self-hosted Node.js environment
- Database: Supabase PostgreSQL or managed PostgreSQL instance
- Storage: Cloudflare R2 or Amazon S3 compatible bucket
- Email: Resend or SMTP provider
- Secrets: environment variables and managed secret store

### Operational ownership

The business should own:

- GitHub/GitLab repository access
- cloud account access
- database account access
- domain registrar access
- deployment credentials
- storage access

This reduces dependency on individual contractors or developer-owned accounts.

---

## 10. Security Principles

- password hashing using bcryptjs or Argon2
- secure session handling with Auth.js
- validation using Zod on all inbound requests
- server-side authorization before business actions
- private object storage for learner evidence
- signed URLs for sensitive files
- audit logging for changes in enrollment, moderation, and certificates
- least-privilege database access
- rate limiting and security headers in production

---

## 11. Implementation Sequence

1. Next.js foundation and TypeScript setup
2. PostgreSQL and Prisma integration
3. Authentication and RBAC
4. Public website migration and content pages
5. Learner portal and enrollment flow
6. Course and program management
7. Assessment and PoE operations
8. Facilitator, assessor, and moderator portals
9. Administrative reporting and audit views
10. Certification and verification workflow
11. Security hardening and compliance checks
12. Production deployment and operational support

---

## 12. Summary

The architecture positions Ndzalama as more than a marketing website. It becomes an operational learning platform with commercial acquisition, operational administration, assessment integrity, compliance controls, and data ownership. The design supports growth from a public-facing course catalogue into a full LMS/LMIS platform that the business can control and scale independently.
