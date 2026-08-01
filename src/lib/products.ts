// Browser-side helpers for the dullahan product catalog. Pure TS (no Astro or
// Node imports) so it can be imported into a client <script>. The shop fetches
// live at runtime, so the catalog updates without redeploying the site.

export type Product = {
  id: string;
  site_id: string;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  price_cents: number;
  available: boolean;
  position: number;
  draft: boolean;
  views: number;
  currency: string;
};

export type ProductList = { products: Product[]; total: number };

// dullahan is multi-tenant: every catalog endpoint requires the site id, and a
// request without one is a 400. `site` is `dullahan.siteId` from the config.
const q = (site: string) => `site=${encodeURIComponent(site)}`;

// `cache: "no-store"` so the "live" catalog is never served stale from an
// intermediary — freshness is the whole point of fetching at runtime.
export async function fetchProducts(base: string, site: string): Promise<ProductList> {
  const res = await fetch(`${base}/products?${q(site)}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`products ${res.status}`);
  return res.json();
}

export async function fetchProduct(
  base: string,
  site: string,
  slug: string,
): Promise<Product> {
  const res = await fetch(
    `${base}/products/${encodeURIComponent(slug)}?${q(site)}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error(`product ${res.status}`);
  return res.json();
}

// Fire-and-forget view counter ping (dullahan returns 204; errors ignored).
export function pingView(base: string, site: string, slug: string): void {
  const url = `${base}/products/${encodeURIComponent(slug)}/view?${q(site)}`;
  try {
    if (navigator.sendBeacon) navigator.sendBeacon(url);
    else void fetch(url, { method: "POST", keepalive: true }).catch(() => {});
  } catch {
    /* never break the page */
  }
}

// Integer minor units → a localized currency string (e.g. 1299,"EUR" → €12.99).
export function formatPrice(cents: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(cents / 100);
  } catch {
    // Unknown currency code: fall back to a plain number + code.
    return `${(cents / 100).toFixed(2)} ${currency}`;
  }
}
