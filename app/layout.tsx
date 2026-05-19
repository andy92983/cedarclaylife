import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Header, Footer } from "@/components/layout/SiteChrome";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/seo/JsonLd";
import { SEO_KEYWORDS, SITE } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — Faith-Based Wellness, Handmade Products & Creative Studio`,
    template: `%s | ${SITE.name}`,
  },
  description:
    `Cedar & Clay offers natural home and bath products, elderberry wellness goods, creative studio classes, and 21 acres of trails in Redgranite, Wisconsin. ${SITE.motto}`,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: SITE.domain,
  },
  openGraph: {
    title: `${SITE.name} — Create. Consume. Conduct.`,
    description:
      "Handmade wellness products, creative studio classes, and nature trails on 21 acres — rooted in biblical wisdom for mind, body, and spirit.",
    url: SITE.domain,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/brand/logo.png", width: 2328, height: 514, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Faith-Based Wellness & Creative Studio`,
    description:
      "Natural products for home, body & health. Art studio, maker classes, and 21 acres of trails.",
    images: ["/brand/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Health & Wellness",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans">
        <OrganizationSchema />
        <LocalBusinessSchema />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
