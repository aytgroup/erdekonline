"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Phone, Clock, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useToast } from "@/components/Toast";
import { dinamikIsletmeleriGetir, type Isletme } from "@/lib/veri";

const kategoriler = ["Tumu","Kuafor","Eczane","Fotograf","Tamir"];

export default function HizmetlerPage() {
  const [aktif,setAktif] = useState("Tumu");
  const [favoriler,setFavoriler] = useState<string[]>([]);
  const [liste,setListe] = useState<Isletme[]>([]);
  const {goster,ToastContainer} = useToast();

  useEffect(()=>{
    setListe(dinamikIsletmeleriGetir().filter(i=>i.katKey==="Hizmet"));
    try{const r=localStorage.getItem("eo_favoriler");setFavoriler(r?JSON.parse(r):[]);}catch{setFavoriler([]);}
  },[]);

  function fav(e:React.MouseEvent,id:number){
    e.preventDefault();e.stopPropagation();
    const sid=String(id),ek=!favoriler.includes(sid);
    const y=ek?[...favoriler,sid]:favoriler.filter(f=>f!==sid);
    setFavoriler(y);localStorage.setItem("eo_favoriler",JSON.stringify(y));
    goster(ek?"Favorilere eklendi!":"Favorilerden kaldirildi",ek?"success":"info");
  }

  const filtreli=liste.filter(b=>aktif==="Tumu"||b.kategori.toLowerCase().includes(aktif.toLowerCase())||b.etiketler.some(e=>e.toLowerCase().includes(aktif.toLowerCase())));

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar/>
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600"><ArrowLeft size={22}/></Link>
          <div><h1 className="text-2xl font-black text-gray-900">Hizmetler</h1><p className="text-gray-500 text-sm">Kuafor, eczane, fotograf ve daha fazlasi</p></div>
        </div>
      </div>
      <div className="bg-white border-b px-4 py-3 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto pb-0.5">
          {kategoriler.map(k=>(
            <button key={k} onClick={()=>setAktif(k)} className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${aktif===k?"bg-violet-500 text-white border-violet-500":"bg-white text-gray-600 border-gray-200 hover:border-violet-300"}`}>{k}</button>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8 w-full">
        {filtreli.length===0?(
          <div className="text-center py-16">
            <p className="text-gray-500 font-medium">Bu kategoride hizmet bulunamadi.</p>
            <button onClick={()=>setAktif("Tumu")} className="mt-4 text-violet-600 font-bold text-sm hover:underline">Filtreleri Temizle</button>
          </div>
        ):(
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filtreli.map(b=>(
              <div key={b.id} className="relative">
                <button onClick={e=>fav(e,b.id)} className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50">
                  <Heart size={16} className={favoriler.includes(String(b.id))?"fill-red-500 text-red-500":"text-gray-400"}/>
                </button>
                <Link href={`/isletme/${b.id}`} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group block">
                  <div className={`h-40 bg-gradient-to-br ${b.gradient} flex items-center justify-center relative`}>
                    <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
                    {b.badge&&<span className={`absolute top-3 left-3 ${b.badgeRenk} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>{b.badge}</span>}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full">{b.kategori}</span>
                    <h3 className="font-bold text-gray-900 text-base mt-2 mb-1 group-hover:text-sky-600">{b.isim}</h3>
                    <p className="text-gray-500 text-xs mb-3 line-clamp-2">{b.aciklama}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400"/><span className="font-bold text-gray-700">{b.puan>0?b.puan:"Yeni"}</span></span>
                      {b.sure&&<span className="flex items-center gap-1"><Clock size={14}/>{b.sure}</span>}
                    </div>
                  </div>
                </Link>
                {b.telefon&&<a href={`tel:${b.telefon}`} className="mx-4 mb-4 flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600 text-white text-sm font-bold py-2.5 rounded-xl transition-colors"><Phone size={14}/> Ara</a>}
              </div>
            ))}
          </div>
        )}
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-black text-gray-900 mb-2">Hizmetinizi Ekleyin!</h2>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white font-bold px-6 py-3 rounded-full">Ucretsiz Ekle</Link>
        </div>
      </div>
      {ToastContainer}<Footer/><WhatsAppButton/>
    </main>
  );
}
