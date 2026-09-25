import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erdek Market Siparişi — Eve Teslimat",
  description:
    "Erdek'te market siparişi ver, eve teslim al. Gıda, içecek, temizlik ürünleri ve daha fazlası. Erdek marketleri ErdekOnline'da — 15-25 dakikada kapına gelsin.",
  keywords:
    "Erdek market, Erdek market siparişi, Erdek eve teslimat, Erdek bakkal, Erdek online market, Erdek alışveriş",
  alternates: { canonical: "https://erdekonline.com/market" },
  openGraph: {
    title: "Erdek Market Siparişi — ErdekOnline",
    description:
      "Erdek'te market siparişi ver, 15-25 dakikada kapına gelsin. Gıda, içecek ve temizlik ürünleri.",
    url: "https://erdekonline.com/market",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Erdek Market Siparişi" }],
  },
};

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}