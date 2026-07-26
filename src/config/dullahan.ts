// ─────────────────────────────────────────────────────────────────────────
// Backend integration — which dullahan instance this site talks to, and which
// dullahan-backed features are on. Edit `siteId` and the flags per client; the
// URL comes from PUBLIC_DULLAHAN_URL. dullahan is the self-hosted, privacy-first
// analytics + content backend: https://github.com/intrebit/dullahan
// ─────────────────────────────────────────────────────────────────────────

// Base URL of the dullahan instance, no trailing slash. "" when unset (dev).
const url = (import.meta.env.PUBLIC_DULLAHAN_URL ?? "").replace(/\/$/, "");

export const dullahan = {
  url,
  // Analytics site id (the `data-site` the tracker sends). Leave "" to keep the
  // tracker OFF — a fresh clone sends no analytics anywhere until this is set.
  siteId: "" as string,
  analytics: { enabled: false as boolean },
  // The product catalog / shop (wired up separately). Needs `url`.
  shop: { enabled: false as boolean },
  // Optional dullahan CONTACT_TO_<SITE> tenant id for the contact form.
  contact: { site: undefined as string | undefined },
};

// Effective gates: a feature is live only when its flag is on AND its
// prerequisites exist. Analytics also needs a siteId; both need a URL.
export const analyticsEnabled =
  dullahan.analytics.enabled && Boolean(dullahan.url) && Boolean(dullahan.siteId);
export const shopEnabled = dullahan.shop.enabled && Boolean(dullahan.url);
