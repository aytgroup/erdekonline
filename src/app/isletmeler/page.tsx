"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Clock, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { dinamikIsletmeleriGetir, type Isletme } from "@/lib/veri";

const kategoriler = [
  { key:"Tumu", label:"Tumu" },
  { key:"Yemek", label:"Yemek" },
  { key:"Market", label:"Market" },
  { key:"Tekne", label:"Tekne" },
  { key:"Konaklama", label:"Konaklama" },
  { key:"Yerel", label:"Yerel" },
  { key:"Hizmet", label:"Hizmet" },
];

export default function IsletmelerPage() {
  const [aktifKat,setAktifKat] = useState("Tumu");
  const [arama,setArama] = useState("");
  const [siralama,setSiralama] = useState("puan");
  const [tumIsletmeler,setTumIsletmeler] = useState<Isletme[]>([]);

  useEffect(()=>{ setTumIsletmeler(dinamikIsletmeleriGetir()); },[]);

  const filtrelenmis = useMemo(()=>{
    let liste = aktifKat==="Tumu" ? tumIsletmeler : tumIsletmeler.filter(b=>b.katKey===aktifKat);
    if(arama.trim()) liste = liste.filter(b=>b.isim.toLowerCase().includes(arama.toLowerCase())||b.kategori.toLowerCase().includes(arama.toLowerCase()));
    if(siralama==="puan") return [...liste].sort((a,b)=>b.puan-a.puan);
    return [...liste].sort((a,b)=>a.isim.localeCompare(b.isim));
  },[tumIsletmeler,aktifKat,arama,siralama]);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar/>
      <div className="bg-white border-b shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600"><ArrowLeft size={22}/></Link>
          <div><h1 className="text-2xl font-black text-gray-900">Tum Isletmeler</h1><p className="text-gray-500 text-sm">{filtrelenmis.length} isletme</p></div>
        </div>
      </div>
      <div className="bg-white border-b px-4 py-3 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center gap-3 mb-2">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-sky-400">
            <Search size={16} className="text-gray-400"/>
            <input type="text" placeholder="Isletme ara..." value={arama} onChange={e=>setArama(e.target.value)} className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"/>
          </div>
          <select value={siralama} onChange={e=>setSiralama(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-sky-400 bg-white text-gray-700 font-medium cursor-pointer">
            <option value="puan">En Yuksek Puan</option>
            <option value="isim">Isme Gore (A-Z)</option>
          </select>
        </div>
        <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto pb-1">
          {kategoriler.map(k=>(
            <button key={k.key} onClick={()=>setAktifKat(k.key)} className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${aktifKat===k.key?"bg-sky-600 text-white border-sky-600 shadow-md":"bg-white text-gray-600 border-gray-200 hover:border-sky-300 hover:text-sky-600"}`}>
              {k.label}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8 w-full">
        {filtrelenmis.length===0?(
          <div className="text-center py-20">
            <div className="text-6xl mb-4">Sonuc yok</div>
            <button onClick={()=>{setAktifKat("Tumu");setArama("");}} className="text-sky-600 font-semibold hover:underline text-sm">Filtreleri Temizle</button>
          </div>
        ):(
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filtrelenmis.map(b=>(
              <Link key={b.id} href={`/isletme/${b.id}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                <div className={`h-44 bg-gradient-to-br ${b.gradient} flex items-center justify-center relative`}>
                  <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
                  {b.badge&&<span className={`absolute top-2.5 left-2.5 ${b.badgeRenk} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>{b.badge}</span>}
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">{b.kategori}</span>
                  <h3 className="font-bold text-gray-900 text-base mt-2 mb-1 group-hover:text-sky-600">{b.isim}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400"/><span className="font-bold text-gray-700">{b.puan>0?b.puan:"Yeni"}</span></span>
                    <span className="flex items-center gap-1"><Clock size={14}/>{b.sure}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-black text-gray-900 mb-2">Isletmenizi Ekleyin!</h2>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors">Ucretsiz Ekle</Link>
        </div>
      </div>
      <Footer/><WhatsAppButton/>
    </main>
  );
}

﻿
