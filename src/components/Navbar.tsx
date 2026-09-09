"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react";

const categories = [
  { href: "/yemek", label: "🍽️ Yemek" },
  { href: "/market", label: "🛒 Market" },
  { href: "/tekne", label: "⛵ Tekne Turu" },
  { href: "/konaklama", label: "🏨 Konaklama" },
  { href: "/yerel", label: "🐟 Yerel Ürünler" },
  { href: "/hizmetler", label: "💈 Hizmetler" },
  { href: "/etkinlikler", label: "🎭 Etkinlikler" },
  { href: "/isletmeler", label: "🏪 Tüm İşletmeler" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      {/* Üst bilgi şeridi */}
      {bannerVisible && (
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white text-sm text-center py-2 px-4 font-medium relative">
          🎉 ErdekOnline&apos;a hoş geldiniz! Erdek&apos;in ilk dijital platformu şimdi yayında.
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            aria-label="Kapat"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Ana navbar */}
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between gap-4 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="Erdek Online Logo" width={52} height={52} className="rounded-full" priority />
          <div className="leading-none">
            <div className="font-black text-2xl tracking-tight leading-none">
              <span className="text-orange-500">Erdek</span><span className="text-sky-500">Online</span>
            </div>
            <div className="text-[11px] font-bold text-orange-400 uppercase tracking-[0.2em] mt-0.5">Erdek Bir Tık Uzağında</div>
          </div>
        </Link>

        {/* Kategori menüsü — masaüstü */}
        <div className="hidden md:flex items-center relative">
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="flex items-center gap-1.5 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full border border-gray-200 hover:border-sky-300 hover:text-sky-600 transition-colors"
          >
            <span>Kategoriler</span>
            <ChevronDown size={15} className={`transition-transform ${catOpen ? "rotate-180" : ""}`} />
          </button>
          {catOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
              {categories.map((cat) => (
                <Link key={cat.href} href={cat.href} onClick={() => setCatOpen(false)}
                  className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors font-medium">
                  {cat.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sağ butonlar */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/sepet" className="relative text-gray-600 hover:text-sky-600 transition-colors p-2">
            <ShoppingCart size={24} />
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">0</span>
          </Link>
          <Link href="/giris" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-sky-600 transition-colors border border-gray-200 px-4 py-2 rounded-full hover:border-sky-300">
            <User size={16} /> Giriş Yap
          </Link>
          <Link href="/isletme-kayit" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-full transition-colors shadow-md shadow-orange-200">
            İşletme Ol
          </Link>
        </div>

        {/* Mobil hamburger */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobil menü */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Kategoriler</p>
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href}
              className="flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 rounded-xl font-medium transition-colors"
              onClick={() => setMobileOpen(false)}>
              {cat.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-3 pt-3 flex flex-col gap-2">
            <Link href="/giris" className="flex items-center gap-3 text-gray-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
              <User size={18} /> Giriş Yap / Kayıt Ol
            </Link>
            <Link href="/sepet" className="flex items-center gap-3 text-gray-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
              <ShoppingCart size={18} /> Sepetim (0)
            </Link>
            <Link href="/isletme-kayit" className="bg-orange-500 text-white text-center font-bold text-sm px-4 py-3 rounded-full mt-1" onClick={() => setMobileOpen(false)}>
              İşletmeni Kaydet
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}