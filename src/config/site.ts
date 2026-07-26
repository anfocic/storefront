// ─────────────────────────────────────────────────────────────────────────
// EDIT ME — this file is your whole business. Change the values below and the
// rest of the site follows. No component edits needed for content changes.
// ─────────────────────────────────────────────────────────────────────────

import { hoursLines, hoursShort } from "../lib/hours.ts";

// Parked sections. While false: no nav link, no built page, excluded from the
// sitemap — but visible in `astro dev` so you can build them out.
export const reviewEnabled = false;
export const blogEnabled = false;
// The product catalog / shop (fetches dullahan `/products` live in the browser).
// Also set PUBLIC_DULLAHAN_URL for it to load anything.
export const shopEnabled = false;

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
  // Show an inline map on the contact card. Off by default: the embed loads a
  // third-party Google iframe (sets cookies). The address always links out to
  // Maps regardless of this. Uses `mapsQuery` above.
  mapEmbed: false,
  // Opening hours, one entry per day. Use "Closed" (or "") for closed days;
  // split shifts with a comma ("9:00–13:00, 14:00–17:00"). This single source
  // drives the displayed hours, the JSON-LD, and the live "Open now" badge —
  // no separate schema string to keep in sync.
  hours: {
    mon: "9:00–17:00",
    tue: "9:00–17:00",
    wed: "9:00–17:00",
    thu: "9:00–17:00",
    fri: "9:00–17:00",
    sat: "Closed",
    sun: "Closed",
  },
  // IANA timezone the hours are in, for an accurate "Open now" badge. Unset →
  // the visitor's own timezone is assumed (fine for a local business).
  timezone: "Europe/Dublin" as string | undefined,
  // JSON-LD price hint: $ (cheap) … $$$$ (pricey).
  priceRange: "$$",
  // Page language (<html lang>), Open Graph locale, and the browser UI
  // theme-color (match your theme's page background, --bg in theme.css).
  locale: { lang: "en", ogLocale: "en_IE" },
  themeColor: "#f8f7f3",
};

// Derived from `business.hours` (edit the hours, not these). `openingHoursText`
// is a compact one-liner of the open days; `openingHoursByDay` is the full
// per-day list for the contact page.
export const openingHoursText = hoursShort(business.hours);
export const openingHoursByDay = hoursLines(business.hours);

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
  ...(flagged(shopEnabled) ? [{ href: "/shop", label: "Shop" }] : []),
  { href: "/#reviews", label: "Reviews" },
  ...(flagged(blogEnabled) ? [{ href: "/blog", label: "Blog" }] : []),
  { href: "/#contact", label: "Contact" },
];

export const footerLinks = [
  { href: "/services", label: "Services" },
  ...(flagged(shopEnabled) ? [{ href: "/shop", label: "Shop" }] : []),
  { href: "/contact", label: "Contact" },
  ...(flagged(blogEnabled) ? [{ href: "/blog", label: "Blog" }] : []),
];

export const legalLinks = [
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/privacy", label: "Privacy Policy" },
];

export const cta = { href: "/#contact", label: "Get in touch" };

// Optional site-wide announcement bar, shown above the header on every page.
// Set to an object to switch it on; leave `null` to hide it entirely. When
// `dismissible`, a visitor can close it and it stays closed for their session
// (changing `message` shows it again).
export const announcement: {
  message: string;
  href?: string;
  dismissible?: boolean;
} | null = null;

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
    shop: {
      eyebrow: "Our products",
      title: "Shop",
      lede: "Browse what we offer.",
      loading: "Loading products…",
      empty: "No products yet — check back soon.",
      error: "Couldn't load the shop. Please try again later.",
      soldOut: "Sold out",
      backLabel: "← Back to shop",
      notFound: "That product isn't available.",
    },
    reviews: {
      eyebrow: "Kind words",
      title: "What our customers say",
      // Per-review "read more" link label (reviews may live on Google,
      // Facebook, Trustpilot… — word it to match where yours are).
      readMoreLabel: "Read review →",
      swipeHint: "← swipe to read more →",
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
    fields: { name: "Name", email: "Email", phone: "Phone", message: "Message" },
    submitLabel: "Send Message",
    sendingLabel: "Sending…",
    // Consent line, rendered as: {agreePrefix} <Terms> {agreeSeparator} <Privacy>.
    agreePrefix: "By sending, you agree to our",
    agreeSeparator: "and",
    successIcon: "🐾",
    successTitle: "Message sent!",
    successBody: "Thanks for getting in touch — we'll reply as soon as we can.",
    // Prefix for the phone number folded into the emailed message body.
    phonePrefix: "Phone: ",
    validation: {
      name: "Please enter your name.",
      email: "Please enter a valid email.",
      phone: "Please enter a phone number.",
      message: "Please add a short message (10+ characters).",
    },
    status: {
      notConfigured: "Form is not configured yet. Please call or email us instead.",
      error: "Something went wrong. Please call or email us instead.",
    },
  },
  notFound: {
    title: "Page not found",
    body: "We couldn't find that page. Let's get you back on track.",
    backLabel: "Back home",
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Home page composition — an ordered list of sections. Reorder, remove, or add
// entries here and the home page follows; no `index.astro` edits needed.
//
// Built-in types (hero/services/reviews/contact) pull their copy from the
// `content` block above. The generic `prose` type is fully defined inline, so
// you can add an About / mission / FAQ-style section — even several — from
// config alone. Each `id` becomes the section's anchor (e.g. `/#about`).
//
// A `prose` section is: an optional `eyebrow` kicker, a `title`, an optional
// `lede` (one larger intro line), and a `body` written in **Markdown** (bold,
// links, lists, paragraphs). Add an `image` to place a picture beside/behind the
// text via `mediaPosition`, and up to two buttons (`cta`, `secondaryCta`).
// `theme`/`width`/`background` tune the look. Only `id`, `title`, `body` are
// required. Always set `imageAlt` when you set `image` (accessibility).
// ─────────────────────────────────────────────────────────────────────────

/** A single button: label + destination. Matches `cta` / `secondaryCta` above. */
export type SectionCta = { href: string; label: string };

export type HomeSection =
  | { type: "hero" }
  | { type: "services" }
  | { type: "reviews" }
  | { type: "contact" }
  | {
      type: "faq";
      /** Anchor id — becomes `/#<id>`. */
      id: string;
      title?: string;
      eyebrow?: string;
      /** Question/answer pairs. Each answer `a` is Markdown. Also emitted as
       *  FAQPage structured data for search engines. */
      items: { q: string; a: string }[];
    }
  | {
      type: "gallery";
      /** Anchor id — becomes `/#<id>`. */
      id: string;
      title?: string;
      eyebrow?: string;
      /** Photos. `alt` is required (accessibility); `caption` optional. */
      images: { src: string; alt: string; caption?: string }[];
      /** Columns on wide screens (2–4). Default 3; collapses on small screens. */
      columns?: 2 | 3 | 4;
    }
  | {
      type: "pricing";
      /** Anchor id — becomes `/#<id>`. */
      id: string;
      title?: string;
      eyebrow?: string;
      /** Rows in the price list. `price` is free text so you control the
       *  currency/format (e.g. "€45", "from £20", "POA"). `featured` highlights
       *  a row; `description` is an optional second line. */
      items: { name: string; price: string; description?: string; featured?: boolean }[];
      /** Small print under the list (e.g. "Prices include VAT"). */
      note?: string;
    }
  | {
      type: "team";
      /** Anchor id — becomes `/#<id>`. */
      id: string;
      title?: string;
      eyebrow?: string;
      /** People. `photo` is optional — without it a monogram is shown. Set
       *  `photoAlt` whenever `photo` is set. */
      members: { name: string; role?: string; photo?: string; photoAlt?: string; bio?: string }[];
    }
  | {
      type: "newsletter";
      /** Anchor id — becomes `/#<id>`. */
      id: string;
      title?: string;
      eyebrow?: string;
      lede?: string;
      /** Your email provider's form endpoint (Mailchimp/Buttondown/etc.) — the
       *  form submits straight to it, so no integration code or keys are needed. */
      action: string;
      /** The email input's `name`, as your provider expects it. Default "email"
       *  (Mailchimp uses "EMAIL"). */
      emailField?: string;
      method?: "post" | "get";
      buttonLabel?: string;
      placeholder?: string;
      /** Small print under the form (consent / privacy line). */
      note?: string;
    }
  | {
      type: "booking";
      /** Anchor id — becomes `/#<id>`. */
      id: string;
      title?: string;
      eyebrow?: string;
      lede?: string;
      /** Your scheduler URL (Calendly, Square, SimplyBook, etc.). */
      url: string;
      /** Button text when linking out. Default "Book now". */
      label?: string;
      /** `true` embeds the scheduler inline (third-party iframe). Default
       *  false — a button that opens the scheduler in a new tab. */
      embed?: boolean;
      note?: string;
    }
  | {
      type: "prose";
      /** Anchor id — becomes `/#<id>`. Lowercase, dash-separated. */
      id: string;
      title: string;
      /** Markdown — rendered to HTML at build time. */
      body: string;
      /** Small kicker above the title. */
      eyebrow?: string;
      /** One larger intro line between the title and the body. */
      lede?: string;
      /** Image URL (absolute, or under `public/`). */
      image?: string;
      /** Alt text — required whenever `image` is set. */
      imageAlt?: string;
      /** Video in the media slot (takes precedence over `image`). Use `src`
       *  for a self-hosted file (`poster` optional, falls back to `image`), or
       *  `embed` for a YouTube/Vimeo embed URL. Ignored for `background`. */
      video?: { src?: string; embed?: string; poster?: string };
      /** Where the image sits relative to the text. Default `top`. */
      mediaPosition?: "left" | "right" | "top" | "background" | "none";
      /** Text alignment. Default `center` (or `left` in two-column layouts). */
      align?: "left" | "center" | "right";
      /** Colour scheme for the text — pair `dark` with a `background` image. */
      theme?: "light" | "dark";
      /** Content width. Default `contained`. */
      width?: "narrow" | "contained" | "full-bleed";
      /** CSS colour or image URL behind the section. */
      background?: string;
      /** Primary button. */
      cta?: SectionCta;
      /** Secondary button beside the primary. */
      secondaryCta?: SectionCta;
    };

export const homeSections: HomeSection[] = [
  { type: "hero" },
  { type: "services" },
  { type: "reviews" },
  { type: "contact" },
  // Example — drop in an About section (uncomment / edit):
  // {
  //   type: "prose",
  //   id: "about",
  //   eyebrow: "About us",
  //   title: "A little about the shop",
  //   lede: "One warm sentence that sums up who you are.",
  //   body: "Two or three sentences with **bold** bits and a [link](/#contact).\n\nA second paragraph works too.",
  //   image: "/images/about.jpg",
  //   imageAlt: "Our team at the front counter",
  //   mediaPosition: "right",
  //   align: "left",
  //   cta: { href: "/#contact", label: "Get in touch" },
  // },
  // Example — a FAQ section (answers are Markdown; also emitted as FAQ rich results):
  // {
  //   type: "faq",
  //   id: "faq",
  //   eyebrow: "Good to know",
  //   title: "Frequently asked questions",
  //   items: [
  //     { q: "Do I need to book ahead?", a: "Walk-ins are welcome, but [booking](/#contact) guarantees a slot." },
  //     { q: "Where are you based?", a: "1 Main Street, Yourtown — parking is right outside." },
  //   ],
  // },
  // Example — a photo gallery (alt is required; caption + columns optional):
  // {
  //   type: "gallery",
  //   id: "gallery",
  //   eyebrow: "Our work",
  //   title: "Recent projects",
  //   columns: 3,
  //   images: [
  //     { src: "/images/work-1.jpg", alt: "A finished kitchen fit-out", caption: "Kitchen, Yourtown" },
  //     { src: "/images/work-2.jpg", alt: "A restored oak table" },
  //   ],
  // },
  // Example — a price list (price is free text; feature a row; optional note):
  // {
  //   type: "pricing",
  //   id: "pricing",
  //   eyebrow: "Our rates",
  //   title: "Pricing",
  //   items: [
  //     { name: "Consultation", price: "Free", description: "30 minutes, no obligation" },
  //     { name: "Standard service", price: "€45", featured: true },
  //     { name: "Callout", price: "from €80" },
  //   ],
  //   note: "Prices include VAT.",
  // },
  // Example — a team section (photo optional; a monogram shows without one):
  // {
  //   type: "team",
  //   id: "team",
  //   eyebrow: "The people",
  //   title: "Meet the team",
  //   members: [
  //     { name: "Alex Murphy", role: "Founder", photo: "/images/alex.jpg", photoAlt: "Alex Murphy", bio: "20 years in the trade." },
  //     { name: "Sam Byrne", role: "Stylist" },
  //   ],
  // },
  // Example — a newsletter signup (posts straight to your email provider):
  // {
  //   type: "newsletter",
  //   id: "newsletter",
  //   eyebrow: "Stay in touch",
  //   title: "Join the list",
  //   lede: "Occasional updates and offers. No spam.",
  //   action: "https://your-provider.com/subscribe",
  //   emailField: "email",
  //   note: "We'll only email you now and then. Unsubscribe anytime.",
  // },
  // Example — a booking section (link-out by default; set embed:true to inline):
  // {
  //   type: "booking",
  //   id: "book",
  //   eyebrow: "Appointments",
  //   title: "Book your visit",
  //   lede: "Pick a time that suits you.",
  //   url: "https://calendly.com/your-handle",
  //   label: "Book now",
  //   // embed: true,
  // },
];
