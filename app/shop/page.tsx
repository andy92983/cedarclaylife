import type { Metadata } from "next";
import Link from "next/link";
import { BrandedPageHeader } from "@/components/layout/BrandedPageHeader";
import { PreOrderForm } from "@/components/shop/PreOrderForm";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import {
  formatOnlinePrice,
  formatProductPrice,
  ONLINE_FEES,
  shippableProducts,
} from "@/lib/products";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pre-Order — Handmade Products",
  description:
    "Pre-order Cedar & Clay handmade products. Submit your order and contact details — we confirm availability and collect payment offline. Packaging sizes may vary.",
  alternates: { canonical: `${SITE.domain}/shop` },
  openGraph: {
    title: `Pre-Order | ${SITE.name}`,
    description:
      "Request a pre-order online. We'll contact you to confirm and arrange payment outside this website.",
    url: `${SITE.domain}/shop`,
  },
};

export default function ShopPage() {
  const items = shippableProducts();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE.domain },
          { name: "Shop", url: `${SITE.domain}/shop` },
        ]}
      />
      <BrandedPageHeader
        eyebrow="Pre-orders"
        title="Request handmade goods for delivery"
        description="Submit what you'd like and how to reach you. No payment is taken on this website — we'll contact you to confirm stock, shipping, and how to pay (Venmo, cash, check, or another method you agree on)."
      />

      <section className="section-padding">
        <div className="container-narrow grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-8 rounded-xl border border-sage-200 bg-sage-50/80 px-5 py-4 text-sm text-sage-800">
              <p>
                <span className="font-semibold text-bark">Estimated online pricing:</span> about{" "}
                {Math.round((ONLINE_FEES.upchargeMultiplier - 1) * 100)}% over booth · $
                {ONLINE_FEES.packingFee} packing · shipping about $
                {ONLINE_FEES.shipping.small.price}–${ONLINE_FEES.shipping.large.price} (confirmed
                when we reach out)
              </p>
              <p className="mt-2">{ONLINE_FEES.packagingNote}</p>
              <p className="mt-2 text-cedar-600">{ONLINE_FEES.note}</p>
            </div>

            <h2 className="font-display text-2xl text-bark">What you can pre-order</h2>
            <ul className="mt-4 space-y-3">
              {items.map((product) => (
                <li
                  key={product.id}
                  className="flex items-baseline justify-between gap-3 border-b border-cedar-100 pb-2 text-sm"
                >
                  <span className="text-cedar-800">{product.name}</span>
                  <span className="shrink-0 text-cedar-600">
                    {formatOnlinePrice(product.price)}{" "}
                    <span className="text-xs text-cedar-400">
                      (booth {formatProductPrice(product).split(" ")[0]})
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-soft">
            <h2 className="font-display text-2xl text-bark">Pre-order form</h2>
            <p className="mt-2 text-sm text-cedar-600">
              We&apos;ll reply to arrange payment and shipping. Nothing is charged here.
            </p>
            <div className="mt-6">
              <PreOrderForm />
            </div>
          </div>
        </div>

        <p className="container-narrow mt-12 text-center text-sm text-cedar-600">
          Prefer the market? See{" "}
          <Link href="/products" className="font-semibold text-cedar-700 underline">
            booth prices
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="font-semibold text-cedar-700 underline">
            message us
          </Link>
          .
        </p>
      </section>
    </>
  );
}
