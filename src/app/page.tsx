import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import WhyErDekOnline from "@/components/WhyErDekOnline";
import TestimonialSection from "@/components/TestimonialSection";
import BlogPreview from "@/components/BlogPreview";
import BusinessCTA from "@/components/BusinessCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "ErdekOnline — Erdek'in Dijital Platformu",
  description:
    "Erdek yemek siparişi, market, tekne turu, konaklama ve yerel ürünler tek platformda. Erdek'in tüm hizmetleri ErdekOnline'da — Erdek bir tık uzağında!",
  keywords:
    "Erdek, Erdek yemek siparişi, Erdek market, Erdek tekne turu, Erdek konaklama, Erdek yerel ürünler, Balıkesir Erdek, Kapadağ, Erdek tatil",
  alternates: { canonical: "https://erdekonline.com" },
  openGraph: {
    title: "ErdekOnline — Erdek'in Dijital Platformu",
    description:
      "Erdek yemek siparişi, market, tekne turu, konaklama ve yerel ürünler tek platformda. Erdek bir tık uzağında!",
    url: "https://erdekonline.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ErdekOnline — Erdek'in Dijital Platformu" }],
  },
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedBusinesses />
      <WhyErDekOnline />
      <TestimonialSection />
      <BlogPreview />
      <BusinessCTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
