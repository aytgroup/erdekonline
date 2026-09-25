import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erdek Etkinlikler — Festivaller ve Aktiviteler",
  description:
    "Erdek etkinlikleri, festivaller, konserler ve aktiviteler. Erdek'te ne var ne yok? ErdekOnline ile Erdek'in güncel etkinlik takvimini takip et.",
  keywords:
    "Erdek etkinlikler, Erdek festival, Erdek konser, Erdek aktivite, Erdek ne yapılır, Erdek yaz etkinlikleri",
  alternates: { canonical: "https://erdekonline.com/etkinlikler" },
  openGraph: {
    title: "Erdek Etkinlikler — ErdekOnline",
    description:
      "Erdek festivalleri, konserler ve aktiviteler. Erdek'in etkinlik takvimine göz at!",
    url: "https://erdekonline.com/etkinlikler",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Erdek Etkinlikler" }],
  },
};

export default function EtkinliklerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}