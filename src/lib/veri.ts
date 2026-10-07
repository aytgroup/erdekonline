// ============================================================
// ErdekOnline — Merkezi Veri Katmanı
// Tüm sayfalar bu dosyadan beslenir.
// ============================================================

export interface Isletme {
  id: number;
  isim: string;
  kategori: string;
  katKey: "Yemek" | "Market" | "Tekne" | "Konaklama" | "Yerel" | "Hizmet";
  puan: number;
  puanSayisi: number;
  sure: string;
  minSiparis?: string;
  fiyat?: number;
  fiyatGoster?: string;
  emoji: string;
  renk: string;
  gradient: string;
  adres: string;
  telefon: string;
  aciklama: string;
  etiketler: string[];
  acilis?: string;
  kapanis?: string;
  aktif: boolean;
  organik?: boolean;
  musaitlik?: boolean;
  kapasite?: string;
  badge?: string;
  badgeRenk?: string;
  indirim?: string;
  menu?: { baslik: string; urunler: { isim: string; fiyat: string; aciklama: string }[] }[];
}

export const isletmeler: Isletme[] = [
  // ── YEMEK ──────────────────────────────────────────────────
  {
    id: 1, isim: "Kalamar Balık Restaurant", kategori: "Balık & Deniz Ürünleri", katKey: "Yemek",
    puan: 4.9, puanSayisi: 128, sure: "25-40 dk", minSiparis: "150 TL",
    emoji: "🐟", renk: "bg-blue-100", gradient: "from-blue-400 to-cyan-300",
    adres: "Sahil Caddesi No:12, Erdek", telefon: "+90 266 835 00 01",
    aciklama: "Erdek'in en taze deniz ürünleri ve balıklarını en iyi meze çeşitleriyle sunuyoruz. 20 yıllık tecrübemizle her lokmada denizin tadını hissedeceksiniz.",
    etiketler: ["Taze Balık", "Deniz Ürünleri", "Meze", "Izgara"],
    acilis: "10:00", kapanis: "23:00", aktif: true,
    badge: "Çok Beğenildi", badgeRenk: "bg-orange-500",
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
    ],
  },
  {
    id: 2, isim: "Erdek Pide & Lahmacun", kategori: "Pide & Lahmacun", katKey: "Yemek",
    puan: 4.7, puanSayisi: 95, sure: "20-35 dk", minSiparis: "80 TL",
    emoji: "🍕", renk: "bg-orange-100", gradient: "from-orange-400 to-amber-300",
    adres: "Çarşı Mah. No:5, Erdek", telefon: "+90 266 835 00 02",
    aciklama: "Taş fırında pişmiş geleneksel pideler ve lahmacunlar.",
    etiketler: ["Pide", "Lahmacun", "Fırın", "Kahvaltı"],
    acilis: "08:00", kapanis: "22:00", aktif: true,
    badge: "Hızlı Teslimat", badgeRenk: "bg-green-500", indirim: "%10 İndirim",
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
    ],
  },
  {
    id: 4, isim: "Erdek Burger & Döner", kategori: "Burger & Fast Food", katKey: "Yemek",
    puan: 4.5, puanSayisi: 44, sure: "20-30 dk", minSiparis: "100 TL",
    emoji: "🍔", renk: "bg-yellow-100", gradient: "from-yellow-400 to-orange-300",
    adres: "Merkez Mah. No:3, Erdek", telefon: "+90 266 835 00 04",
    aciklama: "El yapımı burgerler ve döner çeşitleri. En taze malzemelerle hazırlanan lezzetler.",
    etiketler: ["Burger", "Döner", "Sandviç", "Fast Food"],
    acilis: "10:00", kapanis: "23:30", aktif: true, indirim: "%15 İndirim",
    menu: [
      { baslik: "Burgerler", urunler: [
        { isim: "Klasik Burger", fiyat: "₺180", aciklama: "Dana köfte, marul, domates" },
        { isim: "Çift Katlı Burger", fiyat: "₺240", aciklama: "2x köfte, kaşar, özel sos" },
        { isim: "Tavuk Burger", fiyat: "₺160", aciklama: "Izgara tavuk, avokado" },
      ]},
      { baslik: "Döner & Dürüm", urunler: [
        { isim: "Tavuk Dürüm", fiyat: "₺120", aciklama: "Lavaş, garnitür, sos" },
        { isim: "Et Döner Porsiyon", fiyat: "₺200", aciklama: "Pilav veya patates ile" },
      ]},
    ],
  },
  {
    id: 5, isim: "Tatlı Dükkanı Erdek", kategori: "Tatlı & Pasta", katKey: "Yemek",
    puan: 4.8, puanSayisi: 82, sure: "30-45 dk", minSiparis: "120 TL",
    emoji: "🍰", renk: "bg-pink-100", gradient: "from-pink-400 to-rose-300",
    adres: "Sahil Caddesi No:28, Erdek", telefon: "+90 266 835 00 05",
    aciklama: "Geleneksel Türk tatlıları, özel pastalar ve mevsim dondurmaları.",
    etiketler: ["Baklava", "Pasta", "Dondurma", "Sütlaç"],
    acilis: "09:00", kapanis: "22:00", aktif: true,
    badge: "Öne Çıkan", badgeRenk: "bg-purple-500",
    menu: [
      { baslik: "Tatlılar", urunler: [
        { isim: "Fıstıklı Baklava (1kg)", fiyat: "₺420", aciklama: "Antep fıstıklı, tereyağlı" },
        { isim: "Künefe", fiyat: "₺180", aciklama: "Peynirli, sıcak servis" },
        { isim: "Sütlaç", fiyat: "₺90", aciklama: "Fırın sütlaç, tarçınlı" },
      ]},
    ],
  },

  // ── MARKET ─────────────────────────────────────────────────
  {
    id: 3, isim: "Şevket Market", kategori: "Market & Bakkal", katKey: "Market",
    puan: 4.6, puanSayisi: 67, sure: "15-25 dk", minSiparis: "50 TL",
    emoji: "🛒", renk: "bg-green-100", gradient: "from-green-400 to-emerald-300",
    adres: "Bağlarbaşı Mah. No:8, Erdek", telefon: "+90 266 835 00 03",
    aciklama: "Gıda, içecek ve temizlik ürünleri hızlı teslimat. 15 yıldır hizmetinizdeyiz.",
    etiketler: ["Gıda", "İçecek", "Temizlik", "Atıştırmalık"],
    acilis: "07:00", kapanis: "23:00", aktif: true, musaitlik: true,
    badge: "Yeni", badgeRenk: "bg-sky-500",
  },
  {
    id: 7, isim: "Erdek Manav", kategori: "Meyve & Sebze", katKey: "Market",
    puan: 4.7, puanSayisi: 38, sure: "20-30 dk", minSiparis: "60 TL",
    emoji: "🥦", renk: "bg-emerald-100", gradient: "from-emerald-400 to-green-300",
    adres: "Pazar Yeri No:4, Erdek", telefon: "+90 266 835 00 07",
    aciklama: "Her sabah tarladan gelen taze meyve ve sebzeler. Kapınıza teslim.",
    etiketler: ["Meyve", "Sebze", "Taze", "Organik"],
    acilis: "07:00", kapanis: "20:00", aktif: true, musaitlik: true,
    badge: "Taze", badgeRenk: "bg-emerald-500",
  },

  // ── TEKNE ──────────────────────────────────────────────────
  {
    id: 10, isim: "Erdek Mavi Tur", kategori: "Tekne Turu", katKey: "Tekne",
    puan: 4.9, puanSayisi: 73, sure: "Tam Gün", fiyat: 850, fiyatGoster: "₺850/kişi",
    emoji: "⛵", renk: "bg-blue-100", gradient: "from-sky-400 to-blue-300",
    adres: "Erdek İskelesi No:1", telefon: "+90 266 835 00 10",
    aciklama: "Marmara Denizi'nin en güzel koylarını keşfedin. Tam gün konforlu tekne turu.",
    etiketler: ["Tam Gün", "Tekne", "Tur", "Deniz"],
    kapasite: "12 kişi", aktif: true,
  },
  {
    id: 11, isim: "Adalar Keşif Turu", kategori: "Ada Turu", katKey: "Tekne",
    puan: 4.8, puanSayisi: 51, sure: "Yarım Gün", fiyat: 550, fiyatGoster: "₺550/kişi",
    emoji: "🏝️", renk: "bg-sky-100", gradient: "from-cyan-400 to-sky-300",
    adres: "Erdek İskelesi No:2", telefon: "+90 266 835 00 11",
    aciklama: "Marmara Adaları'nı keşfetmek için en uygun yarım gün turu.",
    etiketler: ["Yarım Gün", "Ada", "Keşif"],
    kapasite: "20 kişi", aktif: true,
  },
  {
    id: 12, isim: "Gün Batımı Turu", kategori: "Romantik Tekne Turu", katKey: "Tekne",
    puan: 5.0, puanSayisi: 47, sure: "3 Saat", fiyat: 800, fiyatGoster: "₺800/kişi",
    emoji: "🌅", renk: "bg-orange-100", gradient: "from-orange-400 to-pink-300",
    adres: "Erdek İskelesi No:3", telefon: "+90 266 835 00 12",
    aciklama: "Güneşin Marmara'ya batışını teknenin güvertesinden izleyin.",
    etiketler: ["Gün Batımı", "Romantik", "Akşam"],
    kapasite: "8 kişi", aktif: true,
    badge: "Özel Tur", badgeRenk: "bg-rose-500",
  },

  // ── KONAKLAMA ──────────────────────────────────────────────
  {
    id: 20, isim: "Erdek Sahil Pansiyon", kategori: "Pansiyon", katKey: "Konaklama",
    puan: 4.7, puanSayisi: 34, sure: "Rezervasyon", fiyat: 800, fiyatGoster: "₺800'den",
    emoji: "🏨", renk: "bg-blue-100", gradient: "from-indigo-400 to-blue-300",
    adres: "Sahil Caddesi No:45, Erdek", telefon: "+90 266 835 00 20",
    aciklama: "Sahile sıfır konumuyla deniz manzaralı odalar. Kahvaltı dahil.",
    etiketler: ["Deniz Manzarası", "Kahvaltı Dahil", "Sahil"],
    aktif: true, musaitlik: true,
  },
  {
    id: 21, isim: "Ada Manzara Butik Otel", kategori: "Butik Otel", katKey: "Konaklama",
    puan: 4.9, puanSayisi: 28, sure: "Rezervasyon", fiyat: 1500, fiyatGoster: "₺1.500'den",
    emoji: "🏩", renk: "bg-purple-100", gradient: "from-purple-400 to-indigo-300",
    adres: "Merkez Mah. No:12, Erdek", telefon: "+90 266 835 00 21",
    aciklama: "Butik tasarımı ve mükemmel hizmetiyle Erdek'in en prestijli konaklama seçeneği.",
    etiketler: ["Butik", "Prestijli", "SPA", "Ada Manzarası"],
    aktif: true, musaitlik: true,
  },
  {
    id: 22, isim: "Erdek Apart Otel", kategori: "Apart", katKey: "Konaklama",
    puan: 4.5, puanSayisi: 19, sure: "Rezervasyon", fiyat: 600, fiyatGoster: "₺600'den",
    emoji: "🏠", renk: "bg-green-100", gradient: "from-teal-400 to-green-300",
    adres: "Bağlarbaşı Mah. No:3, Erdek", telefon: "+90 266 835 00 22",
    aciklama: "Tam donanımlı mutfaklı apart daireler. Uzun konaklamalar için ideal.",
    etiketler: ["Mutfaklı", "Apart", "Uzun Konaklama"],
    aktif: true, musaitlik: false,
  },

  // ── YEREL ──────────────────────────────────────────────────
  {
    id: 6, isim: "Yerel Köy Ürünleri", kategori: "Zeytin & Zeytinyağı", katKey: "Yerel",
    puan: 4.9, puanSayisi: 56, sure: "Aynı Gün", minSiparis: "200 TL",
    emoji: "🫒", renk: "bg-lime-100", gradient: "from-lime-400 to-green-300",
    adres: "Merkez Mah. No:7, Erdek", telefon: "+90 266 835 00 06",
    aciklama: "Kapıdağ'ın kendi zeytinlerinden soğuk sıkım zeytinyağı ve sele zeytinler.",
    etiketler: ["Zeytinyağı", "Zeytin", "Organik", "Soğuk Sıkım"],
    aktif: true, organik: true, badge: "Çok Beğenildi", badgeRenk: "bg-orange-500",
  },
  {
    id: 13, isim: "Erdek Balıkçısı", kategori: "Taze Balık", katKey: "Yerel",
    puan: 4.8, puanSayisi: 61, sure: "Aynı Gün", minSiparis: "150 TL",
    emoji: "🐟", renk: "bg-blue-100", gradient: "from-sky-400 to-blue-300",
    adres: "Balıkçı Barınağı, Erdek", telefon: "+90 266 835 00 13",
    aciklama: "Her sabah taze çekilen balıklar doğrudan tekneden sofranıza.",
    etiketler: ["Taze Balık", "Günlük", "Çipura", "Levrek"],
    aktif: true, organik: false, badge: "Günlük Taze", badgeRenk: "bg-blue-500",
  },
  {
    id: 14, isim: "Bağ Evi Peynircisi", kategori: "Peynir & Süt Ürünleri", katKey: "Yerel",
    puan: 4.7, puanSayisi: 43, sure: "Aynı Gün", minSiparis: "100 TL",
    emoji: "🧀", renk: "bg-yellow-100", gradient: "from-yellow-400 to-amber-300",
    adres: "Köy Yolu No:2, Erdek", telefon: "+90 266 835 00 14",
    aciklama: "Kendi keçi ve inek sürüsünden üretilen köy peynirleri, tereyağı ve yoğurt.",
    etiketler: ["Peynir", "Tereyağı", "Yoğurt", "Köy Ürünü"],
    aktif: true, organik: true,
  },
  {
    id: 15, isim: "Erdek Balı", kategori: "Doğal Bal", katKey: "Yerel",
    puan: 5.0, puanSayisi: 29, sure: "Aynı Gün", minSiparis: "120 TL",
    emoji: "🍯", renk: "bg-amber-100", gradient: "from-amber-400 to-yellow-300",
    adres: "Orman Yolu No:5, Erdek", telefon: "+90 266 835 00 15",
    aciklama: "Kapıdağ ormanlarından toplanan çam balı. Hiç katkısız, sertifikalı.",
    etiketler: ["Çam Balı", "Çiçek Balı", "Doğal", "Sertifikalı"],
    aktif: true, organik: true, badge: "⭐ 5.0", badgeRenk: "bg-amber-500",
  },

  // ── HİZMET ─────────────────────────────────────────────────
  {
    id: 30, isim: "Erdek Kuaför & Güzellik", kategori: "Kuaför", katKey: "Hizmet",
    puan: 4.6, puanSayisi: 39, sure: "Randevulu",
    emoji: "💈", renk: "bg-pink-100", gradient: "from-pink-400 to-rose-300",
    adres: "Çarşı Mah. No:9, Erdek", telefon: "+90 266 835 00 30",
    aciklama: "Saç kesim, renklendirme, cilt bakımı ve manikür. Uzman ekibimizle kaliteli hizmet.",
    etiketler: ["Saç", "Cilt Bakımı", "Manikür", "Kadın", "Erkek"],
    acilis: "09:00", kapanis: "20:00", aktif: true,
  },
  {
    id: 31, isim: "Erdek Eczanesi", kategori: "Eczane", katKey: "Hizmet",
    puan: 4.8, puanSayisi: 52, sure: "09:00-22:00",
    emoji: "💊", renk: "bg-green-100", gradient: "from-green-400 to-teal-300",
    adres: "Sahil Caddesi No:3, Erdek", telefon: "+90 266 835 00 31",
    aciklama: "Nöbetçi eczane. İlaç, sağlık malzemeleri ve kozmetik ürünleri.",
    etiketler: ["İlaç", "Sağlık", "Nöbetçi", "Kozmetik"],
    acilis: "09:00", kapanis: "22:00", aktif: true,
  },
  {
    id: 32, isim: "Erdek Fotoğraf Atölyesi", kategori: "Fotoğrafçı", katKey: "Hizmet",
    puan: 4.7, puanSayisi: 27, sure: "10:00-20:00",
    emoji: "📸", renk: "bg-purple-100", gradient: "from-purple-400 to-pink-300",
    adres: "Merkez Mah. No:15, Erdek", telefon: "+90 266 835 00 32",
    aciklama: "Düğün, vesikalık, ürün ve etkinlik fotoğrafçılığı. Profesyonel ekipman.",
    etiketler: ["Düğün", "Vesikalık", "Etkinlik", "Ürün Fotoğrafı"],
    acilis: "10:00", kapanis: "20:00", aktif: true,
  },
];

// ── Yardımcı fonksiyonlar ──────────────────────────────────

export function isletmeGetir(id: number | string): Isletme | undefined {
  return isletmeler.find(i => i.id === Number(id));
}

export function kategoriyeGore(katKey: Isletme["katKey"]): Isletme[] {
  return isletmeler.filter(i => i.aktif && i.katKey === katKey);
}

export function tumAktifIsletmeler(): Isletme[] {
  return isletmeler.filter(i => i.aktif);
}

export function aramaYap(q: string): Isletme[] {
  const k = q.toLowerCase().trim();
  if (!k) return [];
  return isletmeler.filter(i =>
    i.aktif && (
      i.isim.toLowerCase().includes(k) ||
      i.kategori.toLowerCase().includes(k) ||
      i.etiketler.some(e => e.toLowerCase().includes(k)) ||
      i.aciklama.toLowerCase().includes(k)
    )
  );
}

function kategoriMap(k: string): Isletme["katKey"] {
  const m: Record<string, Isletme["katKey"]> = {
    "Restoran / Kafe": "Yemek", "Market / Bakkal": "Market",
    "Tekne Turu": "Tekne", "Konaklama / Pansiyon": "Konaklama",
    "Yerel Ürünler": "Yerel", "Kuaför / Güzellik": "Hizmet",
    "Eczane": "Hizmet", "Diğer Hizmetler": "Hizmet",
  };
  return m[k] || "Hizmet";
}

function kategoriEmoji(k: string): string {
  const m: Record<string, string> = {
    "Restoran / Kafe": "🍽️", "Market / Bakkal": "🛒",
    "Tekne Turu": "⛵", "Konaklama / Pansiyon": "🏨",
    "Yerel Ürünler": "🫒", "Kuaför / Güzellik": "💈",
    "Eczane": "💊", "Diğer Hizmetler": "🔧",
  };
  return m[k] || "🏪";
}

/** localStorage'daki onaylı başvuruları dinamik olarak ekler */
export function dinamikIsletmeleriGetir(): Isletme[] {
  if (typeof window === "undefined") return isletmeler.filter(i => i.aktif);
  try {
    const basvurular: Array<{
      isletmeAdi: string; kategori: string; aciklama: string;
      acilis: string; kapanis: string; telefon: string; adres: string; durum: string;
    }> = JSON.parse(localStorage.getItem("erdekonline_basvurular") || "[]");
    const mevcutIsimler = new Set(isletmeler.map(i => i.isim.toLowerCase()));
    const yeniler: Isletme[] = basvurular
      .filter(b => b.durum === "onaylandi" && !mevcutIsimler.has(b.isletmeAdi.toLowerCase()))
      .map((b, idx) => ({
        id: 1000 + idx,
        isim: b.isletmeAdi,
        kategori: b.kategori,
        katKey: kategoriMap(b.kategori),
        puan: 0, puanSayisi: 0,
        sure: `${b.acilis} – ${b.kapanis}`,
        emoji: kategoriEmoji(b.kategori),
        renk: "bg-gray-100", gradient: "from-gray-400 to-gray-300",
        adres: b.adres, telefon: b.telefon,
        aciklama: b.aciklama || `${b.isletmeAdi} — ErdekOnline'da yeni işletme.`,
        etiketler: [b.kategori],
        acilis: b.acilis, kapanis: b.kapanis,
        aktif: true, badge: "Yeni", badgeRenk: "bg-sky-500",
      }));
    return [...isletmeler.filter(i => i.aktif), ...yeniler];
  } catch {
    return isletmeler.filter(i => i.aktif);
  }
}

