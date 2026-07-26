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
  // Optional dullahan CONTACT_TO_<SITE> tenant id for the contact form.
  contact: { site: undefined as string | undefined },
};

// Analytics is live only when opted in AND its prerequisites exist (a URL to
// send to and a siteId). The shop's on/off flag lives in site.ts alongside the
// other feature flags (it reads dullahan.url at fetch time).
export const analyticsEnabled =
  dullahan.analytics.enabled && Boolean(dullahan.url) && Boolean(dullahan.siteId);
