"use client";
import { Star, Clock, Tag, Flame, ChevronRight } from "lucide-react";
import Link from "next/link";

const B = [
  { id:1, n:"Kalamar Balık Restaurant", c:"Balık & Deniz Ürünleri", r:4.9, rc:128, t:"25-40 dk", m:"150 TL", i:"🐟", g:"from-blue-400 to-cyan-300", tags:["Taze Balık","Deniz Ürünleri","Meze"], badge:"Çok Beğenildi", bc:"bg-orange-500", d:null },
  { id:2, n:"Erdek Pide & Lahmacun", c:"Pide & Lahmacun", r:4.7, rc:95, t:"20-35 dk", m:"80 TL", i:"🍕", g:"from-orange-400 to-amber-300", tags:["Pide","Lahmacun","Fırın"], badge:"Hızlı Teslimat", bc:"bg-green-500", d:"%10 İndirim" },
  { id:3, n:"Şevket Market", c:"Market & Bakkal", r:4.6, rc:67, t:"15-25 dk", m:"50 TL", i:"🛒", g:"from-green-400 to-emerald-300", tags:["Gıda","İçecek","Temizlik"], badge:"Yeni", bc:"bg-sky-500", d:null },
  { id:4, n:"Erdek Burger & Döner", c:"Burger & Fast Food", r:4.5, rc:44, t:"20-30 dk", m:"100 TL", i:"🍔", g:"from-yellow-400 to-orange-300", tags:["Burger","Döner","Sandviç"], badge:null, bc:"", d:"%15 İndirim" },
  { id:5, n:"Tatlı Dükkanı Erdek", c:"Tatlı & Pasta", r:4.8, rc:82, t:"30-45 dk", m:"120 TL", i:"🍰", g:"from-pink-400 to-rose-300", tags:["Baklava","Pasta","Dondurma"], badge:"Öne Çıkan", bc:"bg-purple-500", d:null },
  { id:6, n:"Yerel Köy Ürünleri", c:"Yerel & Organik", r:4.9, rc:56, t:"Aynı Gün", m:"200 TL", i:"🫒", g:"from-lime-400 to-green-300", tags:["Zeytin","Peynir","Bal"], badge:"Çok Beğenildi", bc:"bg-orange-500", d:null },
  { id:7, n:"Erdek Manav", c:"Meyve & Sebze", r:4.7, rc:38, t:"20-30 dk", m:"60 TL", i:"🥦", g:"from-emerald-400 to-green-300", tags:["Meyve","Sebze","Taze"], badge:"Taze", bc:"bg-emerald-500", d:null },
  { id:13, n:"Erdek Balıkçısı", c:"Taze Balık", r:4.8, rc:61, t:"Aynı Gün", m:"150 TL", i:"🐟", g:"from-sky-400 to-blue-300", tags:["Taze Balık","Günlük"], badge:"Günlük Taze", bc:"bg-blue-500", d:null },
  { id:15, n:"Erdek Balı", c:"Doğal Bal", r:5.0, rc:29, t:"Aynı Gün", m:"120 TL", i:"🍯", g:"from-amber-400 to-yellow-300", tags:["Bal","Doğal","Organik"], badge:"⭐ 5.0", bc:"bg-amber-500", d:null },
  { id:12, n:"Gün Batımı Turu", c:"Romantik Tekne Turu", r:5.0, rc:47, t:"3 Saat", m:"Kişi Başı ₺800", i:"🌅", g:"from-orange-400 to-pink-300", tags:["Tekne","Romantik"], badge:"Özel Tur", bc:"bg-rose-500", d:null },
];

function Kart({ b }: { b: typeof B[0] }) {
  return (
    <Link href={`/isletme/${b.id}`} className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group mx-2.5">
      <div className={`relative h-40 bg-gradient-to-br ${b.g} flex items-center justify-center`}>
        <span className="text-7xl group-hover:scale-110 transition-transform duration-300 drop-shadow-md">{b.i}</span>
        {b.badge && <div className={`absolute top-2.5 left-2.5 ${b.bc} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow`}>{b.badge}</div>}
        {b.d && <div className="absolute top-2.5 right-2.5 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow"><Tag size={9}/>{b.d}</div>}
      </div>
      <div className="p-4">
        <h3 className="font-black text-gray-900 text-sm mb-0.5 group-hover:text-sky-600 transition-colors leading-tight">{b.n}</h3>
        <p className="text-gray-400 text-xs mb-2">{b.c}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1"><Star size={11} className="text-yellow-400 fill-yellow-400"/><span className="font-bold text-gray-700">{b.r}</span><span className="text-gray-400">({b.rc})</span></div>
          <div className="flex items-center gap-1"><Clock size={11}/>{b.t}</div>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedBusinesses() {
  const items = [...B, ...B];
  return (
    <section className="w-full py-14 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1"><Flame size={18} className="text-orange-500"/><span className="text-orange-500 font-semibold text-sm">Popüler</span></div>
            <h2 className="text-3xl font-black text-gray-900">Öne Çıkan İşletmeler</h2>
            <p className="text-gray-500 text-sm mt-1">Erdek&apos;in en çok tercih edilen işletmeleri</p>
          </div>
          <Link href="/isletmeler" className="hidden sm:flex items-center gap-1 text-sky-600 font-semibold text-sm hover:text-sky-700 transition-colors">Tümünü Gör <ChevronRight size={15}/></Link>
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