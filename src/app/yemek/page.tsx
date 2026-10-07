"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Star, Heart } from "lucide-react";
import { dinamikIsletmeleriGetir, type Isletme } from "@/lib/veri";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useToast } from "@/components/Toast";

const filtreler = ["Tümü","Balık","Pide","Fast Food","Tatlı"];

export default function YemekPage() {
  const [aktif,setAktif] = useState("Tümü");
  const [siralama,setSiralama] = useState<"puan"|"sure">("puan");
  const [favoriler,setFavoriler] = useState<string[]>([]);
  const [tumIsletmeler,setTumIsletmeler] = useState<Isletme[]>([]);
  const { goster, ToastContainer } = useToast();

  useEffect(() => {
    setTumIsletmeler(dinamikIsletmeleriGetir().filter(i => i.katKey === "Yemek"));
    try { const r = localStorage.getItem("eo_favoriler"); setFavoriler(r ? JSON.parse(r) : []); }
    catch { setFavoriler([]); }
  }, []);

  function favoriToggle(e: React.MouseEvent, id: number) {
    e.preventDefault(); e.stopPropagation();
    const sid = String(id), eklendi = !favoriler.includes(sid);
    const yeni = eklendi ? [...favoriler, sid] : favoriler.filter(f => f !== sid);
    setFavoriler(yeni);
    localStorage.setItem("eo_favoriler", JSON.stringify(yeni));
    goster(eklendi ? "❤️ Favorilere eklendi!" : "Favorilerden kaldırıldı", eklendi ? "success" : "info");
  }

  const liste = tumIsletmeler
    .filter(b => aktif === "Tümü" || b.kategori.toLowerCase().includes(aktif.toLowerCase()) || b.etiketler.some(e => e.toLowerCase().includes(aktif.toLowerCase())))
    .sort((a,b) => siralama === "puan" ? b.puan - a.puan : a.sure.localeCompare(b.sure));

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar/>
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600"><ArrowLeft size={22}/></Link>
          <div><h1 className="text-2xl font-black text-gray-900">🍽️ Yemek Siparişi</h1><p className="text-gray-500 text-sm">{liste.length} restoran</p></div>
        </div>
      </div>
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {filtreler.map(f=><button key={f} onClick={()=>setAktif(f)} className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${ aktif===f ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}>{f}</button>)}
          </div>
          <select value={siralama} onChange={e=>setSiralama(e.target.value as "puan"|"sure")} className="shrink-0 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium outline-none bg-white text-gray-700 cursor-pointer">
            <option value="puan">En Yüksek Puan</option>
            <option value="sure">En Hızlı</option>
          </select>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8 w-full">
        {liste.length === 0 ? (
          <div className="text-center py-16"><div className="text-5xl mb-3">🍽️</div><p className="text-gray-500 font-medium">Sonuç bulunamadı.</p><button onClick={()=>setAktif("Tümü")} className="mt-4 text-orange-600 font-bold text-sm hover:underline">Temizle</button></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {liste.map(b => (
              <div key={b.id} className="relative">
                <button onClick={e=>favoriToggle(e,b.id)} className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50">
                  <Heart size={16} className={favoriler.includes(String(b.id)) ? "fill-red-500 text-red-500" : "text-gray-400"}/>
                </button>
                <Link href={`/isletme/${b.id}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group block">
                  <div className={`h-44 bg-gradient-to-br ${b.gradient} flex items-center justify-center relative`}>
                    <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
                    {b.badge && <span className={`absolute top-3 left-3 ${b.badgeRenk} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>{b.badge}</span>}
                    {b.indirim && <span className="absolute top-3 right-10 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{b.indirim}</span>}
                    {b.minSiparis && <span className="absolute bottom-2 right-2 bg-white/90 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">Min. {b.minSiparis}</span>}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{b.kategori}</span>
                    <h3 className="font-bold text-gray-900 text-base mt-2 mb-1 group-hover:text-sky-600">{b.isim}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400"/><span className="font-bold text-gray-700">{b.puan > 0 ? b.puan : "Yeni"}</span></span>
                      <span className="flex items-center gap-1"><Clock size={14}/>{b.sure}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="mt-12 bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🏪</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Restoranınız Burada Olsun!</h2>
          <p className="text-gray-500 text-sm mb-4">Erdek&apos;teki restoranınızı platforma ekleyin.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors">Ücretsiz Ekle →</Link>
        </div>
      </div>
      {ToastContainer}<Footer/><WhatsAppButton/>
    </main>
  );
}