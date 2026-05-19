import type { Metadata } from "next";
import Link from "next/link";
import { BrandedPageHeader } from "@/components/layout/BrandedPageHeader";
import { VerseBanner } from "@/components/home/Hero";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Our Mission, Faith & Story",
  description:
    "Cedar & Clay is a faith-based wellness and maker community in Redgranite, Wisconsin. Learn our biblical foundation, holistic mission, farmer's market products, studio classes, and 21 acres of trails.",
  alternates: { canonical: `${SITE.domain}/about` },
  openGraph: {
    title: `About ${SITE.name}`,
    description:
      "Biblical wellness, handmade goods, creative studio, and nature — helping people become healthier in body, mind, and spirit.",
    url: `${SITE.domain}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE.domain },
          { name: "About", url: `${SITE.domain}/about` },
        ]}
      />
      <article>
        <BrandedPageHeader
          eyebrow="Our story"
          title="Rooted in Scripture. Open to everyone seeking wholeness."
          description={`${SITE.name} exists to help people become healthier — in their brains, bodies, and spirits — through what they create, what they consume, and how they conduct their lives.`}
        >
          <VerseBanner className="mt-10" />
        </BrandedPageHeader>

        <section className="section-padding">
          <div className="container-narrow prose-cedar mx-auto max-w-3xl space-y-8 text-cedar-700 leading-relaxed">
            <div>
              <h2 className="heading-section text-bark">What we believe</h2>
              <p className="mt-4">
                We are unapologetically Christian. Our teaching, products, and community flow from
                biblical theology — not as a label, but as a foundation. We believe God cares about
                the whole person: what fills your home, what touches your body, what occupies your
                mind, and how you treat the land He gave us to steward.
              </p>
              <p className="mt-4">
                We welcome people who love God and people who are curious about Him. Our hope is
                not to preach at visitors, but to live wholeness so clearly that others want to know
                the Source.
              </p>
            </div>

            <div id="faith">
              <h2 className="heading-section text-bark">Faith in daily life</h2>
              <p className="mt-4">
                Scripture guides how we choose ingredients, design classes, and walk the land.
                Philippians 4:8 shapes our creative work — whatever is true, noble, right, pure,
                lovely, admirable. 1 Corinthians 6:19–20 reminds us the body is a temple. 3 John
                1:2 anchors our prayer for your prospering in all things and health, as your soul
                prospers.
              </p>
            </div>

            <div>
              <h2 className="heading-section text-bark">Why Cedar &amp; Clay</h2>
              <p className="mt-4">
                Cedar speaks of strength, warmth, and rootedness — the kind of shelter you build
                over years. Clay speaks of formation — hands shaping something useful and beautiful
                from raw earth. Together they name our vision: a life grounded in truth and shaped
                by intentional making.
              </p>
            </div>

            <div>
              <h2 className="heading-section text-bark">What we&apos;re building</h2>
              <ul className="mt-4 space-y-3">
                {[
                  "Handmade products for home, bath, and wellness — at our county farmer's market",
                  "A creative studio for art, design, 3D printing, sewing, and crafts",
                  "Classes that meet people at their level — including messy kid-friendly sessions",
                  `${SITE.acres} acres of walking paths and hiking trails`,
                  "A community where wellness is whole-person, not trendy",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-sage-600">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-padding bg-cedar-50/50">
          <div className="container-narrow text-center">
            <h2 className="heading-section text-bark">Come see for yourself</h2>
            <p className="text-lead mx-auto mt-4 max-w-xl">
              We&apos;re opening our doors soon. Reach out to visit, join a class list, or walk the
              land.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-cedar-600 px-8 py-3 text-sm font-semibold text-white hover:bg-cedar-700"
            >
              Contact us
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
