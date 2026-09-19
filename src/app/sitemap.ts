import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://erdekonline.com";
  const now = new Date();

  const sayfalar = [
    { url: "/", priority: 1.0, changeFrequency: "daily" },
    { url: "/yemek", priority: 0.9, changeFrequency: "daily" },
    { url: "/market", priority: 0.9, changeFrequency: "daily" },
    { url: "/tekne", priority: 0.9, changeFrequency: "weekly" },
    { url: "/konaklama", priority: 0.9, changeFrequency: "weekly" },
    { url: "/yerel", priority: 0.9, changeFrequency: "weekly" },
    { url: "/hizmetler", priority: 0.8, changeFrequency: "weekly" },
    { url: "/etkinlikler", priority: 0.8, changeFrequency: "daily" },
    { url: "/isletmeler", priority: 0.9, changeFrequency: "daily" },
    { url: "/ara", priority: 0.7, changeFrequency: "daily" },
    { url: "/giris", priority: 0.5, changeFrequency: "monthly" },
    { url: "/destek", priority: 0.7, changeFrequency: "monthly" },
    { url: "/hakkimizda", priority: 0.6, changeFrequency: "monthly" },
    { url: "/fiyatlandirma", priority: 0.7, changeFrequency: "monthly" },
    { url: "/isletme-kayit", priority: 0.8, changeFrequency: "monthly" },
    { url: "/isletme-bilgi", priority: 0.7, changeFrequency: "monthly" },
    { url: "/gizlilik", priority: 0.3, changeFrequency: "yearly" },
    { url: "/kullanim-kosullari", priority: 0.3, changeFrequency: "yearly" },
    { url: "/kvkk", priority: 0.3, changeFrequency: "yearly" },
  ];

  const isletmeIdler = [1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22];

  return [
    ...sayfalar.map(s => ({
      url: `${base}${s.url}`,
      lastModified: now,
      changeFrequency: s.changeFrequency as MetadataRoute.Sitemap[0]["changeFrequency"],
      priority: s.priority,
    })),
    ...isletmeIdler.map(id => ({
      url: `${base}/isletme/${id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}