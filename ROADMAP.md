# Storefront roadmap — config-driven sections for solo owners

> **Status: all 11 features shipped** (Phases 1–3) on `feat/configurable-and-tracker`.
> Remaining optional item: finish the parked blog (see bottom).

The goal: a non-technical owner builds their whole site by editing `src/config/site.ts`
(+ `theme.css` for branding), never a component. This roadmap tracks the 11 features a
solo small-business owner most often reaches for that the template can't yet express.

**Ground rules**
- Prefer new `HomeSection` types in the registry (`src/config/site.ts` union →
  `src/components/sections/*Section.astro`, wired in `src/pages/index.astro`). Adding a
  variant should need no `index.astro` edit beyond the type→component map.
- Owner-facing config is **camelCase**; CTAs are `{ href, label }` objects (`SectionCta`).
- Markdown bodies render at build time via `marked` (`set:html` is safe — config is
  dev-authored, never user input).
- Every image field pairs with an `*Alt` field. Ship each feature with an example
  (commented) in `homeSections` and verify `astro check` + `astro build` clean.

Effort: **S** ≈ half-day · **M** ≈ 1–2 sessions · **L** ≈ multi-session / needs a decision.

---

## Phase 1 — quick wins (config-only for the owner, fit the section registry) — ✅ DONE

### 1. FAQ section  · S · registry — ✅
Accordion of question/answer pairs — near-universal, and emits **FAQPage JSON-LD** (real
SEO win; injected via `Layout schemas={[...]}` like `localBusinessSchema()`).
- Config: `{ type: "faq", id, title, eyebrow?, items: [{ q, a }] }` (`a` is Markdown).
- Accept: renders an accessible `<details>`/disclosure list; FAQ schema present in
  `dist/index.html`; keyboard-operable.

### 2. Gallery / photo grid  · S · registry — ✅
The biggest visual gap — salons, cafés, tradespeople sell on photos.
- Config: `{ type: "gallery", id, title?, eyebrow?, images: [{ src, alt, caption? }], columns? }`.
- Accept: responsive grid, lazy-loaded images, alt required; optional lightbox is a later polish.

### 3. Pricing / price list  · S · registry — ✅
`services` have no price and the shop (dullahan catalog) is overkill for a rate card / café menu.
- Config: `{ type: "pricing", id, title?, eyebrow?, note?, items: [{ name, price, description?, featured? }] }`.
- Accept: clean price rows/cards; `price` is free text (owner controls currency/format).

### 4. Announcement / promo bar  · S · global (not a section) — ✅
Dismissible top strip ("Closed Aug 12–15", "20% off"). One config value, site-wide.
- Config: `announcement?: { message, href?, dismissible? }` in `site.ts`; rendered in `Layout`.
- Accept: shows above header; dismiss persists per session (localStorage); absent when unset.

---

## Phase 2 — info & trust — ✅ DONE

### 5. Structured opening hours + "Open now"  · M · refactor — ✅
Today `openingHours` is one free-text string in 3 places plus a separate
`openingHoursSchema` that can drift. Make per-day hours the single source of truth.
- Config: `hours: { mon: "9:00–17:00", tue: …, … }` (or `closed`); derive the display
  string, the JSON-LD, and a live open/closed badge from it.
- Accept: footer/contact/hero read from `hours`; JSON-LD generated, not hand-kept; badge
  reflects current day/time. Keep a plain-string fallback for simple cases.

### 6. Map embed (opt-in) on contact  · S — ✅
Currently only a *link* to Google Maps. Add an optional inline embed.
- Config: `map?: { embed: boolean }` (reuses `business.mapsQuery`).
- Accept: opt-in only (third-party iframe = cookies; off by default to stay privacy-clean);
  link-only behaviour unchanged when disabled.

### 7. Team / "meet us" section  · S · registry — ✅
Common for clinics, salons, agencies.
- Config: `{ type: "team", id, title?, eyebrow?, members: [{ name, role?, photo?, photoAlt?, bio? }] }`.
- Accept: photo grid with names/roles; graceful when photos omitted.

### 8. Video support in hero / prose  · S — ✅
`prose` supports an image but not video.
- Config: extend `prose` with `video?: { src?, embed?, poster? }`; optionally a hero video.
- Accept: self-hosted `<video>` or a lazy-loaded embed; falls back to `image` when absent.

---

## Phase 3 — integrations — ✅ DONE (implemented provider-agnostically, no decision needed)

### 9. Newsletter signup  · L · decision — ✅ (provider-agnostic: form posts to any provider's action URL)
Email capture has no home (no list provider; dullahan has no list feature).
- Decision: which provider (Buttondown/Mailchimp/dullahan endpoint?). Then a config block
  + a form component posting to it.
- Accept: submits to the chosen provider; success/error states mirror the contact form.

### 10. Booking / appointments  · M · decision — ✅ (link-out default; `embed` flag for inline iframe)
Service businesses want "Book now" → Calendly/Square/etc. Works today as a plain CTA link;
this makes it first-class.
- Decision: link-out vs embedded scheduler. Link-out is S; embed is M and adds a third party.
- Accept: prominent booking CTA driven by config; no dead end when unconfigured.

### 11. Per-page / per-product OG images  · M — ✅ (per-page override + client-side product meta; SSR still the deeper option)
One static `/og.png` for the whole site; product pages and prose sections can't set their own.
`seo.ts` already has `SeoImage`, so it's plumbing (+ optionally build-time OG generation).
- Accept: per-page `ogImage` override respected; product detail can supply its `image`.

---

## Related (not one of the 11): finish the parked **blog**
`blogEnabled` is a *parked* flag (per the `flagged()` comment): in prod it adds no link or
page; in `astro dev` the nav link shows so it can be built out — so it's not a prod bug, but
enabling it today 404s. To finish: a `blog` content collection + `/blog` index +
`/blog/[slug]` mirroring `legal/[slug].astro`, plus RSS. **L.** Do it when a client needs it.

---

## Suggested order
1 → 2 → 3 → 4  (Phase 1, each a self-contained PR-sized change)
then 5 → 6 → 7 → 8, then the Phase 3 items once their integration is chosen.
Each item ships independently; nothing here blocks the live shop (that's gated on the
dullahan `feat/weekly-digest` merge + deploy).
