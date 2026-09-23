"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { BlogPost } from "@/lib/blog";

interface Props {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogListClient({ posts, categories }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-600 to-blue-700 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sky-200 text-sm font-semibold uppercase tracking-widest mb-2">
            ErdekOnline Blog
          </p>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">Erdek Rehberi</h1>
          <p className="text-sky-100 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Erdek&apos;e dair gezi rehberleri, plaj tavsiyeleri, yemek önerileri ve yerel ipuçları.
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-300 text-lg">🔍</span>
              <input
                type="text"
                placeholder="Yazı ara... (plaj, yemek, tekne...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-white/10 border border-white/30 text-white placeholder-sky-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto w-full px-4 py-8">
        {/* Kategori filtreleri */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
              activeCategory === null
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white border-gray-200 text-gray-600 hover:border-sky-400 hover:text-sky-600"
            }`}
          >
            Tümü ({posts.length})
          </button>
          {categories.map((cat) => {
            const count = posts.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-white border-gray-200 text-gray-600 hover:border-sky-400 hover:text-sky-600"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Sonuç bilgisi */}
        {(search || activeCategory) && (
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-semibold text-gray-700">{filtered.length}</span> yazı bulundu
            {activeCategory && <span> — <span className="text-sky-600">{activeCategory}</span></span>}
            {search && <span> — &quot;<span className="text-sky-600">{search}</span>&quot;</span>}
          </p>
        )}

        {/* Yazı grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-semibold text-gray-500 mb-1">Sonuç bulunamadı</p>
            <p className="text-sm text-gray-400">Farklı bir arama terimi veya kategori deneyin.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory(null); }}
              className="mt-4 text-sky-600 text-sm font-semibold hover:underline"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                <div className="bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center h-32 text-5xl">
                  {post.coverEmoji}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-wide mb-1">
                    {post.category}
                  </span>
                  <h2 className="text-gray-900 font-bold text-base leading-snug mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
                    <span>
                      {new Date(post.date).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span>{post.readTime} dk okuma</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
