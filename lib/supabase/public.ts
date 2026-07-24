import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Anon client for READS on the public site. Subject to RLS (published/live
// content only). Returns null when env isn't configured yet so callers can
// fall back to bundled default content and the app still builds/renders.
export function getPublicSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon || url.includes('your-project')) return null;
  return createClient(url, anon, { auth: { persistSession: false } });
}
