"use client";
import { Star, Clock, Tag, Flame, ChevronRight } from "lucide-react";
import Link from "next/link";

const businesses = [
  {
    id: 1,
    name: "Kalamar Balık Restaurant",
    category: "Balık & Deniz Ürünleri",
    rating: 4.9,
    reviewCount: 128,
    deliveryTime: "25-40 dk",
    minOrder: "150 TL",
    image: "🐟",
    bgColor: "bg-blue-100",
    tags: ["Taze Balık", "Deniz Ürünleri", "Meze"],
    badge: "Çok Beğenildi",
    badgeColor: "bg-orange-500",
    discount: null,
  },
  {
    id: 2,
    name: "Erdek Pide & Lahmacun",
    category: "Pide & Lahmacun",
    rating: 4.7,
    reviewCount: 95,
    deliveryTime: "20-35 dk",
    minOrder: "80 TL",
    image: "🍕",
    bgColor: "bg-orange-100",
    tags: ["Pide", "Lahmacun", "Fırın"],
    badge: "Hızlı Teslimat",
    badgeColor: "bg-green-500",
    discount: "%10 İndirim",
  },
  {
    id: 3,
    name: "Şevket Market",
    category: "Market & Bakkal",
    rating: 4.6,
    reviewCount: 67,
    deliveryTime: "15-25 dk",
    minOrder: "50 TL",
    image: "🛒",
    bgColor: "bg-green-100",
    tags: ["Gıda", "İçecek", "Temizlik"],
    badge: "Yeni",
    badgeColor: "bg-sky-500",
    discount: null,
  },
  {
    id: 4,
    name: "Erdek Burger & Döner",
    category: "Burger & Fast Food",
    rating: 4.5,
    reviewCount: 44,
    deliveryTime: "20-30 dk",
    minOrder: "100 TL",
    image: "🍔",
    bgColor: "bg-yellow-100",
    tags: ["Burger", "Döner", "Sandviç"],
    badge: null,
    badgeColor: "",
    discount: "%15 İndirim",
  },
  {
    id: 5,
    name: "Tatlı Dükkanı Erdek",
    category: "Tatlı & Pasta",
    rating: 4.8,
    reviewCount: 82,
    deliveryTime: "30-45 dk",
    minOrder: "120 TL",
    image: "🍰",
    bgColor: "bg-pink-100",
    tags: ["Baklava", "Pasta", "Dondurma"],
    badge: "Öne Çıkan",
    badgeColor: "bg-purple-500",
    discount: null,
  },
  {
    id: 6,
    name: "Yerel Köy Ürünleri",
    category: "Yerel & Organik",
    rating: 4.9,
    reviewCount: 56,
    deliveryTime: "Aynı Gün",
    minOrder: "200 TL",
    image: "🫒",
    bgColor: "bg-lime-100",
    tags: ["Zeytin", "Peynir", "Bal"],
    badge: "Çok Beğenildi",
    badgeColor: "bg-orange-500",
    discount: null,
  },
];

export default function FeaturedBusinesses() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame size={18} className="text-orange-500" />
            <span className="text-orange-500 font-semibold text-sm">Popüler</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900">Öne Çıkan İşletmeler</h2>
          <p className="text-gray-500 text-base mt-1">Erdek&apos;in en çok tercih edilen işletmeleri</p>
        </div>
        <Link
          href="/isletmeler"
          className="flex items-center gap-1 text-sky-600 font-semibold text-sm hover:text-sky-700 transition-colors"
        >
          Tümünü Gör <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((biz) => (
          <Link
            key={biz.id}
            href={`/isletme/${biz.id}`}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-0.5 transition-all group cursor-pointer"
          >
            <div className={`relative h-52 ${biz.bgColor} flex items-center justify-center`}>
              <span className="text-8xl group-hover:scale-110 transition-transform duration-300">
                {biz.image}
              </span>
              {biz.badge && (
                <div className={`absolute top-3 left-3 ${biz.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                  {biz.badge}
                </div>
              )}
              {biz.discount && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Tag size={10} /> {biz.discount}
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-sky-600 transition-colors">
                {biz.name}
              </h3>
              <p className="text-gray-500 text-sm mb-3">{biz.category}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {biz.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-700">{biz.rating}</span>
                  <span className="text-gray-400">({biz.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} /> {biz.deliveryTime}
                </div>
                <div className="font-medium">Min: {biz.minOrder}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}