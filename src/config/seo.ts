export type SeoImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

export type SEOOverrides = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: SeoImage;
  type?: "website" | "article";
  robots?: string;
  noindex?: boolean;
};

// EDIT ME — site-wide SEO defaults.
const SITE = {
  siteName: "Marigold",
  siteUrl: import.meta.env.PUBLIC_SITE_URL ?? "https://example.com",
  defaultTitle: "Marigold | Local, friendly, and done properly",
  defaultDescription:
    "A small local business starter — swap this copy for your own. Fast, static, and easy to make yours.",
  defaultImage: {
    url: "/og.png",
    width: 1200,
    height: 630,
    alt: "Marigold",
  } as SeoImage,
};

const t = (page: string) => `${page} | ${SITE.siteName}`;

export const pageSEO: Record<string, SEOOverrides> = {
  home: { title: SITE.defaultTitle, description: SITE.defaultDescription },
  services: {
    title: t("Services"),
    description: "What we offer and why people choose us. Swap for your own services.",
  },
  contact: {
    title: t("Contact"),
    description: "Get in touch to ask a question or book. Swap for your own contact copy.",
  },
  privacy: { title: t("Privacy Policy"), description: "How we collect, use and protect your data." },
  terms: { title: t("Terms & Conditions"), description: "The terms that apply to our services." },
};

export function buildSEO(url: URL, overrides: SEOOverrides = {}) {
  const pathname = (url.pathname ?? "/")
    .replace(/\/index\.html$/, "/")
    .replace(/\.html$/, "");
  const canonical =
    overrides.canonical ??
    `${SITE.siteUrl}${pathname === "/" ? "" : pathname}`.replace(/\/$/, "");

  const title = overrides.title ?? SITE.defaultTitle;
  const description = overrides.description ?? SITE.defaultDescription;
  const type = overrides.type ?? "website";

  const rawImg = overrides.image?.url ?? SITE.defaultImage.url;
  const image: SeoImage = {
    ...SITE.defaultImage,
    ...(overrides.image ?? {}),
    url: rawImg.startsWith("http") ? rawImg : `${SITE.siteUrl}${rawImg}`,
    alt: overrides.image?.alt ?? SITE.defaultImage.alt ?? title,
  };

  const noindex =
    overrides.noindex === true || overrides.robots?.includes("noindex");
  const robots =
    overrides.robots ??
    (noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1");

  return { site: SITE, canonical, title, description, type, image, robots };
}

// EDIT ME — replace with your own NAP details (name/address/phone).
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Marigold",
    "@id": `${SITE.siteUrl}/`,
    url: `${SITE.siteUrl}/`,
    telephone: "+353 1 234 5678",
    email: "hello@example.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1 Main Street",
      addressLocality: "Yourtown",
      addressRegion: "Co. Example",
      postalCode: "A00 B000",
      addressCountry: "IE",
    },
    openingHours: "Mo-Fr 09:00-17:00",
    priceRange: "$$",
  };
}
