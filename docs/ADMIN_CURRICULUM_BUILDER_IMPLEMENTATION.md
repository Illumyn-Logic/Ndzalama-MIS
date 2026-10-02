# Admin Curriculum Builder Implementation

Date: 2026-09-30

## Overview

Implemented the first version of the Ndzalama-MIS Admin Curriculum Builder for managing the curriculum hierarchy:

```text
Qualification
  -> CourseModule
    -> Topic
      -> Lesson
        -> LessonResource
    -> AssessmentTask
```

The implementation preserves existing learner-facing Prisma fields and routes while adding the curriculum-builder functionality under the admin workspace.

## Schema Changes

Updated `prisma/schema.prisma` with:

- `QualificationStatus`: `DEVELOPMENT`, `ACTIVE`, `ARCHIVED`
- `ModuleType`: `KNOWLEDGE`, `PRACTICAL`, `WORK_EXPERIENCE`
- `ResourceKind`: `PDF`, `VIDEO`, `SLIDES`, `AUDIO`, `LINK`
- `AssessmentKind`: `FORMATIVE`, `SUMMATIVE`
- Unique `Qualification.saqaId`
- `Qualification.status`
- `CourseModule.code`
- `CourseModule.type`
- `CourseModule.notionalHours`
- `Topic` model with stable ordering
- `Lesson.topicId`
- `Lesson.durationMinutes`
- `LessonResource` model
- `AssessmentTask.kind`
- `AssessmentTask.maxMarks`
- `AssessmentTask.order`

Existing compatibility fields such as `moduleCode`, `orderIndex`, `resourceUrls`, `totalMarks`, and `rubricCriteria` were retained.

Migration file:

- `prisma/migrations/20260930120000_curriculum_builder/migration.sql`

## Server Actions

Created `src/app/admin/programmes/actions.ts` with:

- `createQualification`
- `updateQualification`
- `setQualificationStatus`
- `createCourseModule`
- `updateCourseModule`
- `createTopic`
- `updateTopic`
- `createLesson`
- `updateLesson`
- `addLessonResource`
- `removeLessonResource`
- `createAssessmentTask`
- `updateAssessmentTask`

Each action:

- Validates input server-side
- Enforces `SUPER_ADMIN`, `ADMIN`, or `REGISTRAR` access
- Writes an `AuditLog` entry
- Revalidates affected admin routes
- Handles Prisma duplicate errors with friendly messages
- Returns `{ ok, error?, id? }`

## Admin Routes

Created the following routes inside the existing dashboard shell:

- `/admin/programmes`
  - Qualification table
  - Search by title or SAQA ID
  - Status filtering
  - Responsive mobile card layout
- `/admin/programmes/new`
  - Qualification creation form
- `/admin/programmes/[id]`
  - Qualification details
  - Qualification editing
  - Modules grouped by knowledge, practical, and work experience type
  - Credit and notional-hour display
- `/admin/programmes/[id]/modules/new`
  - Module creation form
- `/admin/modules/[id]`
  - Module editing
  - Topic, lesson, and resource tree
  - Duration totals
  - Topic and lesson controls
  - Resource add/remove controls
- `/admin/modules/[id]/assessments`
  - Assessment task creation and editing
  - Formative/summative classification
  - Marks and ordering

Presentational and interactive components are in:

- `src/components/admin/programmes/forms.tsx`

## RBAC

Added curriculum-specific middleware entries for:

- `/admin/programmes`
- `/admin/modules`

Allowed roles:

- `SUPER_ADMIN`
- `ADMIN`
- `REGISTRAR`

The existing broader `/admin` rule was left unchanged for unrelated admin areas.

## Seed Data

Extended `prisma/seed.ts` with an idempotent `upsertCurriculum()` function.

Seeded curriculum definition:

- SAQA `101321`
- Occupational Certificate: Training and Development Practitioner
- NQF level `5`
- `190` credits
- Status `ACTIVE`
- KM-01 through KM-07
- Two topics per module
- Two lessons per topic
- PDF and video resource stubs per lesson
- One formative and one summative assessment per module

Module titles include:

- KM-01: Foundation of Education and Training
- KM-02: Learning Programme Design
- KM-03: Organisational Learning and Development Needs Analysis
- KM-04: Facilitation of Learning in Occupational Contexts
- KM-05: Assessment of Learning
- KM-06: Evaluation of Learning Programmes
- KM-07: Training and Development Administration

## Validation

Passed:

- Prisma schema validation
- Prisma client generation
- ESLint before the final middleware-only adjustment
- Diagnostics for the new middleware, server actions, and curriculum forms

Blocked by existing environment/repository issues:

- `prisma migrate dev`: configured Neon database was unreachable with `P1001`
- `prisma db seed`: could not complete because the database connection was unavailable
- `npm run build`: existing missing import in `src/app/(public)/apply/apply-form.tsx` for `@/context/demo-auth-context`
- Full TypeScript check: existing errors in the public apply form, registration route, and generated route validators

No learner routes, authentication pages, or public-site components were modified.

## Dashboard Integration

Updated the existing admin dashboard shell so the curriculum builder is reachable from normal admin navigation:

- Admin and super-admin sidebars now link to `/admin` instead of legacy `/dashboard/admin` query routes.
- Added a visible `Curriculum Builder` navigation item linking to `/admin/programmes`.
- Added a `Curriculum Builder` action to the admin dashboard banner.
- Updated the touched dashboard utilities to Tailwind CSS v4 naming where diagnostics identified legacy utility names.

## Dashboard Design And Product Boundaries

The admin overview is based on the structure in `docs/_/inspo/legacy/landing-dashboard.html`, remixed for the current application shell and domain:

- Welcome/date heading
- Live operational KPI row
- Recent application queue and active qualification list
- Recent enrollment activity and upcoming cohort list
- Quick actions for existing admin destinations

The admin landing page is now a server component that reads counts and recent records from Prisma. It does not use `offline_data` or show simulated status changes. Admin mobile navigation is available from the dashboard header because the desktop sidebar is hidden on small screens. Sidebar entries now point only to implemented admin routes, and nested programme routes keep the parent navigation item active.

The public, LMS, and admin experience boundaries are recorded as project guidance in `AGENTS.md` and in `docs/_/ARCHITECTURE.md` under “Experience and route boundaries”. Public guests start learning at `/learn`; signed-in learners see their identity and can continue at `/learn/dashboard`. LMS browsing stays under `/learn`, shared authentication may use `/login` and `/register`, and the explicit “Back to public home” action is the only LMS navigation to `/`.
