import type { Metadata } from "next";
import Link from "next/link";
import { BrandedPageHeader } from "@/components/layout/BrandedPageHeader";
import { MyOrdersClient } from "@/components/orders/MyOrdersClient";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "My Pre-Orders",
  description: "View your Cedar & Clay pre-orders. Sign in with the email you used when ordering.",
  alternates: { canonical: `${SITE.domain}/orders` },
  robots: { index: false, follow: false },
};

export default function MyOrdersPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE.domain },
          { name: "My Orders", url: `${SITE.domain}/orders` },
        ]}
      />
      <BrandedPageHeader
        eyebrow="Your account"
        title="My pre-orders"
        description="Sign in with the same email you used on your pre-order to see status updates. Payment is still arranged offline after we contact you."
      />
      <section className="section-padding">
        <div className="container-narrow">
          <MyOrdersClient />
          <p className="mt-10 text-center text-sm text-cedar-600">
            Need to place an order?{" "}
            <Link href="/shop" className="font-semibold text-cedar-700 underline">
              Submit a pre-order
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
