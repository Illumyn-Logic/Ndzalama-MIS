<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Ndzalama Experience Boundaries

- Keep the public website (`/`) and learner LMS (`/learn/**`) as distinct experiences with their own headers and internal navigation.
- Public-site learner CTA: signed-in learners go to `/learn/dashboard`; guests start at `/learn`.
- LMS browsing/support links stay under `/learn`; shared authentication may use `/login` and `/register`. The LMS home is `/learn`; only an explicit “Back to public home” action should link to `/`.
- Admin operations use `/admin/**` and the authenticated dashboard shell. Do not route admin/LMS navigation through the public home.
- Canonical details: `docs/_/ARCHITECTURE.md`, “Experience and route boundaries”.
