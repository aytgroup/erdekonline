import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="text-8xl mb-6">🗺️</div>
        <h1 className="text-6xl font-black text-gray-900 mb-3">404</h1>
        <h2 className="text-2xl font-black text-gray-700 mb-4">Sayfa Bulunamadı</h2>
        <p className="text-gray-500 text-base max-w-md mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönerek arama yapabilirsiniz.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full transition-colors">
            Ana Sayfaya Dön
          </Link>
          <Link href="/isletmeler" className="border border-gray-200 text-gray-700 hover:bg-gray-100 font-semibold px-8 py-3.5 rounded-full transition-colors">
            İşletmelere Bak
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg">
          {[
            { href: "/yemek", label: "🍽️ Yemek" },
            { href: "/market", label: "🛒 Market" },
            { href: "/tekne", label: "⛵ Tekne" },
            { href: "/konaklama", label: "🏨 Konaklama" },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="bg-white border border-gray-100 rounded-xl py-3 px-4 text-sm font-semibold text-gray-600 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}