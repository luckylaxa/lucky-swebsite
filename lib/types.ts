// Shared content types. `image` fields hold a media id (uuid) once uploaded,
// or a static /assets path as the seeded default.

export type ImageRef = string; // media.id (uuid) OR a public URL / /assets path

export interface HomeContent {
  hero: {
    eyebrow: string;
    heading: string;      // may contain <em> for the clay accent
    lede: string;
    image: ImageRef;
    ctaPrimary: string;
    ctaSecondary: string;
    meta: { label: string; sub: string }[];
  };
  trust: { label: string; items: string[] };
  values: {
    heading: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  statement: string;      // may contain <em>
  work: {
    eyebrow: string;
    heading: string;
    intro: string;
    projects: { type: string; title: string; location: string; tag: string; image: ImageRef; wide?: boolean; tall?: boolean }[];
  };
  services: { eyebrow: string; heading: string; intro: string; items: { title: string; body: string }[] };
  method: { eyebrow: string; heading: string; intro: string; checklist: { title: string; body: string }[]; more: string };
  firm: {
    eyebrow: string;
    heading: string;
    portrait: ImageRef;
    paragraphs: string[]; // may contain <strong>
    stats: { value: string; label: string }[];
  };
  contact: { eyebrow: string; heading: string; intro: string };
}

export interface ContactSettings {
  address: string;   // may contain <br/>
  phone: string;
  phoneHref: string;
  email: string;
  hours: string;     // may contain <br/>
}

export interface Page<T = Record<string, unknown>> {
  slug: string;
  name: string;
  content: T;
  seo_title: string | null;
  seo_description: string | null;
  og_image_id: string | null;
  updated_at: string;
}

export type PostStatus = 'draft' | 'published';

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: unknown; // Tiptap JSON
  cover_image_id: string | null;
  status: PostStatus;
  seo_title: string | null;
  seo_description: string | null;
  og_image_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author: string | null;
}

export interface Media {
  id: string;
  storage_path: string;
  public_url: string;
  alt: string;
  width: number | null;
  height: number | null;
}
