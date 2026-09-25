import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erdek Tekne Turu — Koy Turları ve Rezervasyon",
  description:
    "Erdek tekne turları: Kapadağ koyları, Marmara Adaları, gün batımı turu ve mavi yolculuk. Günübirlik ve çok günlük Erdek tekne turu rezervasyonu ErdekOnline'da.",
  keywords:
    "Erdek tekne turu, Erdek tekne, Kapadağ tekne turu, Erdek mavi yolculuk, Erdek koy turu, Erdek gün batımı turu, Marmara tekne",
  alternates: { canonical: "https://erdekonline.com/tekne" },
  openGraph: {
    title: "Erdek Tekne Turu — ErdekOnline",
    description:
      "Erdek'ten kalkan tekne turları: Kapadağ koyları, gün batımı ve mavi yolculuk. Hemen rezervasyon yap!",
    url: "https://erdekonline.com/tekne",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Erdek Tekne Turu" }],
  },
};

export default function TekneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}