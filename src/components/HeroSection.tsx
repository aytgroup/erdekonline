"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const cats = [
  { icon:"🍽️", label:"Yemek", href:"/yemek" },
  { icon:"🛒", label:"Market", href:"/market" },
  { icon:"⛵", label:"Tekne Turu", href:"/tekne" },
  { icon:"🏨", label:"Konaklama", href:"/konaklama" },
  { icon:"🫒", label:"Yerel Urunler", href:"/yerel" },
  { icon:"💈", label:"Hizmetler", href:"/hizmetler" },
  { icon:"🎭", label:"Etkinlikler", href:"/etkinlikler" },
  { icon:"🏪", label:"Tum Isletmeler", href:"/isletmeler" },
];

const stats = [
  { value:"50+", label:"Isletme", icon:"🏪" },
  { value:"1000+", label:"Mutlu Musteri", icon:"😊" },
  { value:"7/24", label:"Destek", icon:"📞" },
  { value:"20dk", label:"Ort. Teslimat", icon:"🚀" },
];

const populer = ["Balik Restaurant","Pizza","Market","Tekne Turu","Pansiyon","Zeytinyagi","Bal","Gun Batimi Turu"];

export default function HeroSection() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function ara(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/ara?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <section className="w-full bg-gradient-to-br from-sky-600 via-sky-500 to-blue-700 pt-10 pb-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 text-white font-semibold text-sm px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
          <span>🎉</span> Erdek&apos;in Dijital Platformu
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight drop-shadow">
          Erdek&apos;i Kesfet,
          <br/>
          <span className="text-yellow-300">Siparisini Ver</span>
        </h1>
        <p className="text-sky-100 text-lg mb-8 max-w-xl mx-auto">
          Yemek, market, tekne turu, konaklama ve yerel urunler — hepsi tek platformda.
        </p>
        <form onSubmit={ara} className="flex gap-2 max-w-lg mx-auto mb-6">
          <div className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-lg">
            <Search size={18} className="text-gray-400 shrink-0"/>
            <input
              type="text"
              value={q}
              onChange={e=>setQ(e.target.value)}
              placeholder="Restoran, urun veya hizmet ara..."
              className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
            />
          </div>
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl transition-colors shadow-lg shrink-0">Ara</button>
        </form>

        <div className="flex flex-nowrap overflow-x-auto gap-2 justify-start sm:justify-center mb-10 pb-1">
          {populer.map(tag => (
            <button
              key={tag}
              onClick={() => router.push(`/ara?q=${encodeURIComponent(tag)}`)}
              className="shrink-0 bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-full font-medium border border-white/30 backdrop-blur-sm transition-all"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-10">
          {cats.map(c=>(
            <Link key={c.href} href={c.href} className="flex flex-col items-center gap-1.5 bg-white/15 hover:bg-white/25 rounded-2xl p-3 transition-all border border-white/20 group backdrop-blur-sm">
              <span className="text-2xl group-hover:scale-110 transition-transform">{c.icon}</span>
              <span className="text-xs font-semibold text-white text-center leading-tight">{c.label}</span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map(s=>(
            <div key={s.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs text-sky-100 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
