import { NextResponse } from 'next/server';
import { isAdmin, adminActor } from '@/lib/auth';
import { getServiceSupabase, MEDIA_BUCKET } from '@/lib/supabase/server';

export const runtime = 'nodejs';

// Drag-and-drop image upload. The dropzone POSTs a file here; we verify the
// Clerk admin, push the bytes to Supabase Storage with the service role, record
// a media row, and return { id, public_url } for the caller to store.
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get('file');
  const alt = (form.get('alt') as string) || '';
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: 'Max file size is 8 MB' }, { status: 400 });
  }

  const sb = getServiceSupabase();
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const safe = file.name.replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase().slice(0, 40);
  const path = `${Date.now()}-${safe || 'image'}.${ext}`;

  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error: upErr } = await sb.storage.from(MEDIA_BUCKET).upload(path, bytes, {
    contentType: file.type,
    upsert: false,
  });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  const { data: pub } = sb.storage.from(MEDIA_BUCKET).getPublicUrl(path);

  const { data: media, error: dbErr } = await sb
    .from('media')
    .insert({
      storage_path: path,
      public_url: pub.publicUrl,
      alt,
      mime_type: file.type,
      size_bytes: file.size,
      uploaded_by: await adminActor(),
    })
    .select('id, public_url, alt')
    .single();

  if (dbErr) return NextResponse.json({ error: dbErr.message }, { status: 500 });
  return NextResponse.json(media);
}
