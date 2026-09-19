"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart, User, ChevronDown, LogOut, Search } from "lucide-react";

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

interface Kullanici { ad: string; soyad: string; email: string; }

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [catOpen, setCatOpen] = useState(false);
  const [kullanici, setKullanici] = useState<Kullanici | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sepetAdet, setSepetAdet] = useState(0);
  const [aramaAcik, setAramaAcik] = useState(false);
  const [aramaQ, setAramaQ] = useState("");
  const userMenuRef = useRef<HTMLDivElement>(null);
  const catMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function checkUser() {
      try {
        const raw = localStorage.getItem("eo_aktif_kullanici");
        setKullanici(raw ? JSON.parse(raw) : null);
      } catch {
        setKullanici(null);
      }
    }
    function checkSepet() {
      try {
        const raw = localStorage.getItem("eo_sepet");
        const items: { adet: number }[] = raw ? JSON.parse(raw) : [];
        setSepetAdet(items.reduce((acc, i) => acc + i.adet, 0));
      } catch {
        setSepetAdet(0);
      }
    }
    checkUser();
    checkSepet();
    window.addEventListener("storage", checkUser);
    window.addEventListener("storage", checkSepet);
    window.addEventListener("eo_sepet_guncellendi", checkSepet);
    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("storage", checkSepet);
      window.removeEventListener("eo_sepet_guncellendi", checkSepet);
    };
  }, []);

  // Dışarı tıklayınca dropdown'ları kapat
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (catMenuRef.current && !catMenuRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function cikisYap() {
    localStorage.removeItem("eo_aktif_kullanici");
    setKullanici(null);
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      {bannerVisible && (
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white text-sm text-center py-2 px-4 font-medium relative">
          🎉 ErdekOnline&apos;a hoş geldiniz! Erdek&apos;in ilk dijital platformu şimdi yayında.
          <button onClick={() => setBannerVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors" aria-label="Kapat">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between gap-4 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.svg" alt="Erdek Online Logo" width={52} height={52} className="rounded-full object-contain" priority />
          <div className="leading-none">
            <div className="font-black text-2xl tracking-tight leading-none">
              <span className="text-orange-500">Erdek</span><span className="text-sky-500">Online</span>
            </div>
            <div className="text-[11px] font-bold text-orange-400 uppercase tracking-[0.2em] mt-0.5">Erdek Bir Tık Uzağında</div>
          </div>
        </Link>

        {/* Hızlı Arama – masaüstü */}
          {aramaAcik ? (
            <form onSubmit={e => { e.preventDefault(); if (aramaQ.trim()) { router.push(`/ara?q=${encodeURIComponent(aramaQ.trim())}`); setAramaAcik(false); setAramaQ(""); }}}
              className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 gap-2 focus-within:border-sky-400 transition-colors">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input autoFocus type="text" value={aramaQ} onChange={e => setAramaQ(e.target.value)}
                placeholder="İşletme ara..." className="outline-none text-sm bg-transparent text-gray-800 placeholder-gray-400 w-40" />
              <button type="button" onClick={() => { setAramaAcik(false); setAramaQ(""); }} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
            </form>
          ) : (
            <button onClick={() => setAramaAcik(true)}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-sky-600 transition-colors">
              <Search size={18} />
            </button>
          )}

          {/* Kategori menüsü – masaüstü */}
        <div className="hidden md:flex items-center relative" ref={catMenuRef}>
          <button onClick={() => setCatOpen(!catOpen)}
            className="flex items-center gap-1.5 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full border border-gray-200 hover:border-sky-300 hover:text-sky-600 transition-colors">
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
{/* Sağ butonlar – masaüstü */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/sepet" className="relative text-gray-600 hover:text-sky-600 transition-colors p-2">
            <ShoppingCart size={24} />
            {sepetAdet > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">{sepetAdet}</span>
            )}
          </Link>

          {kullanici ? (
            <div className="relative" ref={userMenuRef}>
              <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-sky-600 transition-colors border border-gray-200 px-4 py-2 rounded-full hover:border-sky-300">
                <User size={16} />
                <span>{kullanici.ad}</span>
                <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {userMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-800">{kullanici.ad} {kullanici.soyad}</p>
                    <p className="text-xs text-gray-400 truncate">{kullanici.email}</p>
                  </div>
                  <Link href="/profil" onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                    <User size={15} /> Profilim
                  </Link>
                  <Link href="/sepet" onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                    <ShoppingCart size={15} /> Sepetim
                  </Link>
                  <Link href="/siparisler" onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                    🛍️ <span>Siparişlerim</span>
                  </Link>
                  <Link href="/favoriler" onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                    ❤️ <span>Favorilerim</span>
                  </Link>
                  <button onClick={cikisYap}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium border-t border-gray-100 mt-1">
                    <LogOut size={15} /> Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/giris" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-sky-600 transition-colors border border-gray-200 px-4 py-2 rounded-full hover:border-sky-300">
              <User size={16} /> Giriş Yap
            </Link>
          )}

          <Link href="/isletme-kayit" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-full transition-colors shadow-md shadow-orange-200">
            İşletme Ol
          </Link>
        </div>

        {/* Mobil hamburger */}
        <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={() => setMobileOpen(!mobileOpen)}>
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
            {kullanici ? (
              <>
                <div className="px-3 py-2">
                  <p className="text-sm font-bold text-gray-800">{kullanici.ad} {kullanici.soyad}</p>
                  <p className="text-xs text-gray-400">{kullanici.email}</p>
                </div>
                <Link href="/profil" className="flex items-center gap-3 text-gray-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                  <User size={18} /> Profilim
                </Link>
                <Link href="/siparisler" className="flex items-center gap-3 text-gray-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                  🛍️ <span>Siparişlerim</span>
                </Link>
                <Link href="/favoriler" className="flex items-center gap-3 text-gray-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                  ❤️ <span>Favorilerim</span>
                </Link>
                <button onClick={() => { cikisYap(); setMobileOpen(false); }}
                  className="flex items-center gap-3 text-red-500 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-red-50">
                  <LogOut size={18} /> Çıkış Yap
                </button>
              </>
            ) : (
              <Link href="/giris" className="flex items-center gap-3 text-gray-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                <User size={18} /> Giriş Yap / Kayıt Ol
              </Link>
            )}
            <Link href="/sepet" className="flex items-center gap-3 text-gray-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
              <ShoppingCart size={18} /> Sepetim {sepetAdet > 0 ? `(${sepetAdet})` : ""}
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
