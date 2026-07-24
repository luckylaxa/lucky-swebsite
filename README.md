# United Architects, Inc. — Landing Page

A redesigned landing page for [United Architects, Inc.](https://www.unitedarchitectsinc.com/),
a Coral Gables architecture firm established in 1986.

This is the **initial landing page only** — a foundation to review and sign off on
before building out the rest of the site.

## Design notes

- **Light mode**, warm paper palette, **no gradients** anywhere.
- Distinctive sans-serif type: **Space Grotesk** (headings) + **Hanken Grotesk** (body)
  — deliberately avoiding Roboto/Inter.
- **Subtle scroll animations** via `IntersectionObserver` (fade + rise, gentle stagger),
  fully disabled under `prefers-reduced-motion`.
- Restrained header sizing (the H1 tops out around 2.95rem).
- Editorial rhythm inspired by the supplied reference: image-led hero, centered
  value props, alternating bands, a project grid, and a calm dark firm section.
- Fully responsive, keyboard-accessible, self-contained (only a web-font CDN).

## Running it

It's a static site — open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Copy

All text is the firm's own copy — philosophy, the 10-Point Project Management
Checklist, the six service areas, principal bio, awards, and contact details
(4000 Ponce de Leon Blvd., Suite 470; (305) 552-5465; MLC@UnitedArchs.com).

## ⚠️ Placeholder images — swap in the real assets

The build environment's network policy **blocked all access to
`unitedarchitectsinc.com` (and to web archives)**, so the firm's real logo and
photography could not be downloaded. The images in `assets/` are therefore
**intentional architectural line-drawings** — an on-brand "elevation study"
aesthetic — standing in for the real thing.

To go live, drop the real files into `assets/` using the **same filenames** (no
code changes needed):

| File | Used for | Replace with |
| --- | --- | --- |
| `assets/logo.svg` | Header wordmark (dark) | The firm's real logo |
| `assets/logo-light.svg` | Footer wordmark (on dark) | Light/reversed version of the logo |
| `assets/hero.svg` | Hero visual | A signature building/render (portrait ~5:6) |
| `assets/project-01.svg` | Work grid — Residential (tall) | Real project photo (~4:5) |
| `assets/project-02.svg` | Work grid — Educational | Real project photo (~4:3) |
| `assets/project-03.svg` | Work grid — Multi-family | Real project photo (~4:3) |
| `assets/project-04.svg` | Work grid — Commercial (wide) | Real project photo (~2:1) |
| `assets/portrait.svg` | Principal portrait | Photo of Maria Luisa Castellanos (~4:5) |

Raster photos (`.jpg` / `.webp`) work too — just update the matching `src`
extension in `index.html`.

Alternatively, send the assets over (or have the firm's domain allow-listed for
the build environment) and they can be wired in directly.
