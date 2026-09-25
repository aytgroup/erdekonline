"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { BlogPost } from "@/lib/blog";

interface Props {
  posts: BlogPost[];
  categories: string[];
}

const categoryColors: Record<string, string> = {
  "Gezi Rehberi": "bg-emerald-100 text-emerald-700",
  "Plaj & Deniz": "bg-cyan-100 text-cyan-700",
  "Yemek & Lezzet": "bg-orange-100 text-orange-700",
  "Tekne & Deniz": "bg-blue-100 text-blue-700",
  "Konaklama": "bg-purple-100 text-purple-700",
  "Erdek Rehberi": "bg-sky-100 text-sky-700",
  "Aktiviteler": "bg-green-100 text-green-700",
  "Pratik Bilgiler": "bg-yellow-100 text-yellow-700",
  "Yerel Ürünler": "bg-lime-100 text-lime-700",
  "Tatil Rehberi": "bg-rose-100 text-rose-700",
};
function getCategoryColor(cat: string) {
  return categoryColors[cat] || "bg-gray-100 text-gray-700";
}
const gradients = [
  "from-sky-400 to-blue-500","from-emerald-400 to-teal-500","from-orange-400 to-amber-500",
  "from-purple-400 to-violet-500","from-rose-400 to-pink-500","from-cyan-400 to-sky-500",
  "from-lime-400 to-green-500","from-yellow-400 to-orange-500",
];
function getGradient(i: number) { return gradients[i % gradients.length]; }

function PostCard({ post, index, featured = false }: { post: BlogPost; index: number; featured?: boolean }) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group col-span-1 sm:col-span-2 lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">
        <div className={`bg-gradient-to-br ${getGradient(index)} flex items-center justify-center sm:w-72 h-52 sm:h-auto text-8xl shrink-0`}>{post.coverEmoji}</div>
        <div className="p-7 flex flex-col justify-center flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getCategoryColor(post.category)}`}>{post.category}</span>
            <span className="text-xs text-amber-500 font-semibold">⭐ Öne Çıkan</span>
          </div>
          <h2 className="text-gray-900 font-black text-2xl leading-snug mb-3 group-hover:text-sky-600 transition-colors">{post.title}</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
            <span>📅 {new Date(post.date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span>⏱️ {post.readTime} dk okuma</span>
          </div>
          <span className="inline-flex items-center gap-1 text-sky-600 font-bold text-sm group-hover:gap-2 transition-all">Devamını Oku →</span>
        </div>
      </Link>
    );
  }
  return (
    <Link href={`/blog/${post.slug}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <div className={`bg-gradient-to-br ${getGradient(index)} flex items-center justify-center h-36 text-6xl`}>{post.coverEmoji}</div>
      <div className="p-5 flex flex-col flex-1">
        <span className={`self-start text-xs font-bold px-2.5 py-1 rounded-full mb-2 ${getCategoryColor(post.category)}`}>{post.category}</span>
        <h2 className="text-gray-900 font-bold text-sm leading-snug mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">{post.title}</h2>
        <p className="text-gray-500 text-xs leading-relaxed flex-1 line-clamp-3">{post.description}</p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
          <span>{new Date(post.date).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}</span>
          <span>⏱️ {post.readTime} dk</span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogListClient({ posts, categories }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchCat = activeCategory ? post.category === activeCategory : true;
      const q = search.toLowerCase();
      const matchSearch =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.keywords.some((k) => k.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [posts, search, activeCategory]);

  const isFiltering = search !== "" || activeCategory !== null;
  const displayed = isFiltering || showAll ? filtered : filtered.slice(0, 13);
  const hasMore = !isFiltering && !showAll && filtered.length > 13;
  const popularTags = ["Erdek tatil","Kapıdağ","tekne turu","plaj","konaklama","yemek","gezi rehberi","zeytinyağı","balık","Marmara"];

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <section className="bg-gradient-to-br from-sky-700 via-sky-600 to-blue-700 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">📝 <span>{posts.length}+ Makale</span></div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">Erdek Rehberi &amp; Blog</h1>
          <p className="text-sky-100 text-lg max-w-2xl mx-auto mb-8">Erdek tatili için ihtiyacınız olan her şey: gezi rehberleri, plaj tavsiyeleri, yemek önerileri ve yerel ipuçları.</p>
          <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-300">🔍</span>
              <input type="text" placeholder="Plaj, yemek, tekne turu, konaklama..." value={search}
                onChange={(e) => { setSearch(e.target.value); setShowAll(true); }}
                className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/15 border border-white/30 text-white placeholder-sky-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-base" />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {popularTags.map((tag) => (
              <button key={tag} onClick={() => { setSearch(tag); setShowAll(true); }}
                className="bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors">{tag}</button>
            ))}
          </div>
        </div>
      </section>
      <div className="bg-white border-b border-gray-100 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <span>📚 <strong className="text-gray-800">{posts.length}</strong> makale</span>
          <span>🏷️ <strong className="text-gray-800">{categories.length}</strong> kategori</span>
          <span>✍️ <strong className="text-gray-800">ErdekOnline</strong> editörü</span>
          <span>🔄 Düzenli güncelleniyor</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => { setActiveCategory(null); setShowAll(false); }}
            className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${activeCategory === null ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200" : "bg-white border-gray-200 text-gray-600 hover:border-sky-400 hover:text-sky-600"}`}>
            🌊 Tümü ({posts.length})
          </button>
          {categories.map((cat) => {
            const count = posts.filter((p) => p.category === cat).length;
            return (
              <button key={cat} onClick={() => { setActiveCategory(activeCategory === cat ? null : cat); setShowAll(true); }}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${activeCategory === cat ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200" : "bg-white border-gray-200 text-gray-600 hover:border-sky-400 hover:text-sky-600"}`}>
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {isFiltering && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">{filtered.length}</span> makale bulundu
              {activeCategory && <span> — <span className="text-sky-600 font-semibold">{activeCategory}</span></span>}
              {search && <span> — &quot;<span className="text-sky-600">{search}</span>&quot;</span>}
            </p>
            <button onClick={() => { setSearch(""); setActiveCategory(null); setShowAll(false); }}
              className="text-xs text-red-500 font-semibold border border-red-200 px-3 py-1 rounded-full hover:bg-red-50 transition-colors">✕ Temizle</button>
          </div>
        )}

        {displayed.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="font-bold text-gray-600 text-lg mb-2">Sonuç bulunamadı</p>
            <p className="text-sm text-gray-400 mb-6">Farklı bir arama terimi veya kategori deneyin.</p>
            <button onClick={() => { setSearch(""); setActiveCategory(null); setShowAll(false); }}
              className="bg-sky-600 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-sky-700 transition-colors text-sm">Tüm Yazıları Gör</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} featured={i === 0 && !isFiltering && !showAll} />
              ))}
            </div>
            {hasMore && (
              <div className="text-center mt-10">
                <button onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-lg shadow-sky-200 text-sm">
                  Tüm {posts.length} Makaleyi Gör ↓
                </button>
                <p className="text-xs text-gray-400 mt-2">{posts.length - 13} makale daha var</p>
              </div>
            )}
          </>
        )}

        <div className="mt-16 bg-gradient-to-br from-sky-600 to-blue-700 rounded-3xl p-8 text-white text-center">
          <div className="text-4xl mb-3">🌊</div>
          <h3 className="text-2xl font-black mb-2">Erdek&apos;i Keşfetmeye Hazır mısın?</h3>
          <p className="text-sky-100 mb-6 text-sm max-w-md mx-auto">Yemek siparişi, tekne turu rezervasyonu, konaklama — hepsi ErdekOnline&apos;da.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/yemek" className="bg-white text-sky-700 font-bold px-5 py-2.5 rounded-full text-sm hover:bg-sky-50 transition-colors">🍽️ Yemek Sipariş Et</Link>
            <Link href="/tekne" className="bg-white/15 border border-white/40 text-white font-bold px-5 py-2.5 rounded-full text-sm hover:bg-white/25 transition-colors">⛵ Tekne Turu</Link>
            <Link href="/konaklama" className="bg-white/15 border border-white/40 text-white font-bold px-5 py-2.5 rounded-full text-sm hover:bg-white/25 transition-colors">🏨 Konaklama Bul</Link>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
