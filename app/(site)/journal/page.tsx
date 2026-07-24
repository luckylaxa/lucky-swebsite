import type { Metadata } from 'next';
import Link from 'next/link';
import { listPublishedPosts, getMediaUrl } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Journal — United Architects, Inc.',
  description: 'Notes on architecture, process, and projects from United Architects in Coral Gables.',
};

/* eslint-disable @next/next/no-img-element */
export default async function JournalIndex() {
  const posts = await listPublishedPosts();
  const covers = await Promise.all(posts.map((p) => getMediaUrl(p.cover_image_id)));

  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <div className="head-lead">
            <p className="eyebrow">Journal</p>
            <h2>Notes from the studio.</h2>
          </div>
          <p className="section-sub">Perspectives on design, coordination, and the craft of building in Miami.</p>
        </div>

        {posts.length === 0 ? (
          <p className="section-sub">No posts yet — check back soon.</p>
        ) : (
          <div className="journal-grid">
            {posts.map((p, i) => (
              <article className="journal-card" key={p.id}>
                <Link href={`/journal/${p.slug}`} className="journal-card-link">
                  {covers[i] && <div className="frame"><img src={covers[i]!} alt={p.title} /></div>}
                  <div className="journal-card-body">
                    {p.published_at && (
                      <time className="work-type" dateTime={p.published_at}>
                        {new Date(p.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                    )}
                    <h3>{p.title}</h3>
                    {p.excerpt && <p>{p.excerpt}</p>}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
