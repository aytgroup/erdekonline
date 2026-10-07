"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Bell } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const etkinlikler = [
  { id:1, baslik:"Erdek Deniz Festivali", tarih:"20 Temmuz 2026", konum:"Erdek Limani", emoji:"🎭", gradient:"from-blue-400 to-cyan-300", kategori:"Festival", aciklama:"Erdek'in en buyuk yillik festivali. Konserler ve eglence dolu 3 gun." },
  { id:2, baslik:"Zeytinyagi Gunleri", tarih:"Ekim 2026", konum:"Erdek Meydani", emoji:"🫒", gradient:"from-green-400 to-lime-300", kategori:"Fuar", aciklama:"Yerel zeytinyagi ureticilerinin bir araya geldigi lezzet fuari." },
  { id:3, baslik:"Erdek Yelken Yarislari", tarih:"Agustos 2026", konum:"Erdek Sahili", emoji:"⛵", gradient:"from-sky-400 to-blue-300", kategori:"Spor", aciklama:"Marmara'nin en guzel koylarinda yelken yarismasi." },
  { id:4, baslik:"Balik Festivali", tarih:"Eylul 2026", konum:"Erdek Meydani", emoji:"🐟", gradient:"from-orange-400 to-amber-300", kategori:"Festival", aciklama:"Taze balik ve deniz kulturu etrafinda sekillenen yillik festival." },
  { id:5, baslik:"Kultur ve Sanat Gunleri", tarih:"Kasim 2026", konum:"Erdek Kultur Merkezi", emoji:"🎨", gradient:"from-purple-400 to-pink-300", kategori:"Kultur", aciklama:"Sergiler, tiyatro gosterileri ve atolye calismalarla dolu gunler." },
  { id:6, baslik:"Tekne Yarisi", tarih:"Haziran 2026", konum:"Erdek Koyu", emoji:"🚤", gradient:"from-teal-400 to-cyan-300", kategori:"Spor", aciklama:"Yillik tekne yarisi etkinligi." },
];

const kategoriler = ["Tumu","Festival","Fuar","Spor","Kultur"];
const kRenk: Record<string,string> = {
  Festival:"text-blue-600 bg-blue-50 border-blue-200",
  Fuar:"text-green-600 bg-green-50 border-green-200",
  Spor:"text-orange-600 bg-orange-50 border-orange-200",
  Kultur:"text-purple-600 bg-purple-50 border-purple-200",
};

export default function EtkinliklerPage() {
  const [aktif,setAktif] = useState("Tumu");
  const [hatir,setHatir] = useState<number[]>([]);
  const filtreli = etkinlikler.filter(e=>aktif==="Tumu"||e.kategori===aktif);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar/>
      <div className="bg-white border-b shadow-sm px-4 py-5">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600"><ArrowLeft size={22}/></Link>
          <div><h1 className="text-2xl font-black text-gray-900">Etkinlikler</h1><p className="text-gray-500 text-sm">Erdek&apos;teki etkinlikler</p></div>
        </div>
      </div>
      <div className="bg-white border-b px-4 py-3 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto">
          {kategoriler.map(k=><button key={k} onClick={()=>setAktif(k)} className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${aktif===k?"bg-sky-500 text-white border-sky-500":"bg-white text-gray-600 border-gray-200 hover:border-sky-300"}`}>{k}</button>)}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8 w-full">
        {filtreli.length===0&&<div className="text-center py-16"><button onClick={()=>setAktif("Tumu")} className="text-sky-600 font-bold text-sm hover:underline">Filtreleri Temizle</button></div>}
        <div className="flex flex-col gap-4 mb-12">
          {filtreli.map(e=>(
            <div key={e.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
              <div className="flex flex-col sm:flex-row">
                <div className={`sm:w-44 h-36 sm:h-auto bg-gradient-to-br ${e.gradient} flex items-center justify-center shrink-0`}>
                  <span className="text-5xl group-hover:scale-110 transition-transform">{e.emoji}</span>
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${kRenk[e.kategori]||"text-gray-600 bg-gray-50 border-gray-200"}`}>{e.kategori}</span>
                      <button onClick={()=>setHatir(p=>p.includes(e.id)?p.filter(x=>x!==e.id):[...p,e.id])} className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${hatir.includes(e.id)?"bg-sky-500 text-white border-sky-500":"bg-white text-gray-500 border-gray-200 hover:border-sky-300"}`}>
                        <Bell size={12}/>{hatir.includes(e.id)?"Kuruldu":"Hatirlatma"}
                      </button>
                    </div>
                    <h3 className="font-black text-gray-900 text-lg mb-1 group-hover:text-sky-600">{e.baslik}</h3>
                    <p className="text-gray-500 text-sm mb-3">{e.aciklama}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5"><Calendar size={13} className="text-sky-400"/><b className="font-semibold text-gray-700">{e.tarih}</b></span>
                    <span className="flex items-center gap-1.5"><MapPin size={13} className="text-sky-400"/>{e.konum}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-black text-gray-900 mb-2">Etkinlik Duyurun!</h2>
          <Link href="/destek" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-full">Iletisime Gec</Link>
        </div>
      </div>
      <Footer/><WhatsAppButton/>
    </main>
  );
}

