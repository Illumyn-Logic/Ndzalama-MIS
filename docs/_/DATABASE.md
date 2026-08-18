# Ndzalama LMS / LMIS Database Design

## 1. Database Overview

The system uses PostgreSQL as the canonical relational database. Prisma is the ORM used to manage schema design, migrations, validation, and type-safe access across the application.

This database is designed to support:

- identity and role-based access
- learner profiles
- program and course catalogues
- learning delivery and progress
- assessments and moderation
- portfolio-of-evidence submissions
- certificate issuance and verification
- audit and compliance reporting

---

## 2. Database Principles

- relational data model for academic and operational records
- explicit relationship integrity between learners, enrollments, courses, and assessments
- unique enrollment constraints to prevent duplicate course access
- secure references to file objects instead of storing binary content in the database
- audit records for meaningful system actions
- clear ownership and status tracking for assessments and certificates

---

## 3. Core Entities

### User

Represents a platform identity and account. It stores the base profile needed for login and role-based access.

Fields include:

- id
- email
- name
- password
- role
- createdAt
- updatedAt

Relationships:

- one optional Profile
- many Enrollments
- many created Courses
- many assigned assessments as assessor
- many moderated assessments as moderator
- many Certificate records
- many AuditLog records

### Profile

Stores learner and user identity metadata, including personal and demographic data required for operational administrative use.

Typical fields:

- fullName
- saId
- nationalityCode
- gender
- citizenStatus
- equity
- homeLanguage
- disability
- socioEconomic
- province
- municipality
- townCity
- phone
- address
- postalCode
- employer
- consentPopia

### Role

```text
LEARNER
FACILITATOR
ASSESSOR
MODERATOR
SME_MENTOR
ADMIN
SUPER_ADMIN
```

---

## 4. Academic Structure

### Program

Represents a training programme, qualification, or skills pathway.

Key fields:

- title
- type
- saqaId
- qctoCode
- nqfLevel
- credits
- durationDays
- price information
- status

### Course

Represents a specific course or learning unit within a program.

Key fields:

- title
- slug
- usId
- credits
- durationDays
- price
- moduleType
- creatorId
- programId

Relationships:

- belongs to a Program
- has many Modules
- has many Enrollments
- may have certificates

### Module

Represents a discrete unit of content or assessment within a course.

Key fields:

- title
- durationHours
- marks
- prerequisites
- courseId

---

## 5. Enrollment and Progress

### Enrollment

Tracks learner access to a course and the associated operational state.

Important fields:

- learnerId
- courseId
- bookingDate
- paymentStatus
- lmsAccessGranted
- status

Critical constraints:

- unique combination of learnerId + courseId
- prevents duplicate enrollment records

Status values:

```text
ACTIVE
COMPLETED
WITHDRAWN
ON_HOLD
```

Payment values:

```text
PENDING
VERIFIED
FAILED
REFUNDED
```

---

## 6. Assessment Model

### Assessment

Represents a learner submission connected to a module and an enrollment.

Key fields:

- enrollmentId
- moduleId
- submissionUrl
- status
- assessorId
- moderatorId
- mentorSignoff
- rubricScores
- feedback
- assessedAt
- moderatedAt

Status values:

```text
SUBMITTED
UNDER_REVIEW
COMPETENT
NOT_YET_COMPETENT
RESUBMIT
MODERATED
```

This supports the assessment lifecycle:

```text
SUBMITTED
  -> UNDER_REVIEW
      -> COMPETENT
      -> NOT_YET_COMPETENT
      -> RESUBMIT -> UNDER_REVIEW
```

The transition logic should be enforced server-side instead of trusting only client-side validation.

---

## 7. Portfolio of Evidence (PoE)

PoE files should not be stored directly in the database. Instead, the database stores metadata and reference paths, while file objects reside in object storage.

Typical PoE metadata:

- submission URL or object reference
- related Assessment id
- file type and size
- upload timestamp
- uploader or learner id
- review status

This allows secure access via signed URLs or controlled private storage.

---

## 8. Certification Model

### Certificate

Stores issued credentials after completion and quality assurance rules are met.

Fields include:

- learnerId
- courseId
- certNumber
- issueDate
- verificationHash
- pdfUrl

Key design requirements:

- unique certificate number
- one certificate per learning completion record
- verification hash for authenticity checking
- secure public verification endpoint

---

## 9. Audit and Compliance

### AuditLog

Captures operational and security-sensitive activity.

Fields:

- userId
- action
- entityId
- entityType
- ipAddress
- timestamp

Recommended indexes:

- userId
- entityId
- entityType

This supports review of user actions such as:

```text
USER_LOGIN
USER_CREATED
ENROLLMENT_CREATED
ENROLLMENT_APPROVED
PAYMENT_VERIFIED
ASSESSMENT_SUBMITTED
ASSESSMENT_ASSESSED
ASSESSMENT_MODERATED
CERTIFICATE_ISSUED
USER_ROLE_CHANGED
POE_UPLOADED
POE_DELETED
```

---

## 10. Prisma Schema Design Summary

A production-ready relational structure includes the following core logical entities:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String?
  password    String?
  role        Role     @default(LEARNER)
  profile     Profile?
  enrollments Enrollment[]
  assessments Assessment[] @relation("Assessor")
  moderatedAssessments Assessment[] @relation("Moderator")
  certificates Certificate[]
  auditLogs   AuditLog[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Core constraints should include:

- unique email addresses
- unique learner/course enrollments
- cascades on dependent records where appropriate
- explicit relations for assessor and moderator records
- indexed audit log queries

---

## 11. Migration Strategy

Use Prisma migrations for production deployment:

```bash
npx prisma migrate dev --name init
npx prisma migrate deploy
```

Do not rely solely on `db push` in production. `db push` is appropriate for local development, but migrations are the safer operational model for staging and production.

---

## 12. Seed Strategy

The database should be seeded with:

- super administrator
- administrator
- facilitator
- assessor
- moderator
- test learner
- sample program
- sample courses
- sample modules

This supports demo use and QA verification before production rollout.

---

## 13. Data Governance Notes

- learner PII should be governed by privacy requirements
- personal information should be protected by role-based access and limited retrieval
- consent status should be stored for data processing and POPIA compliance
- all sensitive operational actions should leave audit evidence
- certificate verification must not expose private learner data

---

## 14. Summary

The database is designed as a strong academic operations foundation: it supports learners, content, assessment integrity, moderation, compliance, and certification. Its success depends on consistent schema management, unique constraints, clear ownership rules, and disciplined audit logging.
