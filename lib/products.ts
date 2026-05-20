export type ProductCategory = "home" | "bath" | "wellness" | "garden";

export type MarketProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  ingredients?: string;
  directions?: string;
  caution?: string;
  /** Typical farmer's market price (USD) */
  price: number;
  /** Size or unit shown beside price — helps set expectations for simple packaging */
  priceUnit?: string;
  status: "available" | "seasonal";
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
    description: "Small-batch elderberry and seasonal staples made with simple ingredients.",
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
 * Recommended booth prices for a county farmer's market in Wisconsin.
 * Sized for simple, homemade packaging (bags, jars, labels) — below boutique retail,
 * fair for small-batch ingredients and labor.
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
    price: 10,
    priceUnit: "· ~32 oz bag",
    status: "available",
  },
  {
    id: "fire-starters",
    name: "Fire Starters",
    category: "home",
    description: "Handmade starters to get your fire going quickly and naturally.",
    price: 7,
    priceUnit: "· 6-pack",
    status: "available",
  },
  {
    id: "vanilla",
    name: "Vanilla",
    category: "home",
    description: "Pure vanilla for baking and everyday kitchen use.",
    price: 12,
    priceUnit: "· 2 oz bottle",
    status: "available",
  },
  {
    id: "vanilla-sugar",
    name: "Vanilla Sugar",
    category: "home",
    description: "Aromatic vanilla-infused sugar for coffee, baking, and gifting.",
    price: 7,
    priceUnit: "· 8 oz bag",
    status: "available",
  },
  {
    id: "eggs",
    name: "Farm Fresh Eggs",
    category: "home",
    description: "Fresh eggs from our acreage — available while supplies last.",
    price: 5,
    priceUnit: "per dozen",
    status: "seasonal",
  },
  // Wellness
  {
    id: "elderberry-syrup",
    name: "Elderberry Syrup",
    category: "wellness",
    description: "Ready-to-use elderberry syrup — refrigerate and enjoy within 2 months of opening.",
    ingredients: "Elderberries, rosehip, cinnamon, anise star, cloves, honey",
    directions:
      "Recommended serving: 1 tbsp for adults, 1 tsp for children. Keep refrigerated.",
    caution:
      "Do not consume raw elderberries. Honey is not safe for children under one year old. Product produced in a private residence exempt from state licensing and inspection.",
    price: 18,
    priceUnit: "· 8 oz bottle",
    status: "available",
  },
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
    price: 14,
    priceUnit: "· makes ~16 oz batch",
    status: "available",
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
    price: 10,
    priceUnit: "· 12 oz bag",
    status: "available",
  },
  {
    id: "bentonite-clay-bath-soak",
    name: "Bentonite Clay Bath Soak",
    category: "bath",
    description: "Clay and salt soak for a grounding, restorative bath.",
    ingredients: "Bentonite clay, epsom salt, essential oils",
    directions:
      "Fill tub with warm water. Use ½ cup for children over 60 lbs, 1 cup for adults. Soak 20–40 minutes. Rinse with fresh water afterward. Hydrate before and after.",
    price: 10,
    priceUnit: "· 12 oz bag",
    status: "available",
  },
  {
    id: "bath-salt-soak",
    name: "Bath Salt Soak",
    category: "bath",
    description: "Essential-oil bath salts for rest and muscle relief.",
    ingredients: "Epsom salt, baking soda, essential oils",
    directions:
      "Fill tub with warm water. Use ½ cup for children over 60 lbs, 1 cup for adults. Soak 20–40 minutes. Rinse with fresh water afterward. Hydrate before and after.",
    price: 9,
    priceUnit: "· 12 oz bag",
    status: "available",
  },
  {
    id: "foot-armpit-mask",
    name: "Foot / Armpit Mask",
    category: "bath",
    description: "Drawing mask for feet and underarms — part of a natural care routine.",
    price: 8,
    priceUnit: "· 4 oz jar",
    status: "available",
  },
  {
    id: "foot-soak",
    name: "Foot Soak",
    category: "bath",
    description: "Soothing soak blend for tired feet after a long day or trail walk.",
    price: 8,
    priceUnit: "· 8 oz bag",
    status: "available",
  },
  {
    id: "tallow-lotion",
    name: "Tallow Lotion",
    category: "bath",
    description: "Nourishing tallow-based lotion for dry skin — simple and effective.",
    price: 12,
    priceUnit: "· 2 oz jar",
    status: "available",
  },
  {
    id: "sugar-scrub-peppermint",
    name: "Sugar Scrub (Peppermint)",
    category: "bath",
    description: "Invigorating peppermint sugar scrub for smooth, refreshed skin.",
    price: 10,
    priceUnit: "· 8 oz jar",
    status: "available",
  },
  // Garden
  {
    id: "lily-of-the-valley",
    name: "Lily of the Valley",
    category: "garden",
    description: "Classic shade-loving perennial — seasonal availability.",
    price: 8,
    priceUnit: "· potted division",
    status: "seasonal",
  },
  {
    id: "comfrey",
    name: "Comfrey",
    category: "garden",
    description: "Hardy herbaceous plant — seasonal availability.",
    price: 6,
    priceUnit: "· starter plant",
    status: "seasonal",
  },
  {
    id: "motherwort",
    name: "Motherwort",
    category: "garden",
    description: "Traditional garden herb — seasonal availability.",
    price: 6,
    priceUnit: "· starter plant",
    status: "seasonal",
  },
  {
    id: "daylilies",
    name: "Daylilies",
    category: "garden",
    description: "Reliable, beautiful daylily divisions from our gardens.",
    price: 6,
    priceUnit: "· division",
    status: "seasonal",
  },
  {
    id: "iris",
    name: "Iris",
    category: "garden",
    description: "Hardy iris rhizomes — seasonal availability.",
    price: 7,
    priceUnit: "· rhizome",
    status: "seasonal",
  },
];

export function productsByCategory(category: ProductCategory) {
  return MARKET_PRODUCTS.filter((p) => p.category === category);
}

export function formatProductPrice(product: MarketProduct): string {
  const dollars = Number.isInteger(product.price)
    ? `$${product.price}`
    : `$${product.price.toFixed(2)}`;
  if (!product.priceUnit) return dollars;
  if (product.priceUnit.startsWith("per ")) return `${dollars} ${product.priceUnit}`;
  return `${dollars} ${product.priceUnit}`;
}
