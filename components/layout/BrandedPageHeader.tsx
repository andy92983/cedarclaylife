import { PageBrandBanner } from "@/components/layout/PageBrandBanner";
import { SectionIntro } from "@/components/home/Hero";
import { cn } from "@/lib/utils";

type BrandedPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
};

export function BrandedPageHeader({
  eyebrow,
  title,
  description,
  className,
  children,
}: BrandedPageHeaderProps) {
  return (
    <header
      className={cn(
        "section-padding bg-hero-gradient bg-grain border-b border-cedar-200/50",
        className
      )}
    >
      <div className="container-narrow">
        <PageBrandBanner className="mb-8" />
        <SectionIntro eyebrow={eyebrow} title={title} description={description} />
        {children}
      </div>
    </header>
  );
}
