import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPublishedPost, getMediaUrl } from '@/lib/queries';

function bodyHtml(body: unknown): string {
  if (body && typeof body === 'object' && 'html' in body) return String((body as { html: unknown }).html ?? '');
  return '';
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return {};
  const og = await getMediaUrl(post.og_image_id ?? post.cover_image_id);
  return {
    title: post.seo_title || `${post.title} — United Architects`,
    description: post.seo_description || post.excerpt || undefined,
    openGraph: og ? { images: [og], type: 'article' } : undefined,
  };
}

/* eslint-disable @next/next/no-img-element */
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const cover = await getMediaUrl(post.cover_image_id);

  return (
    <article className="section">
      <div className="wrap post-wrap">
        <Link href="/journal" className="eyebrow">&larr; Journal</Link>
        <h1 className="post-title">{post.title}</h1>
        {post.published_at && (
          <time className="post-meta" dateTime={post.published_at}>
            {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        )}
        {cover && <div className="post-cover"><img src={cover} alt={post.title} /></div>}
        <div className="prose" dangerouslySetInnerHTML={{ __html: bodyHtml(post.body) }} />
      </div>
    </article>
  );
}
