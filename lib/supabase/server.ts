import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Service-role client for WRITES. Bypasses RLS — server-only, never import
// into a Client Component. All admin mutations go through this after the
// Clerk session has been verified (see lib/auth.ts).
export function getServiceSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export const MEDIA_BUCKET = 'media';
