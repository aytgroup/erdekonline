"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Users, Clock, Phone, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useToast } from "@/components/Toast";
import { dinamikIsletmeleriGetir, type Isletme } from "@/lib/veri";

const kategoriler = ["Tumu","Tam Gun","Yarim Gun","Aksam"];

export default function TeknePage() {
  const [aktif,setAktif] = useState("Tumu");
  const [favoriler,setFavoriler] = useState<string[]>([]);
  const [liste,setListe] = useState<Isletme[]>([]);
  const {goster,ToastContainer} = useToast();

  useEffect(()=>{
    setListe(dinamikIsletmeleriGetir().filter(i=>i.katKey==="Tekne"));
    try{const r=localStorage.getItem("eo_favoriler");setFavoriler(r?JSON.parse(r):[]);}catch{setFavoriler([]);}
  },[]);

  function fav(e:React.MouseEvent,id:number){
    e.preventDefault();e.stopPropagation();
    const sid=String(id),ek=!favoriler.includes(sid);
    const y=ek?[...favoriler,sid]:favoriler.filter(f=>f!==sid);
    setFavoriler(y);localStorage.setItem("eo_favoriler",JSON.stringify(y));
    goster(ek?"Favorilere eklendi!":"Favorilerden kaldirildi",ek?"success":"info");
  }

  const filtreli=liste.filter(b=>aktif==="Tumu"||b.kategori.toLowerCase().includes(aktif.toLowerCase())||b.sure.toLowerCase().includes(aktif.toLowerCase()));

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar/>
      <div className="bg-white border-b shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600"><ArrowLeft size={22}/></Link>
          <div><h1 className="text-2xl font-black text-gray-900">Tekne Turlari</h1><p className="text-gray-500 text-sm">Erdek&apos;in mavi sularinda unutulmaz turlar</p></div>
        </div>
      </div>
      <div className="bg-white border-b px-4 py-3 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto">
          {kategoriler.map(k=>(
            <button key={k} onClick={()=>setAktif(k)} className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${aktif===k?"bg-sky-500 text-white border-sky-500":"bg-white text-gray-600 border-gray-200 hover:border-sky-300"}`}>{k}</button>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8 w-full">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8 text-sm text-blue-700 font-medium">Sezon: Mayis - Ekim</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtreli.map(b=>(
            <div key={b.id} className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
              <button onClick={e=>fav(e,b.id)} className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50">
                <Heart size={16} className={favoriler.includes(String(b.id))?"fill-red-500 text-red-500":"text-gray-400"}/>
              </button>
              <Link href={`/isletme/${b.id}`}>
                <div className={`h-44 bg-gradient-to-br ${b.gradient} flex items-center justify-center relative`}>
                  <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
                  {b.fiyatGoster&&<span className="absolute bottom-2 right-2 bg-white/90 text-sky-700 text-xs font-black px-2 py-0.5 rounded-full">{b.fiyatGoster}</span>}
                  {b.badge&&<span className={`absolute top-3 left-3 ${b.badgeRenk} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>{b.badge}</span>}
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">{b.kategori}</span>
                  <h3 className="font-bold text-gray-900 text-base mt-2 mb-1 group-hover:text-sky-600">{b.isim}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400"/><span className="font-bold text-gray-700">{b.puan>0?b.puan:"Yeni"}</span></span>
                    {b.kapasite&&<span className="flex items-center gap-1"><Users size={13}/>{b.kapasite}</span>}
                    <span className="flex items-center gap-1"><Clock size={13}/>{b.sure}</span>
                  </div>
                </div>
              </Link>
              <div className="px-5 pb-4">
                <a href={`tel:${b.telefon}`} className="flex items-center justify-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold py-2.5 rounded-xl transition-colors w-full">
                  <Phone size={14}/> Rezervasyon
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-black text-gray-900 mb-2">Tekne Turunuzu Ekleyin!</h2>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-full transition-colors">Ucretsiz Ekle</Link>
        </div>
      </div>
      {ToastContainer}<Footer/><WhatsAppButton/>
    </main>
  );
}

﻿
