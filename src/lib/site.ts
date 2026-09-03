/**
 * FAMILY FOOTWEAR — single source of truth for all business information.
 *
 * `phone` drives every Call and WhatsApp link on the site plus the `telephone`
 * field in the LocalBusiness structured data. Store it as digits only, with the
 * country code and no spaces or symbols, so it is valid in both a `tel:` URI and
 * a wa.me link. Displayed separately as `phoneDisplay`.
 */

/** Sentinel meaning "not yet supplied" — kept so `hasPhone` stays meaningful. */
export const PHONE_PLACEHOLDER = "91XXXXXXXXXX";

/**
 * +91 99718 44701
 * Typed as `string` rather than a literal so the placeholder guard below stays
 * a real runtime check instead of a comparison TypeScript can rule out.
 */
const phone: string = "919971844701";

/** True only once a real number has been filled in above. */
export const hasPhone = phone !== PHONE_PLACEHOLDER && /^\d{10,15}$/.test(phone);

const addressLines = [
  "Main Shanti Nagar Road",
  "Pal Vihar, Raj Nagar",
  "Loni, Ghaziabad",
  "Uttar Pradesh 201102",
] as const;

const mapsQuery = encodeURIComponent(
  "Family Footwear and Sportswear, Main Shanti Nagar Road, Pal Vihar, Raj Nagar, Loni, Ghaziabad, Uttar Pradesh 201102"
);

export const site = {
  name: "Family Footwear",
  legalName: "Family Footwear and Sportswear",
  locality: "Loni, Ghaziabad",
  tagline: "Footwear • Sportswear • Lifestyle",
  url: "https://familyfootwearloni.in",

  address: {
    lines: addressLines,
    street: "Main Shanti Nagar Road, Pal Vihar, Raj Nagar",
    locality: "Loni",
    region: "Uttar Pradesh",
    postalCode: "201102",
    country: "IN",
    full: addressLines.join(", "),
  },

  phone,
  hasPhone,
  /** Human-readable form for on-page display. */
  phoneDisplay: "+91 99718 44701",

  /** tel: link — only render when `hasPhone` is true. */
  telHref: `tel:+${phone}`,
  /** WhatsApp deep link — only render when `hasPhone` is true. */
  whatsappHref: `https://wa.me/${phone}?text=${encodeURIComponent(
    "Hi Family Footwear! I'd like to check available styles and sizes."
  )}`,

  /** Works without an API key. */
  directionsHref: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  mapsHref: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  mapsEmbedSrc: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,

  /** Set to a real profile URL to reveal the Instagram link, or leave null. */
  instagram: null as string | null,

  hours: {
    display: "Open daily • Please call ahead on public holidays",
    /** schema.org openingHours — update if the store confirms different timings. */
    schema: null as string[] | null,
  },
} as const;

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Men", href: "#men" },
  { label: "Women", href: "#women" },
  { label: "Kids", href: "#kids" },
  { label: "Sports", href: "#sports" },
  { label: "Brands", href: "#brands" },
  { label: "About", href: "#about" },
  { label: "Visit Store", href: "#visit" },
] as const;

/**
 * Brands stocked. The six below were supplied by the store owner; `Campus`
 * additionally appears on the physical shop board in the storefront photograph.
 * Do not add a brand here unless the store confirms it — see README.
 */
export const brands = [
  { name: "Sparx", confirmedOnBoard: false },
  { name: "Asian", confirmedOnBoard: false },
  { name: "Campus", confirmedOnBoard: true },
  { name: "Paragon", confirmedOnBoard: false },
  { name: "Relaxo", confirmedOnBoard: false },
  { name: "Jockey", confirmedOnBoard: false },
] as const;
