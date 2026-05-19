import { Hero } from "@/components/home/Hero";
import {
  PillarsGrid,
  StudioHighlight,
  MarketHighlight,
  CTABanner,
  FAQSection,
} from "@/components/home/Sections";
import { FAQSchema } from "@/components/seo/JsonLd";
import { FAQ } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <FAQSchema items={FAQ} />
      <Hero />
      <PillarsGrid />
      <MarketHighlight />
      <StudioHighlight />
      <CTABanner />
      <FAQSection />
    </>
  );
}
