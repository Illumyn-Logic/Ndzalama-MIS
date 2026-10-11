---
inclusion: always
---

# Ndzalama — Experience Boundary Rules

This project hosts **three independent user experiences** inside a single Next.js application. They share authentication (`/login`, `/register`) but **must never share a header, footer, or navigation shell**.

## The three experiences

| Experience | Route root | Layout file | Header component |
|---|---|---|---|
| Public marketing site | `/` | `src/app/(public)/layout.tsx` | `PublicHeader` (`src/components/layout/public-header.tsx`) |
| Learner LMS / Student Portal | `/learn/**` | `src/app/learn/layout.tsx` | `LearnHeader` (`src/components/layout/learn-header.tsx`) |
| Admin / operations | `/admin/**` or `/(dashboard)/**` | `src/app/(dashboard)/layout.tsx` | `DashboardHeader` + `DashboardSidebar` |

## Hard rules — never break these

1. **Do not use `PublicHeader` inside `/learn/**` or `/admin/**`.** The public header belongs only in `(public)/layout.tsx`.
2. **Do not use `LearnHeader` outside `/learn/**`.** It is LMS-internal navigation.
3. **The `LearnHeader` logo links to `/learn`, not `/`.** The only `href="/"` in the LMS shell is the explicit "Back to public home" escape link.
4. **LMS course links stay under `/learn/courses/...`.** Do not link LMS in-app navigation to `/courses/...` (the public catalogue).
5. **Admin navigation stays under `/admin/**`.** No admin link should appear in the public header or LMS header.
6. **`/login` and `/register` are shared.** After sign-in, middleware routes users to their experience (`/learn/dashboard` for LEARNER, `/admin` or `/dashboard` for staff).

## Layout tree (reference)

```
src/app/
  layout.tsx                     ← root: fonts, html, body only — no nav
  (public)/
    layout.tsx                   ← wraps PublicHeader + PublicFooter
    page.tsx                     ← public homepage at /
    courses/
    apply/
    about/ ...
  (auth)/
    login/page.tsx               ← shared sign-in, no outer nav
    register/page.tsx            ← shared registration, no outer nav
  learn/
    layout.tsx                   ← wraps LearnHeader (guest) or LMS shell (learner)
    page.tsx                     ← LMS landing at /learn
    dashboard/
      layout.tsx                 ← LearnDashboardSidebar + per-page content
  (dashboard)/
    layout.tsx                   ← DashboardSidebar + DashboardHeader (admin shell)
    admin/ ...
    dashboard/ ...
```

## When adding a new page

- Under `/learn/**` → use or extend the LMS shell; **never import `PublicHeader`**.
- Under `/` (public) → use or extend the public shell; **never import `LearnHeader`**.
- Under `/admin/**` → use the admin shell; **never import either of the above headers**.

## CTA wording

- Public header portal button label: **"Student Portal"** (links to `/login`).
- `LearnHeader` guest CTA: **"Get Started"** → `/register`; **"Sign In"** → `/login`.
- Signed-in learner in LMS: profile dropdown with sign-out; only a **"Public home"** escape link to `/`.
