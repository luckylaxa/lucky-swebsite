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

Each photographic slot shows its architectural line-drawing (`.svg`)
**immediately**, then **progressively upgrades** to a real photo: `main.js`
loads the matching `.jpg` (named in each `<img data-photo="…">`) in the
background and swaps it in only once it's confirmed present. If a photo is
missing, the drawing simply stays — the page never shows a broken or empty
image. So the site looks finished right now, and each photo you add is a
zero-code, drop-in upgrade.

### Add the free Unsplash photos

The build environment couldn't reach `unsplash.com` (network policy), so the
photos aren't bundled — but they're a two-minute drop-in. For each row below:
open the link, click **Download free**, and save the file into `assets/` with
the **exact filename** shown. All are free for commercial use, no attribution
required.

| Save as | Used for | Recommended photo |
| --- | --- | --- |
| `assets/hero.jpg` | Hero (portrait ~5:6) | [Modern house, glazing + garden](https://unsplash.com/photos/modern-house-with-large-windows-and-lush-garden-eWOgoFHlE8g) |
| `assets/project-01.jpg` | Residential, tall (~4:5) | [House in lush greenery](https://unsplash.com/photos/modern-house-nestled-in-lush-greenery-KqrbNYj7QJQ) |
| `assets/project-02.jpg` | Educational (~4:3) | [Glass-facade building](https://unsplash.com/photos/modern-building-with-glass-facade-reflecting-clouds-wyF7ZzJSMAM) |
| `assets/project-03.jpg` | Multi-family (~4:3) | [Apartment building w/ balconies](https://unsplash.com/photos/exterior-of-a-modern-apartment-building-with-balconies-1iGG6k4Ci4E) |
| `assets/project-04.jpg` | Commercial, wide (~2:1) | Pick from [commercial building](https://unsplash.com/s/photos/commercial-building) / [storefront](https://unsplash.com/s/photos/storefront) |

**Prefer your own picks?** Browse these collections and save into the same
filenames: [modern house exterior](https://unsplash.com/s/photos/modern-house-exterior),
[apartment building](https://unsplash.com/s/photos/apartment-building),
[school building](https://unsplash.com/s/photos/school-building),
[architecture](https://unsplash.com/s/photos/architecture). On the download
dialog pick a mid-size (~1600px wide) to keep the page fast.

### Still to replace with the firm's own assets

| File | Used for | Replace with |
| --- | --- | --- |
| `assets/logo.svg` | Header wordmark (dark) | The firm's real logo |
| `assets/logo-light.svg` | Footer wordmark (on dark) | Light/reversed version of the logo |
| `assets/portrait.svg` | Principal portrait | A real photo of Maria Luisa Castellanos (save as `portrait.jpg` and switch the `src` in `index.html`) — a stock face is deliberately **not** used here, since the section names a real person |

`unitedarchitectsinc.com` was blocked in this environment, so the firm's real
logo and project photography couldn't be pulled directly — send them over (or
have the domain allow-listed) and they'll wire straight in.
