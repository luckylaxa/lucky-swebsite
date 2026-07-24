'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin, adminActor } from './auth';
import { getServiceSupabase } from './supabase/server';
import type { HomeContent, PostStatus } from './types';

// ---- Pages ----------------------------------------------------------------
export async function savePage(
  slug: string,
  content: HomeContent | Record<string, unknown>,
  seo: { seo_title: string; seo_description: string; og_image_id: string | null },
) {
  await requireAdmin();
  const sb = getServiceSupabase();
  const { error } = await sb.from('pages').upsert({
    slug,
    name: slug === 'home' ? 'Home' : slug,
    content,
    seo_title: seo.seo_title || null,
    seo_description: seo.seo_description || null,
    og_image_id: seo.og_image_id,
    updated_by: await adminActor(),
  });
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath(`/admin/pages/${slug}`);
  return { ok: true };
}

// ---- Posts ----------------------------------------------------------------
export interface PostInput {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  body: unknown;
  cover_image_id: string | null;
  status: PostStatus;
  seo_title: string;
  seo_description: string;
  og_image_id: string | null;
}

export async function savePost(input: PostInput) {
  await requireAdmin();
  const sb = getServiceSupabase();

  // published_at is set the first time a post goes live, and kept thereafter.
  let published_at: string | null = null;
  if (input.status === 'published') {
    if (input.id) {
      const { data } = await sb.from('posts').select('published_at').eq('id', input.id).maybeSingle();
      published_at = data?.published_at ?? new Date().toISOString();
    } else {
      published_at = new Date().toISOString();
    }
  }

  const row = {
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt || '',
    body: input.body ?? null,
    cover_image_id: input.cover_image_id,
    status: input.status,
    seo_title: input.seo_title || null,
    seo_description: input.seo_description || null,
    og_image_id: input.og_image_id,
    published_at,
    author: await adminActor(),
  };

  const query = input.id
    ? sb.from('posts').update(row).eq('id', input.id).select('id').single()
    : sb.from('posts').insert(row).select('id').single();

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  revalidatePath('/journal');
  revalidatePath(`/journal/${input.slug}`);
  revalidatePath('/admin/journal');
  return { ok: true, id: data.id as string };
}

export async function deletePost(id: string) {
  await requireAdmin();
  const sb = getServiceSupabase();
  const { error } = await sb.from('posts').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/journal');
  revalidatePath('/admin/journal');
  return { ok: true };
}

// ---- Settings -------------------------------------------------------------
export async function saveContact(contact: Record<string, string>) {
  await requireAdmin();
  const sb = getServiceSupabase();
  const { error } = await sb.from('site_settings').upsert({ id: 1, contact });
  if (error) throw new Error(error.message);
  revalidatePath('/');
  return { ok: true };
}

// ---- Media ----------------------------------------------------------------
export async function updateMediaAlt(id: string, alt: string) {
  await requireAdmin();
  const sb = getServiceSupabase();
  const { error } = await sb.from('media').update({ alt }).eq('id', id);
  if (error) throw new Error(error.message);
  return { ok: true };
}

export async function deleteMedia(id: string) {
  await requireAdmin();
  const sb = getServiceSupabase();
  const { data } = await sb.from('media').select('storage_path').eq('id', id).maybeSingle();
  if (data?.storage_path) await sb.storage.from('media').remove([data.storage_path]);
  const { error } = await sb.from('media').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/media');
  return { ok: true };
}
