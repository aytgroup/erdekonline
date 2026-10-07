// ============================================================
// ErdekOnline — Sipariş Yönetim Katmanı
// Siparişler localStorage'da paylaşımlı key ile saklanır.
// İşletme paneli ve kullanıcı siparişleri aynı kaynaktan beslenir.
// ============================================================

export interface SiparisUrun {
  isim: string;
  adet: number;
  fiyat: number;
  emoji?: string;
}

export interface Siparis {
  id: string;
  tarih: string;
  kullaniciEmail?: string;
  isletmeAdi: string;
  isletmeId?: number;
  urunler: SiparisUrun[];
  toplam: number;
  durum: "hazirlaniyor" | "yolda" | "teslim_edildi" | "iptal";
  teslimat?: {
    ad: string;
    telefon: string;
    adres: string;
    not: string;
  };
}

const ANAHTAR = "eo_siparisler_v2";

export function siparisleriGetir(): Siparis[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(ANAHTAR) || "[]");
  } catch { return []; }
}

export function sipariisKaydet(siparis: Siparis): void {
  const liste = siparisleriGetir();
  localStorage.setItem(ANAHTAR, JSON.stringify([siparis, ...liste]));
  // Gerçek zamanlı güncelleme için event yayınla
  window.dispatchEvent(new CustomEvent("eo_yeni_siparis", { detail: siparis }));
}

export function siparisGuncelle(id: string, durum: Siparis["durum"]): void {
  const liste = siparisleriGetir().map(s => s.id === id ? { ...s, durum } : s);
  localStorage.setItem(ANAHTAR, JSON.stringify(liste));
  window.dispatchEvent(new CustomEvent("eo_siparis_guncellendi", { detail: { id, durum } }));
}

/** Belirli bir işletmenin siparişlerini getir */
export function isletmeSiparisleri(isletmeAdi: string): Siparis[] {
  return siparisleriGetir().filter(s =>
    s.isletmeAdi.toLowerCase() === isletmeAdi.toLowerCase()
  );
}

/** Belirli bir kullanıcının siparişlerini getir */
export function kullaniciSiparisleri(email: string): Siparis[] {
  return siparisleriGetir().filter(s => s.kullaniciEmail === email);
}

/** İstatistik hesapla */
export function isletmeIstatistik(isletmeAdi: string) {
  const siparisler = isletmeSiparisleri(isletmeAdi);
  const toplam = siparisler.reduce((acc, s) => acc + s.toplam, 0);
  const teslim = siparisler.filter(s => s.durum === "teslim_edildi").length;
  return {
    toplamSiparis: siparisler.length,
    teslimEdilen: teslim,
    toplamKazanc: toplam,
    aktifSiparis: siparisler.filter(s => s.durum === "hazirlaniyor" || s.durum === "yolda").length,
  };
}

/** Eski format siparişleri yeni formata taşı */
export function eski_siparisleriTasi(): void {
  if (typeof window === "undefined") return;
  try {
    const eski = localStorage.getItem("eo_siparisler");
    const yeni = localStorage.getItem(ANAHTAR);
    if (eski && !yeni) {
      localStorage.setItem(ANAHTAR, eski);
    }
  } catch { /* sessiz */ }
}
