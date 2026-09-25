import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erdek Yemek Siparişi — Restoranlar ve Teslimat",
  description:
    "Erdek'te yemek siparişi ver! Balık restoranları, pide, burger, tatlı ve daha fazlası. Ortalama 30 dakikada kapına gelsin. ErdekOnline ile Erdek'in en iyi restoranları bir tıkta.",
  keywords:
    "Erdek yemek siparişi, Erdek restoran, Erdek balık restoran, Erdek pide, Erdek yemek teslimat, Erdek online yemek",
  alternates: { canonical: "https://erdekonline.com/yemek" },
  openGraph: {
    title: "Erdek Yemek Siparişi — ErdekOnline",
    description:
      "Erdek'in en iyi restoranlarından yemek siparişi ver. Balık, pide, burger ve tatlı — 30 dakikada kapına gelsin.",
    url: "https://erdekonline.com/yemek",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Erdek Yemek Siparişi" }],
  },
};

export default function YemekLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}