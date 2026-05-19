import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient bg-grain">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream" />
      <div className="section-padding container-wide relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="animate-fade-in text-sm font-semibold uppercase tracking-[0.25em] text-sage-600">
            {SITE.tagline}
          </p>
          <h1 className="heading-display mt-4 animate-fade-up text-bark">
            Whole-life wellness through what you{" "}
            <span className="text-clay-500">create</span>,{" "}
            <span className="text-cedar-600">consume</span>, and{" "}
            <span className="text-sage-600">conduct</span>
          </h1>
          <p className="text-lead mx-auto mt-6 max-w-2xl animate-fade-up">
            Handmade products for home, body, and health. A creative studio where families make
            messes without fear. {SITE.acres} acres to walk, hike, and breathe. All rooted in
            biblical wisdom — for believers and seekers alike.
          </p>
          <VerseBanner className="mx-auto mt-8 max-w-2xl" />
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/products" size="lg">
              Shop Market Products
            </Button>
            <Button href="/land" variant="outline" size="lg">
              Walk the Land
            </Button>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full bg-clay-200/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-sage-200/40 blur-3xl"
        aria-hidden
      />
    </section>
  );
}

export function VerseBanner({ className = "" }: { className?: string }) {
  return (
    <blockquote
      className={`rounded-2xl border border-cedar-200/80 bg-cedar-50/90 px-6 py-5 text-left backdrop-blur-sm ${className}`}
    >
      <p className="font-display text-lg italic leading-relaxed text-cedar-800 sm:text-xl">
        &ldquo;{SITE.verse.text}&rdquo;
      </p>
      <footer className="mt-2 text-sm font-medium text-sage-600">— {SITE.verse.reference}</footer>
    </blockquote>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  centered = true,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage-600">{eyebrow}</p>
      )}
      <h2 className="heading-section mt-2 text-bark">{title}</h2>
      <p className="text-lead mt-4">{description}</p>
    </div>
  );
}
