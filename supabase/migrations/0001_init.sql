-- ============================================================================
-- United Architects CMS — initial schema
-- Model: page-as-JSONB. Writes happen server-side with the service role
-- (which bypasses RLS); the public reads with the anon key under the policies
-- below. No user roles, no approval workflow — by design.
-- ============================================================================

create extension if not exists "pgcrypto";

-- helper: keep updated_at fresh --------------------------------------------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- MEDIA ---------------------------------------------------------------------
create table if not exists media (
  id           uuid primary key default gen_random_uuid(),
  storage_path text not null,
  public_url   text not null,
  alt          text default '',
  width        int,
  height       int,
  mime_type    text,
  size_bytes   int,
  created_at   timestamptz not null default now(),
  uploaded_by  text
);

-- PAGES ---------------------------------------------------------------------
create table if not exists pages (
  slug            text primary key,
  name            text not null,
  content         jsonb not null default '{}'::jsonb,
  seo_title       text,
  seo_description text,
  og_image_id     uuid references media(id) on delete set null,
  updated_at      timestamptz not null default now(),
  updated_by      text
);
create trigger pages_updated_at before update on pages
  for each row execute function set_updated_at();

-- POSTS (journal) -----------------------------------------------------------
create table if not exists posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  title           text not null,
  excerpt         text default '',
  body            jsonb,                       -- Tiptap document JSON
  cover_image_id  uuid references media(id) on delete set null,
  status          text not null default 'draft'
                    check (status in ('draft','published')),
  seo_title       text,
  seo_description text,
  og_image_id     uuid references media(id) on delete set null,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  author          text
);
create index if not exists posts_status_published_idx
  on posts (status, published_at desc);
create trigger posts_updated_at before update on posts
  for each row execute function set_updated_at();

-- SITE SETTINGS (singleton) -------------------------------------------------
create table if not exists site_settings (
  id         int primary key default 1 check (id = 1),
  contact    jsonb default '{}'::jsonb,
  nav        jsonb default '[]'::jsonb,
  social     jsonb default '[]'::jsonb,
  updated_at timestamptz not null default now()
);
create trigger site_settings_updated_at before update on site_settings
  for each row execute function set_updated_at();

-- ============================================================================
-- Row-Level Security
--   * anon may READ published/live content only
--   * no anon/authenticated write policies → writes require the service role
-- ============================================================================
alter table media         enable row level security;
alter table pages         enable row level security;
alter table posts         enable row level security;
alter table site_settings enable row level security;

create policy "public read media"    on media         for select using (true);
create policy "public read pages"    on pages         for select using (true);
create policy "public read settings" on site_settings for select using (true);
create policy "public read published posts" on posts  for select
  using (status = 'published');

-- ============================================================================
-- Storage bucket for images (public read; uploads happen via service role)
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media bucket"
  on storage.objects for select
  using (bucket_id = 'media');
