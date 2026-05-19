import { SITE } from "@/lib/site";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE.name,
        url: SITE.domain,
        description:
          "Faith-based holistic wellness — handmade products for home, bath, and health; creative studio classes; and 21 acres of walking and hiking trails in Redgranite, Wisconsin.",
        email: SITE.email,
        telephone: SITE.phone,
        slogan: SITE.tagline,
        sameAs: Object.values(SITE.social).filter(Boolean),
      }}
    />
  );
}

export function LocalBusinessSchema() {
  const { street, city, state, zip, country } = SITE.address;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: SITE.name,
        url: SITE.domain,
        email: SITE.email,
        telephone: SITE.phone,
        description:
          "Handmade home, bath, and wellness products sold at county farmer's markets, plus creative studio classes and nature trails on 21 acres.",
        priceRange: "$$",
        image: `${SITE.domain}/og-image.svg`,
        address: {
          "@type": "PostalAddress",
          streetAddress: street,
          addressLocality: city,
          addressRegion: state,
          postalCode: zip,
          addressCountry: country,
        },
      }}
    />
  );
}

export function FAQSchema({ items }: { items: readonly { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function ProductListSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${SITE.name} Farmer's Market Products`,
        description: "Handmade home, bath, wellness, and garden products from Cedar & Clay.",
        url: `${SITE.domain}/products`,
      }}
    />
  );
}
