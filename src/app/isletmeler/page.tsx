import Link from "next/link";
import { ArrowLeft, Star, Clock } from "lucide-react";

const tumIsletmeler = [
  { id: 1, isim: "Kalamar Balık Restaurant", kategori: "🍽️ Yemek", puan: 4.9, sure: "25-40 dk", emoji: "🐟", renk: "bg-blue-100" },
  { id: 2, isim: "Erdek Pide & Lahmacun", kategori: "🍽️ Yemek", puan: 4.7, sure: "20-35 dk", emoji: "🍕", renk: "bg-orange-100" },
  { id: 3, isim: "Şevket Market", kategori: "🛒 Market", puan: 4.6, sure: "15-25 dk", emoji: "🛒", renk: "bg-green-100" },
  { id: 4, isim: "Erdek Burger & Döner", kategori: "🍽️ Yemek", puan: 4.5, sure: "20-30 dk", emoji: "🍔", renk: "bg-yellow-100" },
  { id: 5, isim: "Tatlı Dükkanı Erdek", kategori: "🍽️ Yemek", puan: 4.8, sure: "30-45 dk", emoji: "🍰", renk: "bg-pink-100" },
  { id: 6, isim: "Yerel Köy Ürünleri", kategori: "🐟 Yerel", puan: 4.9, sure: "Aynı Gün", emoji: "🫒", renk: "bg-lime-100" },
];

export default function IsletmelerPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">🏪 Tüm İşletmeler</h1>
            <p className="text-gray-500 text-sm">Erdek&apos;in tüm işletmeleri bir arada</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tumIsletmeler.map((b) => (
            <Link key={b.id} href={`/isletme/${b.id}`}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group">
              <div className={`h-44 ${b.renk} flex items-center justify-center`}>
                <span className="text-7xl group-hover:scale-110 transition-transform">{b.emoji}</span>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">{b.kategori}</span>
                <h3 className="font-bold text-gray-900 text-base mt-2 mb-1 group-hover:text-sky-600 transition-colors">{b.isim}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{b.puan}</span></div>
                  <div className="flex items-center gap-1"><Clock size={14} />{b.sure}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🏪</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">İşletmenizi Ekleyin!</h2>
          <p className="text-gray-500 text-sm mb-4">Erdek&apos;teki işletmenizi platforma ekleyin, yeni müşteriler kazanın.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
            Ücretsiz Ekle →
          </Link>
        </div>
      </div>
    </main>
  );
}