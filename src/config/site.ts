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
  // Favicon path in /public. Swap for your own icon.
  favicon: "/favicon.svg" as string,
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

// All user-facing copy — headings, ledes, labels. Edit here; no component
// changes needed. (Business facts live in `business`; SEO in seo.ts.)
export const content = {
  hero: {
    // A short location/positioning line above the headline.
    eyebrow: "Yourtown, Co. Example",
    lede: "A short, warm sentence about what you do and who it's for. Swap this for your own.",
    // The primary button reuses `cta`; this is the secondary link beside it.
    secondaryCta: { href: "/#services", label: "Our services" },
  },
  sections: {
    services: {
      eyebrow: "What we do",
      title: "Our Services",
      lede: "A one-line promise about how you work — swap for your own.",
      // The standalone /services page's intro line.
      pageLede: "A short intro to your offering — swap for your own.",
    },
    reviews: {
      eyebrow: "Kind words",
      title: "What our customers say",
    },
    contact: {
      // Home-page contact section.
      eyebrow: "Get in touch",
      title: "Send us a message",
      lede: "A friendly line inviting people to reach out. Swap for your own.",
      // The standalone /contact page.
      pageTitle: "Contact Us",
      pageLede: "Questions or ready to book? We'd love to hear from you.",
      // Shared contact-info block.
      infoTitle: "Contact details",
      emailLabel: "Email us",
    },
  },
  footer: {
    exploreHeading: "Explore",
    legalHeading: "Legal",
    contactHeading: "Get in touch",
    emailLabel: "Email us",
    copyright: (year: number) => `© ${year} ${business.name}. All rights reserved.`,
  },
  contactForm: {
    submitLabel: "Send Message",
    successIcon: "🐾",
    successTitle: "Message sent!",
    successBody: "Thanks for getting in touch — we'll reply as soon as we can.",
  },
  notFound: {
    title: "Page not found",
    body: "We couldn't find that page. Let's get you back on track.",
    backLabel: "Back home",
  },
};
