# Ndzalama LMS / LMIS Deployment Guide

## 1. Deployment Objectives

The deployment model should support a production-grade learning platform with:

- secure application hosting
- managed PostgreSQL database at enterprise scale
- private object storage for evidence files
- email delivery for notifications and workflows
- proper secret management
- a clear ownership model for business control

---

## 2. Recommended Production Architecture

### Hosting

Recommended options:

- Vercel for Next.js hosting
- self-hosted Docker / VM deployment for more custom control

### Database

Recommended option:

- Supabase PostgreSQL or equivalent managed PostgreSQL service

### File storage

Recommended option:

- Cloudflare R2
- Amazon S3-compatible object storage

### Email

Recommended options:

- Resend
- SMTP provider

---

## 3. Environment Variables

Example environment configuration:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?schema=public"
AUTH_SECRET="replace-with-a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"

STORAGE_ACCESS_KEY="your-access-key"
STORAGE_SECRET_KEY="your-secret-key"
STORAGE_BUCKET_NAME="ndzalama-lms"
STORAGE_ENDPOINT="https://your-bucket.r2.cloudflarestorage.com"
STORAGE_REGION="auto"

EMAIL_FROM="info@ndzalama.org.za"
RESEND_API_KEY="your-resend-api-key"
```

Production values should be stored in a secret manager or hosting platform environment config, not hardcoded into the codebase.

---

## 4. Deployment Checklist

### Application setup

- configure Next.js production build
- set environment variables securely
- verify database connectivity
- configure Auth.js secrets
- ensure middleware and API routes are production-safe

### Database setup

- provision PostgreSQL instance
- create database schema via Prisma migration
- set strong credentials
- configure backups and retention policies
- restrict database access by least privilege

### Storage setup

- create private object storage bucket
- configure IAM or access keys with minimal permissions
- implement signed URLs for private PoE access
- enable versioning and retention policies where appropriate

### Email setup

- configure transactional email provider
- set from address and domain authentication
- verify SPF/DKIM/DMARC where required

---

## 5. Prisma Migration Workflow

For local development:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

For production or staging:

```bash
npx prisma migrate deploy
```

Notes:

- do not rely on `db push` for production environments
- run migrations in a controlled deployment pipeline
- backup the database before major schema changes

---

## 6. Running the Application

Install dependencies:

```bash
npm install
```

Start local development:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run production server:

```bash
npm start
```

---

## 7. Production Security Requirements

The production environment should include:

- secure passwords and secret rotation
- role-based access in middleware and server logic
- validation of all input payloads
- rate limiting and request throttling
- secure HTTP headers
- file upload validation
- file size and content restrictions
- audit logging for important actions
- monitoring and error tracking

---

## 8. Ownership and Business Control

To protect commercial and operational ownership, the business should control:

- GitHub or GitLab account
- deployment account access
- cloud provider account
- database provider access
- domain registrar access
- storage credentials and policy
- email provider configuration

This prevents operational dependency on a contractor or an individual account.

---

## 9. Operational Best Practices

- enable database backups
- monitor app and API errors
- review audit logs regularly
- monitor storage usage and file access
- keep dependency versions reviewed and updated
- test database migrations in staging before production
- maintain a secure release process and rollback plan

---

## 10. Recommended Production Topology

```text
Business Ownership
  ├── GitHub / GitLab
  ├── Cloud account
  ├── Domain registrar
  ├── Database hosting
  ├── Storage provider
  └── Email platform

Application Layer
  └── Next.js LMS / LMIS

Data Layer
  ├── PostgreSQL
  ├── Prisma schema
  └── Storage / object bucket
```

---

## 11. Summary

The deployment model for Ndzalama LMS/LMIS should prioritize secure, business-controlled infrastructure, disciplined database management, and clearly separated public and private platform layers. With managed PostgreSQL, private object storage, and secure Auth.js configuration, the platform can scale from a marketing website into a fully operational learning business system without dependency on third-party platform ownership.
