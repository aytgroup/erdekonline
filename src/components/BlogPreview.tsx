import Link from "next/link";
import { blogPosts } from "@/lib/blog";

const gradients = [
  "from-sky-400 to-blue-500",
  "from-emerald-400 to-teal-500",
  "from-orange-400 to-amber-500",
  "from-purple-400 to-violet-500",
];

export default function BlogPreview() {
  const sorted = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const featured = sorted[0];
  const rest = sorted.slice(1, 4);

  return (
    <section className="py-14 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Başlık */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sky-600 text-xs font-bold uppercase tracking-widest">📝 Blog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Erdek Rehberi</h2>
            <p className="text-gray-500 text-sm mt-1">{blogPosts.length}+ makale — gezi, yemek, plaj ve yerel ipuçları</p>
          </div>
          <Link href="/blog" className="hidden sm:inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 font-bold text-sm transition-colors bg-sky-50 px-4 py-2 rounded-full hover:bg-sky-100">
            Tümünü Gör →
          </Link>
        </div>

        {/* Featured + grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Öne çıkan büyük kart */}
          <Link href={`/blog/${featured.slug}`} className="group lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">
            <div className={`bg-gradient-to-br ${gradients[0]} flex items-center justify-center sm:w-52 h-48 sm:h-auto text-7xl shrink-0`}>
              {featured.coverEmoji}
            </div>
            <div className="p-6 flex flex-col justify-center">
              <span className="inline-block bg-sky-100 text-sky-700 text-xs font-bold px-2.5 py-1 rounded-full mb-3 self-start">{featured.category}</span>
              <h3 className="text-gray-900 font-black text-lg leading-snug mb-2 group-hover:text-sky-600 transition-colors line-clamp-3">{featured.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">{featured.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>📅 {new Date(featured.date).toLocaleDateString("tr-TR", { day: "numeric", month: "long" })}</span>
                <span>⏱️ {featured.readTime} dk</span>
              </div>
            </div>
          </Link>

          {/* 3 küçük kart */}
          <div className="flex flex-col gap-4">
            {rest.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex items-center gap-4 p-4">
                <div className={`bg-gradient-to-br ${gradients[(i + 1) % gradients.length]} flex items-center justify-center w-14 h-14 rounded-xl text-3xl shrink-0`}>
                  {post.coverEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-sky-600">{post.category}</span>
                  <h3 className="text-gray-900 font-bold text-sm leading-snug group-hover:text-sky-600 transition-colors line-clamp-2 mt-0.5">{post.title}</h3>
                  <span className="text-xs text-gray-400">⏱️ {post.readTime} dk</span>
                </div>
              </Link>
            ))}
            <Link href="/blog" className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm text-center py-3 rounded-2xl transition-colors">
              {blogPosts.length}+ Makaleyi Gör →
            </Link>
          </div>
        </div>

        <div className="mt-4 text-center sm:hidden">
          <Link href="/blog" className="text-sky-600 font-semibold text-sm hover:underline">Tüm yazıları gör →</Link>
        </div>
      </div>
    </section>
  );
}