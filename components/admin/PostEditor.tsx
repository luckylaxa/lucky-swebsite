'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { savePost, deletePost, type PostInput } from '@/lib/actions';
import ImageDropzone from './ImageDropzone';
import RichTextEditor from './RichTextEditor';
import SaveBar, { type SaveState } from './SaveBar';

export interface PostEditorProps {
  initial: {
    id?: string;
    slug: string;
    title: string;
    excerpt: string;
    bodyHtml: string;
    cover_image_id: string | null;
    cover_url: string | null;
    status: 'draft' | 'published';
    seo_title: string;
    seo_description: string;
    og_image_id: string | null;
    og_image_url: string | null;
  };
}

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export default function PostEditor({ initial }: PostEditorProps) {
  const router = useRouter();
  const [p, setP] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(!!initial.slug);
  const [state, setState] = useState<SaveState>('idle');
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof typeof p>(k: K, v: (typeof p)[K]) => setP((prev) => ({ ...prev, [k]: v }));

  async function save(status: 'draft' | 'published') {
    setState('saving');
    setError(null);
    const slug = p.slug || slugify(p.title);
    if (!p.title.trim()) { setState('error'); setError('Title is required'); return; }
    if (!slug) { setState('error'); setError('Slug is required'); return; }

    const input: PostInput = {
      id: p.id,
      slug,
      title: p.title,
      excerpt: p.excerpt,
      body: { html: p.bodyHtml },
      cover_image_id: p.cover_image_id,
      status,
      seo_title: p.seo_title,
      seo_description: p.seo_description,
      og_image_id: p.og_image_id,
    };
    try {
      const res = await savePost(input);
      setP((prev) => ({ ...prev, id: res.id, slug, status }));
      setState('saved');
      setTimeout(() => setState('idle'), 2500);
      if (!p.id) router.replace(`/admin/journal/${res.id}`);
      router.refresh();
    } catch (e) {
      setState('error');
      setError(e instanceof Error ? e.message : 'Save failed');
    }
  }

  async function onDelete() {
    if (!p.id || !confirm('Delete this post permanently?')) return;
    await deletePost(p.id);
    router.push('/admin/journal');
  }

  return (
    <>
      <div className="card">
        <h2>Post</h2>
        <div className="field">
          <label>Title</label>
          <input type="text" value={p.title} onChange={(e) => { const t = e.target.value; setP((prev) => ({ ...prev, title: t, slug: slugTouched ? prev.slug : slugify(t) })); }} />
        </div>
        <div className="field">
          <label>Slug <span className="hint">the URL: /journal/{p.slug || 'your-post'}</span></label>
          <input type="text" value={p.slug} onChange={(e) => { setSlugTouched(true); set('slug', slugify(e.target.value)); }} />
        </div>
        <div className="field">
          <label>Excerpt <span className="hint">short summary for the journal list &amp; SEO</span></label>
          <textarea value={p.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
        </div>
        <ImageDropzone label="Cover image" hint="~3:2" value={p.cover_url} onChange={(r) => setP((prev) => ({ ...prev, cover_image_id: r.id, cover_url: r.public_url }))} />
      </div>

      <div className="card">
        <h2>Body</h2>
        <RichTextEditor value={p.bodyHtml} onChange={(html) => set('bodyHtml', html)} />
      </div>

      <div className="card">
        <h2>SEO &amp; social</h2>
        <div className="field">
          <label>Meta title <span className="hint">defaults to the post title</span></label>
          <input type="text" value={p.seo_title} onChange={(e) => set('seo_title', e.target.value)} />
        </div>
        <div className="field">
          <label>Meta description</label>
          <textarea value={p.seo_description} onChange={(e) => set('seo_description', e.target.value)} />
        </div>
        <ImageDropzone label="Social share image (OG)" hint="defaults to the cover" value={p.og_image_url} onChange={(r) => setP((prev) => ({ ...prev, og_image_id: r.id, og_image_url: r.public_url }))} />
      </div>

      <SaveBar state={state} error={error}>
        <button className="btn btn-ghost" onClick={() => save('draft')} disabled={state === 'saving'}>Save draft</button>
        <button className="btn btn-primary" onClick={() => save('published')} disabled={state === 'saving'}>
          {p.status === 'published' ? 'Update (published)' : 'Publish'}
        </button>
        {p.id && (
          <>
            <span style={{ flex: 1 }} />
            {p.status === 'published' && <a className="btn btn-ghost" href={`/journal/${p.slug}`} target="_blank" rel="noreferrer">View ↗</a>}
            <button className="btn btn-danger" onClick={onDelete} disabled={state === 'saving'}>Delete</button>
          </>
        )}
      </SaveBar>
    </>
  );
}
