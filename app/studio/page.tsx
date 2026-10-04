import type { Metadata } from "next";
import Link from "next/link";
import { BrandedPageHeader } from "@/components/layout/BrandedPageHeader";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { STUDIO_OFFERINGS } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Art Studio — Coming Soon",
  description:
    "Cedar & Clay art studio is coming soon in Redgranite, WI. Open creative studio and 3D printing are not available yet. Join the interest list.",
  alternates: { canonical: `${SITE.domain}/studio` },
  openGraph: {
    title: `Studio | ${SITE.name}`,
    description: "Art studio coming soon. Join the interest list — open studio and 3D printing not available yet.",
    url: `${SITE.domain}/studio`,
  },
};

export default function StudioPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE.domain },
          { name: "Studio & Classes", url: `${SITE.domain}/studio` },
        ]}
      />
      <BrandedPageHeader
        eyebrow="Coming soon"
        title="An art studio is on the way"
        description="We're preparing a creative space for art and learning. Open creative studio hours and 3D printing are not available yet — join the list and we'll let you know when classes begin."
      />

      <section className="section-padding">
        <div className="container-wide grid gap-8 md:grid-cols-2">
          {STUDIO_OFFERINGS.map((offering) => (
            <article key={offering.title} className="card-soft">
              <h2 className="font-display text-2xl text-bark">{offering.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-cedar-700">{offering.description}</p>
              <ul className="mt-5 space-y-2">
                {offering.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-cedar-600">
                    <span className="text-clay-500">•</span>
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding bg-sage-50/80">
        <div className="container-narrow text-center">
          <h2 className="heading-section text-bark">Get on the list</h2>
          <p className="text-lead mx-auto mt-4 max-w-2xl">
            Tell us you&apos;re interested in art classes. We&apos;ll reach out when the studio
            opens — no 3D printing or open studio drop-ins until we announce them.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-clay-500 px-8 py-3 text-sm font-semibold text-white hover:bg-clay-600"
            >
              Join the interest list
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
