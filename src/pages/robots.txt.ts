import type { APIRoute } from "astro";

// Generated (not a static file) so the Sitemap line always uses the real
// PUBLIC_SITE_URL instead of shipping a placeholder domain to production.
const site = (import.meta.env.PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap-index.xml\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
