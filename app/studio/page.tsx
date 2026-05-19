import type { Metadata } from "next";
import Link from "next/link";
import { BrandedPageHeader } from "@/components/layout/BrandedPageHeader";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { STUDIO_OFFERINGS } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Creative Studio & Classes — Art, 3D Printing, Crafts",
  description:
    "Cedar & Clay studio offers art classes, graphic design, 3D printing, sewing, and messy creative sessions for kids and families. Faith-based maker space in Redgranite, WI.",
  alternates: { canonical: `${SITE.domain}/studio` },
  openGraph: {
    title: `Studio & Classes | ${SITE.name}`,
    description:
      "Paint, glitter, clay, 3D printing, and more — a creative space where families make messes without fear. Classes for every skill level.",
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
        eyebrow="Learn · Create · Grow"
        title="A studio space for makers, families, and curious beginners"
        description="Graphic design, art, 3D printing, sewing, and crafts — with classes built around your level. Finally, a place where glitter is someone else's problem."
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
        <div className="container-narrow">
          <h2 className="heading-section text-center text-bark">
            Teaching grounded in truth, tailored to you
          </h2>
          <p className="text-lead mx-auto mt-4 max-w-2xl text-center">
            We don&apos;t believe creativity and faith are separate rooms. Whether you&apos;re
            learning to design a logo, print a tool, or help your child finger-paint for the first
            time — we meet you where you are and grow from there.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { step: "1", title: "Tell us your level", desc: "Beginner, returning, or ready to go deeper" },
              { step: "2", title: "Pick your path", desc: "Art, digital design, 3D printing, or crafts" },
              { step: "3", title: "Create & connect", desc: "Make something real in community" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cedar-600 font-display text-lg text-white">
                  {item.step}
                </span>
                <h3 className="mt-3 font-display text-xl text-bark">{item.title}</h3>
                <p className="mt-2 text-sm text-cedar-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-clay-500 px-8 py-3 text-sm font-semibold text-white hover:bg-clay-600"
            >
              Join the class list
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
