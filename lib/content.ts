import { SITE } from "./site";

export const PILLARS = [
  {
    id: "home",
    title: "For Your Home",
    subtitle: "What surrounds you shapes you",
    description:
      "Handmade laundry soap, vanilla sugar, farm fresh eggs, and natural home essentials — available at our county farmer's market.",
    icon: "home",
    href: "/products#home",
  },
  {
    id: "body",
    title: "For Your Body",
    subtitle: "Honor the vessel you've been given",
    description:
      "Bath soaks, sugar scrubs, tallow lotion, salves, and detox blends — small-batch body care made with simple, intentional ingredients.",
    icon: "body",
    href: "/products#body",
  },
  {
    id: "health",
    title: "For Your Health",
    subtitle: "Whole-person wellness rooted in truth",
    description:
      "Elderberry syrup DIY kits and seasonal wellness staples — supporting the whole person: mind, body, and spirit.",
    icon: "health",
    href: "/products#health",
  },
  {
    id: "create",
    title: "Create & Learn",
    subtitle: "Art studio coming soon",
    description:
      "An art studio is on the way — join the interest list now. Open creative studio hours and 3D printing are not available yet.",
    icon: "create",
    href: "/studio",
  },
  {
    id: "land",
    title: "Land & Movement",
    subtitle: `${SITE.acres} acres to breathe`,
    description:
      "Walk our acreage with a guide for now — no dedicated pathways yet. Closed in deep winter when uncleared snow makes walking unsafe.",
    icon: "land",
    href: "/land",
  },
  {
    id: "faith",
    title: "Rooted in Faith",
    subtitle: "Biblical wisdom for daily life",
    description:
      "Everything we teach and make flows from Scripture — welcoming believers and seekers who want health, creativity, and purpose aligned with God's design.",
    icon: "faith",
    href: "/about#faith",
  },
] as const;

export const PRODUCTS = [] as const;

export const STUDIO_OFFERINGS = [
  {
    title: "Art Studio",
    description:
      "A dedicated art studio is coming soon — paint, drawing, and creative sessions for families and beginners. Join the list and we'll notify you when we open.",
    highlights: ["Coming soon", "Join the interest list", "Faith-aligned creative space"],
  },
  {
    title: "Graphic Design & Digital Art",
    description:
      "Planned for the future — layout, branding basics, and digital creation at your level.",
    highlights: ["Coming later", "Beginner-friendly", "Project-based learning"],
  },
  {
    title: "Open Creative Studio",
    description:
      "Not open yet. When we launch, this will be a mess-welcome space for paint, glitter, and clay — without ruining your dining room table.",
    highlights: ["Not available yet", "Planned for the future", "Supplies to be included"],
  },
  {
    title: "3D Printing & Maker Lab",
    description:
      "Not available yet. 3D printing and maker hours are not offered at this time.",
    highlights: ["Not available yet", "Watch for updates"],
  },
] as const;

export const TRAIL_FEATURES = [
  {
    title: "Guided acreage walks",
    description: `We can walk with you across our ${SITE.acres} acres and show you the land. There are no dedicated pathways yet — we guide you along for now.`,
  },
  {
    title: "No paved or marked trails yet",
    description:
      "Expect natural ground and informal routes. Wear sturdy shoes and plan for uneven terrain.",
  },
  {
    title: "Group & family visits",
    description:
      "Families and small groups are welcome by arrangement — contact us to schedule a guided walk.",
  },
  {
    title: "Winter closure",
    description:
      "Deep winter walks are not available when heavy, uncleared snow makes the land unsafe or impossible to walk.",
  },
] as const;

export const FAQ = [
  {
    question: "Is Cedar & Clay only for Christians?",
    answer:
      "We are unapologetically rooted in biblical teaching, and everyone is welcome. Whether you love God deeply or are simply curious about faith-aligned wellness and creativity, you'll find a warm, non-judgmental space here.",
  },
  {
    question: "Is the art studio open?",
    answer:
      "Not yet — the art studio is coming soon. Open creative studio hours and 3D printing are not available. Contact us to join the interest list.",
  },
  {
    question: "Can we walk on the property?",
    answer: `Yes, by arrangement. Our ${SITE.acres} acres are open for guided walks — there are no dedicated pathways yet, so we walk with you and show the way. We close walks in deep winter when uncleared snow makes walking unsafe.`,
  },
  {
    question: "Where can I buy your products?",
    answer:
      "At our county farmer's market in Redgranite, Wisconsin, or by submitting a pre-order on the Shop page. We'll contact you to confirm and arrange payment offline. Booth prices are on the Products page; online estimates include a small upcharge plus shipping. Packaging sizes may vary.",
  },
  {
    question: "Are your products natural and handmade?",
    answer:
      "We prioritize simple ingredients, small-batch production, and intentional craftsmanship for home, body, and wellness products — with transparency about what goes into everything we make. Packaging is homemade and sizes may vary.",
  },
] as const;

export const TESTIMONIALS_PLACEHOLDER = [
  {
    quote:
      "Finally — a place where my kids can get gloriously messy and I don't have to panic about the kitchen floor.",
    author: "Parent & future studio guest",
  },
  {
    quote:
      "Walking the acreage together felt peaceful and real — not a polished park trail, just land and conversation.",
    author: "Land guest",
  },
] as const;
