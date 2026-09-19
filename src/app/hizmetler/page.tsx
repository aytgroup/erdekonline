import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Star, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Hizmetler | ErdekOnline",
  description: "Erdek'teki tüm hizmet sektörleri. Kuaför, tamir, eczane ve daha fazlası.",
};

const kategoriler = [
  { emoji: "💈", isim: "Kuaför & Güzellik", renk: "bg-pink-100", href: "/ara?q=kuaför" },
  { emoji: "🔧", isim: "Tadilat & Tamir", renk: "bg-gray-100", href: "/ara?q=tadilat" },
  { emoji: "💊", isim: "Eczane", renk: "bg-green-100", href: "/ara?q=eczane" },
  { emoji: "🚗", isim: "Araç Kiralama", renk: "bg-blue-100", href: "/ara?q=araç kiralama" },
  { emoji: "🧹", isim: "Temizlik", renk: "bg-yellow-100", href: "/ara?q=temizlik" },
  { emoji: "📸", isim: "Fotoğrafçı", renk: "bg-purple-100", href: "/ara?q=fotoğrafçı" },
];

const isletmeler = [
  {
    id: 30, isim: "Erdek Kuaför & Güzellik", kategori: "Kuaför", puan: 4.6, sure: "Randevulu",
    emoji: "💈", renk: "bg-pink-100", telefon: "+90 266 835 00 10",
    aciklama: "Saç kesim, renklendirme, cilt bakımı ve daha fazlası.", etiketler: ["Saç", "Cilt Bakımı", "Manikür"],
  },
  {
    id: 31, isim: "Erdek Eczanesi", kategori: "Eczane", puan: 4.8, sure: "09:00-22:00",
    emoji: "💊", renk: "bg-green-100", telefon: "+90 266 835 00 11",
    aciklama: "Nöbetçi eczane. İlaç ve sağlık ürünleri.", etiketler: ["İlaç", "Sağlık", "Nöbetçi"],
  },
  {
    id: 32, isim: "Erdek Fotoğraf Atölyesi", kategori: "Fotoğrafçı", puan: 4.7, sure: "10:00-20:00",
    emoji: "📸", renk: "bg-purple-100", telefon: "+90 266 835 00 12",
    aciklama: "Düğün, vesikalık ve etkinlik fotoğrafçılığı.", etiketler: ["Düğün", "Vesikalık", "Etkinlik"],
  },
];

export default function HizmetlerPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">💈 Hizmetler</h1>
            <p className="text-gray-500 text-sm">Erdek&apos;in tüm hizmet sektörleri</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Kategori hızlı linkler */}
        <h2 className="text-lg font-black text-gray-800 mb-4">Kategoriler</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-10">
          {kategoriler.map((k) => (
            <Link key={k.isim} href={k.href} className={`${k.renk} rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md cursor-pointer border border-white hover:-translate-y-0.5 transition-all`}>
              <span className="text-3xl">{k.emoji}</span>
              <span className="font-semibold text-gray-700 text-xs text-center leading-tight">{k.isim}</span>
            </Link>
          ))}
        </div>

        {/* Kayıtlı hizmet işletmeleri */}
        <h2 className="text-lg font-black text-gray-800 mb-4">Kayıtlı Hizmet İşletmeleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isletmeler.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
              <div className={`h-36 ${b.renk} flex items-center justify-center`}>
                <span className="text-6xl group-hover:scale-110 transition-transform">{b.emoji}</span>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">{b.kategori}</span>
                <h3 className="font-bold text-gray-900 text-base mt-2 mb-1">{b.isim}</h3>
                <p className="text-gray-500 text-xs mb-2 leading-relaxed">{b.aciklama}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {b.etiketler.map(e => (
                    <span key={e} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{e}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-1"><Star size={13} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{b.puan}</span></div>
                  <span className="text-xs text-gray-400">{b.sure}</span>
                </div>
                <a href={`tel:${b.telefon}`}
                  className="mt-3 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold py-2.5 rounded-xl transition-colors w-full">
                  <Phone size={14} /> Hemen Ara
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">💼</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Hizmetinizi Ekleyin!</h2>
          <p className="text-gray-500 text-sm mb-4">Erdek&apos;te hizmet sektöründe misiniz? Sizi bekliyoruz.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
            Ücretsiz Ekle →
          </Link>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}