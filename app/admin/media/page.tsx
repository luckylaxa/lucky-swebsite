import MediaManager from '@/components/admin/MediaManager';
import { getServiceSupabase } from '@/lib/supabase/server';
import type { Media } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function MediaPage() {
  const sb = getServiceSupabase();
  const { data } = await sb.from('media').select('*').order('created_at', { ascending: false });
  return (
    <>
      <div className="admin-head">
        <div>
          <p className="eyebrow-sm">Media</p>
          <h1>Image library</h1>
          <p>Everything you’ve uploaded. Add alt text for accessibility and SEO.</p>
        </div>
      </div>
      <MediaManager initial={(data as Media[]) ?? []} />
    </>
  );
}
