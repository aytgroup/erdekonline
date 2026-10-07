// ============================================================
// ErdekOnline — Yorum Sistemi
// Yorumlar paylaşımlı bir key'de saklanır.
// Tüm kullanıcılar aynı yorumları görebilir.
// ============================================================

export interface Yorum {
  id: string;
  isletmeId: number;
  kullaniciAd: string;
  puan: number; // 1-5
  yorum: string;
  tarih: string;
  onaylandi: boolean;
}

const ANAHTAR = "eo_yorumlar_v2";

export function yorumlariGetir(isletmeId: number): Yorum[] {
  if (typeof window === "undefined") return [];
  try {
    const tumYorumlar: Yorum[] = JSON.parse(localStorage.getItem(ANAHTAR) || "[]");
    return tumYorumlar.filter(y => y.isletmeId === isletmeId && y.onaylandi);
  } catch { return []; }
}

export function yorumEkle(yorum: Omit<Yorum, "id" | "tarih" | "onaylandi">): Yorum {
  const yeni: Yorum = {
    ...yorum,
    id: crypto.randomUUID(),
    tarih: new Date().toLocaleString("tr-TR"),
    onaylandi: true, // Gercek sistemde admin onayi gerekebilir
  };
  try {
    const mevcut: Yorum[] = JSON.parse(localStorage.getItem(ANAHTAR) || "[]");
    localStorage.setItem(ANAHTAR, JSON.stringify([yeni, ...mevcut]));
    window.dispatchEvent(new CustomEvent("eo_yorum_eklendi", { detail: yeni }));
  } catch { /* */ }
  return yeni;
}

export function ortalamaHesapla(isletmeId: number): number {
  const yorumlar = yorumlariGetir(isletmeId);
  if (yorumlar.length === 0) return 0;
  const toplam = yorumlar.reduce((acc, y) => acc + y.puan, 0);
  return Math.round((toplam / yorumlar.length) * 10) / 10;
}

/** Eski format yorumları taşı */
export function eskiYorumlariTasi(isletmeId: number): void {
  if (typeof window === "undefined") return;
  try {
    const eskiKey = `eo_yorumlar_${isletmeId}`;
    const eski = localStorage.getItem(eskiKey);
    if (!eski) return;
    const eskiYorumlar = JSON.parse(eski);
    const mevcut: Yorum[] = JSON.parse(localStorage.getItem(ANAHTAR) || "[]");
    const eskiIds = new Set(mevcut.filter(y => y.isletmeId === isletmeId).map(y => y.id));
    const donusturulmus: Yorum[] = eskiYorumlar
      .filter((y: { id: string }) => !eskiIds.has(y.id))
      .map((y: { id: string; kullaniciAd: string; puan: number; yorum: string; tarih: string }) => ({
        ...y,
        isletmeId,
        onaylandi: true,
      }));
    if (donusturulmus.length > 0) {
      localStorage.setItem(ANAHTAR, JSON.stringify([...donusturulmus, ...mevcut]));
    }
    localStorage.removeItem(eskiKey);
  } catch { /* */ }
}
