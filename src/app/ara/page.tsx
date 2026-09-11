"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { Search, ArrowLeft, Star, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const tumIsletmeler = [
  { id: 1, isim: "Kalamar Balık Restaurant", kategori: "Balık & Deniz Ürünleri", puan: 4.9, sure: "25-40 dk", emoji: "🐟", href: "/isletme/1", tags: ["balık", "deniz", "meze", "restoran"] },
  { id: 2, isim: "Erdek Pide & Lahmacun", kategori: "Pide & Lahmacun", puan: 4.7, sure: "20-35 dk", emoji: "🍕", href: "/isletme/2", tags: ["pide", "lahmacun", "fırın", "yemek"] },
  { id: 3, isim: "Şevket Market", kategori: "Market & Bakkal", puan: 4.6, sure: "15-25 dk", emoji: "🛒", href: "/isletme/3", tags: ["market", "bakkal", "gıda", "içecek"] },
  { id: 4, isim: "Erdek Burger & Döner", kategori: "Burger & Fast Food", puan: 4.5, sure: "20-30 dk", emoji: "🍔", href: "/isletme/4", tags: ["burger", "döner", "fast food", "sandviç"] },
  { id: 5, isim: "Tatlı Dükkanı Erdek", kategori: "Tatlı & Pasta", puan: 4.8, sure: "30-45 dk", emoji: "🍰", href: "/isletme/5", tags: ["tatlı", "pasta", "baklava", "dondurma"] },
  { id: 6, isim: "Yerel Köy Ürünleri", kategori: "Yerel & Organik", puan: 4.9, sure: "Aynı Gün", emoji: "🫒", href: "/isletme/6", tags: ["zeytin", "peynir", "bal", "yerel", "organik"] },
  { id: 10, isim: "Erdek Mavi Tur", kategori: "Tekne Turu", puan: 4.9, sure: "Tam Gün", emoji: "⛵", href: "/tekne", tags: ["tekne", "tur", "deniz", "gezi"] },
  { id: 11, isim: "Adalar Keşif Turu", kategori: "Ada Turu", puan: 4.8, sure: "Yarım Gün", emoji: "🏝️", href: "/tekne", tags: ["ada", "tekne", "tur", "keşif"] },
  { id: 20, isim: "Erdek Sahil Pansiyon", kategori: "Pansiyon", puan: 4.7, sure: "Rezervasyon", emoji: "🏨", href: "/konaklama", tags: ["pansiyon", "konaklama", "otel", "sahil"] },
  { id: 21, isim: "Ada Manzara Butik Otel", kategori: "Butik Otel", puan: 4.9, sure: "Rezervasyon", emoji: "🏩", href: "/konaklama", tags: ["otel", "butik", "konaklama", "manzara"] },
];

function AraContent() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") || "";
  const [aramaMetni, setAramaMetni] = useState(q);

  const sonuclar = q.length > 0
    ? tumIsletmeler.filter(i =>
        i.isim.toLowerCase().includes(q.toLowerCase()) ||
        i.kategori.toLowerCase().includes(q.toLowerCase()) ||
        i.tags.some(t => t.toLowerCase().includes(q.toLowerCase()))
      )
    : [];

  function handleAra(e: React.FormEvent) {
    e.preventDefault();
    if (aramaMetni.trim()) router.push(`/ara?q=${encodeURIComponent(aramaMetni.trim())}`);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <form onSubmit={handleAra} className="flex-1 flex items-center bg-gray-100 rounded-xl px-4 py-2.5 gap-3">
            <Search size={18} className="text-gray-400 shrink-0" />
            <input type="text" value={aramaMetni} onChange={e => setAramaMetni(e.target.value)}
              placeholder="Restoran, ürün veya hizmet ara..."
              className="flex-1 bg-transparent outline-none text-gray-800 text-sm" />
            {aramaMetni && (
              <button type="submit" className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Ara</button>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {q ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-gray-800">
                &ldquo;{q}&rdquo; için {sonuclar.length} sonuç
              </h2>
            </div>
            {sonuclar.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {sonuclar.map(item => (
                  <Link key={item.id} href={item.href}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                    <div className="h-36 bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center">
                      <span className="text-6xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-sky-600 transition-colors">{item.isim}</h3>
                      <p className="text-gray-400 text-xs mb-3">{item.kategori}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{item.puan}</span></div>
                        <div className="flex items-center gap-1"><Clock size={12} />{item.sure}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-black text-gray-700 mb-2">Sonuç bulunamadı</h3>
                <p className="text-gray-400 text-sm mb-6">&ldquo;{q}&rdquo; için herhangi bir sonuç bulunamadı.</p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {["Balık", "Pizza", "Market", "Tekne Turu", "Pansiyon", "Tatlı"].map(tag => (
                    <button key={tag} onClick={() => router.push(`/ara?q=${encodeURIComponent(tag)}`)}
                      className="bg-gray-100 hover:bg-sky-100 hover:text-sky-600 text-gray-600 text-sm px-4 py-2 rounded-full font-medium transition-colors">
                      {tag}
                    </button>
                  ))}
                </div>
                <Link href="/" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
                  <ArrowLeft size={16} /> Ana Sayfaya Dön
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-black text-gray-700 mb-2">Ne arıyorsunuz?</h3>
            <p className="text-gray-400 text-sm">Yukarıdaki arama kutusuna yazın.</p>
          </div>
        )}
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

export default function AraPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Yükleniyor...</div>}>
      <AraContent />
    </Suspense>
  );
}