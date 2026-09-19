# Prisma – Ndzalama Training LMIS

## Overview

This directory contains the Prisma schema and configuration for the **Ndzalama Training Learner Management Information System (LMIS)**. The database is hosted on **Neon PostgreSQL** and managed via **Prisma 6**.

## Tech Stack

| Component        | Technology              |
|------------------|-------------------------|
| ORM              | Prisma 6                |
| Database         | PostgreSQL (Neon)       |
| Framework        | Next.js (App Router)    |
| Auth             | NextAuth / Auth.js      |
| Hosting          | Neon Serverless Postgres|

## Project Structure
prisma/
├── schema.prisma # Main database schema
├── migrations/ # Migration history (auto-generated)
└── README.md # This file


## Environment Variables

The following environment variables are required in `.env.local`:

```env
# Neon pooled connection (for application runtime)
DATABASE_URL="postgresql://neondb_owner:****@ep-xxxxx-pooler.c-5.eu-central-1.aws.neon.tech/neondb?sslmode=require"

# Neon direct connection (for Prisma migrations only)
DATABASE_URL_UNPOOLED="postgresql://neondb_owner:****@ep-xxxxx.c-5.eu-central-1.aws.neon.tech/neondb?sslmode=require"

⚠️ Important: Never commit .env.local to version control. It is listed in .gitignore.
Schema Overview
The schema models the full LMIS structure for Ndzalama Training's occupational qualifications:
Identity & Access
Model
Description
User
Core user account with role-based access
Profile
Demographics, SETA registration, POPIA consent
Account
OAuth / NextAuth provider accounts
Session
Active user sessions
Roles: SUPER_ADMIN, ADMIN, REGISTRAR, FINANCE_OFFICER, FACILITATOR, ASSESSOR, MODERATOR, SME_MENTOR, HOST_EMPLOYER, LEARNER, PROSPECTIVE_LEARNER
Academic Curriculum
Model
Description
Programme
Full qualifications (e.g. ECD Practitioner, TDP)
CourseModule
KM / PM / WM modules within a programme
Topic
Knowledge topics within a module
Lesson
Individual lessons within a topic
LessonResource
Attached resources (PDF, PPTX, video)
Assessments & PoE
Model
Description
AssessmentTask
Formative / Summative / FISA / Test tasks
AssessmentSubmission
Learner PoE submissions
AssessmentReview
Assessor marking & feedback
ModerationReview
Moderator QA decisions
Enrolment & Workplace
Model
Description
Enrollment
Learner enrolment in a programme / cohort
WorkplacePlacement
WM workplace placement with mentor
LogbookEntry
Daily workplace logbook records
HostEmployer
Registered workplace host employers
Certification & Compliance
Model
Description
Certificate
Issued certificates with verification hash
AuditLog
Immutable audit trail for all system actions
Supported Qualifications
SAQA ID
Qualification Title
NQF
Credits
97542
Early Childhood Development Practitioner
4
131
101321
Training and Development Practitioner
5
190
97154
Occupational Trainer
4
124
Commands
# Generate Prisma Client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name <description>

# Apply migrations to production (CI/CD)
npx prisma migrate deploy

# Open Prisma Studio (database browser)
npx prisma studio

# Pull current DB state into schema (use with caution)
npx prisma db pull

# Reset database (DESTRUCTIVE – dev only)
npx prisma migrate reset

Neon Branching Strategy
Branch
Neon Branch
Purpose
dev
production
Shared development database
dev-auth
dev
Feature branch (auth work)
main
production
Production database
Neon database branches are created via the Neon Dashboard or neonctl branch create.
Migration History
Migration
Description
20260919151316_init
Initial schema – full LMIS models
Conventions
IDs: cuid() string IDs (Prisma default)
Timestamps: createdAt / updatedAt on all models
Enums: PascalCase names, SCREAMING_SNAKE values
Relations: Explicit relation names where a model has multiple relations to the same model
Indexes: Added on frequently queried fields (email, slug, code, status)
Decimals: @db.Decimal(10,2) for currency, @db.Decimal(5,2) for scores
Security Notes
Row-Level Security (RLS) is managed at the application layer via Next.js middleware and Prisma query scoping
POPIA compliance fields are tracked on the Profile model
Audit logging captures all mutations for SETA/QCTO compliance reporting
Certificate verification uses SHA-256 hashes for public QR verification
References
Prisma Documentation
Neon Documentation
SAQA – South African Qualifications Authority
QCTO – Quality Council for Trades and Occupations
ETDP SETA