import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export default function BlogPreview() {
  const latest = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sky-600 text-xs font-bold uppercase tracking-widest mb-1">Blog</p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Erdek Rehberi</h2>
            <p className="text-gray-500 text-sm mt-1">Erdek hakkında gezi rehberleri, plaj tavsiyeleri ve ipuçları.</p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 font-semibold text-sm transition-colors"
          >
            Tüm yazılar →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <div className="bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center h-28 text-4xl">
                {post.coverEmoji}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wide mb-1">
                  {post.category}
                </span>
                <h3 className="text-gray-900 font-bold text-sm leading-snug mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-xs flex-1 line-clamp-2">{post.description}</p>
                <span className="mt-3 text-xs text-gray-400">{post.readTime} dk okuma</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/blog" className="text-sky-600 font-semibold text-sm hover:underline">
            Tüm yazıları gör →
          </Link>
        </div>
      </div>
    </section>
  );
}