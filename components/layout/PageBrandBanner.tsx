import Image from "next/image";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type PageBrandBannerProps = {
  className?: string;
  size?: "default" | "compact";
};

export function PageBrandBanner({ className, size = "default" }: PageBrandBannerProps) {
  const height = size === "compact" ? 40 : 52;

  return (
    <div className={cn("flex justify-center", className)}>
      <Image
        src="/brand/logo.png"
        alt={SITE.name}
        width={Math.round(height * (2328 / 514))}
        height={height}
        className={cn(
          "h-auto w-auto object-contain",
          size === "compact"
            ? "max-h-10 max-w-[220px]"
            : "max-h-14 max-w-[min(100%,320px)] sm:max-h-16 sm:max-w-[360px]"
        )}
      />
    </div>
  );
}
