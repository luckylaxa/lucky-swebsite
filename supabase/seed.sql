-- Optional seed. The app already falls back to the approved default content,
-- so this only creates the rows the client will edit + a sample journal post.
-- Run after 0001_init.sql (Supabase SQL editor, or `supabase db reset`).

-- Home page (empty content → the app fills every field from its bundled
-- defaults; the first save in /admin writes the full document).
insert into pages (slug, name, content)
values ('home', 'Home', '{}'::jsonb)
on conflict (slug) do nothing;

-- Studio contact (footer + contact block).
insert into site_settings (id, contact)
values (
  1,
  jsonb_build_object(
    'address',  '4000 Ponce de Leon Blvd., Suite 470<br/>Coral Gables, FL 33146',
    'phone',    '(305) 552-5465',
    'phoneHref','+13055525465',
    'email',    'MLC@UnitedArchs.com',
    'hours',    'Monday–Friday<br/>9:00–5:00 ET'
  )
)
on conflict (id) do nothing;

-- Sample published post so /journal isn't empty on day one.
insert into posts (slug, title, excerpt, body, status, published_at, author)
values (
  'welcome-to-the-journal',
  'Welcome to the Journal',
  'A short note on what we’ll share here — process, projects, and the craft of building in Miami.',
  jsonb_build_object('html',
    '<p>This is the United Architects journal. We’ll use this space to share project stories, notes on the Florida Building Code, and the thinking behind our work.</p><p>You can edit or delete this post anytime from the CMS.</p>'),
  'published',
  now(),
  'United Architects'
)
on conflict (slug) do nothing;
