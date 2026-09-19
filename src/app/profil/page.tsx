"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { User, Mail, Phone, Calendar, LogOut, ShoppingBag, Heart, ArrowLeft, Lock, Eye, EyeOff, CheckCircle, Edit3, Save, X } from "lucide-react";

interface Kullanici { ad: string; soyad: string; email: string; telefon: string; kayitTarihi: string; sifre?: string; }

export default function ProfilPage() {
  const router = useRouter();
  const [kullanici, setKullanici] = useState<Kullanici | null>(null);
  const [sifrePanel, setSifrePanel] = useState(false);
  const [eskiSifre, setEskiSifre] = useState("");
  const [yeniSifre, setYeniSifre] = useState("");
  const [showEski, setShowEski] = useState(false);
  const [showYeni, setShowYeni] = useState(false);
  const [sifreMsg, setSifreMsg] = useState<{ tip: "ok" | "hata"; metin: string } | null>(null);
  const [duzenleMode, setDuzenleMode] = useState(false);
  const [duzenAd, setDuzenAd] = useState("");
  const [duzenSoyad, setDuzenSoyad] = useState("");
  const [duzenTelefon, setDuzenTelefon] = useState("");
  const [duzenMsg, setDuzenMsg] = useState<{ tip: "ok" | "hata"; metin: string } | null>(null);

  function sifreDegistir(e: React.FormEvent) {
    e.preventDefault();
    setSifreMsg(null);
    if (!eskiSifre || !yeniSifre) { setSifreMsg({ tip: "hata", metin: "Tüm alanları doldurun." }); return; }
    if (yeniSifre.length < 6) { setSifreMsg({ tip: "hata", metin: "Yeni şifre en az 6 karakter olmalı." }); return; }
    try {
      const liste: Kullanici[] = JSON.parse(localStorage.getItem("eo_kullanicilar") || "[]");
      const idx = liste.findIndex(k => k.email === kullanici?.email);
      if (idx === -1 || liste[idx].sifre !== eskiSifre) {
        setSifreMsg({ tip: "hata", metin: "Mevcut şifre yanlış." }); return;
      }
      liste[idx].sifre = yeniSifre;
      localStorage.setItem("eo_kullanicilar", JSON.stringify(liste));
      const guncel = { ...liste[idx] };
      localStorage.setItem("eo_aktif_kullanici", JSON.stringify(guncel));
      setKullanici(guncel);
      setSifreMsg({ tip: "ok", metin: "Şifreniz başarıyla güncellendi!" });
      setEskiSifre(""); setYeniSifre("");
      setTimeout(() => { setSifrePanel(false); setSifreMsg(null); }, 2000);
    } catch { setSifreMsg({ tip: "hata", metin: "Bir hata oluştu." }); }
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem("eo_aktif_kullanici");
      if (raw) setKullanici(JSON.parse(raw));
      else router.push("/giris");
    } catch { router.push("/giris"); }
  }, [router]);

  function cikisYap() {
    localStorage.removeItem("eo_aktif_kullanici");
    router.push("/");
  }

  function duzenlemeAc() {
    setDuzenAd(kullanici?.ad || "");
    setDuzenSoyad(kullanici?.soyad || "");
    setDuzenTelefon(kullanici?.telefon || "");
    setDuzenMsg(null);
    setDuzenleMode(true);
  }

  function bilgileriKaydet(e: React.FormEvent) {
    e.preventDefault();
    setDuzenMsg(null);
    if (!duzenAd.trim() || !duzenSoyad.trim()) {
      setDuzenMsg({ tip: "hata", metin: "Ad ve soyad boş bırakılamaz." }); return;
    }
    try {
      const liste: Kullanici[] = JSON.parse(localStorage.getItem("eo_kullanicilar") || "[]");
      const idx = liste.findIndex(k => k.email === kullanici?.email);
      if (idx !== -1) {
        liste[idx].ad = duzenAd.trim();
        liste[idx].soyad = duzenSoyad.trim();
        liste[idx].telefon = duzenTelefon.trim();
        localStorage.setItem("eo_kullanicilar", JSON.stringify(liste));
        localStorage.setItem("eo_aktif_kullanici", JSON.stringify(liste[idx]));
        setKullanici(liste[idx]);
      }
      setDuzenMsg({ tip: "ok", metin: "Bilgileriniz güncellendi!" });
      setTimeout(() => { setDuzenleMode(false); setDuzenMsg(null); }, 1500);
    } catch { setDuzenMsg({ tip: "hata", metin: "Bir hata oluştu." }); }
  }

  if (!kullanici) {
    return (
      <main className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Yükleniyor...</div>
        </div>
        <Footer />
      </main>
    );
  }

  const kayitTarihi = new Date(kullanici.kayitTarihi).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto w-full px-4 py-8 flex-1">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-600 text-sm font-medium mb-6 transition-colors">
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>

        {/* Profil kartı */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-10 flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/40">
              <span className="text-4xl font-black text-white">{kullanici.ad[0]}{kullanici.soyad[0]}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-white font-black text-2xl">{kullanici.ad} {kullanici.soyad}</h1>
              <p className="text-sky-200 text-sm mt-1">ErdekOnline Üyesi</p>
              <p className="text-sky-200 text-xs mt-0.5">Üyelik: {kayitTarihi}</p>
            </div>
            <button onClick={duzenlemeAc}
              className="shrink-0 flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-2 rounded-xl border border-white/30 transition-colors">
              <Edit3 size={13} /> Düzenle
            </button>
          </div>
          {/* Düzenleme Formu */}
          {duzenleMode && (
            <form onSubmit={bilgileriKaydet} className="border-b border-gray-100 px-6 py-5 bg-sky-50">
              <div className="flex items-center justify-between mb-4">
                <p className="font-bold text-gray-800 text-sm">Bilgileri Düzenle</p>
                <button type="button" onClick={() => { setDuzenleMode(false); setDuzenMsg(null); }} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
              </div>
              {duzenMsg && (
                <div className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 mb-3 ${duzenMsg.tip === "ok" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                  {duzenMsg.tip === "ok" && <CheckCircle size={15} />} {duzenMsg.metin}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Ad</label>
                  <input type="text" value={duzenAd} onChange={e => setDuzenAd(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sky-400 bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Soyad</label>
                  <input type="text" value={duzenSoyad} onChange={e => setDuzenSoyad(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sky-400 bg-white" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Telefon</label>
                  <input type="tel" value={duzenTelefon} onChange={e => setDuzenTelefon(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sky-400 bg-white" />
                </div>
              </div>
              <button type="submit" className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                <Save size={14} /> Kaydet
              </button>
            </form>
          )}
          <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                <Mail size={18} className="text-sky-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">E-posta</p>
                <p className="text-sm font-semibold text-gray-800 truncate">{kullanici.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                <Phone size={18} className="text-green-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Telefon</p>
                <p className="text-sm font-semibold text-gray-800">{kullanici.telefon}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                <Calendar size={18} className="text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Üyelik Tarihi</p>
                <p className="text-sm font-semibold text-gray-800">{kayitTarihi}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menü */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Link href="/siparisler" className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-orange-200 transition-colors">
              <ShoppingBag size={22} className="text-orange-500" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Siparişlerim</p>
              <p className="text-gray-400 text-sm">Geçmiş siparişleriniz</p>
            </div>
          </Link>
          <Link href="/favoriler" className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-red-200 transition-colors">
              <Heart size={22} className="text-red-500" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Favorilerim</p>
              <p className="text-gray-400 text-sm">Beğendiğiniz işletmeler</p>
            </div>
          </Link>
        </div>

        {/* Şifre Değiştir */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <button
            onClick={() => { setSifrePanel(!sifrePanel); setSifreMsg(null); }}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                <Lock size={18} className="text-sky-500" />
              </div>
              <span className="font-bold text-gray-900">Şifre Değiştir</span>
            </div>
            <span className="text-gray-400 text-sm">{sifrePanel ? "▲" : "▼"}</span>
          </button>
          {sifrePanel && (
            <form onSubmit={sifreDegistir} className="border-t border-gray-100 px-6 py-5 flex flex-col gap-3">
              {sifreMsg && (
                <div className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 ${sifreMsg.tip === "ok" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                  {sifreMsg.tip === "ok" && <CheckCircle size={15} />}
                  {sifreMsg.metin}
                </div>
              )}
              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-sky-400 transition-colors">
                <Lock size={15} className="text-gray-400 shrink-0" />
                <input type={showEski ? "text" : "password"} placeholder="Mevcut şifre" value={eskiSifre} onChange={e => setEskiSifre(e.target.value)}
                  className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400" />
                <button type="button" onClick={() => setShowEski(!showEski)} className="text-gray-400 hover:text-gray-600">
                  {showEski ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-sky-400 transition-colors">
                <Lock size={15} className="text-gray-400 shrink-0" />
                <input type={showYeni ? "text" : "password"} placeholder="Yeni şifre (en az 6 karakter)" value={yeniSifre} onChange={e => setYeniSifre(e.target.value)}
                  className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400" />
                <button type="button" onClick={() => setShowYeni(!showYeni)} className="text-gray-400 hover:text-gray-600">
                  {showYeni ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2.5 rounded-xl transition-colors text-sm">
                Şifreyi Güncelle
              </button>
            </form>
          )}
        </div>

        {/* Çıkış */}
        <button onClick={cikisYap}
          className="w-full bg-white border border-red-100 text-red-500 hover:bg-red-50 font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2">
          <LogOut size={18} /> Çıkış Yap
        </button>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}