import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erdek İşletmeleri — Tüm Restoran ve Hizmetler",
  description:
    "Erdek'teki tüm işletmeler: restoranlar, marketler, tekne turları, pansiyonlar ve yerel ürün satıcıları. ErdekOnline üzerinden Erdek işletmelerini keşfet, sipariş ver.",
  keywords:
    "Erdek işletmeleri, Erdek restoranlar, Erdek işyerleri, Erdek esnaf, Erdek rehberi, Erdek yerel işletmeler",
  alternates: { canonical: "https://erdekonline.com/isletmeler" },
  openGraph: {
    title: "Erdek İşletmeleri — ErdekOnline",
    description:
      "Erdek'teki tüm işletmeleri keşfet. Restoranlar, marketler, tekne turları, pansiyonlar ve daha fazlası.",
    url: "https://erdekonline.com/isletmeler",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Erdek İşletmeleri" }],
  },
};

export default function IsletmelerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}