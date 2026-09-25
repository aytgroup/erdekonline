import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erdek Konaklama — Oteller, Pansiyonlar ve Apart",
  description:
    "Erdek konaklama seçenekleri: oteller, pansiyonlar, butik oteller ve apart daireler. Her bütçeye uygun Erdek tatil yeri. ErdekOnline ile kolayca rezervasyon yapın.",
  keywords:
    "Erdek konaklama, Erdek otel, Erdek pansiyon, Erdek butik otel, Erdek apart, Erdek tatil yeri, Erdek tatil",
  alternates: { canonical: "https://erdekonline.com/konaklama" },
  openGraph: {
    title: "Erdek Konaklama — ErdekOnline",
    description:
      "Erdek'te konaklama yerleri: oteller, pansiyonlar ve apart daireler. Her bütçeye uygun seçenek!",
    url: "https://erdekonline.com/konaklama",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Erdek Konaklama" }],
  },
};

export default function KonaklamaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}