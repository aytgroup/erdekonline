import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Erdek Rehberi | ErdekOnline",
  description: "Erdek hakkında her şey: gezi rehberleri, plajlar, yemek, konaklama ve tekne turları. Erdek'i keşfetmek için ErdekOnline Blog.",
  keywords: "erdek blog, erdek rehberi, erdek tatil, erdek gezi, erdek nerede, erdek plajları",
  openGraph: {
    title: "Blog — Erdek Rehberi | ErdekOnline",
    description: "Erdek hakkında gezi rehberleri, plajlar, yemek ve konaklama ipuçları.",
    url: "https://erdekonline.com/blog",
  },
  alternates: { canonical: "https://erdekonline.com/blog" },
};

export default function BlogListPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const categories = Array.from(new Set(blogPosts.map((p) => p.category)));

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-600 to-blue-700 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sky-200 text-sm font-semibold uppercase tracking-widest mb-2">ErdekOnline Blog</p>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">Erdek Rehberi</h1>
          <p className="text-sky-100 text-base sm:text-lg max-w-2xl mx-auto">
            Erdek&apos;e dair gezi rehberleri, plaj tavsiyeleri, yemek önerileri ve yerel ipuçları.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto w-full px-4 py-10">

        {/* Kategori filtreleri */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <span
              key={cat}
              className="bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Yazı grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              {/* Kapak */}
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
      </div>

      <Footer />
    </main>
  );
}