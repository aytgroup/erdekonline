import ScrollToTop from "@/components/ScrollToTop";
import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ErdekOnline — Erdek'in Dijital Platformu",
    template: "%s | ErdekOnline",
  },
  description:
    "Erdek yemek siparişi, market, tekne turu, konaklama ve yerel ürünler tek platformda. Erdek'in tüm hizmetleri ErdekOnline'da — Erdek bir tık uzağında!",
  keywords:
    "Erdek, Erdek online sipariş, Erdek yemek, Erdek market, Erdek tekne turu, Erdek konaklama, Erdek pansiyon, Erdek yerel ürünler, Balıkesir Erdek, Kapadağ",
  authors: [{ name: "ErdekOnline", url: "https://erdekonline.com" }],
  creator: "ErdekOnline",
  publisher: "ErdekOnline",
  category: "local business directory",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/logo.png", sizes: "512x512", type: "image/png" }],
    shortcut: "/logo.svg",
  },
  metadataBase: new URL("https://erdekonline.com"),
  alternates: {
    canonical: "https://erdekonline.com",
  },
  openGraph: {
    title: "ErdekOnline — Erdek'in Dijital Platformu",
    description:
      "Erdek yemek siparişi, market, tekne turu, konaklama ve yerel ürünler tek platformda. Erdek bir tık uzağında!",
    url: "https://erdekonline.com",
    siteName: "ErdekOnline",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ErdekOnline — Erdek'in Dijital Platformu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ErdekOnline — Erdek'in Dijital Platformu",
    description:
      "Erdek yemek siparişi, market, tekne turu, konaklama ve yerel ürünler tek platformda. Erdek bir tık uzağında!",
    images: ["/og-image.png"],
    site: "@erdekonline",
    creator: "@erdekonline",
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
  verification: {
    google: ["E_Top-rXTu74B6Biep-UEURla4eu6OdzufaQeoa", "aCIDCm9DGXo_wBShzJfm5T7wwfwExxF5TVywo6va1lI"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://erdekonline.com/#organization",
      name: "ErdekOnline",
      url: "https://erdekonline.com",
      logo: {
        "@type": "ImageObject",
        url: "https://erdekonline.com/logo.png",
        width: 512,
        height: 512,
      },
      description:
        "Erdek'in dijital platformu. Yemek siparişi, market, tekne turu, konaklama ve yerel ürünler tek çatı altında.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Erdek",
        addressRegion: "Balıkesir",
        addressCountry: "TR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        availableLanguage: "Turkish",
        url: "https://erdekonline.com/destek",
      },
      sameAs: [
        "https://www.instagram.com/erdekonlinecom/",
        "https://www.facebook.com/erdekonline",
        "https://twitter.com/erdekonline",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://erdekonline.com/#website",
      url: "https://erdekonline.com",
      name: "ErdekOnline",
      description: "Erdek'in dijital platformu",
      publisher: { "@id": "https://erdekonline.com/#organization" },
      inLanguage: "tr-TR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://erdekonline.com/ara?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://erdekonline.com/#localbusiness",
      name: "ErdekOnline",
      url: "https://erdekonline.com",
      image: "https://erdekonline.com/og-image.png",
      description:
        "Erdek'in en kapsamlı online platformu. Yemek siparişi, market, tekne turu, konaklama ve yerel ürünler.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Erdek",
        addressRegion: "Balıkesir",
        postalCode: "10300",
        addressCountry: "TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 40.4008,
        longitude: 27.7967,
      },
      areaServed: {
        "@type": "City",
        name: "Erdek",
      },
      serviceType: [
        "Yemek Siparişi",
        "Market",
        "Tekne Turu",
        "Konaklama",
        "Yerel Ürünler",
      ],
      priceRange: "₺",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 antialiased">
        <Script
          id="ga4-src"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-80P45WTK19"
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-80P45WTK19', { send_page_view: true });
            `,
          }}
        />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
