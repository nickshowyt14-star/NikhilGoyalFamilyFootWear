import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import { site, hasPhone } from "@/lib/site";
import { Providers } from "@/components/Providers";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Family Footwear Loni Ghaziabad | Shoes, Sportswear & Family Footwear",
    template: "%s | Family Footwear Loni",
  },
  description:
    "Shop footwear and activewear for men, women and kids at Family Footwear, Loni, Ghaziabad. Discover Sparx, Campus, Asian, Paragon, Relaxo and more, with fresh styles and sizes available in store.",
  keywords: [
    "footwear shop Loni",
    "shoe shop Ghaziabad",
    "Family Footwear Loni",
    "sports shoes Loni",
    "school shoes Ghaziabad",
    "Sparx Campus Relaxo Abros Loni",
    "sportswear Loni Ghaziabad",
    "multi brand shoe showroom Loni",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: `${site.name} — ${site.locality}`,
    title: "Family Footwear Loni Ghaziabad | Shoes, Sportswear & Family Footwear",
    description:
      "A multi-brand footwear and sportswear destination in Loni, Ghaziabad. Men, women and kids — fresh styles and sizes available in store.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Family Footwear — Loni, Ghaziabad",
    description:
      "Multi-brand footwear and activewear for the whole family. Visit us in Loni, Ghaziabad.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "shopping",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * LocalBusiness (ShoeStore) structured data.
 * Only verified facts are emitted — no invented phone number, coordinates,
 * opening hours, price range or ratings.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ShoeStore",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  description:
    "Multi-brand footwear and sportswear store in Loni, Ghaziabad offering shoes and activewear for men, women and children.",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: ["Loni", "Ghaziabad", "Delhi NCR"],
  hasMap: site.mapsHref,
  ...(hasPhone ? { telephone: `+${site.phone}` } : {}),
  makesOffer: [
    "Men's footwear",
    "Women's footwear",
    "Kids' and school footwear",
    "Sports and running shoes",
    "Sandals and slippers",
    "Sportswear and activewear",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Product", name } })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${inter.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
