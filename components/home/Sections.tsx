import Link from "next/link";
import { FAQ, PILLARS } from "@/lib/content";
import { PillarIcon } from "@/components/layout/SiteChrome";
import { SectionIntro } from "@/components/home/Hero";

export function PillarsGrid() {
  return (
    <section className="section-padding bg-cedar-50/40">
      <div className="container-wide">
        <SectionIntro
          eyebrow="Six pillars"
          title="Health for your home, body, spirit — and the land beneath your feet"
          description="We believe wholeness is not a product you buy once. It is built daily through what fills your home, what touches your skin, what you make with your hands, and how you move through the world."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Link
              key={pillar.id}
              href={pillar.href}
              className="group card-soft flex flex-col transition hover:-translate-y-1 hover:border-clay-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cedar-100 text-cedar-600 transition group-hover:bg-cedar-600 group-hover:text-white">
                <PillarIcon name={pillar.icon} />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-sage-600">
                {pillar.subtitle}
              </p>
              <h3 className="mt-1 font-display text-2xl text-bark">{pillar.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-cedar-700">
                {pillar.description}
              </p>
              <span className="mt-4 text-sm font-semibold text-cedar-600 group-hover:text-clay-600">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StudioHighlight() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionIntro
              eyebrow="For parents who say no to glitter at home"
              title="A creative studio where mess is welcome"
              description="Paint splatters. Glitter explosions. Clay under fingernails. We built a space for the projects you've been putting off — with supplies, guidance, and zero carpet casualties."
              centered={false}
            />
            <ul className="mt-8 space-y-3 text-cedar-700">
              {[
                "Art, crafts, graphic design, and 3D printing",
                "Classes for every level — beginner to growing maker",
                "Faith-aligned teaching that honors creativity as gift",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-100 text-xs text-sage-700">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/studio"
              className="mt-8 inline-flex rounded-full bg-clay-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-clay-600"
            >
              See studio offerings
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-clay-200 via-cedar-100 to-sage-100 shadow-xl">
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <span className="text-6xl" aria-hidden>
                  🎨
                </span>
                <p className="mt-4 font-display text-2xl text-cedar-800">Create without limits</p>
                <p className="mt-2 text-sm text-cedar-600">
                  Sewing & seasonal crafts coming soon
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl bg-cream px-5 py-4 shadow-lg">
              <p className="font-display text-3xl text-cedar-600">{21}</p>
              <p className="text-xs font-medium uppercase tracking-wider text-cedar-500">
                Acres to explore
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTABanner() {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="rounded-3xl bg-gradient-to-br from-cedar-700 via-cedar-800 to-bark px-8 py-12 text-center text-white sm:px-12 sm:py-16">
          <h2 className="font-display text-3xl sm:text-4xl">
            Ready to create, walk, and grow whole?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cedar-200">
            Whether you love God deeply or are searching for something deeper — we invite you to
            visit, take a class, walk the trails, and see what wholeness can look like.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-cedar-800 hover:bg-cream"
            >
              Get in touch
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-cedar-400 px-8 py-3 text-sm font-semibold text-white hover:bg-cedar-700"
            >
              Our story & faith
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MarketHighlight() {
  return (
    <section className="section-padding bg-sage-50/60">
      <div className="container-wide">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <SectionIntro
            eyebrow="Farmer's market"
            title="Handmade goods from our acreage in Redgranite"
            description="Elderberry syrup, laundry soap, bath soaks, vanilla goods, farm eggs, garden plants, and more — sold at our county farmer's market. Prices set fresh each market day."
            centered={false}
          />
          <div className="card-soft">
            <ul className="space-y-2 text-sm text-cedar-700">
              {[
                "Elderberry syrup & DIY kits",
                "Pink Himalayan detox bath & clay soaks",
                "Laundry soap & fire starters",
                "Tallow lotion & peppermint sugar scrub",
                "Seasonal garden plants",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-sage-600">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-full bg-cedar-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cedar-700"
            >
              View full product list
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="section-padding bg-cedar-50/50">
      <div className="container-narrow">
        <SectionIntro
          eyebrow="Questions"
          title="Common questions"
          description="Straight answers about who we are, who we're for, and what you'll find here."
        />
        <dl className="mt-12 space-y-4">
          {FAQ.map((item) => (
            <div key={item.question} className="card-soft">
              <dt className="font-display text-xl text-bark">{item.question}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-cedar-700">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
