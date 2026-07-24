'use client';

import { useState } from 'react';
import type { ContactSettings } from '@/lib/types';
import { saveContact } from '@/lib/actions';
import SaveBar, { type SaveState } from './SaveBar';

export default function ContactForm({ initial }: { initial: ContactSettings }) {
  const [c, setC] = useState<ContactSettings>(initial);
  const [state, setState] = useState<SaveState>('idle');
  const [error, setError] = useState<string | null>(null);
  const set = <K extends keyof ContactSettings>(k: K, v: string) => setC((p) => ({ ...p, [k]: v }));

  async function onSave() {
    setState('saving');
    setError(null);
    try {
      await saveContact(c as unknown as Record<string, string>);
      setState('saved');
      setTimeout(() => setState('idle'), 2500);
    } catch (e) {
      setState('error');
      setError(e instanceof Error ? e.message : 'Save failed');
    }
  }

  return (
    <>
      <div className="card">
        <h2>Studio contact</h2>
        <p className="card-hint">Used in the footer and the contact block. Use &lt;br/&gt; for line breaks in address/hours.</p>
        <div className="field"><label>Address</label><textarea value={c.address} onChange={(e) => set('address', e.target.value)} /></div>
        <div className="grid-2">
          <div className="field"><label>Phone (display)</label><input type="text" value={c.phone} onChange={(e) => set('phone', e.target.value)} /></div>
          <div className="field"><label>Phone (dial) <span className="hint">e.g. +13055525465</span></label><input type="text" value={c.phoneHref} onChange={(e) => set('phoneHref', e.target.value)} /></div>
        </div>
        <div className="field"><label>Email</label><input type="text" value={c.email} onChange={(e) => set('email', e.target.value)} /></div>
        <div className="field"><label>Hours</label><textarea value={c.hours} onChange={(e) => set('hours', e.target.value)} /></div>
      </div>
      <SaveBar state={state} error={error}>
        <button className="btn btn-primary" onClick={onSave} disabled={state === 'saving'}>Save settings</button>
      </SaveBar>
    </>
  );
}
