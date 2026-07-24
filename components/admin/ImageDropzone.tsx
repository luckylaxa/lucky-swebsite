'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export interface UploadResult {
  id: string;
  public_url: string;
}

export default function ImageDropzone({
  value,
  onChange,
  label,
  hint,
}: {
  value?: string | null; // current image URL to preview
  onChange: (result: UploadResult) => void;
  label?: string;
  hint?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;
      setBusy(true);
      setError(null);
      try {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        onChange({ id: data.id, public_url: data.public_url });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Upload failed');
      } finally {
        setBusy(false);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    disabled: busy,
  });

  return (
    <div className="field">
      {label && <label>{label} {hint && <span className="hint">{hint}</span>}</label>}
      <div
        {...getRootProps()}
        className={`dropzone${isDragActive ? ' drag' : ''}${value ? ' has-image' : ''}`}
      >
        <input {...getInputProps()} />
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Current" />
            <div className="dz-overlay">{busy ? 'Uploading…' : 'Drop or click to replace'}</div>
          </>
        ) : (
          <p className="dz-hint">{busy ? 'Uploading…' : isDragActive ? 'Drop the image…' : 'Drag & drop an image, or click to choose'}</p>
        )}
      </div>
      {error && <p className="status err" style={{ marginTop: 6, fontSize: '0.8rem' }}>{error}</p>}
    </div>
  );
}
