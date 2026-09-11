import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Etkinlikler | ErdekOnline",
  description: "Erdek'teki festival, fuar ve etkinlikler. Deniz festivali, zeytinyağı günleri ve daha fazlası.",
};

const etkinlikler = [
  { id: 1, baslik: "Erdek Deniz Festivali", tarih: "15 Temmuz 2026", konum: "Erdek Limanı", emoji: "🎭", renk: "bg-blue-100", kategori: "Festival" },
  { id: 2, baslik: "Zeytinyağı Günleri", tarih: "Ekim 2026", konum: "Erdek Meydanı", emoji: "🫒", renk: "bg-green-100", kategori: "Fuar" },
  { id: 3, baslik: "Erdek Yarışları", tarih: "Ağustos 2026", konum: "Sahil", emoji: "⛵", renk: "bg-sky-100", kategori: "Spor" },
];

export default function EtkinliklerPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">🎭 Etkinlikler</h1>
            <p className="text-gray-500 text-sm">Erdek&apos;te neler oluyor?</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 mb-12">
          {etkinlikler.map((e) => (
            <div key={e.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className={`${e.renk} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0`}>{e.emoji}</div>
              <div className="flex-1">
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">{e.kategori}</span>
                <h3 className="font-black text-gray-900 text-lg mt-1">{e.baslik}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center gap-1"><Calendar size={14} />{e.tarih}</div>
                  <div className="flex items-center gap-1"><MapPin size={14} />{e.konum}</div>
                </div>
              </div>
            </div>
          ))}
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