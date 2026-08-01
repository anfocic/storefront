# storefront

A fast, static marketing-site starter for small local businesses — built with
[Astro](https://astro.build), deployed to Cloudflare Workers, with a
privacy-friendly contact form powered by [dullahan](https://github.com/intrebit/dullahan).

No framework runtime ships to the browser. Everything is content- and
token-driven: **you make it yours by editing config, not components.**

> **Use this template:** click *Use this template* on GitHub (or
> `gh repo create my-site --template intrebit/storefront`), then
> follow *Make it yours* below.

## Features

- Home (hero, services, reviews carousel, contact), Services, Contact, Legal (privacy/terms), 404
- One-file theming (`src/styles/theme.css`) + one-file content (`src/config/site.ts`)
- SEO done: per-page meta, Open Graph/Twitter, canonical, `LocalBusiness` + `Service` JSON-LD, sitemap
- Accessible: keyboard nav, focus states, honeypot, `prefers-reduced-motion`, no-JS fallback
- Contact form → dullahan `/contact` (self-hosted, no third-party form SaaS)
- Privacy-first analytics (dullahan `/pt.js`), **opt-in** — off until you set a site id
- All copy is config-driven (`content` in `src/config/site.ts`) — headings, ledes, labels, copyright
- Optional live **shop** — a config-flagged product catalog fetched from dullahan `/products`
- Feature flags to park sections (`reviewEnabled`, `blogEnabled`, `shopEnabled`) until you're ready

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
```

## Make it yours

Four places, in order of impact — no component edits needed:

1. **`src/config/site.ts`** — business name, tagline, phone, email, address,
   services, social links, nav, and **all site copy** (the `content` block:
   headings, ledes, labels, copyright). Set `business.logo` / `business.favicon`
   to `/public` paths to use image assets (otherwise a text wordmark shows); set
   `business.heroImage` for an image hero (otherwise a type-forward hero).
   The home page is composed from the `homeSections` array — reorder, drop, or
   add sections (including generic `prose` blocks like an About section) there;
   no `index.astro` edits.
2. **`src/styles/theme.css`** — the entire colour palette. Every component reads
   these tokens, so changing them here re-themes the whole site.
3. **`src/content/legal/`** + **`src/data/reviews.json`** — your privacy/terms
   copy and real customer reviews.
4. **`public/`** — replace `favicon.svg`, add `og.png` (1200×630), and any logo
   / hero images you referenced in step 1.

Then set env in `.env` (copy `.env.example`):

- `PUBLIC_SITE_URL` — your domain (SEO/sitemap/canonical).
- `PUBLIC_DULLAHAN_URL` — your dullahan instance for the contact form (and
  analytics). Leave blank during development; the form shows a graceful
  "call/email us" message.

## Analytics (dullahan, opt-in)

Privacy-first, cookie-free analytics. The tracker **ships with this site** —
it's built from `./tracker` into `public/pt.js` and served same-origin at
`/pt.js`; it posts events to your dullahan `/collect` endpoint. dullahan itself
is a pure-Rust ingest/read API and no longer serves any JavaScript.

It's **off by default** — a fresh clone sends nothing anywhere. To turn it on,
edit `src/config/dullahan.ts`: set `siteId` and `analytics.enabled = true`, and
set `PUBLIC_DULLAHAN_URL` (the dullahan origin events are sent to). The tracker
only loads when all three are set.

`public/pt.js` is a committed, prebuilt artifact. To change the tracker, edit
`tracker/src/`, then `cd tracker && npm install && npm run build && npm test`
(re-emits `public/pt.js`) and commit it.

## Shop (dullahan products, opt-in)

A simple product listing (no cart) driven by dullahan's `/products` API. Turn it
on with `shopEnabled = true` in `src/config/site.ts` and set `PUBLIC_DULLAHAN_URL`.
It adds `/shop` (listing) and `/shop/product?slug=…` (detail), both fetched
**live in the browser** — so adding/editing products in dullahan shows up without
redeploying the site. Prices come back as integer minor units + a `currency`
from the API; product images are absolute URLs you host (a CDN/object store).
The detail page pings the product's view counter so you can see what's viewed.

> The shop calls are tenant-scoped: `dullahan.siteId` is sent as `?site=` on
> every catalog request, so it must be set and registered in dullahan or the
> requests 400. dullahan must also allow this site's origin to read
> `/products` cross-origin — set
> `PRODUCT_ORIGINS` on the server (it's open by default).

## Contact form (dullahan)

The form POSTs `{ site, name, email, message }` to
`${PUBLIC_DULLAHAN_URL}/contact`, where `site` is `dullahan.contact.site` — the
tenant id registered in dullahan's `sites` table. dullahan is multi-tenant and
refuses a submission whose site it does not recognise (503) rather than
delivering it to another site's inbox, so this must be set.
Stand up a [dullahan](https://github.com/intrebit/dullahan) instance, register
this site (`POST /sites`) with `contact_to` set to your inbox. CORS is open on
`/contact`, so nothing to allow. No API key on
the client. Extra fields (e.g. phone) can be folded into the message —
see `public/scripts/contact.js`.

## Build & deploy

```bash
npm run build      # static output → dist/
npm run check      # astro typecheck
npm run deploy     # build + wrangler deploy (Cloudflare Worker, static assets)
```

Deploy is an assets-only Cloudflare Worker (`wrangler.jsonc` → `assets: ./dist`).
Set your Worker `name` in `wrangler.jsonc` and run `wrangler login` first.

## Structure

```
src/
  config/{site,seo,dullahan}.ts   # ← content + SEO + backend wiring you edit
  styles/{theme,tokens,base,fonts}.css   # ← theme.css is the palette
  layouts/Layout.astro       # <head>, SEO, header/footer, JSON-LD
  components/{header,footer,home,contact,shared}
  content/legal/*.md         # privacy + terms (content collection)
  data/reviews.json          # testimonials
  pages/                     # /, /services, /contact, /legal/[slug], 404, robots.txt
public/{fonts,scripts,pt.js,favicon.svg}   # pt.js = built analytics tracker
tracker/                     # tracker source (TS) → builds public/pt.js
```

## Roadmap hooks

`reviewEnabled` / `blogEnabled` in `site.ts` gate review-submission and blog
sections. Flip a flag on and build the pages under `src/pages/`; for anything
dynamic add `@astrojs/cloudflare` + `output: "server"` and mark those routes
`export const prerender = false`.

## License

MIT.
