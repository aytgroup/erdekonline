import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const kategoriler = [
  { emoji: "💈", isim: "Kuaför & Güzellik", renk: "bg-pink-100", href: "#" },
  { emoji: "🔧", isim: "Tadilat & Tamir", renk: "bg-gray-100", href: "#" },
  { emoji: "💊", isim: "Eczane", renk: "bg-green-100", href: "#" },
  { emoji: "🚗", isim: "Araç Kiralama", renk: "bg-blue-100", href: "#" },
  { emoji: "🧹", isim: "Temizlik", renk: "bg-yellow-100", href: "#" },
  { emoji: "📸", isim: "Fotoğrafçı", renk: "bg-purple-100", href: "#" },
];

export default function HizmetlerPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <div>
            <h1 className="text-2xl font-black text-gray-900">💈 Hizmetler</h1>
            <p className="text-gray-500 text-sm">Erdek&apos;in tüm hizmet sektörleri</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-12">
          {kategoriler.map((k) => (
            <div key={k.isim} className={`${k.renk} rounded-2xl p-8 flex flex-col items-center gap-3 hover:shadow-md transition-shadow cursor-pointer border border-white`}>
              <span className="text-5xl">{k.emoji}</span>
              <span className="font-bold text-gray-800 text-center">{k.isim}</span>
            </div>
          ))}
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">💼</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Hizmetinizi Ekleyin!</h2>
          <p className="text-gray-500 text-sm mb-4">Erdek&apos;te hizmet sektöründe misiniz? Sizi bekliyoruz.</p>
          <Link href="/isletme-kayit" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
            Ücretsiz Ekle →
          </Link>
        </div>
      </div>
    </main>
  );
}