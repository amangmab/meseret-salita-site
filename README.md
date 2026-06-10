# Meseret Salita — website

Marketing website for **Meseret Salita**, Ethiopia's B2B sales talent partner. We train, vet, and
place B2B sales professionals (SDR, BDR, Account Executive, Sales Ops, Customer Growth) with
companies — with replacement flexibility and ongoing support.

This is a **zero-build static site**: plain HTML, one CSS file, one JS file. No framework, no build
step, no dependencies. It loads fast and deploys anywhere static files are served.

**Current hosting (interim):** GitHub Pages at
`https://amangmab.github.io/meseret-salita-site/` — every push to `main` auto-deploys via
`.github/workflows/deploy-pages.yml`. The `meseretsalita.com` domain still points at the old
Vercel deployment until the final hosting move.

## Pages
| Page | File |
|---|---|
| Home | `index.html` |
| For companies | `companies.html` |
| For talent | `talent.html` |
| Process | `process.html` |
| Pricing | `pricing.html` |
| About | `about.html` |
| FAQ | `faq.html` |
| Contact | `contact.html` |
| Privacy / Terms | `privacy.html`, `terms.html` |
| 404 | `404.html` |

Supporting files: `styles.css`, `script.js`, `assets/`, `sitemap.xml`, `robots.txt`,
`site.webmanifest`.

## Preview locally
From this folder, run any static server, then open the URL it prints:

```bash
python3 -m http.server 8123
# then visit http://localhost:8123
```

or, if you prefer Node:

```bash
npx serve .
```

## Before launch
See **`CONTENT-TODO.md`** — it lists every placeholder to replace (testimonials, stats, team,
pricing, social links) and the 2-minute step to make the contact form deliver to your inbox.

## Deploy (GitHub Pages — current, interim)
Pushing to `main` is the whole deploy:

```bash
git push origin main
```

`.github/workflows/deploy-pages.yml` runs automatically and publishes the folder to
`https://amangmab.github.io/meseret-salita-site/` (it even enables Pages by itself on the
first run). Check progress under the repo's **Actions** tab.

**Subpath note:** GitHub project sites serve under `/meseret-salita-site/`, so all pages use
relative URLs. The one exception is `404.html`, which carries
`<base href="/meseret-salita-site/">` because hosts serve it at any URL depth.

## Moving to final hosting later
The site deploys anywhere static files are served (Vercel, Netlify, Cloudflare Pages, plain
nginx…). When you move to a host serving at the domain root:

1. In `404.html`, change `<base href="/meseret-salita-site/">` to `<base href="/">` (keep the tag).
2. That's it — everything else already uses relative or domain-canonical URLs.

For Vercel specifically: drag the folder into a new project or connect this Git repo — no build
command or output directory needed; `404.html` is picked up automatically.

## Brand
- **Colors:** navy `#08172d` / gold `#c8952f` (full palette in `styles.css` `:root`)
- **Fonts:** Inter (body) + Playfair Display (headings), via Google Fonts
- **Logo / hero / favicon:** in `assets/`

## Editing notes
The header and footer are duplicated in each `.html` file (the trade-off for a no-build site). To
change a nav item or footer link, update it in every page — a find-and-replace across the folder is
the quickest way.
