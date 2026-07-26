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

import { business } from "./site.ts";

// EDIT ME — site-wide SEO defaults. Name/NAP come from `business` (site.ts) to
// avoid drift; the copy below is SEO-specific.
const SITE = {
  siteName: business.name,
  siteUrl: import.meta.env.PUBLIC_SITE_URL ?? "https://example.com",
  defaultTitle: `${business.name} | ${business.tagline.replace(/\.\s*$/, "")}`,
  defaultDescription:
    "A small local business starter — swap this copy for your own. Fast, static, and easy to make yours.",
  defaultImage: {
    url: "/og.png",
    width: 1200,
    height: 630,
    alt: business.name,
  } as SeoImage,
};

const t = (page: string) => `${page} | ${SITE.siteName}`;

export const pageSEO: Record<string, SEOOverrides> = {
  home: { title: SITE.defaultTitle, description: SITE.defaultDescription },
  services: {
    title: t("Services"),
    description: "What we offer and why people choose us. Swap for your own services.",
  },
  shop: {
    title: t("Shop"),
    description: "Browse our products. Swap for your own shop description.",
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

// NAP is sourced from `business` (site.ts) so it can't drift from the visible
// site. `openingHours` uses schema.org's day/time format; edit for your hours.
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    "@id": `${SITE.siteUrl}/`,
    url: `${SITE.siteUrl}/`,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHours: business.openingHoursSchema,
    priceRange: business.priceRange,
  };
}
