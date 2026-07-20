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
- Feature flags to park sections (`reviewEnabled`, `blogEnabled`) until you're ready

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
```

## Make it yours

Four places, in order of impact — no component edits needed:

1. **`src/config/site.ts`** — business name, tagline, phone, email, address,
   services, social links, nav. Set `business.logo` to a `/public` path to use
   an image logo (otherwise a text wordmark shows); set `business.heroImage` for
   an image hero (otherwise a type-forward hero).
2. **`src/styles/theme.css`** — the entire colour palette. Every component reads
   these tokens, so changing them here re-themes the whole site.
3. **`src/content/legal/`** + **`src/data/reviews.json`** — your privacy/terms
   copy and real customer reviews.
4. **`public/`** — replace `favicon.svg`, add `og.png` (1200×630), and any logo
   / hero images you referenced in step 1.

Then set env in `.env` (copy `.env.example`):

- `PUBLIC_SITE_URL` — your domain (SEO/sitemap/canonical).
- `PUBLIC_DULLAHAN_URL` — your dullahan instance for the contact form. Leave
  blank during development; the form shows a graceful "call/email us" message.

## Contact form (dullahan)

The form POSTs `{ name, email, message }` to `${PUBLIC_DULLAHAN_URL}/contact`.
Stand up a [dullahan](https://github.com/intrebit/dullahan) instance, set its
`contact_to` to your inbox, and allow this site's origin (CORS). No API key on
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
  config/{site,seo}.ts       # ← content + SEO you edit
  styles/{theme,tokens,base,fonts}.css   # ← theme.css is the palette
  layouts/Layout.astro       # <head>, SEO, header/footer, JSON-LD
  components/{header,footer,home,contact,shared}
  content/legal/*.md         # privacy + terms (content collection)
  data/reviews.json          # testimonials
  pages/                     # /, /services, /contact, /legal/[slug], 404
public/{fonts,scripts,favicon.svg,robots.txt}
```

## Roadmap hooks

`reviewEnabled` / `blogEnabled` in `site.ts` gate review-submission and blog
sections. Flip a flag on and build the pages under `src/pages/`; for anything
dynamic add `@astrojs/cloudflare` + `output: "server"` and mark those routes
`export const prerender = false`.

## License

MIT.
