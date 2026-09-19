"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowLeft, Star, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const tumIsletmeler = [
  { id: 1, isim: "Kalamar Balık Restaurant", kategori: "Balık & Deniz Ürünleri", puan: 4.9, sure: "25-40 dk", emoji: "🐟", href: "/isletme/1", tags: ["balık", "deniz", "meze", "restoran"] },
  { id: 2, isim: "Erdek Pide & Lahmacun", kategori: "Pide & Lahmacun", puan: 4.7, sure: "20-35 dk", emoji: "🍕", href: "/isletme/2", tags: ["pide", "lahmacun", "fırın", "yemek"] },
  { id: 3, isim: "Şevket Market", kategori: "Market & Bakkal", puan: 4.6, sure: "15-25 dk", emoji: "🛒", href: "/isletme/3", tags: ["market", "bakkal", "gıda", "içecek"] },
  { id: 4, isim: "Erdek Burger & Döner", kategori: "Burger & Fast Food", puan: 4.5, sure: "20-30 dk", emoji: "🍔", href: "/isletme/4", tags: ["burger", "döner", "fast food", "sandviç"] },
  { id: 5, isim: "Tatlı Dükkanı Erdek", kategori: "Tatlı & Pasta", puan: 4.8, sure: "30-45 dk", emoji: "🍰", href: "/isletme/5", tags: ["tatlı", "pasta", "baklava", "dondurma"] },
  { id: 6, isim: "Yerel Köy Ürünleri", kategori: "Yerel & Organik", puan: 4.9, sure: "Aynı Gün", emoji: "🫒", href: "/isletme/6", tags: ["zeytin", "peynir", "bal", "yerel", "organik"] },
  { id: 10, isim: "Erdek Mavi Tur", kategori: "Tekne Turu", puan: 4.9, sure: "Tam Gün", emoji: "⛵", href: "/tekne", tags: ["tekne", "tur", "deniz", "gezi"] },
  { id: 11, isim: "Adalar Keşif Turu", kategori: "Ada Turu", puan: 4.8, sure: "Yarım Gün", emoji: "🏝️", href: "/tekne", tags: ["ada", "tekne", "tur", "keşif"] },
  { id: 12, isim: "Gün Batımı Turu", kategori: "Romantik Tekne Turu", puan: 5.0, sure: "3 Saat", emoji: "🌅", href: "/isletme/12", tags: ["tekne", "gün batımı", "romantik", "tur", "çift"] },
  { id: 20, isim: "Erdek Sahil Pansiyon", kategori: "Pansiyon", puan: 4.7, sure: "Rezervasyon", emoji: "🏨", href: "/isletme/20", tags: ["pansiyon", "konaklama", "otel", "sahil"] },
  { id: 21, isim: "Ada Manzara Butik Otel", kategori: "Butik Otel", puan: 4.9, sure: "Rezervasyon", emoji: "🏩", href: "/isletme/21", tags: ["otel", "butik", "konaklama", "manzara"] },
  { id: 22, isim: "Erdek Apart Otel", kategori: "Apart Otel", puan: 4.5, sure: "Rezervasyon", emoji: "🏠", href: "/isletme/22", tags: ["apart", "konaklama", "mutfaklı", "uzun konaklama"] },
  { id: 7, isim: "Erdek Manav", kategori: "Meyve & Sebze", puan: 4.7, sure: "20-30 dk", emoji: "🥦", href: "/isletme/7", tags: ["manav", "meyve", "sebze", "taze", "market"] },
  { id: 13, isim: "Erdek Balıkçısı", kategori: "Taze Balık", puan: 4.8, sure: "Aynı Gün", emoji: "🐟", href: "/isletme/13", tags: ["balık", "taze", "deniz ürünleri", "balıkçı", "yerel"] },
  { id: 14, isim: "Bağ Evi Peynircisi", kategori: "Peynir & Süt Ürünleri", puan: 4.7, sure: "Aynı Gün", emoji: "🧀", href: "/isletme/14", tags: ["peynir", "yoğurt", "tereyağı", "köy", "organik", "yerel"] },
  { id: 15, isim: "Erdek Balı", kategori: "Doğal Bal", puan: 5.0, sure: "Aynı Gün", emoji: "🍯", href: "/isletme/15", tags: ["bal", "doğal", "organik", "çam balı", "yerel"] },
  { id: 30, isim: "Erdek Kuaför & Güzellik", kategori: "Kuaför", puan: 4.6, sure: "Randevulu", emoji: "💈", href: "/hizmetler", tags: ["kuaför", "güzellik", "saç", "hizmet"] },
  { id: 31, isim: "Erdek Eczanesi", kategori: "Eczane", puan: 4.8, sure: "09:00-22:00", emoji: "💊", href: "/hizmetler", tags: ["eczane", "ilaç", "sağlık", "hizmet"] },
];

const MAX_GECMIS = 8;

function AraContent() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") || "";
  const [gecmis, setGecmis] = useState<string[]>([]);
  const [aktifKat, setAktifKat] = useState("Tümü");

  // Arama geçmişini yükle
  useEffect(() => {
    try {
      const g = JSON.parse(localStorage.getItem("eo_arama_gecmisi") || "[]");
      setGecmis(g);
    } catch { setGecmis([]); }
  }, []);

  // Yeni arama yapılınca geçmişe ekle
  useEffect(() => {
    if (!q.trim()) return;
    try {
      const g: string[] = JSON.parse(localStorage.getItem("eo_arama_gecmisi") || "[]");
      const yeni = [q, ...g.filter(x => x.toLowerCase() !== q.toLowerCase())].slice(0, MAX_GECMIS);
      localStorage.setItem("eo_arama_gecmisi", JSON.stringify(yeni));
      setGecmis(yeni);
    } catch { /* noop */ }
  }, [q]);

  function gecmisTemizle() {
    localStorage.removeItem("eo_arama_gecmisi");
    setGecmis([]);
  }
  const [aramaMetni, setAramaMetni] = useState(q);

  const kategoriler = ["Tümü", "Yemek", "Market", "Tekne", "Konaklama", "Yerel", "Hizmet"];
  const katMap: Record<string, string[]> = {
    Yemek: ["Balık", "Pide", "Burger", "Tatlı", "restoran", "yemek"],
    Market: ["Market", "Manav", "Bakkal", "Sebze"],
    Tekne: ["Tekne", "Ada", "tur"],
    Konaklama: ["Pansiyon", "Otel", "Apart", "konaklama"],
    Yerel: ["Yerel", "Organik", "Balık", "Peynir", "Bal", "Zeytinyağı"],
    Hizmet: ["Kuaför", "Eczane", "Fotoğraf"],
  };

  const sonuclar = q.length > 0
    ? tumIsletmeler
        .filter(i =>
          i.isim.toLowerCase().includes(q.toLowerCase()) ||
          i.kategori.toLowerCase().includes(q.toLowerCase()) ||
          i.tags.some(t => t.toLowerCase().includes(q.toLowerCase()))
        )
        .filter(i => {
          if (aktifKat === "Tümü") return true;
          const anahtarlar = katMap[aktifKat] || [];
          return anahtarlar.some(k =>
            i.isim.toLowerCase().includes(k.toLowerCase()) ||
            i.kategori.toLowerCase().includes(k.toLowerCase()) ||
            i.tags.some(t => t.toLowerCase().includes(k.toLowerCase()))
          );
        })
    : [];

  function handleAra(e: React.FormEvent) {
    e.preventDefault();
    if (aramaMetni.trim()) router.push(`/ara?q=${encodeURIComponent(aramaMetni.trim())}`);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
          <form onSubmit={handleAra} className="flex-1 flex items-center bg-gray-100 rounded-xl px-4 py-2.5 gap-3">
            <Search size={18} className="text-gray-400 shrink-0" />
            <input type="text" value={aramaMetni} onChange={e => setAramaMetni(e.target.value)}
              placeholder="Restoran, ürün veya hizmet ara..."
              className="flex-1 bg-transparent outline-none text-gray-800 text-sm" />
            {aramaMetni && (
              <button type="submit" className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Ara</button>
            )}
          </form>
        </div>
      </div>

      {/* Kategori filtresi — sadece arama yapıldıysa göster */}
      {q && (
        <div className="bg-white border-b border-gray-100 px-4 py-2.5 sticky top-[64px] z-30 shadow-sm">
          <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto">
            {kategoriler.map(k => (
              <button key={k} onClick={() => setAktifKat(k)}
                className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${aktifKat === k ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"}`}>
                {k}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        {q ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-gray-800">
                &ldquo;{q}&rdquo; için {sonuclar.length} sonuç
                {aktifKat !== "Tümü" && <span className="text-sm font-normal text-gray-400 ml-2">({aktifKat})</span>}
              </h2>
              {aktifKat !== "Tümü" && (
                <button onClick={() => setAktifKat("Tümü")} className="text-xs text-orange-500 font-semibold hover:underline">Filtreyi Temizle</button>
              )}
            </div>
            {sonuclar.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {sonuclar.map(item => (
                  <Link key={item.id} href={item.href}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                    <div className="h-36 bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center">
                      <span className="text-6xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-sky-600 transition-colors">{item.isim}</h3>
                      <p className="text-gray-400 text-xs mb-3">{item.kategori}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{item.puan}</span></div>
                        <div className="flex items-center gap-1"><Clock size={12} />{item.sure}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-black text-gray-700 mb-2">Sonuç bulunamadı</h3>
                <p className="text-gray-400 text-sm mb-6">&ldquo;{q}&rdquo; için herhangi bir sonuç bulunamadı.</p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {["Balık", "Pizza", "Market", "Tekne Turu", "Pansiyon", "Tatlı"].map(tag => (
                    <button key={tag} onClick={() => router.push(`/ara?q=${encodeURIComponent(tag)}`)}
                      className="bg-gray-100 hover:bg-sky-100 hover:text-sky-600 text-gray-600 text-sm px-4 py-2 rounded-full font-medium transition-colors">
                      {tag}
                    </button>
                  ))}
                </div>
                <Link href="/" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors">
                  <ArrowLeft size={16} /> Ana Sayfaya Dön
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="py-8">
            {gecmis.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-700">🕒 Son Aramalar</h3>
                  <button onClick={gecmisTemizle} className="text-xs text-gray-400 hover:text-red-500 transition-colors">Temizle</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {gecmis.map((g, i) => (
                    <button key={i} onClick={() => router.push(`/ara?q=${encodeURIComponent(g)}`)}
                      className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-sm px-3 py-1.5 rounded-full hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-colors font-medium">
                      🔍 {g}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-700 mb-3">🔥 Popüler Aramalar</h3>
              <div className="flex flex-wrap gap-2">
                {["Balık Restaurant", "Pizza", "Market", "Tekne Turu", "Pansiyon", "Zeytinyağı", "Bal", "Kuaför"].map(tag => (
                  <button key={tag} onClick={() => router.push(`/ara?q=${encodeURIComponent(tag)}`)}
                    className="bg-orange-50 hover:bg-orange-100 text-orange-600 text-sm px-4 py-2 rounded-full font-medium transition-colors border border-orange-100">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3">📂 Kategoriler</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { emoji: "🍽️", label: "Yemek", href: "/yemek" },
                  { emoji: "🛒", label: "Market", href: "/market" },
                  { emoji: "⛵", label: "Tekne", href: "/tekne" },
                  { emoji: "🏨", label: "Konaklama", href: "/konaklama" },
                  { emoji: "🫒", label: "Yerel", href: "/yerel" },
                  { emoji: "💈", label: "Hizmetler", href: "/hizmetler" },
                  { emoji: "🎭", label: "Etkinlikler", href: "/etkinlikler" },
                  { emoji: "🏪", label: "Tüm İşletmeler", href: "/isletmeler" },
                ].map(k => (
                  <Link key={k.href} href={k.href}
                    className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 hover:shadow-md hover:border-sky-200 transition-all">
                    <span className="text-2xl">{k.emoji}</span>
                    <span className="font-semibold text-gray-700 text-sm">{k.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

export default function AraPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Yükleniyor...</div>}>
      <AraContent />
    </Suspense>
  );
}