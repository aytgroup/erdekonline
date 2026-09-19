import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPost, getAllSlugs, blogPosts } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ErdekOnline Blog`,
    description: post.description,
    keywords: post.keywords.join(", "),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://erdekonline.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      siteName: "ErdekOnline",
    },
    alternates: { canonical: `https://erdekonline.com/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "ErdekOnline" },
    publisher: {
      "@type": "Organization",
      name: "ErdekOnline",
      url: "https://erdekonline.com",
    },
    url: `https://erdekonline.com/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-600 to-blue-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sky-200 text-sm mb-3">
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span>{post.category}</span>
          </div>
          <div className="text-5xl mb-4">{post.coverEmoji}</div>
          <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-3">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sky-200 text-sm">
            <span>
              {new Date(post.date).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>·</span>
            <span>{post.readTime} dakika okuma</span>
          </div>
        </div>
      </section>

      {/* İçerik */}
      <div className="max-w-3xl mx-auto w-full px-4 py-10">
        <article
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 prose prose-gray prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h3:text-lg prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-8 bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="text-4xl">🌊</div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-bold text-gray-800 mb-1">Erdek&apos;i Keşfetmeye Hazır mısın?</p>
            <p className="text-gray-500 text-sm">
              Yemek siparişi, konaklama, tekne turu — hepsi ErdekOnline&apos;da.
            </p>
          </div>
          <Link
            href="/"
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors whitespace-nowrap"
          >
            ErdekOnline&apos;a Git
          </Link>
        </div>

        {/* İlgili Yazılar */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-gray-800 mb-4">İlgili Yazılar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow group"
                >
                  <div className="text-2xl mb-2">{p.coverEmoji}</div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-sky-600 transition-colors line-clamp-2">
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="text-sky-600 hover:text-sky-700 text-sm font-semibold transition-colors"
          >
            ← Tüm yazılara dön
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}