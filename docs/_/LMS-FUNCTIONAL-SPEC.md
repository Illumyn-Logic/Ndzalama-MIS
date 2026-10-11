# Ndzalama LMS / LMIS Functional Specification

## 1. Product Vision

Ndzalama LMS/LMIS is a proprietary digital platform for learning management, learner administration, assessment, moderation, and certification. It is designed to support the business as both a sales channel and an operational platform for delivering training programmes and managing learner outcomes.

The platform has two primary modes:

1. Public-facing website for marketing and learner conversion
2. Secure authenticated portal for learner and staff management

---

## 2. Public Website Requirements

### 2.1 Homepage

The homepage must:

- present Ndzalama value proposition
- highlight key programmes and offerings
- support conversion to course enquiry or application
- link to learning pathways and programme categories

### 2.2 Course catalogue

The course catalogue must provide:

- searchable and filterable programmes and courses
- course summaries and duration
- pricing and accreditation information
- clear path to application or request for information

### 2.3 Course detail pages

Each course page must show:

- title and description
- programme and course metadata
- credits, duration, and level
- module overview
- pricing and delivery format
- apply or enroll CTA

### 2.4 Application flow

The apply experience must support:

- learner info capture
- programme interest selection
- contact details and supporting information
- consent and compliance disclosures
- submission confirmation

### 2.5 Accreditation services (public)

Missed in earlier passes — the legacy site (`docs/_/inspo/`, see "Our Services" mega-menu across `homepage.html`, `about.html`, `director.html`, `faq.html`, `whychooseus.html`, `privacypolicy.html`) advertises Ndzalama as an accreditation *service provider* for other organisations, not only a self-accredited training provider. Our focus stays on training, but the site should not omit this service line since it drives a distinct enquiry funnel:

- **Become an Accredited Training Provider** — Ndzalama assists other providers with obtaining accreditation (legacy `creditation.html`)
- **TVET College registration** — support for registering a TVET college (legacy `maintenance.html` placeholder link)
- **SETA registration** — support for organisations becoming SETA-registered (legacy `maintenance.html` placeholder link)
- **Proof of Ndzalama's own accreditation** — downloadable accreditation certificate/proof, shown site-wide in the legacy nav (`docs/proof.pdf`), plus an accreditation number disclosure (e.g. "accredited with ETDPSETA since 2002, accreditation number ETDP0204" per legacy `faq.html`)
- **Awards/accreditation body logos** — carousel of accrediting/awarding bodies shown on the legacy director page (see `images-inventory.md` → Awards / Accreditation Logos)

These should surface as their own service/CTA (e.g. an "Accreditation Services" section or page distinct from the course catalogue), with their own enquiry path, rather than being folded into course pages.

---

## 3. Learner Functional Requirements

### 3.1 Dashboard

Learner dashboard features:

- enrolled courses overview
- upcoming learning tasks
- progress summary
- assessment status
- PoE status
- certificates and recognition status
- notifications and messages

### 3.2 Enrollment management

Learners must be able to:

- browse available courses and programmes
- enrol in eligible courses
- check payment or enrollment status
- access course materials after onboarding approval

### 3.3 Learning experience

Learners should be able to:

- view module structure
- access learning content and materials
- track completion and progress
- manage learning schedules

### 3.4 Portfolio of Evidence

The PoE workflow supports:

- selecting an assessment
- uploading evidence files
- viewing local submission state
- reviewing assessor feedback
- resubmitting when required

### 3.5 Assessment interaction

Learners must be able to:

- view submitted assessments
- monitor outcome status
- access assessor commentary
- respond to resubmission instructions

### 3.6 Certificates

Learners should be able to:

- view issued certificates
- download PDF copies where allowed
- share certificate numbers for verification

---

## 4. Facilitator Functional Requirements

Facilitators support learner progress and intervention workflows.

### Core capabilities

- view assigned learners
- monitor course progress
- identify learners needing intervention
- document interventions and notes
- track attendance or learning activity
- review learner performance patterns

### Key outputs

- learner support actions
- intervention records
- progress escalation notes
- referral to assessors or administrators when required

---

## 5. Assessor Functional Requirements

Assessors manage the formal review and result decisioning process.

### Core capabilities

- view assessment queue
- access learner submissions and evidence
- review rubric criteria
- record marks or competencies
- provide written feedback
- mark as competent, not yet competent, or resubmit
- update assessment outcome records

### Decision workflow

```text
Submitted
  -> Under Review
      -> Competent
      -> Not Yet Competent
      -> Resubmit
``` 

---

## 6. Moderator Functional Requirements

Moderators provide quality assurance and fairness review.

### Core capabilities

- review assessment decisions
- verify consistency of assessor outcomes
- sample assessments and evidence
- record moderation remarks
- approve or reject assessment outcomes
- maintain QA documentation

---

## 7. Administrative Functional Requirements

The admin area supports operational and governance management.

### Admin modules

- learners management
- enrollments management
- courses management
- programs management
- assessments management
- reports dashboard
- user management
- audit logs

### Administration responsibilities

- user onboarding and role assignment
- course setup and updates
- enrollment status review
- data quality management
- business reporting
- compliance and operational oversight

---

## 8. Reporting and Compliance Requirements

The system should provide:

- learner enrollment reporting
- course completion rates
- assessment pass and resubmission trends
- facilitator intervention summaries
- moderation outcomes
- audit records for operational traceability

All reporting needs should protect learner privacy and follow the business’s governance requirements.

---

## 9. Certification Requirements

The certification module should support:

- completion rules based on course and assessment outcomes
- unique certificate numbering
- verification hash generation
- PDF certificate storage or generation
- public verification endpoint for certificate numbers

### Example verification flow

```text
Certificate issued
  -> stored with certNumber + verificationHash
  -> public verification endpoint checks authenticity
  -> learner data remains protected
```

---

## 10. Workflow Rules

The platform should not permit unauthorized state transitions. Assessment and enrollment workflow logic must be enforced on the server.

Examples:

- an assessment cannot switch directly from `SUBMITTED` to `COMPETENT` without review
- a resubmission must return to an appropriate review state
- a certificate may only be generated after completion and quality checks are satisfied
- payment verification must be enforced before full course access is granted

---

## 11. API Domain Requirements

The application should expose business-domain APIs such as:

- `/api/courses`
- `/api/programs`
- `/api/enrollments`
- `/api/assessments`
- `/api/poe`
- `/api/certificates`
- `/api/reports`
- `/api/admin`

Responsibilities:

- validate input
- enforce role and ownership
- call service-layer logic
- respond with proper status codes and error messages

---

## 12. Business Rules

Key business rules include:

- user identity is unique by email
- learner-course enrollment is unique
- learner profiles are optional but strongly recommended for operational usage
- module and course catalogues are managed centrally
- course access depends on enrollment and approvals
- assessments depend on an enrollment and module relationship
- moderation decisions must be tracked separately from assessment decisions
- audit records must exist for important actions

---

## 13. Success Criteria

The platform is successful when it can:

- attract learners through the public website
- enroll learners securely and record their progress
- support staff roles across learning, assessment, moderation, and administration
- protect sensitive learner data and operational decisions
- issue certificates with trustworthy verification
- provide auditable records for compliance and governance

---

## 14. Summary

The functional specification positions Ndzalama as a dual-purpose platform: a public learning brand and a secure operational LMS/LMIS. This distinction is critical because the system must do more than display programmes—it must manage learner identity, evidence, assessment outcomes, staff workflows, and certification integrity in a production-grade environment.
