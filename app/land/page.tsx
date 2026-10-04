import type { Metadata } from "next";
import Link from "next/link";
import { BrandedPageHeader } from "@/components/layout/BrandedPageHeader";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { TRAIL_FEATURES } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "21 Acres — Guided Land Walks",
  description:
    "Walk 21 acres at Cedar & Clay in Redgranite, Wisconsin. Guided walks for now — no dedicated pathways yet. Closed in deep winter snow.",
  alternates: { canonical: `${SITE.domain}/land` },
  openGraph: {
    title: `Land & Trails | ${SITE.name}`,
    description: `${SITE.acres} acres for guided walks. No dedicated pathways yet. Closed when deep uncleared snow makes walking unsafe.`,
    url: `${SITE.domain}/land`,
  },
};

export default function LandPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE.domain },
          { name: "Land & Trails", url: `${SITE.domain}/land` },
        ]}
      />
      <div className="relative overflow-hidden border-b border-cedar-200/50">
        <BrandedPageHeader
          className="border-b-0 bg-gradient-to-br from-sage-100 via-cedar-50 to-cream"
          eyebrow={`${SITE.acres} acres`}
          title="Walk the land with us"
          description="There are no dedicated pathways yet. We can walk along with you and guide you across the acreage. Closed in deep winter when heavy, uncleared snow makes walking impossible."
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-[120%] -translate-x-1/2 rounded-[100%] bg-sage-200/30 blur-2xl"
          aria-hidden
        />
      </div>

      <section className="section-padding">
        <div className="container-wide grid gap-8 sm:grid-cols-2">
          {TRAIL_FEATURES.map((feature) => (
            <article key={feature.title} className="card-soft">
              <h2 className="font-display text-2xl text-bark">{feature.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-cedar-700">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding bg-cedar-800 text-white">
        <div className="container-narrow grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl">Come walk when the land is clear</h2>
            <p className="mt-4 leading-relaxed text-cedar-200">
              Contact us to schedule a guided walk. Wear sturdy shoes, expect natural ground, and
              plan ahead for weather. When snow piles up and paths aren&apos;t cleared, we pause
              visits until it&apos;s safe again.
            </p>
          </div>
          <div className="rounded-3xl bg-cedar-700/50 p-8 text-center">
            <p className="font-display text-6xl text-clay-300">{SITE.acres}</p>
            <p className="mt-2 text-sm uppercase tracking-widest text-cedar-300">Acres to explore</p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-cedar-800 hover:bg-cream"
            >
              Schedule a guided walk
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
