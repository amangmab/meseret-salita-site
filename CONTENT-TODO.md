# Content to replace before launch

This site is complete and fully designed, but some content uses **realistic placeholders**
so nothing fake is presented as real. Search the codebase for `[REPLACE:` and `TODO` to find
every spot in context. This file is the organized checklist.

Legend: 🔴 = do before going live · 🟡 = recommended · 🟢 = optional / nice-to-have

---

## 🔴 1. Make the contact form deliver to your inbox (2 minutes)
The contact form already works — until you set a key, it gracefully opens the visitor's email app.
To receive submissions directly in your inbox instead:

1. Go to **https://web3forms.com**, enter `hello@meseretsalita.com`, and copy the free **Access Key**.
2. Open **`contact.html`**, find:
   ```html
   <form id="contact-form" data-access-key="REPLACE_WITH_WEB3FORMS_ACCESS_KEY" novalidate>
   ```
   Replace `REPLACE_WITH_WEB3FORMS_ACCESS_KEY` with your key.

That's it — submissions now arrive by email, with a built-in spam honeypot. (No backend needed.)
Alternative: if you prefer, leave it as-is and the form will compose a pre-filled email to you.

---

## 🔴 2. Social media links (all pages, footer)
The footer LinkedIn / X / Instagram icons currently link to `#`.
Replace `href="#"` on the three `.footer-social` links with your real profile URLs
(or delete any platform you don't use). Appears in the footer of every page.

---

## 🔴 3. Testimonials (index.html)
Three **sample** testimonials are shown with clearly-marked placeholder bylines. Replace with real,
**approved** quotes. Update the quote text, `[REPLACE: Client name]`, `[REPLACE: Company]`,
`[REPLACE: Talent name]`, and the avatar initials (the two letters inside `<span class="avatar">`).
Remove the "Sample quotes shown…" note once they're real.

## 🔴 4. Company logos / trust strip (index.html)
Five sample company names appear under "Building a trusted bench…". Replace with real client
names or `<img>` logos (or remove the section if you'd rather not show it yet).

## 🟢 5. Stats (index.html)
The four animated numbers now describe **how the service works** (4-stage process · 5 core roles ·
&lt;2-week shortlist target · 100% replacement-backed) — these are accurate to the model, not
invented traction metrics, so they're safe to launch as-is. Optional: once you have real results
(people trained, companies served, retention, etc.), swap the `data-count` / `data-suffix`
attributes to show them off.

---

## 🔴 6. Team (about.html)
Replace the three placeholder team members:
- `[REPLACE: Founder name]` + role + `[REPLACE: bio]`
- `[REPLACE: Name]` — Head of Training + bio
- `[REPLACE: Name]` — Placements & Partnerships + bio

Swap the initials avatars for real headshots if you have them (an `<img>` inside the card works),
and delete the "Replace the placeholders below…" note. Also expand the origin story paragraph
marked with a `TODO` under "Our mission."

## 🟡 7. Pricing (pricing.html)
All prices are **illustrative**: `$2,500 / hire`, `$1,200 / mo`, and `Custom`.
Replace with your real rates and terms, then remove the "Figures shown are illustrative…" caption.
Also confirm the payment-terms and guarantee answers (search `TODO` in the file).

## 🔴 8. Replacement guarantee wording
A representative window is shown as **`[30 days]`** with "replacement at no additional placement fee"
in `companies.html`, `pricing.html`, and `faq.html`. Confirm your real terms, replace every
`[30 days]` (find-and-replace across the folder), and remove the square brackets. Search `TODO`
for the related notes.

## 🟡 9. Contact details (contact.html)
- Confirm location — currently `Addis Ababa, Ethiopia [REPLACE: confirm]`. Add a full address if you want.
- Add a phone number and/or a scheduling link (e.g. Calendly) in the "Prefer to talk?" card.

## 🟡 10. Talent + process specifics
Search `TODO` in `talent.html`, `faq.html`, and `process.html` to confirm:
- Training duration & format
- Any costs/terms for applicants
- On-site / remote / location requirements
- Typical hiring timelines

---

## 🟡 11. Legal pages (privacy.html, terms.html)
Both are **starting-point templates** and say so at the top. Have a qualified legal professional
review and tailor them to your real practices and jurisdiction, then set the real "Last updated"
date (currently auto-fills the current year) and remove the template-notice boxes.

---

## 🟢 12. Nice-to-have polish
- **Custom share image:** Open Graph/Twitter currently reuse `assets/meseret-salita-hero.png`.
  A purpose-made 1200×630 image (logo + tagline) shares better on social. Update the `og:image` /
  `twitter:image` tags in each page's `<head>` if you create one.
- **Analytics:** none is installed. Add GA4 or a privacy-friendly tool (e.g. Plausible) by pasting
  its snippet before `</head>` if you want traffic data. (Then mention it in the privacy policy.)
- **PWA icons:** `site.webmanifest` uses the SVG favicon. Add 192×192 and 512×512 PNG icons for
  the best home-screen/install experience.
- **Sitemap dates:** `sitemap.xml` uses `2026-05-29` as `lastmod`. Update when you change content.

---

### Where things live
| Area | File(s) |
|---|---|
| Brand colours, fonts, all styling | `styles.css` (`:root` has the palette) |
| Interactions (menu, form, animations) | `script.js` |
| Shared header & footer | repeated in every `*.html` (edit each, or use find-and-replace) |
| Reusable brand assets | `assets/` |

> Tip: the header and footer are copy-pasted into each page (zero-build static site). If you change
> a nav link, update it in every `.html` file — a find-and-replace across the folder is easiest.
