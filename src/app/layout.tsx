import ScrollToTop from "@/components/ScrollToTop";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ErdekOnline - Erdek'in Dijital Platformu",
  description:
    "Erdek'in en kapsamlı online platformu. Yemek siparişi, market, yerel işletmeler, konaklama ve çok daha fazlası tek tıkla.",
  keywords: "Erdek, online sipariş, yemek, market, yerel işletmeler, Balıkesir",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/logo.png", sizes: "512x512", type: "image/png" }],
    shortcut: "/logo.svg",
  },
  metadataBase: new URL("https://erdekonline.com"),
  openGraph: {
    title: "ErdekOnline - Erdek'in Dijital Platformu",
    description: "Erdek bir tık uzağında!",
    url: "https://erdekonline.com",
    siteName: "ErdekOnline",
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/logo.png", width: 1254, height: 1254, alt: "ErdekOnline Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ErdekOnline - Erdek'in Dijital Platformu",
    description: "Erdek bir tık uzağında!",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} h-full`}>
      <head />
      <body className="min-h-full flex flex-col bg-gray-50 antialiased">
        <GoogleAnalytics />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
