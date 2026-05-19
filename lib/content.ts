import { SITE } from "./site";

export const PILLARS = [
  {
    id: "home",
    title: "For Your Home",
    subtitle: "What surrounds you shapes you",
    description:
      "Handmade laundry soap, fire starters, vanilla goods, farm fresh eggs, and natural home essentials — available at our county farmer's market.",
    icon: "home",
    href: "/products#home",
  },
  {
    id: "body",
    title: "For Your Body",
    subtitle: "Honor the vessel you've been given",
    description:
      "Bath soaks, sugar scrubs, tallow lotion, and detox blends — small-batch body care made with simple, intentional ingredients.",
    icon: "body",
    href: "/products#body",
  },
  {
    id: "health",
    title: "For Your Health",
    subtitle: "Whole-person wellness rooted in truth",
    description:
      "Elderberry syrup and DIY kits, plus seasonal wellness staples — supporting the whole person: mind, body, and spirit.",
    icon: "health",
    href: "/products#health",
  },
  {
    id: "create",
    title: "Create & Learn",
    subtitle: "Grow at your own pace",
    description:
      "A studio for art, graphic design, 3D printing, sewing, and crafts — with classes tailored to beginners, families, and curious makers.",
    icon: "create",
    href: "/studio",
  },
  {
    id: "land",
    title: "Land & Movement",
    subtitle: `${SITE.acres} acres to breathe`,
    description:
      "Walking paths and hiking trails where conversation slows, screens fade, and your body remembers what it was made for.",
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
    title: "Open Creative Studio",
    description:
      "Paint, glitter, clay, and mess — without ruining your dining room table. Parents tell us this is the space they've been searching for.",
    highlights: ["Kid-friendly art sessions", "All supplies included", "No cleanup at home"],
  },
  {
    title: "Graphic Design & Digital Art",
    description:
      "Learn layout, branding basics, and digital creation at your level — whether you're starting from zero or refining a skill.",
    highlights: ["Beginner to intermediate", "Project-based learning", "Faith-aligned creative work"],
  },
  {
    title: "3D Printing & Maker Lab",
    description:
      "Design, slice, and print — from practical household items to creative prototypes. Hands-on instruction with real tools.",
    highlights: ["Intro workshops", "Ongoing maker hours", "Small group sizes"],
  },
  {
    title: "Sewing, Crafts & Seasonal Workshops",
    description:
      "Stitch by stitch, season by season — sewing fundamentals, holiday crafts, and skill-building classes as demand grows.",
    highlights: ["Coming soon", "All ages welcome", "Learn at your pace"],
  },
] as const;

export const TRAIL_FEATURES = [
  {
    title: "Walking Paths",
    description: "Gentle loops for conversation, prayer walks, and unhurried movement through meadow and tree line.",
  },
  {
    title: "Hiking Trails",
    description: `${SITE.acres} acres of varied terrain — enough room to stretch your legs and quiet your mind without leaving the property.`,
  },
  {
    title: "Group & Family Outings",
    description: "Guided walks for families, small groups, and classes that want movement woven into the experience.",
  },
  {
    title: "Seasonal Gatherings",
    description: "Outdoor events that combine creation, fellowship, and time on the land — watch for announcements.",
  },
] as const;

export const FAQ = [
  {
    question: "Is Cedar & Clay only for Christians?",
    answer:
      "We are unapologetically rooted in biblical teaching, and everyone is welcome. Whether you love God deeply or are simply curious about faith-aligned wellness and creativity, you'll find a warm, non-judgmental space here.",
  },
  {
    question: "What makes your creative studio different?",
    answer:
      "We offer the messy, joyful creative work many parents won't do at home — paint, glitter, clay, and more — in a dedicated space with all supplies provided. No scrubbing glitter out of carpet.",
  },
  {
    question: "Do you offer classes for beginners?",
    answer:
      "Yes. Every class and studio session is designed so you can grow at your level — from first-time makers to experienced crafters looking for community.",
  },
  {
    question: "Can we walk or hike on the property?",
    answer:
      `Yes. Our ${SITE.acres}-acre property includes walking paths and hiking trails. Contact us for hours, group visits, and upcoming guided outings.`,
  },
  {
    question: "Where can I buy your products?",
    answer:
      "Find us at our county farmer's market in Redgranite, Wisconsin. Our website lists everything we make — prices are set at the booth each market day. Contact us for the next market date.",
  },
  {
    question: "Are your products natural and handmade?",
    answer:
      "We prioritize simple ingredients, small-batch production, and intentional craftsmanship for home, body, and wellness products — with transparency about what goes into everything we make.",
  },
] as const;

export const TESTIMONIALS_PLACEHOLDER = [
  {
    quote:
      "Finally — a place where my kids can get gloriously messy and I don't have to panic about the kitchen floor.",
    author: "Parent & studio visitor",
  },
  {
    quote:
      "I came for a walking trail and stayed for the community. This feels like wholeness, not another wellness trend.",
    author: "Trail guest",
  },
] as const;
