import type { MetadataRoute } from "next";
import { AI_TRAINING_BOTS } from "@/lib/ai-bots";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_TRAINING_BOTS.map((userAgent) => ({
        userAgent,
        disallow: "/" as const,
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/auth/", "/orders"],
      },
    ],
    sitemap: `${SITE.domain}/sitemap.xml`,
  };
}
