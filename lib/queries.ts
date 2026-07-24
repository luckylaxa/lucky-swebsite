import { getPublicSupabase } from './supabase/public';
import { DEFAULT_HOME, DEFAULT_CONTACT } from './default-content';
import type { HomeContent, ContactSettings, Post, Media } from './types';

// ---- Pages ----------------------------------------------------------------
export interface PageSeo {
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
}

export async function getHome(): Promise<{ content: HomeContent; seo: PageSeo }> {
  const sb = getPublicSupabase();
  const fallback = { content: DEFAULT_HOME, seo: { seo_title: null, seo_description: null, og_image_url: null } };
  if (!sb) return fallback;

  const { data } = await sb.from('pages').select('content, seo_title, seo_description, og_image_id').eq('slug', 'home').maybeSingle();
  if (!data) return fallback;

  const og = data.og_image_id ? await getMediaUrl(data.og_image_id) : null;
  // Merge so any missing keys fall back to the approved defaults.
  const content = { ...DEFAULT_HOME, ...(data.content as Partial<HomeContent>) } as HomeContent;
  return { content, seo: { seo_title: data.seo_title, seo_description: data.seo_description, og_image_url: og } };
}

// ---- Settings -------------------------------------------------------------
export async function getContact(): Promise<ContactSettings> {
  const sb = getPublicSupabase();
  if (!sb) return DEFAULT_CONTACT;
  const { data } = await sb.from('site_settings').select('contact').eq('id', 1).maybeSingle();
  const c = data?.contact as Partial<ContactSettings> | undefined;
  return { ...DEFAULT_CONTACT, ...(c ?? {}) };
}

// ---- Posts ----------------------------------------------------------------
export async function listPublishedPosts(): Promise<Post[]> {
  const sb = getPublicSupabase();
  if (!sb) return [];
  const { data } = await sb
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  return (data as Post[]) ?? [];
}

export async function getPublishedPost(slug: string): Promise<Post | null> {
  const sb = getPublicSupabase();
  if (!sb) return null;
  const { data } = await sb.from('posts').select('*').eq('slug', slug).eq('status', 'published').maybeSingle();
  return (data as Post) ?? null;
}

// ---- Media ----------------------------------------------------------------
export async function getMediaUrl(id: string | null): Promise<string | null> {
  if (!id) return null;
  const sb = getPublicSupabase();
  if (!sb) return null;
  const { data } = await sb.from('media').select('public_url').eq('id', id).maybeSingle();
  return data?.public_url ?? null;
}

export async function listMedia(): Promise<Media[]> {
  const sb = getPublicSupabase();
  if (!sb) return [];
  const { data } = await sb.from('media').select('*').order('created_at', { ascending: false });
  return (data as Media[]) ?? [];
}
