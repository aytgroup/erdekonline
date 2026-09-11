import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Star, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Konaklama | ErdekOnline",
  description: "Erdek'te konaklama rezervasyonu yapın. Pansiyon, butik otel ve apart seçenekleri.",
};

const yerler = [
  { id: 20, isim: "Erdek Sahil Pansiyon", kategori: "Pansiyon", puan: 4.7, konum: "Sahil Caddesi", emoji: "🏨", renk: "bg-blue-100" },
  { id: 21, isim: "Ada Manzara Butik Otel", kategori: "Butik Otel", puan: 4.9, konum: "Merkez", emoji: "🏩", renk: "bg-purple-100" },
  { id: 22, isim: "Erdek Apart Otel", kategori: "Apart", puan: 4.5, konum: "Bağlarbaşı", emoji: "🏠", renk: "bg-green-100" },
];

export default function KonaklamaPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">🏨 Konaklama</h1>
            <p className="text-gray-500 text-sm">Erdek&apos;te konaklamanız için en iyi seçenekler</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {yerler.map((b) => (
            <Link key={b.id} href={`/isletme/${b.id}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer">
              <div className={`h-44 ${b.renk} flex items-center justify-center`}>
                <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-sky-600 transition-colors">{b.isim}</h3>
                <p className="text-gray-500 text-sm mb-3">{b.kategori}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{b.puan}</span></div>
                  <div className="flex items-center gap-1"><MapPin size={14} />{b.konum}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 bg-purple-50 border border-purple-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🏨</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Tesisinizi Ekleyin!</h2>
          <p className="text-gray-500 text-sm mb-4">Pansiyon, otel veya apart olarak platformumuza katılın.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
            Ücretsiz Ekle →
          </Link>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}