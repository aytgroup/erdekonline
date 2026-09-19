"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Clock, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const tumIsletmeler = [
  { id: 1, isim: "Kalamar Balık Restaurant", kKey: "Yemek", puan: 4.9, sure: "25-40 dk", emoji: "🐟", renk: "bg-blue-100", href: "/isletme/1" },
  { id: 2, isim: "Erdek Pide & Lahmacun", kKey: "Yemek", puan: 4.7, sure: "20-35 dk", emoji: "🍕", renk: "bg-orange-100", href: "/isletme/2" },
  { id: 3, isim: "Şevket Market", kKey: "Market", puan: 4.6, sure: "15-25 dk", emoji: "🛒", renk: "bg-green-100", href: "/isletme/3" },
  { id: 4, isim: "Erdek Burger & Döner", kKey: "Yemek", puan: 4.5, sure: "20-30 dk", emoji: "🍔", renk: "bg-yellow-100", href: "/isletme/4" },
  { id: 5, isim: "Tatlı Dükkanı Erdek", kKey: "Yemek", puan: 4.8, sure: "30-45 dk", emoji: "🍰", renk: "bg-pink-100", href: "/isletme/5" },
  { id: 6, isim: "Yerel Köy Ürünleri", kKey: "Yerel", puan: 4.9, sure: "Aynı Gün", emoji: "🫒", renk: "bg-lime-100", href: "/isletme/6" },
  { id: 7, isim: "Erdek Manav", kKey: "Market", puan: 4.7, sure: "20-30 dk", emoji: "🥦", renk: "bg-emerald-100", href: "/isletme/7" },
  { id: 10, isim: "Erdek Mavi Tur", kKey: "Tekne", puan: 4.9, sure: "Tam Gün", emoji: "⛵", renk: "bg-sky-100", href: "/tekne" },
  { id: 11, isim: "Adalar Keşif Turu", kKey: "Tekne", puan: 4.8, sure: "Yarım Gün", emoji: "🏝️", renk: "bg-cyan-100", href: "/tekne" },
  { id: 12, isim: "Gün Batımı Turu", kKey: "Tekne", puan: 5.0, sure: "3 Saat", emoji: "🌅", renk: "bg-orange-100", href: "/isletme/12" },
  { id: 13, isim: "Erdek Balıkçısı", kKey: "Yerel", puan: 4.8, sure: "Aynı Gün", emoji: "🐟", renk: "bg-blue-100", href: "/isletme/13" },
  { id: 14, isim: "Bağ Evi Peynircisi", kKey: "Yerel", puan: 4.7, sure: "Aynı Gün", emoji: "🧀", renk: "bg-yellow-100", href: "/isletme/14" },
  { id: 15, isim: "Erdek Balı", kKey: "Yerel", puan: 5.0, sure: "Aynı Gün", emoji: "🍯", renk: "bg-amber-100", href: "/isletme/15" },
  { id: 20, isim: "Erdek Sahil Pansiyon", kKey: "Konaklama", puan: 4.7, sure: "Rezervasyon", emoji: "🏨", renk: "bg-indigo-100", href: "/isletme/20" },
  { id: 21, isim: "Ada Manzara Butik Otel", kKey: "Konaklama", puan: 4.9, sure: "Rezervasyon", emoji: "🏩", renk: "bg-purple-100", href: "/isletme/21" },
  { id: 22, isim: "Erdek Apart Otel", kKey: "Konaklama", puan: 4.5, sure: "Rezervasyon", emoji: "🏠", renk: "bg-green-100", href: "/isletme/22" },
  { id: 30, isim: "Erdek Kuaför & Güzellik", kKey: "Hizmet", puan: 4.6, sure: "Randevulu", emoji: "💈", renk: "bg-pink-100", href: "/hizmetler" },
  { id: 31, isim: "Erdek Eczanesi", kKey: "Hizmet", puan: 4.8, sure: "09:00-22:00", emoji: "💊", renk: "bg-green-100", href: "/hizmetler" },
];

const katLabels: Record<string, string> = {
  Yemek: "🍽️ Yemek", Market: "🛒 Market", Tekne: "⛵ Tekne",
  Konaklama: "🏨 Konaklama", Yerel: "🐟 Yerel", Hizmet: "💈 Hizmet",
};

const kategoriler = [
  { key: "Tümü", label: "🏪 Tümü" },
  { key: "Yemek", label: "🍽️ Yemek" },
  { key: "Market", label: "🛒 Market" },
  { key: "Tekne", label: "⛵ Tekne" },
  { key: "Konaklama", label: "🏨 Konaklama" },
  { key: "Yerel", label: "🐟 Yerel" },
  { key: "Hizmet", label: "💈 Hizmet" },
];

export default function IsletmelerPage() {
  const [aktifKat, setAktifKat] = useState("Tümü");
  const [arama, setArama] = useState("");
  const [siralama, setSiralama] = useState("puan");

  const filtrelenmis = useMemo(() => {
    let liste = aktifKat === "Tümü" ? tumIsletmeler : tumIsletmeler.filter(b => b.kKey === aktifKat);
    if (arama.trim()) {
      const q = arama.toLowerCase();
      liste = liste.filter(b => b.isim.toLowerCase().includes(q));
    }
    return [...liste].sort((a, b) => siralama === "puan" ? b.puan - a.puan : a.isim.localeCompare(b.isim, "tr"));
  }, [aktifKat, arama, siralama]);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">🏪 Tüm İşletmeler</h1>
            <p className="text-gray-500 text-sm">{filtrelenmis.length} işletme listeleniyor</p>
          </div>
        </div>
      </div>
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 gap-2 flex-1 focus-within:border-sky-400 transition-colors">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input type="text" placeholder="İşletme ara..." value={arama} onChange={e => setArama(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400" />
          </div>
          <select value={siralama} onChange={e => setSiralama(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sky-400 bg-white text-gray-700 font-medium cursor-pointer">
            <option value="puan">En Yüksek Puan</option>
            <option value="isim">İsme Göre (A-Z)</option>
          </select>
        </div>
        <div className="max-w-5xl mx-auto mt-3 flex gap-2 overflow-x-auto pb-1">
          {kategoriler.map(k => (
            <button key={k.key} onClick={() => setAktifKat(k.key)}
              className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${aktifKat === k.key ? "bg-sky-600 text-white border-sky-600 shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-sky-300 hover:text-sky-600"}`}>
              {k.label}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8 w-full">
        {filtrelenmis.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-xl font-black text-gray-700 mb-2">Sonuç bulunamadı</h2>
            <p className="text-gray-400 text-sm mb-4">Farklı bir kategori veya arama terimi deneyin.</p>
            <button onClick={() => { setAktifKat("Tümü"); setArama(""); }} className="text-sky-600 font-semibold hover:underline text-sm">Filtreleri Temizle</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filtrelenmis.map((b) => (
              <Link key={b.id} href={b.href} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                <div className={`h-44 ${b.renk} flex items-center justify-center`}>
                  <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">{katLabels[b.kKey]}</span>
                  <h3 className="font-bold text-gray-900 text-base mt-2 mb-1 group-hover:text-sky-600 transition-colors">{b.isim}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{b.puan}</span></div>
                    <div className="flex items-center gap-1"><Clock size={14} />{b.sure}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🏪</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">İşletmenizi Ekleyin!</h2>
          <p className="text-gray-500 text-sm mb-4">Erdek&apos;teki işletmenizi platforma ekleyin, yeni müşteriler kazanın.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors">Ücretsiz Ekle →</Link>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
