export interface Basvuru {
  id: string;
  tarih: string;
  durum: "yeni" | "goruldu" | "onaylandi" | "reddedildi";
  // Step1
  isletmeAdi: string;
  kategori: string;
  aciklama: string;
  acilis: string;
  kapanis: string;
  // Step2
  yetkili: string;
  telefon: string;
  eposta: string;
  adres: string;
}

const STORAGE_KEY = "erdekonline_basvurular";

export function basvuruKaydet(data: Omit<Basvuru, "id" | "tarih" | "durum">): Basvuru {
  const yeni: Basvuru = {
    ...data,
    id: crypto.randomUUID(),
    tarih: new Date().toISOString(),
    durum: "yeni",
  };
  const mevcut = basvurulariGetir();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([yeni, ...mevcut]));
  return yeni;
}

export function basvurulariGetir(): Basvuru[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function durumGuncelle(id: string, durum: Basvuru["durum"]): void {
  const liste = basvurulariGetir().map((b) => b.id === id ? { ...b, durum } : b);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(liste));
}

export function basvuruSil(id: string): void {
  const liste = basvurulariGetir().filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(liste));
}