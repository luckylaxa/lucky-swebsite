'use client';

import { useState } from 'react';
import type { HomeContent } from '@/lib/types';
import { savePage } from '@/lib/actions';
import ImageDropzone from './ImageDropzone';
import SaveBar, { type SaveState } from './SaveBar';

interface Seo {
  seo_title: string;
  seo_description: string;
  og_image_id: string | null;
  og_image_url: string | null;
}

// ---- tiny field helpers ----
function Text({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <div className="field">
      <label>{label}{hint && <span className="hint">{hint}</span>}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
function Area({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <div className="field">
      <label>{label}{hint && <span className="hint">{hint}</span>}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export default function PageEditor({ initial, seo }: { initial: HomeContent; seo: Seo }) {
  const [c, setC] = useState<HomeContent>(initial);
  const [s, setS] = useState<Seo>(seo);
  const [state, setState] = useState<SaveState>('idle');
  const [error, setError] = useState<string | null>(null);

  // immutable deep update
  const edit = (fn: (draft: HomeContent) => void) => {
    setC((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
  };

  async function onSave() {
    setState('saving');
    setError(null);
    try {
      await savePage('home', c, { seo_title: s.seo_title, seo_description: s.seo_description, og_image_id: s.og_image_id });
      setState('saved');
      setTimeout(() => setState('idle'), 2500);
    } catch (e) {
      setState('error');
      setError(e instanceof Error ? e.message : 'Save failed');
    }
  }

  return (
    <>
      {/* HERO */}
      <div className="card">
        <h2>Hero</h2>
        <p className="card-hint">The top of the page. Use &lt;em&gt;…&lt;/em&gt; in the heading for the clay-colored words.</p>
        <Text label="Eyebrow" value={c.hero.eyebrow} onChange={(v) => edit((d) => { d.hero.eyebrow = v; })} />
        <Area label="Heading" value={c.hero.heading} onChange={(v) => edit((d) => { d.hero.heading = v; })} hint="allows <em>" />
        <Area label="Lede" value={c.hero.lede} onChange={(v) => edit((d) => { d.hero.lede = v; })} />
        <div className="grid-2">
          <Text label="Primary button" value={c.hero.ctaPrimary} onChange={(v) => edit((d) => { d.hero.ctaPrimary = v; })} />
          <Text label="Secondary button" value={c.hero.ctaSecondary} onChange={(v) => edit((d) => { d.hero.ctaSecondary = v; })} />
        </div>
        <ImageDropzone label="Hero image" hint="portrait ~5:6" value={c.hero.image} onChange={(r) => edit((d) => { d.hero.image = r.public_url; })} />
        <fieldset>
          <legend>Recognition badges</legend>
          {c.hero.meta.map((m, i) => (
            <div className="grid-2" key={i}>
              <Text label={`Badge ${i + 1} title`} value={m.label} onChange={(v) => edit((d) => { d.hero.meta[i].label = v; })} />
              <Text label="Sub-text" value={m.sub} onChange={(v) => edit((d) => { d.hero.meta[i].sub = v; })} />
            </div>
          ))}
        </fieldset>
      </div>

      {/* TRUST STRIP */}
      <div className="card">
        <h2>Trust strip</h2>
        <Text label="Label" value={c.trust.label} onChange={(v) => edit((d) => { d.trust.label = v; })} />
        <Area label="Items" hint="one per line" value={c.trust.items.join('\n')} onChange={(v) => edit((d) => { d.trust.items = v.split('\n').map((x) => x.trim()).filter(Boolean); })} />
      </div>

      {/* VALUES */}
      <div className="card">
        <h2>Value props</h2>
        <Text label="Heading" value={c.values.heading} onChange={(v) => edit((d) => { d.values.heading = v; })} />
        <Area label="Intro" value={c.values.intro} onChange={(v) => edit((d) => { d.values.intro = v; })} />
        {c.values.items.map((it, i) => (
          <div className="repeat-item" key={i}>
            <Text label={`Item ${i + 1} title`} value={it.title} onChange={(v) => edit((d) => { d.values.items[i].title = v; })} />
            <Area label="Body" value={it.body} onChange={(v) => edit((d) => { d.values.items[i].body = v; })} />
          </div>
        ))}
      </div>

      {/* STATEMENT */}
      <div className="card">
        <h2>Statement line</h2>
        <Area label="Statement" hint="allows <em>" value={c.statement} onChange={(v) => edit((d) => { d.statement = v; })} />
      </div>

      {/* WORK */}
      <div className="card">
        <h2>Selected work</h2>
        <div className="grid-2">
          <Text label="Eyebrow" value={c.work.eyebrow} onChange={(v) => edit((d) => { d.work.eyebrow = v; })} />
          <Text label="Heading" value={c.work.heading} onChange={(v) => edit((d) => { d.work.heading = v; })} />
        </div>
        <Area label="Intro" value={c.work.intro} onChange={(v) => edit((d) => { d.work.intro = v; })} />
        {c.work.projects.map((p, i) => (
          <div className="repeat-item" key={i}>
            <div className="grid-2">
              <Text label="Type" value={p.type} onChange={(v) => edit((d) => { d.work.projects[i].type = v; })} />
              <Text label="Tag" value={p.tag} onChange={(v) => edit((d) => { d.work.projects[i].tag = v; })} />
            </div>
            <Text label="Title" value={p.title} onChange={(v) => edit((d) => { d.work.projects[i].title = v; })} />
            <Text label="Location" value={p.location} onChange={(v) => edit((d) => { d.work.projects[i].location = v; })} />
            <ImageDropzone label="Project image" value={p.image} onChange={(r) => edit((d) => { d.work.projects[i].image = r.public_url; })} />
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <div className="card">
        <h2>Services</h2>
        <div className="grid-2">
          <Text label="Eyebrow" value={c.services.eyebrow} onChange={(v) => edit((d) => { d.services.eyebrow = v; })} />
          <Text label="Heading" value={c.services.heading} onChange={(v) => edit((d) => { d.services.heading = v; })} />
        </div>
        <Area label="Intro" value={c.services.intro} onChange={(v) => edit((d) => { d.services.intro = v; })} />
        {c.services.items.map((it, i) => (
          <div className="repeat-item" key={i}>
            <Text label={`Service ${i + 1} title`} value={it.title} onChange={(v) => edit((d) => { d.services.items[i].title = v; })} />
            <Area label="Body" value={it.body} onChange={(v) => edit((d) => { d.services.items[i].body = v; })} />
          </div>
        ))}
      </div>

      {/* METHOD */}
      <div className="card">
        <h2>Method / checklist</h2>
        <Text label="Eyebrow" value={c.method.eyebrow} onChange={(v) => edit((d) => { d.method.eyebrow = v; })} />
        <Text label="Heading" value={c.method.heading} onChange={(v) => edit((d) => { d.method.heading = v; })} />
        <Area label="Intro" value={c.method.intro} onChange={(v) => edit((d) => { d.method.intro = v; })} />
        {c.method.checklist.map((it, i) => (
          <div className="repeat-item" key={i}>
            <Text label={`Checklist ${i + 1} title`} value={it.title} onChange={(v) => edit((d) => { d.method.checklist[i].title = v; })} />
            <Area label="Body" value={it.body} onChange={(v) => edit((d) => { d.method.checklist[i].body = v; })} />
          </div>
        ))}
        <Area label="Closing note" value={c.method.more} onChange={(v) => edit((d) => { d.method.more = v; })} />
      </div>

      {/* FIRM */}
      <div className="card">
        <h2>The firm</h2>
        <Text label="Eyebrow" value={c.firm.eyebrow} onChange={(v) => edit((d) => { d.firm.eyebrow = v; })} />
        <Text label="Heading" value={c.firm.heading} onChange={(v) => edit((d) => { d.firm.heading = v; })} />
        <ImageDropzone label="Portrait" hint="~4:5" value={c.firm.portrait} onChange={(r) => edit((d) => { d.firm.portrait = r.public_url; })} />
        {c.firm.paragraphs.map((p, i) => (
          <Area key={i} label={`Paragraph ${i + 1}`} hint="allows <strong>" value={p} onChange={(v) => edit((d) => { d.firm.paragraphs[i] = v; })} />
        ))}
        <fieldset>
          <legend>Stats</legend>
          {c.firm.stats.map((st, i) => (
            <div className="grid-2" key={i}>
              <Text label="Value" value={st.value} onChange={(v) => edit((d) => { d.firm.stats[i].value = v; })} />
              <Text label="Label" value={st.label} onChange={(v) => edit((d) => { d.firm.stats[i].label = v; })} />
            </div>
          ))}
        </fieldset>
      </div>

      {/* CONTACT */}
      <div className="card">
        <h2>Contact block</h2>
        <Text label="Eyebrow" value={c.contact.eyebrow} onChange={(v) => edit((d) => { d.contact.eyebrow = v; })} />
        <Text label="Heading" value={c.contact.heading} onChange={(v) => edit((d) => { d.contact.heading = v; })} />
        <Area label="Intro" value={c.contact.intro} onChange={(v) => edit((d) => { d.contact.intro = v; })} />
        <p className="card-hint">Studio address, phone, email and hours live under <strong>Settings</strong> (they appear in the footer too).</p>
      </div>

      {/* SEO */}
      <div className="card">
        <h2>SEO &amp; social</h2>
        <p className="card-hint">Shown in search results and when the page is shared.</p>
        <Text label="Meta title" value={s.seo_title} onChange={(v) => setS({ ...s, seo_title: v })} />
        <Area label="Meta description" value={s.seo_description} onChange={(v) => setS({ ...s, seo_description: v })} />
        <ImageDropzone label="Social share image (OG)" hint="~1200×630" value={s.og_image_url} onChange={(r) => setS({ ...s, og_image_id: r.id, og_image_url: r.public_url })} />
      </div>

      <SaveBar state={state} error={error}>
        <button className="btn btn-primary" onClick={onSave} disabled={state === 'saving'}>Save changes</button>
        <a className="btn btn-ghost" href="/" target="_blank" rel="noreferrer">Preview site ↗</a>
      </SaveBar>
    </>
  );
}
