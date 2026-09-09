import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import WhyErDekOnline from "@/components/WhyErDekOnline";
import BusinessCTA from "@/components/BusinessCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedBusinesses />
      <WhyErDekOnline />
      <BusinessCTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
