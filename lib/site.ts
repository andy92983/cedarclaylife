export const SITE = {
  name: "Cedar & Clay",
  tagline: "Create. Consume. Conduct.",
  /** Canonical order: create → consume → conduct */
  motto: "Whole-life wellness through what you create, consume, and conduct.",
  domain: "https://cedarclaylife.com",
  phone: "(920) 538-6638",
  contactName: "Samantha Bergstrom",
  address: {
    street: "W4187 Blackhawk Ave",
    city: "Redgranite",
    state: "WI",
    zip: "54970",
    country: "United States",
  },
  acres: 21,
  verse: {
    text: "Beloved, I pray that you may prosper in all things and be in health, just as your soul prospers.",
    reference: "3 John 1:2",
  },
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
  marketNote:
    "Find us at our county farmer's market or submit a pre-order online. Booth prices reflect simple homemade packaging — sizes may vary, and the listed price still applies. We'll contact you to arrange payment and shipping outside this website.",
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/shop", label: "Pre-Order" },
  { href: "/orders", label: "My Orders" },
  { href: "/studio", label: "Studio" },
  { href: "/land", label: "Land" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const SEO_KEYWORDS = [
  "Cedar and Clay",
  "Cedar & Clay Redgranite",
  "faith-based wellness Wisconsin",
  "farmer's market handmade products",
  "elderberry syrup kit Wisconsin",
  "natural laundry soap",
  "handmade bath soak",
  "holistic health Christian",
  "natural home products",
  "handmade body care",
  "art studio coming soon",
  "guided land walks Redgranite",
  "biblical wellness",
  "mind body spirit health",
  "Redgranite WI farmer market",
] as const;

export function formatAddress() {
  const { street, city, state, zip } = SITE.address;
  return `${street}, ${city}, ${state} ${zip}`;
}
