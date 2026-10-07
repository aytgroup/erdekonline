"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowLeft, Star, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { aramaYap, type Isletme } from "@/lib/veri";

function AraContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [sorgu, setSorgu] = useState(params.get("q") || "");
  const [sonuclar, setSonuclar] = useState<Isletme[]>([]);
  const [gecmis, setGecmis] = useState<string[]>([]);

  useEffect(() => {
    try { const r = localStorage.getItem("eo_arama_gecmis"); setGecmis(r ? JSON.parse(r) : []); } catch { setGecmis([]); }
  }, []);

  useEffect(() => {
    const q = params.get("q") || "";
    setSorgu(q);
    if (q.trim()) {
      setSonuclar(aramaYap(q));
      try {
        const r = localStorage.getItem("eo_arama_gecmis");
        const g: string[] = r ? JSON.parse(r) : [];
        const yeni = [q, ...g.filter(x => x !== q)].slice(0, 8);
        localStorage.setItem("eo_arama_gecmis", JSON.stringify(yeni));
        setGecmis(yeni);
      } catch { /* */ }
    } else { setSonuclar([]); }
  }, [params]);

  function ara() { const q = sorgu.trim(); if (q) router.push(`/ara?q=${encodeURIComponent(q)}`); }
  const q = params.get("q") || "";

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b shadow-sm px-4 py-4 sticky top-[64px] z-30">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-sky-600"><ArrowLeft size={20} /></Link>
          <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-sky-400">
            <Search size={16} className="text-gray-400" />
            <input type="text" value={sorgu} onChange={e => setSorgu(e.target.value)} onKeyDown={e => e.key === "Enter" && ara()} placeholder="Restoran, urun veya hizmet ara..." className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400" autoFocus />
          </div>
          <button onClick={ara} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm">Ara</button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-6 w-full flex-1">
        {q ? (
          <>
            <p className="text-sm text-gray-500 mb-4">{sonuclar.length} sonuc</p>
            {sonuclar.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-sm mb-6">Farkli bir terim deneyin.</p>
                <Link href="/" className="inline-flex items-center gap-2 bg-orange-500 text-white font-bold px-6 py-3 rounded-full"><ArrowLeft size={16} /> Ana Sayfa</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sonuclar.map(b => (
                  <Link key={b.id} href={`/isletme/${b.id}`} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-all group">
                    <div className={`w-16 h-16 bg-gradient-to-br ${b.gradient} rounded-xl flex items-center justify-center shrink-0`}>
                      <span className="text-3xl">{b.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-sky-600 truncate">{b.isim}</h3>
                      <p className="text-gray-400 text-xs mb-1">{b.kategori}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-0.5"><Star size={11} className="text-yellow-400 fill-yellow-400" /><b className="font-bold text-gray-700">{b.puan > 0 ? b.puan : "Yeni"}</b></span>
                        <span className="flex items-center gap-0.5"><Clock size={11} />{b.sure}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <SonucYok gecmis={gecmis} onTemizle={() => { localStorage.removeItem("eo_arama_gecmis"); setGecmis([]); }} router={router} />
        )}
      </div>
      <Footer /><WhatsAppButton />
    </main>
  );
}

function SonucYok({ gecmis, onTemizle, router }: { gecmis: string[]; onTemizle: () => void; router: ReturnType<typeof useRouter> }) {
  const kategoriler = [
    {e:"🍽️",l:"Yemek",h:"/yemek"},{e:"🛒",l:"Market",h:"/market"},
    {e:"⛵",l:"Tekne",h:"/tekne"},{e:"🏨",l:"Konaklama",h:"/konaklama"},
    {e:"🫒",l:"Yerel",h:"/yerel"},{e:"💈",l:"Hizmetler",h:"/hizmetler"},
    {e:"🎭",l:"Etkinlikler",h:"/etkinlikler"},{e:"🏪",l:"Tum Isletmeler",h:"/isletmeler"},
  ];
  const populer = ["Balik Restaurant","Pizza","Market","Tekne Turu","Pansiyon","Bal"];
  return (
    <div className="py-8">
      {gecmis.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-700">Son Aramalar</h3>
            <button onClick={onTemizle} className="text-xs text-gray-400 hover:text-red-500">Temizle</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {gecmis.map((g, i) => (
              <button key={i} onClick={() => router.push(`/ara?q=${encodeURIComponent(g)}`)} className="bg-white border border-gray-200 text-gray-600 text-sm px-3 py-1.5 rounded-full hover:bg-orange-50 hover:border-orange-300 font-medium">{g}</button>
            ))}
          </div>
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-700 mb-3">Populer Aramalar</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {populer.map(tag => (
            <button key={tag} onClick={() => router.push(`/ara?q=${encodeURIComponent(tag)}`)} className="bg-orange-50 hover:bg-orange-100 text-orange-600 text-sm px-4 py-2 rounded-full font-medium border border-orange-100">{tag}</button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3">Kategoriler</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {kategoriler.map(k => (
            <Link key={k.h} href={k.h} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 hover:shadow-md hover:border-sky-200 transition-all">
              <span className="text-2xl">{k.e}</span>
              <span className="font-semibold text-gray-700 text-sm">{k.l}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AraPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Yukleniyor...</div>}>
      <AraContent />
    </Suspense>
  );
}

﻿
