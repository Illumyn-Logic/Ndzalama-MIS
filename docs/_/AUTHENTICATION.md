# Ndzalama LMS / LMIS Authentication and Authorization

## 1. Overview

Authentication and authorization are foundational to the LMS/LMIS platform. The system must protect learner data, maintain role boundaries, and ensure that administrators, assessors, moderators, and learners only access the routes and actions that are appropriate for their responsibilities.

The recommended implementation is:

- NextAuth/Auth.js
- Prisma adapter
- Credentials-based login
- bcryptjs password hashing
- JWT-based sessions
- middleware-based route protection
- server-side authorization checks for business actions

---

## 2. Authentication Model

### Login mechanism

The system uses email and password credentials. When a user submits credentials:

1. Look up the user in the database by email
2. Verify the hashed password with bcrypt
3. Validate the account exists and is active
4. Create a session using NextAuth
5. Attach user role to session data

### Session strategy

The recommended session strategy is JWT-based sessions to simplify role propagation and route authorization.

---

## 3. Roles and Permissions

| Role | Typical access |
| --- | --- |
| LEARNER | learner dashboard, course access, PoE uploads |
| FACILITATOR | learner support, interventions, mentorship |
| ASSESSOR | assessment queue, mark submissions |
| MODERATOR | moderation and quality assurance |
| SME_MENTOR | subject matter support |
| ADMIN | operational management and reporting |
| SUPER_ADMIN | complete access |

### Route access model

The recommended authorization model is route-based access by role. Middleware can restrict visible routes, but all API routes and service methods should still validate role and ownership on the server.

---

## 4. Recommended RBAC Design

```text
LEARNER: /dashboard/learner
FACILITATOR: /dashboard/facilitator
ASSESSOR: /dashboard/assessor
MODERATOR: /dashboard/moderator
ADMIN: /dashboard/admin, /dashboard/facilitator, /dashboard/assessor, /dashboard/moderator, /dashboard/learner
SUPER_ADMIN: /*
```

The middleware should redirect unauthorized users to `/dashboard/unauthorized` or an equivalent access-denied page.

---

## 5. Middleware Protection

The middleware should:

- allow public routes such as home, courses, apply, contact, about, login, register
- redirect unauthenticated users to `/auth/login`
- redirect authenticated users without access to `/dashboard/unauthorized`
- allow public assets, api, and static content to bypass route protection

Example route guard rules:

```ts
const publicPaths = [
  "/",
  "/courses",
  "/apply",
  "/contact",
  "/about",
  "/auth/login",
  "/auth/register",
];
```

Important note: middleware is not a substitute for proper backend validation.

---

## 6. Server-Side Authorization Rules

Every sensitive action should check:

- whether the user is authenticated
- whether the user has the required role
- whether the user owns the resource or is assigned to it
- whether the action is permitted according to workflow state

Examples:

- learner can only view their own enrollments
- assessor can only review assessments assigned to them or in the queue
- moderator can only moderate relevant assessment outcomes
- administrator can view reports and audit logs

---

## 7. Password and Session Security

### Password policy

- store only bcrypt-hashed passwords
- ensure no plain-text passwords remain in logs or responses
- require strong passwords on registration and resets

### Session policy

- use secure cookies in production
- set `AUTH_SECRET` and correct `NEXTAUTH_URL`
- segregate public and protected routes properly
- enable secure, HTTP-only cookie settings in deployment environments

---

## 8. Credentials Flow

The authentication provider should be implemented as follows:

```ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "./db";
```

Responsibilities:

- fetch user by email
- validate password using bcrypt.compare
- return a session-safe user object with id, email, name, and role
- attach role to JWT and session

---

## 9. Recommended Auth Configuration

### App-level auth config

```ts
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [Credentials(...)],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role as string;
      return session;
    },
  },
  pages: { signIn: "/auth/login" },
});
```

---

## 10. Public vs Protected Routes

Public routes:

- /
- /courses
- /apply
- /contact
- /about
- /auth/login
- /auth/register

Protected routes:

- /dashboard/learner
- /dashboard/facilitator
- /dashboard/assessor
- /dashboard/moderator
- /dashboard/admin
- /dashboard/unauthorized

---

## 11. Registration Flow

The registration process should:

- validate user input with Zod
- hash password before saving
- create user record
- create optional profile record
- assign default role `LEARNER`
- log user creation in audit logs
- direct the user to login after successful creation

---

## 12. Audit Logging for Auth Events

The following authentication events should be recorded:

- USER_LOGIN
- USER_CREATED
- USER_ROLE_CHANGED
- USER_LOGOUT (if captured)

This ensures operational traceability for access and account changes.

---

## 13. Security Hardening

Recommended security controls:

- bcrypt hashing with cost factor tuned for the environment
- short-lived JWT or secure session settings
- strict CSRF protections for state-changing actions where required
- rate limiting on login attempts and public APIs
- secure headers and content security policy in production
- validation of all user-supplied inputs
- signed URLs for private file access

---

## 14. Best Practice Warning

Middleware and UI checks should always be treated as convenience controls, not as the only security boundary. If a route or API action is sensitive, the server must verify role and ownership before performing data access or mutation.

---

## 15. Summary

Ndzalama’s authentication model is built to protect learner data while enabling route-specific access across staff and learner workflows. The combination of NextAuth, Prisma, bcrypt hashing, middleware access rules, and server-side role validation creates a practical foundation for secure educational operations and future compliance requirements.
