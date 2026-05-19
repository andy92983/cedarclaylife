import type { Metadata } from "next";
import { SectionIntro } from "@/components/home/Hero";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { formatAddress, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Visit, Classes & Inquiries",
  description:
    "Contact Cedar & Clay for farmer's market products, studio classes, trail visits, and group outings. Redgranite, Wisconsin.",
  alternates: { canonical: `${SITE.domain}/contact` },
  openGraph: {
    title: `Contact | ${SITE.name}`,
    description: "Get in touch about classes, products, trail visits, and opening announcements.",
    url: `${SITE.domain}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE.domain },
          { name: "Contact", url: `${SITE.domain}/contact` },
        ]}
      />
      <header className="section-padding bg-hero-gradient bg-grain border-b border-cedar-200/50">
        <div className="container-narrow">
          <SectionIntro
            eyebrow="We'd love to hear from you"
            title="Visit, learn, and grow with us"
            description="Whether you're interested in products, studio classes, trail walks, or simply want to know when we open — reach out. We'll respond as soon as we can."
          />
        </div>
      </header>

      <section className="section-padding">
        <div className="container-narrow grid gap-12 lg:grid-cols-2">
          <div className="card-soft">
            <h2 className="font-display text-2xl text-bark">Send a message</h2>
            <p className="mt-2 text-sm text-cedar-600">
              Email us directly — online contact form coming soon.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=Cedar%20%26%20Clay%20inquiry`}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-cedar-600 px-6 py-4 text-sm font-semibold text-white hover:bg-cedar-700 sm:w-auto"
            >
              Email {SITE.email}
            </a>
            <form className="mt-8 space-y-4 opacity-60" aria-label="Contact form preview">
              <p className="text-xs font-medium uppercase tracking-wider text-sage-600">
                Form launching soon
              </p>
              <div>
                <label className="block text-sm font-medium text-bark">Name</label>
                <input
                  disabled
                  type="text"
                  className="mt-1 w-full rounded-xl border border-cedar-200 bg-cedar-50/50 px-4 py-3 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-bark">Email</label>
                <input
                  disabled
                  type="email"
                  className="mt-1 w-full rounded-xl border border-cedar-200 bg-cedar-50/50 px-4 py-3 text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-bark">I&apos;m interested in</label>
                <select
                  disabled
                  className="mt-1 w-full rounded-xl border border-cedar-200 bg-cedar-50/50 px-4 py-3 text-sm"
                >
                  <option>Studio classes</option>
                  <option>Products</option>
                  <option>Trail visit</option>
                  <option>General inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-bark">Message</label>
                <textarea
                  disabled
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-cedar-200 bg-cedar-50/50 px-4 py-3 text-sm"
                  placeholder="Tell us a little about what you're looking for..."
                />
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="card-soft">
              <h3 className="font-display text-xl text-bark">{SITE.contactName}</h3>
              <ul className="mt-4 space-y-2 text-sm text-cedar-700">
                <li>
                  <a href={`tel:${SITE.phone.replace(/\D/g, "")}`} className="link-underline">
                    {SITE.phone}
                  </a>
                </li>
                <li>{formatAddress()}</li>
                <li>
                  <a href={`mailto:${SITE.email}`} className="link-underline">
                    {SITE.email}
                  </a>
                </li>
                <li className="text-cedar-500">cedarclaylife.com</li>
              </ul>
            </div>
            <div className="card-soft">
              <h3 className="font-display text-xl text-bark">What to ask about</h3>
              <ul className="mt-4 space-y-3 text-sm text-cedar-700">
                <li>→ Farmer&apos;s market products — elderberry, bath soaks, laundry soap &amp; more</li>
                <li>→ Studio classes — art, 3D printing, graphic design, crafts</li>
                <li>→ Walking & hiking on {SITE.acres} acres</li>
                <li>→ Group visits, family outings, and market day updates</li>
              </ul>
            </div>
            <blockquote className="rounded-2xl border-l-4 border-clay-400 bg-clay-50/50 px-6 py-5">
              <p className="font-display text-lg italic text-cedar-800">
                &ldquo;{SITE.verse.text}&rdquo;
              </p>
              <footer className="mt-2 text-sm text-sage-600">— {SITE.verse.reference}</footer>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
}
