"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Star, Search, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useToast } from "@/components/Toast";

const isletmeler = [
  { id: 3, isim: "Şevket Market", kat: "Market", puan: 4.6, sure: "15-25 dk", emoji: "🛒", renk: "bg-green-100", acik: true, minSiparis: "50₺" },
  { id: 7, isim: "Erdek Manav", kat: "Manav", puan: 4.7, sure: "20-30 dk", emoji: "🥦", renk: "bg-emerald-100", acik: true, minSiparis: "60₺" },
];

const populerUrunler = [
  { isim: "Su (1.5L)", fiyat: "₺15", emoji: "💧" },
  { isim: "Ekmek", fiyat: "₺25", emoji: "🍞" },
  { isim: "Süt", fiyat: "₺35", emoji: "🥛" },
  { isim: "Domates (kg)", fiyat: "₺40", emoji: "🍅" },
  { isim: "Salatalık (kg)", fiyat: "₺30", emoji: "🥒" },
  { isim: "Yumurta (30lu)", fiyat: "₺120", emoji: "🥚" },
  { isim: "Peynir (250g)", fiyat: "₺85", emoji: "🧀" },
  { isim: "Muz (kg)", fiyat: "₺55", emoji: "🍌" },
];

export default function MarketPage() {
  const [arama, setArama] = useState("");
  const [favoriler, setFavoriler] = useState<string[]>([]);
  const { goster, ToastContainer } = useToast();

  useEffect(() => {
    try { const raw = localStorage.getItem("eo_favoriler"); setFavoriler(raw ? JSON.parse(raw) : []); }
    catch { setFavoriler([]); }
  }, []);

  function favoriToggle(e: React.MouseEvent, id: number) {
    e.preventDefault(); e.stopPropagation();
    const sid = String(id);
    const eklendi = !favoriler.includes(sid);
    const yeni = eklendi ? [...favoriler, sid] : favoriler.filter(f => f !== sid);
    setFavoriler(yeni);
    localStorage.setItem("eo_favoriler", JSON.stringify(yeni));
    goster(eklendi ? "❤️ Favorilere eklendi!" : "Favorilerden kaldırıldı", eklendi ? "success" : "info");
  }

  const liste = isletmeler.filter(b =>
    b.isim.toLowerCase().includes(arama.toLowerCase()) ||
    b.kat.toLowerCase().includes(arama.toLowerCase())
  );

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-900">🛒 Market</h1>
            <p className="text-gray-500 text-sm">Erdek&apos;in marketleri kapınıza gelsin</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-green-400 transition-colors">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input type="text" placeholder="Market ara..." value={arama} onChange={e => setArama(e.target.value)}
              className="outline-none text-sm bg-transparent text-gray-800 placeholder-gray-400 w-32" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 w-full">
        {/* Marketler */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {liste.map((b) => (
            <div key={b.id} className="relative">
              <button onClick={(e) => favoriToggle(e, b.id)}
                className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
                <Heart size={16} className={favoriler.includes(String(b.id)) ? "fill-red-500 text-red-500" : "text-gray-400"} />
              </button>
              <Link href={`/isletme/${b.id}`}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group block">
                <div className={`h-40 ${b.renk} flex items-center justify-center relative`}>
                  <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
                  {b.acik && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">● Açık</span>
                  )}
                  <span className="absolute bottom-2 right-2 bg-white/90 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">Min. {b.minSiparis}</span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{b.kat}</span>
                  <h3 className="font-bold text-gray-900 text-base mt-2 mb-1 group-hover:text-sky-600 transition-colors">{b.isim}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{b.puan}</span></div>
                    <div className="flex items-center gap-1"><Clock size={14} />{b.sure}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Popüler Ürünler */}
        <div className="mb-10">
          <h2 className="text-lg font-black text-gray-900 mb-4">🔥 Popüler Ürünler</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {populerUrunler.map(u => (
              <div key={u.isim} className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow cursor-pointer hover:border-green-200">
                <span className="text-3xl">{u.emoji}</span>
                <span className="font-semibold text-gray-800 text-sm text-center">{u.isim}</span>
                <span className="font-black text-green-600 text-sm">{u.fiyat}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">* Fiyatlar değişkenlik gösterebilir. Sipariş için marketi arayın.</p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🏪</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Marketiniz Burada Olsun!</h2>
          <p className="text-gray-500 text-sm mb-4">Marketinizi ErdekOnline&apos;a ekleyin.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
            Ücretsiz Ekle →
          </Link>
        </div>
      </div>
      {ToastContainer}
      <Footer />
      <WhatsAppButton />
    </main>
  );
}