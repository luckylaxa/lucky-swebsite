# United Architects, Inc. — Website + CMS

A **Next.js** app: the public marketing site plus a custom **`/admin`** CMS so the
client can update content without touching code.

- **Auth:** Clerk (single admin, email allowlist — no roles)
- **Content + images:** Supabase (Postgres + Storage)
- **Hosting:** Vercel · **Design:** light mode, no gradients, Space Grotesk + Hanken Grotesk

## What the client can do
- Edit copy on the home page, section by section.
- Swap images (hero, projects, portrait, OG) by **drag-and-drop**.
- Manage a **journal** with a **draft → publish** workflow.
- Set **SEO** (title, description, social image) per page and per post.

## Quick start
```bash
npm install
cp .env.local.example .env.local   # fill in Clerk + Supabase keys
npm run dev                        # site: localhost:3000 · CMS: /admin
```

**Full setup (Clerk, Supabase, deploy) → see [`SETUP.md`](./SETUP.md).**

## Scripts
| | |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | TypeScript check |

## Structure
```
app/(site)   Public site (home + journal), reuses the approved design
app/admin    CMS dashboard (Clerk-protected)
lib/         Supabase clients, auth, queries, server actions, types, defaults
supabase/    SQL migration + seed
components/  site/ (public UI) · admin/ (editors, dropzone, rich text)
legacy/      Original static build, kept for reference
```

The site renders from bundled default content until Supabase is connected, so it
never shows a blank or broken page.
