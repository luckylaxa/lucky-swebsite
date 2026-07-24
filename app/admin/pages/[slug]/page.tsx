import { notFound } from 'next/navigation';
import PageEditor from '@/components/admin/PageEditor';
import { DEFAULT_HOME } from '@/lib/default-content';
import { getServiceSupabase } from '@/lib/supabase/server';
import type { HomeContent } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== 'home') notFound(); // only the home page is modeled for now

  const sb = getServiceSupabase();
  const { data } = await sb
    .from('pages')
    .select('content, seo_title, seo_description, og_image_id')
    .eq('slug', slug)
    .maybeSingle();

  const content = { ...DEFAULT_HOME, ...((data?.content as Partial<HomeContent>) ?? {}) } as HomeContent;

  let og_image_url: string | null = null;
  if (data?.og_image_id) {
    const { data: m } = await sb.from('media').select('public_url').eq('id', data.og_image_id).maybeSingle();
    og_image_url = m?.public_url ?? null;
  }

  return (
    <>
      <div className="admin-head">
        <div>
          <p className="eyebrow-sm">Pages</p>
          <h1>Home page</h1>
          <p>Edit every section of copy, swap images by drag-and-drop, and set SEO.</p>
        </div>
      </div>
      <PageEditor
        initial={content}
        seo={{
          seo_title: data?.seo_title ?? '',
          seo_description: data?.seo_description ?? '',
          og_image_id: data?.og_image_id ?? null,
          og_image_url,
        }}
      />
    </>
  );
}
