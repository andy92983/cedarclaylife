import type { Metadata } from "next";
import Link from "next/link";
import { BrandedPageHeader } from "@/components/layout/BrandedPageHeader";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { TRAIL_FEATURES } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "21 Acres — Walking Paths & Hiking Trails",
  description:
    "Explore 21 acres of walking paths and hiking trails at Cedar & Clay in Redgranite, Wisconsin.",
  alternates: { canonical: `${SITE.domain}/land` },
  openGraph: {
    title: `Land & Trails | ${SITE.name}`,
    description: `${SITE.acres} acres of trails for walking, hiking, prayer walks, and group outings — movement as part of whole-person wellness.`,
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
          title="Walk, hike, and breathe"
          description="Movement is not an afterthought here. Our land invites slow conversation, prayer walks, family outings, and the kind of quiet that helps body and spirit catch up to each other."
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
            <h2 className="font-display text-4xl">Creation meets creation</h2>
            <p className="mt-4 leading-relaxed text-cedar-200">
              Many visits combine studio time with trail time — make something with your hands,
              then let the land restore what screens and schedules took. That rhythm — consume well,
              create boldly, conduct yourself with intention — is the heartbeat of{" "}
              {SITE.name}.
            </p>
          </div>
          <div className="rounded-3xl bg-cedar-700/50 p-8 text-center">
            <p className="font-display text-6xl text-clay-300">{SITE.acres}</p>
            <p className="mt-2 text-sm uppercase tracking-widest text-cedar-300">Acres to explore</p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-cedar-800 hover:bg-cream"
            >
              Schedule a visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
