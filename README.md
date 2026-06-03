# Meseret Salita — website

Marketing website for **Meseret Salita**, Ethiopia's B2B sales talent partner. We train, vet, and
place B2B sales professionals (SDR, BDR, Account Executive, Sales Ops, Customer Growth) with
companies — with replacement flexibility and ongoing support.

This is a **zero-build static site**: plain HTML, one CSS file, one JS file. No framework, no build
step, no dependencies. It loads fast and deploys anywhere static files are served (it's currently on
Vercel).

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

## Deploy (Vercel)
The site is static, so deployment is a drop-in:

- **Vercel dashboard:** drag this folder into a new project, or connect the Git repo. No build
  command and no output directory are needed — Vercel serves the files as-is. `404.html` is used
  automatically for not-found pages.
- **Vercel CLI:**
  ```bash
  npm i -g vercel
  vercel        # preview deploy
  vercel --prod # production deploy
  ```

## Brand
- **Colors:** navy `#08172d` / gold `#c8952f` (full palette in `styles.css` `:root`)
- **Fonts:** Inter (body) + Playfair Display (headings), via Google Fonts
- **Logo / hero / favicon:** in `assets/`

## Editing notes
The header and footer are duplicated in each `.html` file (the trade-off for a no-build site). To
change a nav item or footer link, update it in every page — a find-and-replace across the folder is
the quickest way.
