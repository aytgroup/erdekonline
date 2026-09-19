"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Bell } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const etkinlikler = [
  { id: 1, baslik: "Erdek Deniz Festivali", tarih: "20 Temmuz 2026", ay: "Temmuz", konum: "Erdek Limanı", emoji: "🎭", renk: "bg-blue-100", kategori: "Festival", aciklama: "Erdek'in en büyük yıllık festivali. Konserler, yarışmalar ve eğlence dolu 3 gün." },
  { id: 2, baslik: "Zeytinyağı Günleri", tarih: "Ekim 2026", ay: "Ekim", konum: "Erdek Meydanı", emoji: "🫒", renk: "bg-green-100", kategori: "Fuar", aciklama: "Yerel zeytinyağı üreticilerinin bir araya geldiği lezzet ve kültür fuarı." },
  { id: 3, baslik: "Erdek Yelken Yarışları", tarih: "Ağustos 2026", ay: "Ağustos", konum: "Erdek Sahili", emoji: "⛵", renk: "bg-sky-100", kategori: "Spor", aciklama: "Marmara'nın en güzel koylarında gerçekleşen yelken yarışmaları." },
  { id: 4, baslik: "Balık Festivali", tarih: "Eylül 2026", ay: "Eylül", konum: "Erdek Meydanı", emoji: "🐟", renk: "bg-orange-100", kategori: "Festival", aciklama: "Taze balık, mezelar ve deniz kültürü etrafında şekillenen yıllık festival." },
  { id: 5, baslik: "Kültür & Sanat Günleri", tarih: "Kasım 2026", ay: "Kasım", konum: "Erdek Kültür Merkezi", emoji: "🎨", renk: "bg-purple-100", kategori: "Kültür", aciklama: "Sergiler, tiyatro gösterileri ve atölye çalışmalarıyla dolu kültür günleri." },
];

const kategoriler = ["Tümü", "Festival", "Fuar", "Spor", "Kültür"];
const kategoriRenk: Record<string, string> = {
  Festival: "text-blue-600 bg-blue-50",
  Fuar: "text-green-600 bg-green-50",
  Spor: "text-sky-600 bg-sky-50",
  Kültür: "text-purple-600 bg-purple-50",
};

export default function EtkinliklerPage() {
  const [aktif, setAktif] = useState("Tümü");
  const [acikId, setAcikId] = useState<number | null>(null);
  const liste = etkinlikler.filter(e => aktif === "Tümü" || e.kategori === aktif);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">🎭 Etkinlikler</h1>
            <p className="text-gray-500 text-sm">{liste.length} etkinlik listeleniyor</p>
          </div>
        </div>
      </div>
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto">
          {kategoriler.map(k => (
            <button key={k} onClick={() => setAktif(k)}
              className={`shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all ${aktif === k ? "bg-purple-500 text-white border-purple-500" : "bg-white text-gray-600 border-gray-200 hover:border-purple-300"}`}>
              {k}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8 w-full">
        <div className="flex flex-col gap-4 mb-8">
          {liste.map((e) => (
            <div key={e.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 flex items-center gap-5 cursor-pointer" onClick={() => setAcikId(acikId === e.id ? null : e.id)}>
                <div className={`${e.renk} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0`}>{e.emoji}</div>
                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${kategoriRenk[e.kategori] || "text-gray-600 bg-gray-50"}`}>{e.kategori}</span>
                  <h3 className="font-black text-gray-900 text-base mt-1">{e.baslik}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                    <div className="flex items-center gap-1"><Calendar size={13} />{e.tarih}</div>
                    <div className="flex items-center gap-1"><MapPin size={13} />{e.konum}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end shrink-0">
                  <a href={`https://wa.me/902668350000?text=Merhaba%2C%20${encodeURIComponent(e.baslik)}%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`}
                    target="_blank" rel="noopener noreferrer" onClick={ev => ev.stopPropagation()}
                    className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors hidden sm:flex items-center gap-1">
                    📲 Bilgi Al
                  </a>
                  <span className="text-gray-400 text-xs flex items-center gap-1"><Bell size={11} /> Hatırlat</span>
                </div>
              </div>
              {acikId === e.id && (
                <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{e.aciklama}</p>
                  <div className="flex gap-3">
                    <a href={`https://wa.me/902668350000?text=Merhaba%2C%20${encodeURIComponent(e.baslik)}%20hakk%C4%B1nda%20bilgi%20istiyorum.`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2.5 rounded-xl transition-colors">
                      WhatsApp ile Bilgi Al
                    </a>
                    <a href="mailto:info@erdekonline.com"
                      className="flex-1 text-center bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold py-2.5 rounded-xl transition-colors">
                      E-posta Gönder
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Takvim Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-6 mb-8 text-white">
          <h2 className="font-black text-lg mb-4">📅 2026 Etkinlik Takvimi</h2>
          <div className="grid grid-cols-5 gap-2">
            {["Temmuz","Ağustos","Eylül","Ekim","Kasım"].map(ay => {
              const var_ = etkinlikler.filter(e => e.ay === ay).length;
              return (
                <div key={ay} className={`rounded-xl p-3 text-center ${var_ > 0 ? "bg-white/20" : "bg-white/10 opacity-60"}`}>
                  <p className="text-xs font-semibold text-white/80">{ay}</p>
                  <p className="text-xl font-black">{var_ > 0 ? var_ : "—"}</p>
                  <p className="text-xs text-white/70">{var_ > 0 ? "etkinlik" : "boş"}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">📣</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Etkinlik Duyurun!</h2>
          <p className="text-gray-500 text-sm mb-4">Erdek&apos;teki etkinliğinizi binlerce kişiye duyurun.</p>
          <a href="mailto:info@erdekonline.com" className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
            Etkinlik Bildir →
          </a>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}