import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowLeft, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Fiyatlandırma | ErdekOnline",
  description: "ErdekOnline işletme paketleri ve fiyatları. Ücretsiz başlangıç, Standart ve Premium planlar.",
};

const planlar = [
  {
    isim: "Başlangıç",
    fiyat: "Ücretsiz",
    alt: "İlk 3 ay",
    renk: "border-gray-200",
    buton: "bg-gray-900 text-white hover:bg-gray-800",
    ozellikler: ["İşletme profil sayfası", "Müşteri yorumları", "Temel istatistikler", "ErdekOnline levhası", "E-posta desteği"],
  },
  {
    isim: "Standart",
    fiyat: "₺499",
    alt: "/ ay",
    renk: "border-orange-400 shadow-xl shadow-orange-100",
    rozet: "En Popüler",
    buton: "bg-orange-500 text-white hover:bg-orange-600",
    ozellikler: ["Başlangıç paketi +", "Online sipariş alma", "%8 komisyon", "Detaylı analitik", "Öncelikli destek", "Sosyal medya tanıtımı"],
  },
  {
    isim: "Premium",
    fiyat: "₺999",
    alt: "/ ay",
    renk: "border-sky-400",
    buton: "bg-sky-600 text-white hover:bg-sky-700",
    ozellikler: ["Standart paket +", "%5 komisyon", "Öne çıkan listeleme", "Reklam kampanyaları", "7/24 telefon desteği", "Özel hesap yöneticisi"],
  },
];

export default function FiyatlandirmaPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm font-medium mb-10 transition-colors">
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-3">Şeffaf Fiyatlandırma</h1>
          <p className="text-gray-500 text-lg">Gizli ücret yok. İstediğin zaman iptal.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planlar.map((p) => (
            <div key={p.isim} className={`bg-white rounded-3xl border-2 p-8 relative ${p.renk}`}>
              {p.rozet && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-black px-4 py-1 rounded-full">{p.rozet}</div>
              )}
              <h2 className="font-black text-gray-900 text-xl mb-1">{p.isim}</h2>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-gray-900">{p.fiyat}</span>
                <span className="text-gray-400 mb-1">{p.alt}</span>
              </div>
              <div className="border-t border-gray-100 my-6" />
              <ul className="space-y-3 mb-8">
                {p.ozellikler.map((o) => (
                  <li key={o} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-green-500 shrink-0" /> {o}
                  </li>
                ))}
              </ul>
              <Link href="/isletme-kayit" className={`block text-center font-bold py-3 rounded-xl transition-colors ${p.buton}`}>
                Başla →
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-8">Sorularınız için <a href="mailto:info@erdekonline.com" className="text-sky-600 hover:underline">info@erdekonline.com</a></p>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}