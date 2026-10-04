export type ProductCategory = "home" | "bath" | "wellness" | "garden";

export type MarketProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  ingredients?: string;
  directions?: string;
  caution?: string;
  /** Typical farmer's market booth price (USD) */
  price: number;
  /** Approximate size — packaging may vary; price still applies */
  priceUnit?: string;
  status: "available" | "seasonal";
  /** If false, product is booth / local pickup only (not shipped) */
  shipsOnline?: boolean;
};

export const PRODUCT_CATEGORIES: {
  id: ProductCategory;
  title: string;
  description: string;
}[] = [
  {
    id: "home",
    title: "Home",
    description: "Natural goods for everyday living — from the laundry room to the kitchen.",
  },
  {
    id: "wellness",
    title: "Wellness",
    description: "Small-batch DIY kits and seasonal staples made with simple ingredients.",
  },
  {
    id: "bath",
    title: "Bath & Body",
    description: "Soaks, scrubs, and body care for rest, detox, and daily stewardship.",
  },
  {
    id: "garden",
    title: "Garden Plants",
    description: "Hardy plants from our acreage — available seasonally at the farmer's market.",
  },
];

/**
 * Booth prices for a county farmer's market — sized for simple homemade packaging
 * (bags, jars, basic labels). Packaging sizes may vary; listed prices still apply.
 */
export const MARKET_PRODUCTS: MarketProduct[] = [
  // Home
  {
    id: "laundry-soap",
    name: "Laundry Soap",
    category: "home",
    description: "Homemade powder detergent for everyday loads and extra-dirty items.",
    ingredients: "Washing soda, baking soda, borax, Oxi Clean, bar soap (shavings)",
    directions: "Use 1 tbsp per regular load. Use 2 tbsp for extra dirty items.",
    price: 7,
    priceUnit: "· ~32 oz bag",
    status: "available",
    shipsOnline: true,
  },
  {
    id: "vanilla-sugar",
    name: "Vanilla Sugar",
    category: "home",
    description: "Aromatic vanilla-infused sugar for coffee, baking, and gifting.",
    price: 6,
    priceUnit: "· ~8 oz bag",
    status: "available",
    shipsOnline: true,
  },
  {
    id: "eggs",
    name: "Farm Fresh Eggs",
    category: "home",
    description: "Fresh eggs from our acreage — available while supplies last.",
    price: 5,
    priceUnit: "per dozen",
    status: "seasonal",
    shipsOnline: false,
  },
  // Wellness
  {
    id: "elderberry-syrup-kit",
    name: "Elderberry Syrup Kit",
    category: "wellness",
    description:
      "Everything you need to simmer your own batch at home — stovetop or Instant Pot.",
    ingredients: "Elderberries, rosehip, cinnamon, anise star, cloves",
    directions:
      "Stovetop: Simmer contents with 4 cups water 1 hour until reduced by half. Cool, strain, add 1 cup honey. Instant Pot: High pressure 8 minutes, vent, mash, strain, cool, add honey.",
    caution:
      "Do not consume raw elderberries. Honey is not safe for children under one year old. Product produced in a private residence exempt from state licensing and inspection.",
    price: 12,
    priceUnit: "· makes ~16 oz batch",
    status: "available",
    shipsOnline: true,
  },
  // Bath & Body
  {
    id: "pink-himalayan-detox-bath",
    name: "Pink Himalayan Detox Bath",
    category: "bath",
    description: "Mineral-rich soak to support a full-body detox routine.",
    ingredients: "Pink Himalayan salt, epsom salt, baking soda, borax",
    directions:
      "Fill tub with warm water. Use ½ cup for children over 60 lbs, 1 cup for adults. Soak 20–40 minutes. Rinse with fresh water afterward. Hydrate before and after.",
    price: 8,
    priceUnit: "· ~12 oz bag",
    status: "available",
    shipsOnline: true,
  },
  {
    id: "bentonite-clay-bath-soak",
    name: "Bentonite Clay Bath Soak",
    category: "bath",
    description: "Clay and salt soak for a grounding, restorative bath.",
    ingredients: "Bentonite clay, epsom salt, essential oils",
    directions:
      "Fill tub with warm water. Use ½ cup for children over 60 lbs, 1 cup for adults. Soak 20–40 minutes. Rinse with fresh water afterward. Hydrate before and after.",
    price: 8,
    priceUnit: "· ~12 oz bag",
    status: "available",
    shipsOnline: true,
  },
  {
    id: "bath-salt-soak",
    name: "Bath Salt Soak",
    category: "bath",
    description: "Essential-oil bath salts for rest and muscle relief.",
    ingredients: "Epsom salt, baking soda, essential oils",
    directions:
      "Fill tub with warm water. Use ½ cup for children over 60 lbs, 1 cup for adults. Soak 20–40 minutes. Rinse with fresh water afterward. Hydrate before and after.",
    price: 7,
    priceUnit: "· ~12 oz bag",
    status: "available",
    shipsOnline: true,
  },
  {
    id: "foot-mask",
    name: "Foot Mask",
    category: "bath",
    description: "Drawing clay mask for tired feet — part of a natural care routine.",
    price: 6,
    priceUnit: "· ~4 oz jar",
    status: "available",
    shipsOnline: true,
  },
  {
    id: "armpit-mask",
    name: "Armpit Mask",
    category: "bath",
    description: "Gentle drawing mask for underarms — part of a natural care routine.",
    price: 6,
    priceUnit: "· ~4 oz jar",
    status: "available",
    shipsOnline: true,
  },
  {
    id: "foot-soak",
    name: "Foot Soak",
    category: "bath",
    description: "Soothing soak blend for tired feet after a long day or land walk.",
    price: 6,
    priceUnit: "· ~8 oz bag",
    status: "available",
    shipsOnline: true,
  },
  {
    id: "tallow-lotion",
    name: "Tallow Lotion",
    category: "bath",
    description: "Nourishing tallow-based lotion for dry skin — simple and effective.",
    price: 10,
    priceUnit: "· ~2 oz jar",
    status: "available",
    shipsOnline: true,
  },
  {
    id: "black-drawing-salve",
    name: "Black Drawing Salve",
    category: "bath",
    description: "Traditional drawing salve for occasional skin care — simple homemade jar.",
    price: 9,
    priceUnit: "· ~2 oz jar",
    status: "available",
    shipsOnline: true,
  },
  {
    id: "comfrey-salve",
    name: "Comfrey Salve",
    category: "bath",
    description: "Comfrey-infused salve for everyday skin comfort — simple homemade jar.",
    price: 9,
    priceUnit: "· ~2 oz jar",
    status: "available",
    shipsOnline: true,
  },
  {
    id: "sugar-scrub-peppermint",
    name: "Sugar Scrub (Peppermint)",
    category: "bath",
    description: "Invigorating peppermint sugar scrub for smooth, refreshed skin.",
    price: 8,
    priceUnit: "· ~8 oz jar",
    status: "available",
    shipsOnline: true,
  },
  // Garden
  {
    id: "lily-of-the-valley",
    name: "Lily of the Valley",
    category: "garden",
    description: "Classic shade-loving perennial — seasonal availability.",
    price: 6,
    priceUnit: "· potted division",
    status: "seasonal",
    shipsOnline: false,
  },
  {
    id: "comfrey",
    name: "Comfrey",
    category: "garden",
    description: "Hardy herbaceous plant — seasonal availability.",
    price: 5,
    priceUnit: "· starter plant",
    status: "seasonal",
    shipsOnline: false,
  },
  {
    id: "motherwort",
    name: "Motherwort",
    category: "garden",
    description: "Traditional garden herb — seasonal availability.",
    price: 5,
    priceUnit: "· starter plant",
    status: "seasonal",
    shipsOnline: false,
  },
  {
    id: "daylilies",
    name: "Daylilies",
    category: "garden",
    description: "Reliable, beautiful daylily divisions from our gardens.",
    price: 5,
    priceUnit: "· division",
    status: "seasonal",
    shipsOnline: false,
  },
  {
    id: "iris",
    name: "Iris",
    category: "garden",
    description: "Hardy iris rhizomes — seasonal availability.",
    price: 5,
    priceUnit: "· rhizome",
    status: "seasonal",
    shipsOnline: false,
  },
];

/**
 * Estimated online pricing for pre-orders — booth stays cheaper;
 * online covers packing time and shipping (payment collected offline).
 */
export const ONLINE_FEES = {
  upchargeMultiplier: 1.15,
  packingFee: 2,
  shipping: {
    small: { label: "Small (under ~1 lb)", price: 6 },
    medium: { label: "Medium (~1–3 lb)", price: 9 },
    large: { label: "Large / multi-item", price: 12 },
    freeOver: 55,
  },
  note:
    "Eggs and garden plants are market or local pickup only — we do not ship them. Packaging sizes may vary; the listed price still applies.",
  packagingNote:
    "Packaging sizes may vary with homemade packing — the price shown still applies to that item.",
} as const;

export function productsByCategory(category: ProductCategory) {
  return MARKET_PRODUCTS.filter((p) => p.category === category);
}

export function shippableProducts() {
  return MARKET_PRODUCTS.filter((p) => p.shipsOnline !== false);
}

export function getProductById(id: string) {
  return MARKET_PRODUCTS.find((p) => p.id === id);
}

export function formatProductPrice(product: MarketProduct): string {
  const dollars = Number.isInteger(product.price)
    ? `$${product.price}`
    : `$${product.price.toFixed(2)}`;
  if (!product.priceUnit) return dollars;
  if (product.priceUnit.startsWith("per ")) return `${dollars} ${product.priceUnit}`;
  return `${dollars} ${product.priceUnit}`;
}

/** Suggested online price from booth price (rounded to nearest dollar). */
export function onlinePriceFromBooth(boothPrice: number): number {
  return Math.round(boothPrice * ONLINE_FEES.upchargeMultiplier);
}

export function formatOnlinePrice(boothPrice: number): string {
  return `$${onlinePriceFromBooth(boothPrice)}`;
}
