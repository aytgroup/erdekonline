"use client";
import { useEffect, useState } from "react";
import { Star, Clock, Tag, Flame, ChevronRight } from "lucide-react";
import Link from "next/link";
import { tumAktifIsletmeler, type Isletme } from "@/lib/veri";

function Kart({ b }: { b: Isletme }) {
  return (
    <Link href={`/isletme/${b.id}`} className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group mx-2.5">
      <div className={`relative h-40 bg-gradient-to-br ${b.gradient} flex items-center justify-center`}>
        <span className="text-7xl group-hover:scale-110 transition-transform duration-300 drop-shadow-md">{b.emoji}</span>
        {b.badge && <div className={`absolute top-2.5 left-2.5 ${b.badgeRenk} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow`}>{b.badge}</div>}
        {b.indirim && <div className="absolute top-2.5 right-2.5 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow"><Tag size={9}/>{b.indirim}</div>}
      </div>
      <div className="p-4">
        <h3 className="font-black text-gray-900 text-sm mb-0.5 group-hover:text-sky-600 transition-colors leading-tight">{b.isim}</h3>
        <p className="text-gray-400 text-xs mb-2">{b.kategori}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Star size={11} className="text-yellow-400 fill-yellow-400"/>
            <span className="font-bold text-gray-700">{b.puan > 0 ? b.puan : "Yeni"}</span>
            {b.puanSayisi > 0 && <span className="text-gray-400">({b.puanSayisi})</span>}
          </div>
          <div className="flex items-center gap-1"><Clock size={11}/>{b.sure}</div>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedBusinesses() {
  const [isletmeler, setIsletmeler] = useState<Isletme[]>([]);

  useEffect(() => {
    const tum = tumAktifIsletmeler().sort((a, b) => b.puan - a.puan).slice(0, 10);
    setIsletmeler(tum);
  }, []);

  if (isletmeler.length === 0) return null;
  const items = [...isletmeler, ...isletmeler];

  return (
    <section className="w-full py-14 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1"><Flame size={18} className="text-orange-500"/><span className="text-orange-500 font-semibold text-sm">Populer</span></div>
            <h2 className="text-3xl font-black text-gray-900">One Cikan Isletmeler</h2>
            <p className="text-gray-500 text-sm mt-1">Erdek&apos;in en cok tercih edilen isletmeleri</p>
          </div>
          <Link href="/isletmeler" className="hidden sm:flex items-center gap-1 text-sky-600 font-semibold text-sm hover:text-sky-700 transition-colors">Tumunu Gor <ChevronRight size={15}/></Link>
        </div>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {items.map((b, i) => <Kart key={`${b.id}-${i}`} b={b} />)}
        </div>
      </div>
    </section>
  );
}

﻿
