import type { Metadata } from "next";
import Link from "next/link";
import { BrandedPageHeader } from "@/components/layout/BrandedPageHeader";
import { BreadcrumbSchema, ProductListSchema } from "@/components/seo/JsonLd";
import {
  MARKET_PRODUCTS,
  PRODUCT_CATEGORIES,
  productsByCategory,
} from "@/lib/products";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Farmer's Market Products — Home, Bath, Wellness & Garden",
  description:
    "Shop Cedar & Clay handmade products at our county farmer's market — laundry soap, elderberry syrup, bath soaks, tallow lotion, vanilla goods, farm eggs, and garden plants from Redgranite, WI.",
  alternates: { canonical: `${SITE.domain}/products` },
  openGraph: {
    title: `Products | ${SITE.name}`,
    description:
      "Handmade natural products for home, bath, wellness, and garden — available at our county farmer's market.",
    url: `${SITE.domain}/products`,
  },
};

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE.domain },
          { name: "Products", url: `${SITE.domain}/products` },
        ]}
      />
      <ProductListSchema />
      <BrandedPageHeader
        eyebrow="Farmer's market"
        title="Handmade products for home, body, and health"
        description="Everything below is made in small batches on our acreage in Redgranite, Wisconsin. Prices are set at the booth each market day — visit us to see what's fresh."
      >
        <p className="mx-auto mt-6 max-w-2xl rounded-xl border border-sage-200 bg-sage-50/80 px-5 py-4 text-center text-sm text-sage-800">
          {SITE.marketNote}
        </p>
      </BrandedPageHeader>

      <section className="section-padding">
        <div className="container-wide space-y-20">
          {PRODUCT_CATEGORIES.map((cat) => {
            const items = productsByCategory(cat.id);
            if (items.length === 0) return null;

            return (
              <div key={cat.id} id={cat.id} className="scroll-mt-24">
                <div className="mb-8 max-w-2xl">
                  <h2 className="font-display text-3xl text-bark sm:text-4xl">{cat.title}</h2>
                  <p className="mt-2 text-cedar-700">{cat.description}</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product) => (
                    <article key={product.id} className="card-soft flex flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-xl text-bark">{product.name}</h3>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                            product.status === "available"
                              ? "bg-sage-100 text-sage-700"
                              : "bg-clay-100 text-clay-700"
                          )}
                        >
                          {product.status === "available" ? "Available" : "Seasonal"}
                        </span>
                      </div>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-cedar-700">
                        {product.description}
                      </p>
                      {product.ingredients && (
                        <p className="mt-3 text-xs text-cedar-600">
                          <span className="font-semibold text-bark">Ingredients: </span>
                          {product.ingredients}
                        </p>
                      )}
                      {product.directions && (
                        <p className="mt-2 text-xs text-cedar-600">
                          <span className="font-semibold text-bark">Directions: </span>
                          {product.directions}
                        </p>
                      )}
                      {product.caution && (
                        <p className="mt-2 text-xs text-clay-700">{product.caution}</p>
                      )}
                      <div className="mt-4 flex items-center justify-between border-t border-cedar-100 pt-4">
                        <span className="text-sm font-medium text-cedar-500">Market price</span>
                        <span
                          className="font-display text-lg text-cedar-400"
                          aria-label="Price to be set at farmer's market"
                        >
                          —
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <p className="container-wide mt-12 text-center text-xs text-cedar-500">
          {MARKET_PRODUCTS.length} products · sourced from Cedar &amp; Clay product sheets
        </p>
      </section>

      <section className="section-padding bg-cedar-900 text-center text-white">
        <div className="container-narrow">
          <h2 className="font-display text-3xl">See you at the market</h2>
          <p className="mx-auto mt-4 max-w-xl text-cedar-200">
            Questions about ingredients, elderberry kits, or seasonal plants? Reach out before
            market day — or stop by our booth in Redgranite.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-cedar-800"
            >
              Contact us
            </Link>
            <Link
              href="/studio"
              className="rounded-full border border-cedar-400 px-6 py-3 text-sm font-semibold"
            >
              Studio & classes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
