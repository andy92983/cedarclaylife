import type { Metadata } from "next";
import { BrandedPageHeader } from "@/components/layout/BrandedPageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
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
      <BrandedPageHeader
        eyebrow="We'd love to hear from you"
        title="Visit, learn, and grow with us"
        description="Whether you're interested in products, the coming art studio, a guided land walk, or online orders — reach out. We'll respond as soon as we can."
      />

      <section className="section-padding">
        <div className="container-narrow grid gap-12 lg:grid-cols-2">
          <div className="card-soft">
            <h2 className="font-display text-2xl text-bark">Send a message</h2>
            <p className="mt-2 text-sm text-cedar-600">
              We&apos;ll respond as soon as we can.
            </p>
            <ContactForm />
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
                  <a href={SITE.domain} className="link-underline">
                    cedarclaylife.com
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-soft">
              <h3 className="font-display text-xl text-bark">What to ask about</h3>
              <ul className="mt-4 space-y-3 text-sm text-cedar-700">
                <li>→ Farmer&apos;s market &amp; online products — bath soaks, salves, laundry soap &amp; more</li>
                <li>→ Art studio interest list (coming soon — no open studio or 3D printing yet)</li>
                <li>→ Guided walks on {SITE.acres} acres (no dedicated pathways yet; closed in deep snow)</li>
                <li>→ Market day updates and group visits</li>
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
