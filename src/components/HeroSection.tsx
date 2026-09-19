"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const categories = [
  { icon: "🍽️", label: "Yemek", href: "/yemek" },
  { icon: "🛒", label: "Market", href: "/market" },
  { icon: "⛵", label: "Tekne Turu", href: "/tekne" },
  { icon: "🏨", label: "Konaklama", href: "/konaklama" },
  { icon: "🐟", label: "Yerel Ürünler", href: "/yerel" },
  { icon: "💈", label: "Hizmetler", href: "/hizmetler" },
  { icon: "🎭", label: "Etkinlikler", href: "/etkinlikler" },
  { icon: "🏪", label: "Tüm İşletmeler", href: "/isletmeler" },
];

const stats = [
  { value: "50+", label: "İşletme", icon: "🏪" },
  { value: "1.000+", label: "Mutlu Müşteri", icon: "😊" },
  { value: "4.8★", label: "Ortalama Puan", icon: "⭐" },
  { value: "~30dk", label: "Ort. Teslimat", icon: "🚀" },
];

const quickTags = ["Balık Restaurant", "Pizza", "Market", "Tekne Turu", "Pansiyon", "Zeytinyağı", "Bal", "Gün Batımı Turu"];

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const q = search.trim();
    if (q) router.push(`/ara?q=${encodeURIComponent(q)}`);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      {/* ───── HERO ───── */}
      <section className="relative w-full min-h-[520px] flex flex-col items-center justify-center py-20 px-6 text-center overflow-hidden">
        {/* YouTube Drone Video arka plan */}
        {/* Outer div: görünen alan — sadece ortayı gösterir, kenarları keser */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Inner wrapper: iframe'i üstten ve alttan 80px dışarı taşır → YouTube UI kesilir */}
          <div className="absolute" style={{ top: "-80px", bottom: "-140px", left: 0, right: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/pCM1SqwtdNA?autoplay=1&mute=1&loop=1&playlist=pCM1SqwtdNA&controls=0&showinfo=0&rel=0&modestbranding=1&start=10&disablekb=1&iv_load_policy=3&fs=0&cc_load_policy=0"
              allow="autoplay; encrypted-media"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: "177.78vh", height: "56.25vw", minWidth: "100%", minHeight: "100%", pointerEvents: "none" }}
              frameBorder="0"
            />
          </div>
        </div>
        {/* Gradient overlay — mevcut renkleri korur, video üstünde yarı saydam */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(135deg,rgba(3,105,161,0.82) 0%,rgba(14,165,233,0.75) 55%,rgba(29,78,216,0.82) 100%)" }} />
        {/* Alt kenar maskesi — YouTube altyazılarını tamamen kapatır */}
        <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: "80px", background: "linear-gradient(to bottom, transparent, rgba(14,100,200,0.98) 60%, rgb(10,80,180))" }} />
        {/* İçerik */}
        <div className="relative z-20 w-full flex flex-col items-center">
        {/* Konum rozeti */}
        <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-5 py-2 rounded-full border border-white/40 mb-7">
          <MapPin size={15} />
          Erdek, Balıkesir
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
        </div>

        {/* Başlık */}
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-5 drop-shadow-lg">
          Erdek Artık<br />
          <span className="text-yellow-300">Bir Tık Uzağında</span>
        </h1>

        <p className="text-sky-100 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          Yemek siparişinden market alışverişine, tekne turundan konaklama rezervasyonuna —
          Erdek&apos;in tüm hizmetleri artık tek platformda.
        </p>

        {/* Arama */}
        <div className="w-full max-w-2xl mb-6">
          <div className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden p-2 gap-2">
            <Search size={22} className="ml-3 text-gray-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Restoran, ürün veya hizmet ara..."
              className="flex-1 text-gray-800 placeholder-gray-400 text-base outline-none py-3 bg-transparent"
            />
            <button
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-colors text-base shrink-0"
            >
              Ara
            </button>
          </div>
          {/* Hızlı etiketler */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => router.push(`/ara?q=${encodeURIComponent(tag)}`)}
                className="bg-white/20 hover:bg-white/35 text-white text-sm px-4 py-2 rounded-full border border-white/40 transition-colors font-medium"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl mt-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/15 border border-white/25 rounded-2xl py-5 flex flex-col items-center gap-1">
              <span className="text-3xl">{s.icon}</span>
              <span className="text-white font-black text-2xl">{s.value}</span>
              <span className="text-sky-100 text-sm">{s.label}</span>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ───── KATEGORİLER ───── */}
      <section className="w-full bg-white py-12 px-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-gray-800 font-black text-2xl mb-8 text-center">🔍 Ne arıyorsunuz?</h2>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex flex-col items-center gap-2 py-4 px-1 rounded-2xl bg-gray-50 hover:bg-sky-50 hover:shadow-lg hover:-translate-y-1 transition-all group border border-transparent hover:border-sky-100"
              >
                <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-600 text-center leading-tight">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}