import Link from "next/link";
import { ArrowLeft, Star, Clock, Phone, MapPin, Tag } from "lucide-react";

const isletmeler: Record<string, { isim: string; kategori: string; puan: number; sure: string; minSiparis: string; emoji: string; renk: string; adres: string; telefon: string; aciklama: string; etiketler: string[] }> = {
  "1": { isim: "Kalamar Balık Restaurant", kategori: "Balık & Deniz Ürünleri", puan: 4.9, sure: "25-40 dk", minSiparis: "150 TL", emoji: "🐟", renk: "bg-blue-100", adres: "Sahil Caddesi No:12, Erdek", telefon: "+90 532 000 0001", aciklama: "Erdek'in en taze deniz ürünleri ve balıklarını en iyi meze çeşitleriyle sunuyoruz.", etiketler: ["Taze Balık", "Deniz Ürünleri", "Meze", "Izgara"] },
  "2": { isim: "Erdek Pide & Lahmacun", kategori: "Pide & Lahmacun", puan: 4.7, sure: "20-35 dk", minSiparis: "80 TL", emoji: "🍕", renk: "bg-orange-100", adres: "Çarşı Mah. No:5, Erdek", telefon: "+90 532 000 0002", aciklama: "Taş fırında pişmiş geleneksel pideler ve lahmacunlar.", etiketler: ["Pide", "Lahmacun", "Fırın", "Kahvaltı"] },
  "3": { isim: "Şevket Market", kategori: "Market & Bakkal", puan: 4.6, sure: "15-25 dk", minSiparis: "50 TL", emoji: "🛒", renk: "bg-green-100", adres: "Bağlarbaşı Mah. No:8, Erdek", telefon: "+90 532 000 0003", aciklama: "Gıda, içecek ve temizlik ürünleri hızlı teslimat.", etiketler: ["Gıda", "İçecek", "Temizlik", "Atıştırmalık"] },
  "4": { isim: "Erdek Burger & Döner", kategori: "Burger & Fast Food", puan: 4.5, sure: "20-30 dk", minSiparis: "100 TL", emoji: "🍔", renk: "bg-yellow-100", adres: "Merkez Mah. No:3, Erdek", telefon: "+90 532 000 0004", aciklama: "El yapımı burgerler ve döner çeşitleri.", etiketler: ["Burger", "Döner", "Sandviç", "Fast Food"] },
  "5": { isim: "Tatlı Dükkanı Erdek", kategori: "Tatlı & Pasta", puan: 4.8, sure: "30-45 dk", minSiparis: "120 TL", emoji: "🍰", renk: "bg-pink-100", adres: "Sahil Caddesi No:28, Erdek", telefon: "+90 532 000 0005", aciklama: "El yapımı pastalar, tatlılar ve dondurma çeşitleri.", etiketler: ["Baklava", "Pasta", "Dondurma", "Çikolata"] },
  "6": { isim: "Yerel Köy Ürünleri", kategori: "Yerel & Organik", puan: 4.9, sure: "Aynı Gün", minSiparis: "200 TL", emoji: "🫒", renk: "bg-lime-100", adres: "Yaylacık Köyü, Erdek", telefon: "+90 532 000 0006", aciklama: "Erdek yöresi doğal zeytinyağı, zeytin, peynir ve bal.", etiketler: ["Zeytin", "Peynir", "Bal", "Zeytinyağı"] },
};

export default function IsletmeDetayPage({ params }: { params: { id: string } }) {
  const b = isletmeler[params.id];
  if (!b) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">İşletme Bulunamadı</h1>
          <Link href="/isletmeler" className="text-sky-600 hover:underline font-medium">Tüm İşletmelere Dön</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/isletmeler" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <span className="text-gray-900 font-semibold text-sm truncate">{b.isim}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className={`${b.renk} rounded-3xl h-56 flex items-center justify-center mb-6`}>
          <span className="text-9xl">{b.emoji}</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          <h1 className="text-2xl font-black text-gray-900 mb-1">{b.isim}</h1>
          <p className="text-gray-500 text-sm mb-4">{b.kategori}</p>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-1 text-sm"><Star size={15} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{b.puan}</span></div>
            <div className="flex items-center gap-1 text-sm text-gray-500"><Clock size={15} />{b.sure}</div>
            <div className="flex items-center gap-1 text-sm text-gray-500"><Tag size={15} />Min: {b.minSiparis}</div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{b.aciklama}</p>
          <div className="flex flex-wrap gap-2">
            {b.etiketler.map((e) => (
              <span key={e} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">{e}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          <h2 className="font-black text-gray-900 mb-4">İletişim & Konum</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600"><Phone size={16} className="text-sky-500 shrink-0" /><a href={`tel:${b.telefon}`} className="text-sky-600 hover:underline font-medium">{b.telefon}</a></div>
            <div className="flex items-start gap-3 text-sm text-gray-600"><MapPin size={16} className="text-sky-500 shrink-0 mt-0.5" /><span>{b.adres}</span></div>
          </div>
        </div>

        <a href={`tel:${b.telefon}`}
          className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl text-center text-lg transition-colors">
          📞 Şimdi Sipariş Ver / Ara
        </a>

        <p className="text-center text-gray-400 text-xs mt-4">
          Online sipariş sistemi yakında aktif olacak.
        </p>
      </div>
    </main>
  );
}