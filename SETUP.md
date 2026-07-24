# United Architects — Site + CMS Setup

This repo is a **Next.js (App Router)** app: the public marketing site **and** a
custom `/admin` CMS in one project.

- **Auth:** Clerk (single-admin, email allowlist — no roles)
- **Content + images:** Supabase (Postgres + Storage)
- **Hosting:** Vercel

The site works out of the box with the approved default content; connecting
Supabase lets the client edit it. Follow the steps below once to go live.

---

## 0. Prerequisites
- Node 18.18+ and npm
- A [Clerk](https://clerk.com) account, a [Supabase](https://supabase.com) account, a [Vercel](https://vercel.com) account

## 1. Install & run locally
```bash
npm install
cp .env.local.example .env.local   # then fill in the values from steps 2–3
npm run dev                        # http://localhost:3000  (admin: /admin)
```

## 2. Clerk (authentication)
1. Create an application in the [Clerk dashboard](https://dashboard.clerk.com).
2. Copy **Publishable key** and **Secret key** into `.env.local`
   (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`).
3. **Lock it down to the client:** Clerk dashboard → **User & Authentication →
   Restrictions** → turn **Sign-ups** to *Restricted* (or off). Then invite the
   client's email under **Users → Invite**.
4. Set `ADMIN_EMAILS` in `.env.local` to the client's email (comma-separated for
   more than one). Only these emails can reach `/admin`.

## 3. Supabase (content + images)
1. Create a project at [supabase.com](https://supabase.com).
2. **Settings → API** → copy into `.env.local`:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`  ← **server-only, keep secret**
3. **SQL Editor** → paste and run, in order:
   - `supabase/migrations/0001_init.sql`  (tables, RLS, storage bucket)
   - `supabase/seed.sql`                   (optional: seed rows + a sample post)

That's it — the `media` storage bucket, tables, and row-level security are all
created by the migration.

## 4. Deploy to Vercel
1. Push this repo to GitHub and **Import** it in Vercel (framework auto-detected).
2. Add the **same env vars** from `.env.local` in Vercel → *Settings → Environment
   Variables* (set `NEXT_PUBLIC_SITE_URL` to your Vercel URL).
3. Deploy. Visit `/admin`, sign in with the allowlisted email, and start editing.

> **DNS:** point the client's domain at Vercel when ready. GitHub Pages is no
> longer used for this project.

---

## How the client uses it
- **`/admin` → Home page** — edit every section's copy; **drag-and-drop** to swap
  the hero, project, and portrait images; set the page's SEO title/description and
  social (OG) image.
- **`/admin` → Journal** — write posts in a rich-text editor, **Save draft** to keep
  them private, **Publish** to push them live instantly. Each post has its own SEO.
- **`/admin` → Media** — every uploaded image, with alt text.
- **`/admin` → Settings** — studio address, phone, email, hours (footer + contact).

Edits publish through server actions that call `revalidatePath`, so the live site
reflects changes within seconds — no redeploy.

## Architecture notes
- **Security:** the browser never writes to Supabase. All mutations run in
  Next.js server actions / route handlers that verify the Clerk session + email
  allowlist, then use the Supabase **service role**. Public reads use the anon key
  under RLS (published/live content only). Drafts are never exposed to anon.
- **Content model:** `pages.content` is JSONB (page-as-document). Missing fields
  fall back to `lib/default-content.ts`, so the site always renders.
- **Images:** stored in the public `media` bucket; content stores the public URL,
  and `media` rows track the library. Deleting media falls back to the bundled
  SVG/line-art placeholders.

## Project layout
```
app/(site)   → public marketing site (reuses the approved design)
app/admin    → CMS dashboard (Clerk-protected)
app/api      → image upload route
components/  → site/ (public UI)  +  admin/ (editors, dropzone, rich text)
lib/         → supabase clients, auth, queries, server actions, types, defaults
supabase/    → migrations + seed
legacy/      → the original static build, kept for reference
```
