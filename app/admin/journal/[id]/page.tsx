import { notFound } from 'next/navigation';
import PostEditor from '@/components/admin/PostEditor';
import { getServiceSupabase } from '@/lib/supabase/server';
import type { Post } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function mediaUrl(id: string | null): Promise<string | null> {
  if (!id) return null;
  const sb = getServiceSupabase();
  const { data } = await sb.from('media').select('public_url').eq('id', id).maybeSingle();
  return data?.public_url ?? null;
}

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = getServiceSupabase();
  const { data } = await sb.from('posts').select('*').eq('id', id).maybeSingle();
  if (!data) notFound();
  const post = data as Post;

  const [cover_url, og_image_url] = await Promise.all([mediaUrl(post.cover_image_id), mediaUrl(post.og_image_id)]);
  const bodyHtml =
    post.body && typeof post.body === 'object' && 'html' in post.body ? String((post.body as { html: unknown }).html ?? '') : '';

  return (
    <>
      <div className="admin-head">
        <div>
          <p className="eyebrow-sm">Journal</p>
          <h1>Edit post</h1>
          <p>Update content, then save a draft or publish.</p>
        </div>
      </div>
      <PostEditor
        initial={{
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt ?? '',
          bodyHtml,
          cover_image_id: post.cover_image_id,
          cover_url,
          status: post.status,
          seo_title: post.seo_title ?? '',
          seo_description: post.seo_description ?? '',
          og_image_id: post.og_image_id,
          og_image_url,
        }}
      />
    </>
  );
}
