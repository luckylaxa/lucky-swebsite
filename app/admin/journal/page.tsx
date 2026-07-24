import Link from 'next/link';
import { getServiceSupabase } from '@/lib/supabase/server';
import type { Post } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function JournalAdmin() {
  const sb = getServiceSupabase();
  const { data } = await sb.from('posts').select('*').order('updated_at', { ascending: false });
  const posts = (data as Post[]) ?? [];

  return (
    <>
      <div className="admin-head">
        <div>
          <p className="eyebrow-sm">Journal</p>
          <h1>Posts</h1>
          <p>Draft in private, publish when ready. Published posts appear on the site immediately.</p>
        </div>
        <Link className="btn btn-primary" href="/admin/journal/new">+ New post</Link>
      </div>

      {posts.length === 0 ? (
        <div className="card"><p className="card-hint">No posts yet. Create your first one.</p></div>
      ) : (
        <div className="list">
          {posts.map((p) => (
            <Link className="list-row" key={p.id} href={`/admin/journal/${p.id}`}>
              <div className="grow">
                <h3>{p.title || 'Untitled'}</h3>
                <span className="sub">/journal/{p.slug} · updated {new Date(p.updated_at).toLocaleDateString()}</span>
              </div>
              <span className={`badge ${p.status}`}>{p.status}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
