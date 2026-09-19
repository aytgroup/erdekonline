"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowLeft, Star, Clock, Phone, MapPin, Tag, Heart, Share2, MessageSquare, Send, CheckCircle, Plus } from "lucide-react";

const isletmeler: Record<string, {
  isim: string; kategori: string; puan: number; sure: string; minSiparis: string;
  emoji: string; renk: string; adres: string; telefon: string; aciklama: string;
  etiketler: string[]; menu?: { baslik: string; urunler: { isim: string; fiyat: string; aciklama: string }[] }[];
}> = {
  "1": {
    isim: "Kalamar Balık Restaurant", kategori: "Balık & Deniz Ürünleri", puan: 4.9, sure: "25-40 dk",
    minSiparis: "150 TL", emoji: "🐟", renk: "bg-blue-100",
    adres: "Sahil Caddesi No:12, Erdek", telefon: "+90 266 835 00 01",
    aciklama: "Erdek'in en taze deniz ürünleri ve balıklarını en iyi meze çeşitleriyle sunuyoruz. 20 yıllık tecrübemizle her lokmada denizin tadını hissedeceksiniz.",
    etiketler: ["Taze Balık", "Deniz Ürünleri", "Meze", "Izgara"],
    menu: [
      { baslik: "Başlangıçlar", urunler: [
        { isim: "Karışık Meze Tabağı", fiyat: "₺180", aciklama: "8 çeşit deniz mezesi" },
        { isim: "Kalamar Tava", fiyat: "₺220", aciklama: "Taze kalamar, sarımsaklı sos" },
        { isim: "Midye Dolma", fiyat: "₺150", aciklama: "El yapımı, pirinçli iç" },
      ]},
      { baslik: "Ana Yemekler", urunler: [
        { isim: "Izgara Levrek", fiyat: "₺450", aciklama: "Taze levrek, sebze garnitür" },
        { isim: "Çipura Buğulama", fiyat: "₺420", aciklama: "Zeytinyağlı, limonlu" },
        { isim: "Karides Güveç", fiyat: "₺380", aciklama: "Kaşarlı, domates soslu" },
      ]},
    ]
  },
  "2": {
    isim: "Erdek Pide & Lahmacun", kategori: "Pide & Lahmacun", puan: 4.7, sure: "20-35 dk",
    minSiparis: "80 TL", emoji: "🍕", renk: "bg-orange-100",
    adres: "Çarşı Mah. No:5, Erdek", telefon: "+90 266 835 00 02",
    aciklama: "Taş fırında pişmiş geleneksel pideler ve lahmacunlar. Unlumuzun tazeliği ve malzemelerimizin kalitesi ile fark yaratıyoruz.",
    etiketler: ["Pide", "Lahmacun", "Fırın", "Kahvaltı"],
    menu: [
      { baslik: "Pideler", urunler: [
        { isim: "Kıymalı Pide", fiyat: "₺120", aciklama: "Özel baharatlı kıyma" },
        { isim: "Kaşarlı Pide", fiyat: "₺100", aciklama: "Bol eritilmiş kaşar" },
        { isim: "Karışık Pide", fiyat: "₺140", aciklama: "Kıyma + yumurta + kaşar" },
      ]},
      { baslik: "Lahmacun & Diğer", urunler: [
        { isim: "Lahmacun", fiyat: "₺45", aciklama: "İnce hamur, özel sos" },
        { isim: "Börek", fiyat: "₺80", aciklama: "Peynirli veya patatesli" },
      ]},
    ]
  },
  "3": {
    isim: "Şevket Market", kategori: "Market & Bakkal", puan: 4.6, sure: "15-25 dk",
    minSiparis: "50 TL", emoji: "🛒", renk: "bg-green-100",
    adres: "Bağlarbaşı Mah. No:8, Erdek", telefon: "+90 266 835 00 03",
    aciklama: "Gıda, içecek ve temizlik ürünleri hızlı teslimat. Erdek'in en köklü marketi olarak 15 yıldır hizmetinizdeyiz.",
    etiketler: ["Gıda", "İçecek", "Temizlik", "Atıştırmalık"],
  },
  "4": {
    isim: "Erdek Burger & Döner", kategori: "Burger & Fast Food", puan: 4.5, sure: "20-30 dk",
    minSiparis: "100 TL", emoji: "🍔", renk: "bg-yellow-100",
    adres: "Merkez Mah. No:3, Erdek", telefon: "+90 266 835 00 04",
    aciklama: "El yapımı burgerler ve döner çeşitleri. En taze malzemelerle hazırlanan lezzetler.",
    etiketler: ["Burger", "Döner", "Sandviç", "Fast Food"],
    menu: [
      { baslik: "Burgerler", urunler: [
        { isim: "Klasik Burger", fiyat: "₺180", aciklama: "Dana eti, marul, domates, özel sos" },
        { isim: "Çift Katlı Burger", fiyat: "₺240", aciklama: "2 köfte, kaşar, bacon" },
        { isim: "Tavuk Burger", fiyat: "₺160", aciklama: "Çıtır tavuk, ranch sos" },
      ]},
    ]
  },
  "5": {
    isim: "Tatlı Dükkanı Erdek", kategori: "Tatlı & Pasta", puan: 4.8, sure: "30-45 dk",
    minSiparis: "120 TL", emoji: "🍰", renk: "bg-pink-100",
    adres: "Sahil Caddesi No:28, Erdek", telefon: "+90 266 835 00 05",
    aciklama: "El yapımı pastalar, tatlılar ve dondurma çeşitleri. Her özel gün için sürpriz siparişler alıyoruz.",
    etiketler: ["Baklava", "Pasta", "Dondurma", "Çikolata"],
    menu: [
      { baslik: "Tatlılar", urunler: [
        { isim: "Baklava (1kg)", fiyat: "₺350", aciklama: "Antep fıstıklı, tereyağlı" },
        { isim: "Sütlaç", fiyat: "₺80", aciklama: "Fırın sütlaç, tarçınlı" },
        { isim: "Dondurma (3 top)", fiyat: "₺90", aciklama: "20 çeşit arasından seç" },
      ]},
    ]
  },
  "6": {
    isim: "Yerel Köy Ürünleri", kategori: "Yerel & Organik", puan: 4.9, sure: "Aynı Gün",
    minSiparis: "200 TL", emoji: "🫒", renk: "bg-lime-100",
    adres: "Yaylacık Köyü, Erdek", telefon: "+90 266 835 00 06",
    aciklama: "Erdek yöresi doğal zeytinyağı, zeytin, peynir ve bal. Kimyasal gübre ve ilaç kullanılmadan üretilmiş sertifikalı organik ürünler.",
    etiketler: ["Zeytin", "Peynir", "Bal", "Zeytinyağı"],
    menu: [
      { baslik: "Ürünler", urunler: [
        { isim: "Sızma Zeytinyağı (1L)", fiyat: "₺280", aciklama: "Soğuk sıkım, doğal" },
        { isim: "Kars Kaşarı (500g)", fiyat: "₺220", aciklama: "Köy tipi, olgunlaştırılmış" },
        { isim: "Çiçek Balı (500g)", fiyat: "₺180", aciklama: "Filiz arı, doğal petek" },
        { isim: "Salamura Zeytin (1kg)", fiyat: "₺150", aciklama: "Siyah veya yeşil, tuzlu" },
      ]},
    ]
  },
"7": {
    isim: "Erdek Manav", kategori: "Meyve & Sebze", puan: 4.7, sure: "20-30 dk",
    minSiparis: "60 TL", emoji: "🥦", renk: "bg-emerald-100",
    adres: "Pazar Yeri No:4, Erdek", telefon: "+90 266 835 00 07",
    aciklama: "Her sabah taze gelen meyve ve sebzeler. Doğrudan çiftçiden sofraya. Erdek'in en taze manav hizmeti.",
    etiketler: ["Meyve", "Sebze", "Taze", "Organik"],
    menu: [
      { baslik: "Sebzeler", urunler: [
        { isim: "Domates (1kg)", fiyat: "₺40", aciklama: "Çeri veya normal, taze" },
        { isim: "Salatalık (1kg)", fiyat: "₺35", aciklama: "Çiftlik çıkışı, taze" },
        { isim: "Biber (1kg)", fiyat: "₺45", aciklama: "Dolmalık veya kapya" },
      ]},
      { baslik: "Meyveler", urunler: [
        { isim: "Karpuz (kg)", fiyat: "₺20", aciklama: "Tarladan gelme" },
        { isim: "Şeftali (1kg)", fiyat: "₺55", aciklama: "Erdek yöresi şeftalisi" },
      ]},
    ]
  },
  "13": {
    isim: "Erdek Balıkçısı", kategori: "Taze Balık", puan: 4.8, sure: "Aynı Gün",
    minSiparis: "150 TL", emoji: "🐟", renk: "bg-blue-100",
    adres: "Liman Caddesi No:2, Erdek", telefon: "+90 266 835 00 13",
    aciklama: "Her sabah tekneden gelen taze balık. Mevsimlik çipura, levrek, palamut ve daha fazlası. Temizlenmiş ve paketlenmiş olarak teslim edilir.",
    etiketler: ["Taze Balık", "Deniz Ürünleri", "Mevsimlik", "Günlük"],
    menu: [
      { baslik: "Balıklar", urunler: [
        { isim: "Çipura (kg)", fiyat: "₺380", aciklama: "Günlük taze, temizlenmiş" },
        { isim: "Levrek (kg)", fiyat: "₺420", aciklama: "Günlük taze, temizlenmiş" },
        { isim: "Palamut (kg)", fiyat: "₺280", aciklama: "Mevsimlik, taze" },
        { isim: "Midye (kg)", fiyat: "₺120", aciklama: "Taze, temizlenmiş" },
      ]},
    ]
  },
  "14": {
    isim: "Bağ Evi Peynircisi", kategori: "Peynir & Süt Ürünleri", puan: 4.7, sure: "Aynı Gün",
    minSiparis: "100 TL", emoji: "🧀", renk: "bg-yellow-100",
    adres: "Köy Yolu No:7, Erdek", telefon: "+90 266 835 00 14",
    aciklama: "Kendi sürümüzden ürettiğimiz doğal peynirler, yoğurt ve tereyağı. Kimyasal katkı yok, geleneksel üretim.",
    etiketler: ["Peynir", "Yoğurt", "Tereyağı", "Doğal"],
    menu: [
      { baslik: "Peynirler", urunler: [
        { isim: "Beyaz Peynir (500g)", fiyat: "₺180", aciklama: "Köy tipi, taze" },
        { isim: "Tulum Peyniri (500g)", fiyat: "₺220", aciklama: "Olgunlaştırılmış, sert" },
        { isim: "Lor Peyniri (500g)", fiyat: "₺120", aciklama: "Taze, yağsız" },
      ]},
      { baslik: "Diğer", urunler: [
        { isim: "Köy Tereyağı (250g)", fiyat: "₺160", aciklama: "Kendi sütümüzden" },
        { isim: "Köy Yoğurdu (1kg)", fiyat: "₺90", aciklama: "Tam yağlı, süzme" },
      ]},
    ]
  },
  "15": {
    isim: "Erdek Balı", kategori: "Doğal Bal", puan: 5.0, sure: "Aynı Gün",
    minSiparis: "120 TL", emoji: "🍯", renk: "bg-amber-100",
    adres: "Bağlıca Köyü, Erdek", telefon: "+90 266 835 00 15",
    aciklama: "Erdek'in çam ve çiçek balları. Kendi arılarımızdan, doğal yöntemlerle üretilmiş. Hiçbir katkı maddesi içermez.",
    etiketler: ["Çiçek Balı", "Çam Balı", "Doğal", "Organik"],
    menu: [
      { baslik: "Ballar", urunler: [
        { isim: "Çiçek Balı (500g)", fiyat: "₺180", aciklama: "Mevsim çiçeklerinden" },
        { isim: "Çam Balı (500g)", fiyat: "₺250", aciklama: "Kazdağları çamından" },
        { isim: "Petek Bal (500g)", fiyat: "₺220", aciklama: "Doğal petek içinde" },
      ]},
    ]
  },
"12": {
    isim: "Gün Batımı Turu", kategori: "Romantik Tekne Turu", puan: 5.0, sure: "3 Saat",
    minSiparis: "Kişi Başı ₺800", emoji: "🌅", renk: "bg-orange-100",
    adres: "Erdek Limanı, Erdek", telefon: "+90 266 835 00 12",
    aciklama: "Marmara Denizi'nin eşsiz gün batımını tekne üzerinde yaşayın. Şarap ve atıştırmalıklar dahil. Çiftlere ve özel kutlamalara özel.",
    etiketler: ["Romantik", "Gün Batımı", "Özel Tur", "Çift"],
    menu: [
      { baslik: "Tur Seçenekleri", urunler: [
        { isim: "Çift Paketi", fiyat: "₺1.600", aciklama: "2 kişi, şarap ve atıştırmalık dahil" },
        { isim: "Grup Paketi (4 kişi)", fiyat: "₺2.800", aciklama: "4 kişiye kadar, ikram dahil" },
      ]},
    ]
  },
  "20": {
    isim: "Erdek Sahil Pansiyon", kategori: "Pansiyon", puan: 4.7, sure: "Rezervasyon",
    minSiparis: "Gecelik ₺800'den", emoji: "🏨", renk: "bg-blue-100",
    adres: "Sahil Caddesi No:15, Erdek", telefon: "+90 266 835 00 20",
    aciklama: "Denize sıfır konumda, ferah odalar ve kahvaltı dahil. Aile dostu atmosfer. Tüm odalardan deniz manzarası.",
    etiketler: ["Deniz Manzarası", "Kahvaltı Dahil", "Aile Dostu", "Pansiyon"],
    menu: [
      { baslik: "Oda Tipleri", urunler: [
        { isim: "Standart Oda (2 kişi)", fiyat: "₺800/gece", aciklama: "Deniz manzaralı, kahvaltı dahil" },
        { isim: "Aile Odası (4 kişi)", fiyat: "₺1.400/gece", aciklama: "Geniş oda, balkon, kahvaltı dahil" },
      ]},
    ]
  },
  "21": {
    isim: "Ada Manzara Butik Otel", kategori: "Butik Otel", puan: 4.9, sure: "Rezervasyon",
    minSiparis: "Gecelik ₺1.500'den", emoji: "🏩", renk: "bg-purple-100",
    adres: "Merkez Mah. No:22, Erdek", telefon: "+90 266 835 00 21",
    aciklama: "Marmara adalarına bakan muhteşem manzarası, butik tasarım odaları ve üst düzey hizmetiyle öne çıkan Erdek'in en prestijli oteli.",
    etiketler: ["Butik", "Ada Manzarası", "Lüks", "Merkez"],
    menu: [
      { baslik: "Oda Tipleri", urunler: [
        { isim: "Deluxe Oda (2 kişi)", fiyat: "₺1.500/gece", aciklama: "Ada manzaralı, minibar dahil" },
        { isim: "Suite Oda (2 kişi)", fiyat: "₺2.500/gece", aciklama: "Jakuzili, panoramik manzara" },
      ]},
    ]
  },
  "22": {
    isim: "Erdek Apart Otel", kategori: "Apart Otel", puan: 4.5, sure: "Rezervasyon",
    minSiparis: "Gecelik ₺600'den", emoji: "🏠", renk: "bg-green-100",
    adres: "Bağlarbaşı Mah. No:8, Erdek", telefon: "+90 266 835 00 22",
    aciklama: "Mutfaklı apart odalarımızla kendinizi evinizde hissedersiniz. Uzun süreli konaklamaya uygun, uygun fiyatlı seçenek.",
    etiketler: ["Apart", "Mutfaklı", "Uzun Konaklama", "Uygun Fiyat"],
    menu: [
      { baslik: "Apart Seçenekleri", urunler: [
        { isim: "Stüdyo Apart (2 kişi)", fiyat: "₺600/gece", aciklama: "Tek oda, mutfak köşesi" },
        { isim: "1+1 Apart (3 kişi)", fiyat: "₺900/gece", aciklama: "Ayrı yatak odası, tam mutfak" },
      ]},
    ]
  },
};
interface Yorum { isim: string; puan: number; metin: string; tarih: string; }

export default function IsletmeDetayPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const b = isletmeler[id];
  const [favori, setFavori] = useState(false);
  const [yorumlar, setYorumlar] = useState<Yorum[]>([]);
  const [yorumIsim, setYorumIsim] = useState("");
  const [yorumMetin, setYorumMetin] = useState("");
  const [yorumPuan, setYorumPuan] = useState(5);
  const [yorumGonderildi, setYorumGonderildi] = useState(false);
  const [aktifTab, setAktifTab] = useState<"menu" | "yorumlar">("menu");

  useEffect(() => {
    try {
      const key = `eo_yorumlar_${id}`;
      const raw = localStorage.getItem(key);
      if (raw) setYorumlar(JSON.parse(raw));
    } catch { setYorumlar([]); }
    // Favori durumunu yükle
    try {
      const favs: string[] = JSON.parse(localStorage.getItem("eo_favoriler") || "[]");
      setFavori(favs.includes(id));
    } catch { setFavori(false); }
  }, [id]);

  function sepeteEkle(urunIsim: string, fiyatStr: string) {
    try {
      const fiyat = parseFloat(fiyatStr.replace("₺", "").replace(",", ".")) || 0;
      const raw = localStorage.getItem("eo_sepet");
      const items: { id: number; isim: string; fiyat: number; adet: number; emoji: string; isletme: string }[] = raw ? JSON.parse(raw) : [];
      // Farklı işletmeden ürün varsa uyar
      const mevcutIsletme = items[0]?.isletme;
      if (mevcutIsletme && mevcutIsletme !== (b?.isim || "") && items.length > 0) {
        const onay = window.confirm(`Sepetinizde "${mevcutIsletme}" işletmesinden ürünler var. Yeni işletmeden ürün eklemek için sepeti temizlemek gerekiyor. Devam edilsin mi?`);
        if (!onay) return;
        localStorage.setItem("eo_sepet", JSON.stringify([]));
        window.dispatchEvent(new Event("eo_sepet_guncellendi"));
      }
      const fresh = mevcutIsletme && mevcutIsletme !== (b?.isim || "") ? [] : items;
      const existing = fresh.find(i => i.isim === urunIsim);
      let updated;
      if (existing) {
        updated = fresh.map(i => i.isim === urunIsim ? { ...i, adet: i.adet + 1 } : i);
      } else {
        updated = [...fresh, { id: Date.now(), isim: urunIsim, fiyat, adet: 1, emoji: b?.emoji || "🛒", isletme: b?.isim || "" }];
      }
      localStorage.setItem("eo_sepet", JSON.stringify(updated));
      window.dispatchEvent(new Event("eo_sepet_guncellendi"));
    } catch { /* sessiz hata */ }
  }

  function favoriToggle() {
    try {
      const favs: string[] = JSON.parse(localStorage.getItem("eo_favoriler") || "[]");
      const yeni = favori ? favs.filter(f => f !== id) : [...favs, id];
      localStorage.setItem("eo_favoriler", JSON.stringify(yeni));
      setFavori(!favori);
    } catch { /* sessiz hata */ }
  }

  function yorumGonder(e: React.FormEvent) {
    e.preventDefault();
    if (!yorumIsim.trim() || !yorumMetin.trim()) return;
    const yeniYorum: Yorum = {
      isim: yorumIsim.trim(),
      puan: yorumPuan,
      metin: yorumMetin.trim(),
      tarih: new Date().toLocaleDateString("tr-TR"),
    };
    const updated = [yeniYorum, ...yorumlar];
    setYorumlar(updated);
    localStorage.setItem(`eo_yorumlar_${id}`, JSON.stringify(updated));
    setYorumIsim(""); setYorumMetin(""); setYorumPuan(5);
    setYorumGonderildi(true);
    setTimeout(() => setYorumGonderildi(false), 3000);
  }

  if (!b) {
    return (
      <main className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4 py-20">
          <div className="text-6xl">🏪</div>
          <h1 className="text-2xl font-black text-gray-900">İşletme Bulunamadı</h1>
          <Link href="/isletmeler" className="text-sky-600 hover:underline font-medium">Tüm İşletmelere Dön</Link>
        </div>
        <Footer />
      </main>
    );
  }
return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/isletmeler" className="text-gray-500 hover:text-sky-600 transition-colors"><ArrowLeft size={22} /></Link>
            <span className="text-gray-900 font-semibold text-sm truncate">{b.isim}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={favoriToggle}
              className={`p-2 rounded-full transition-colors ${favori ? "text-red-500 bg-red-50" : "text-gray-400 hover:bg-gray-100"}`}>
              <Heart size={20} fill={favori ? "currentColor" : "none"} />
            </button>
            <button onClick={() => {
              if (navigator.share) {
                navigator.share({ title: b.isim, text: b.aciklama, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link kopyalandı!");
              }
            }} className="p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 w-full">
        <div className={`${b.renk} rounded-3xl h-52 flex items-center justify-center mb-6`}>
          <span className="text-9xl">{b.emoji}</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          <h1 className="text-2xl font-black text-gray-900 mb-1">{b.isim}</h1>
          <p className="text-gray-500 text-sm mb-4">{b.kategori}</p>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-1 text-sm"><Star size={15} className="text-yellow-400 fill-yellow-400" /><span className="font-bold text-gray-700">{b.puan}</span><span className="text-gray-400 text-xs">({yorumlar.length + 12} yorum)</span></div>
            <div className="flex items-center gap-1 text-sm text-gray-500"><Clock size={15} />{b.sure}</div>
            <div className="flex items-center gap-1 text-sm text-gray-500"><Tag size={15} />Min: {b.minSiparis}</div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{b.aciklama}</p>
          <div className="flex flex-wrap gap-2">
            {b.etiketler.map(e => (
              <span key={e} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">{e}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          <h2 className="font-black text-gray-900 mb-4">İletişim & Konum</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Phone size={16} className="text-sky-500 shrink-0" />
              <a href={`tel:${b.telefon}`} className="text-sky-600 hover:underline font-medium">{b.telefon}</a>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <MapPin size={16} className="text-sky-500 shrink-0 mt-0.5" /><span>{b.adres}</span>
            </div>
          </div>
        </div>
{/* Tab Menüsü */}
        {(b.menu || true) && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
            <div className="flex border-b border-gray-100">
              <button onClick={() => setAktifTab("menu")}
                className={`flex-1 py-3.5 text-sm font-bold transition-colors ${aktifTab === "menu" ? "text-sky-600 border-b-2 border-sky-500" : "text-gray-400 hover:text-gray-600"}`}>
                Menü
              </button>
              <button onClick={() => setAktifTab("yorumlar")}
                className={`flex-1 py-3.5 text-sm font-bold transition-colors flex items-center justify-center gap-1 ${aktifTab === "yorumlar" ? "text-sky-600 border-b-2 border-sky-500" : "text-gray-400 hover:text-gray-600"}`}>
                <MessageSquare size={14} /> Yorumlar ({yorumlar.length + 12})
              </button>
            </div>
            <div className="p-5">
              {aktifTab === "menu" ? (
                b.menu ? (
                  <div className="space-y-6">
                    {b.menu.map(bolum => (
                      <div key={bolum.baslik}>
                        <h3 className="font-black text-gray-900 text-base mb-3">{bolum.baslik}</h3>
                        <div className="space-y-2">
                          {bolum.urunler.map(urun => (
                            <div key={urun.isim} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 text-sm">{urun.isim}</p>
                                <p className="text-gray-400 text-xs">{urun.aciklama}</p>
                                <p className="font-black text-orange-500 text-sm mt-1">{urun.fiyat}</p>
                              </div>
                              <button onClick={() => sepeteEkle(urun.isim, urun.fiyat)}
                                className="ml-3 shrink-0 w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center transition-colors shadow-sm">
                                <Plus size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm text-center py-6">Menü bilgisi yakında eklenecek.</p>
                )
              ) : (
                <div className="space-y-4">
                  {yorumGonderildi && (
                    <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                      <CheckCircle size={16} /> Yorumunuz eklendi!
                    </div>
                  )}
                  <form onSubmit={yorumGonder} className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <p className="font-semibold text-gray-800 text-sm">Yorum Yaz</p>
                    <div className="flex items-center gap-2">
                      {[1,2,3,4,5].map(y => (
                        <button key={y} type="button" onClick={() => setYorumPuan(y)}>
                          <Star size={20} className={y <= yorumPuan ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                        </button>
                      ))}
                    </div>
                    <input type="text" placeholder="Adınız" value={yorumIsim} onChange={e => setYorumIsim(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-sky-400" />
                    <textarea placeholder="Yorumunuz..." value={yorumMetin} onChange={e => setYorumMetin(e.target.value)} rows={3}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-sky-400 resize-none" />
                    <button type="submit" className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors">
                      <Send size={14} /> Gönder
                    </button>
                  </form>
                  {yorumlar.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">Henüz yorum yok. İlk yorumu siz yazın!</p>
                  ) : (
                    yorumlar.map((y, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900 text-sm">{y.isim}</span>
                          <span className="text-gray-400 text-xs">{y.tarih}</span>
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {[1,2,3,4,5].map(s => <Star key={s} size={13} className={s <= y.puan ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />)}
                        </div>
                        <p className="text-gray-600 text-sm">{y.metin}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <a href={`tel:${b.telefon}`}
          className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl text-center text-lg transition-colors mb-6">
          📞 Şimdi Sipariş Ver / Ara
        </a>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
