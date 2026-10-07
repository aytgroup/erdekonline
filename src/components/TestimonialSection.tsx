"use client";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const yorumlar = [
  { id:1, isim:"Ayse K.", sehir:"Istanbul", puan:5, yorum:"Yaz tatilinde Erdek'te kaldim. Kalamar Balik'tan siparis verdim, gercekten muhtesemdi. Hem hizli hem lezzetli!", isletme:"Kalamar Balik Restaurant", emoji:"🐟", tarih:"Agustos 2026" },
  { id:2, isim:"Mehmet Y.", sehir:"Ankara", puan:5, yorum:"ErdekOnline sayesinde tatil planimi kolayca yaptim. Tekne turu rezervasyonunu buradan yaptim, harika bir deneyimdi.", isletme:"Erdek Mavi Tur", emoji:"⛵", tarih:"Temmuz 2026" },
  { id:3, isim:"Zeynep A.", sehir:"Bursa", puan:5, yorum:"Yerel urunler bolumu inanilmaz! Zeytinyagi ve bal siparis ettim, eve kadar geldi. Erdek'in tadini Istanbul'da yasiyorum.", isletme:"Yerel Koy Urunleri", emoji:"🫒", tarih:"Eylul 2026" },
  { id:4, isim:"Ali R.", sehir:"Izmir", puan:5, yorum:"Pansiyon rezervasyonumu buradan yaptim. Cok kolay ve guvenilir. Sahil Pansiyon cok temizdi, tavsiye ederim.", isletme:"Erdek Sahil Pansiyon", emoji:"🏨", tarih:"Agustos 2026" },
  { id:5, isim:"Fatma S.", sehir:"Erdek", puan:5, yorum:"Erdekliyim ama ErdekOnline'i cok sevdim. Artik marketten siparis veriyorum, eve 20 dakikada geliyor. Harika!", isletme:"Sevket Market", emoji:"🛒", tarih:"Eylul 2026" },
];

export default function TestimonialSection() {
  const [aktif, setAktif] = useState(0);
  const onceki = () => setAktif(a=>(a-1+yorumlar.length)%yorumlar.length);
  const sonraki = () => setAktif(a=>(a+1)%yorumlar.length);
  const y = yorumlar[aktif];

  return (
    <section className="w-full bg-gradient-to-br from-sky-50 to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-yellow-100 text-yellow-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-3">Kullanici Yorumlari</span>
          <h2 className="text-3xl font-black text-gray-900">Musterilerimiz Ne Diyor?</h2>
        </div>
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 relative">
          <div className="flex gap-1 mb-6 justify-center">
            {[1,2,3,4,5].map(s=><Star key={s} size={20} className="text-yellow-400 fill-yellow-400"/>)}
          </div>
          <blockquote className="text-xl md:text-2xl font-semibold text-gray-800 text-center mb-8 leading-relaxed">
            &ldquo;{y.yorum}&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-sky-400 rounded-full flex items-center justify-center text-2xl">{y.emoji}</div>
            <div>
              <p className="font-black text-gray-900">{y.isim}</p>
              <p className="text-gray-400 text-sm">{y.sehir} — {y.isletme}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={onceki} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"><ChevronLeft size={18}/></button>
            <div className="flex gap-2">
              {yorumlar.map((_,i)=><button key={i} onClick={()=>setAktif(i)} className={`w-2 h-2 rounded-full transition-all ${i===aktif?"bg-orange-500 w-6":"bg-gray-200"}`}/>)}
            </div>
            <button onClick={sonraki} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"><ChevronRight size={18}/></button>
          </div>
        </div>
      </div>
    </section>
  );
}
