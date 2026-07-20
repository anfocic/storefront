// ─────────────────────────────────────────────────────────────────────────
// EDIT ME — this file is your whole business. Change the values below and the
// rest of the site follows. No component edits needed for content changes.
// ─────────────────────────────────────────────────────────────────────────

// Parked sections. While false: no nav link, no built page, excluded from the
// sitemap — but visible in `astro dev` so you can build them out.
export const reviewEnabled = false;
export const blogEnabled = false;

const flagged = (enabled: boolean) => enabled || import.meta.env.DEV;

export const business = {
  name: "Marigold",
  tagline: "Local, friendly, and done properly.",
  // Optional brand logo. Unset → the header/footer show a text wordmark.
  // Set to a path in /public (e.g. "/logo.svg") to show an image instead.
  logo: undefined as string | undefined,
  // Optional hero image (path in /public). Unset → a type-forward hero.
  heroImage: undefined as string | undefined,
  phone: "+353 1 234 5678",
  phoneHref: "tel:+35312345678",
  email: "hello@example.com",
  address: {
    street: "1 Main Street",
    locality: "Yourtown",
    region: "Co. Example",
    postalCode: "A00 B000",
    country: "IE",
  },
  addressLine: "1 Main Street, Yourtown, Co. Example",
  mapsQuery: "1 Main Street, Yourtown, Ireland",
  openingHours: "Mon–Fri, 9:00–17:00",
};

export const services = [
  {
    icon: "✨",
    title: "Signature Service",
    description:
      "Your flagship offering in one clear sentence — what it is and why people choose it.",
  },
  {
    icon: "💛",
    title: "Care & Maintenance",
    description:
      "The dependable follow-up that keeps customers coming back. Describe the value, not the mechanics.",
  },
  {
    icon: "📋",
    title: "Consultations",
    description:
      "The low-commitment first step. Make it feel easy to say yes to and book.",
  },
] as const;

export const socialLinks = [
  { href: "https://facebook.com/", label: "Marigold on Facebook", icon: "facebook" as const },
  { href: "https://instagram.com/", label: "Marigold on Instagram", icon: "instagram" as const },
];

export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#reviews", label: "Reviews" },
  ...(flagged(blogEnabled) ? [{ href: "/blog", label: "Blog" }] : []),
  { href: "/#contact", label: "Contact" },
];

export const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  ...(flagged(blogEnabled) ? [{ href: "/blog", label: "Blog" }] : []),
];

export const legalLinks = [
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/privacy", label: "Privacy Policy" },
];

export const cta = { href: "/#contact", label: "Get in touch" };
