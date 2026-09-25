import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erdek Yerel Ürünler — Zeytinyağı, Bal ve Organik",
  description:
    "Erdek ve Kapadağ yöresinin doğal yerel ürünleri: zeytinyağı, bal, zeytin, peynir ve organik gıdalar. ErdekOnline ile taze ve otantik Erdek lezzetleri kapınıza gelsin.",
  keywords:
    "Erdek yerel ürünler, Erdek zeytinyağı, Erdek bal, Kapadağ zeytinyağı, Erdek organik, Erdek yöresel ürünler, Erdek zeytin",
  alternates: { canonical: "https://erdekonline.com/yerel" },
  openGraph: {
    title: "Erdek Yerel Ürünler — ErdekOnline",
    description:
      "Kapadağ zeytinyağı, Erdek balı, taze peynir ve organik yöresel ürünler kapınıza gelsin.",
    url: "https://erdekonline.com/yerel",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Erdek Yerel Ürünler" }],
  },
};

export default function YerelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}