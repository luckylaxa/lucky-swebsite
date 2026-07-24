'use client';

import { useState } from 'react';
import type { Media } from '@/lib/types';
import { deleteMedia, updateMediaAlt } from '@/lib/actions';
import ImageDropzone, { type UploadResult } from './ImageDropzone';

export default function MediaManager({ initial }: { initial: Media[] }) {
  const [items, setItems] = useState<Media[]>(initial);

  function onUpload(r: UploadResult) {
    setItems((prev) => [{ id: r.id, public_url: r.public_url, storage_path: '', alt: '', width: null, height: null }, ...prev]);
  }

  async function onDelete(id: string) {
    if (!confirm('Delete this image? Any page still using it will fall back to a placeholder.')) return;
    await deleteMedia(id);
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <>
      <div className="card">
        <h2>Upload</h2>
        <p className="card-hint">Add images to your library. You can also upload directly while editing a page or post.</p>
        <ImageDropzone value={null} onChange={onUpload} />
      </div>

      {items.length === 0 ? (
        <div className="card"><p className="card-hint">No images yet.</p></div>
      ) : (
        <div className="media-grid">
          {items.map((m) => (
            <div className="media-item" key={m.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.public_url} alt={m.alt || ''} />
              <div className="m-body">
                <div className="field" style={{ marginBottom: 8 }}>
                  <input
                    type="text"
                    defaultValue={m.alt || ''}
                    placeholder="Alt text"
                    onBlur={(e) => updateMediaAlt(m.id, e.target.value)}
                  />
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(m.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
