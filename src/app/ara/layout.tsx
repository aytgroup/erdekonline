import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erdek'te Ara — İşletme ve Hizmet Arama",
  description:
    "Erdek'te restoran, market, tekne turu, pansiyon veya yerel ürün ara. ErdekOnline arama ile Erdek'in tüm işletmelerini anında bul.",
  keywords:
    "Erdek ara, Erdek işletme ara, Erdek restoran ara, Erdek arama, Erdek hizmet bul",
  alternates: { canonical: "https://erdekonline.com/ara" },
  robots: { index: false, follow: true },
};

export default function AraLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}