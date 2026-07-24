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

## Images

The five photographic slots are **already filled with real modern-architecture
photos** (`assets/*.jpg`). Each `<img>` also keeps its original line-drawing
(`.svg`) as an `onerror` fallback, so the page still renders cleanly even if a
photo is ever removed.

| File | Slot | Current photo |
| --- | --- | --- |
| `assets/hero.jpg` | Hero (~5:6) | White modern residence with garden |
| `assets/project-01.jpg` | Residential, tall (~4:5) | Two-story custom home |
| `assets/project-02.jpg` | Educational (~4:3) | Angular modern institutional building |
| `assets/project-03.jpg` | Multi-family (~4:3) | Multi-story building with balconies |
| `assets/project-04.jpg` | Commercial, wide (~2:1) | Large-scale modern building |

**Source & licensing:** these are stand-in photos pulled from free, open-source
website templates ([ThemeWagon](https://themewagon.github.io/archi-new/) Archi &
VillaAgency). They're fine for development and review, but **before launch you
should swap in photographs of United Architects' own completed projects** — the
whole point is to show the firm's real work. Replacing is a drop-in: save over
the same filename in `assets/` (any `.jpg`/`.webp`), no code change needed.

### Still to replace with the firm's own assets

| File | Used for | Replace with |
| --- | --- | --- |
| `assets/logo.svg` | Header wordmark (dark) | The firm's real logo |
| `assets/logo-light.svg` | Footer wordmark (on dark) | Light/reversed version of the logo |
| `assets/portrait.svg` | Principal portrait | A real photo of Maria Luisa Castellanos (save as `portrait.jpg` and switch the `src` in `index.html`) — a stock face is deliberately **not** used here, since the section names a real person |

`unitedarchitectsinc.com` was blocked in this environment, so the firm's real
logo and project photography couldn't be pulled directly — send them over (or
have the domain allow-listed) and they'll wire straight in.
