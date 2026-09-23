import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Erdek Rehberi — Blog | ErdekOnline",
  description: "Erdek hakkında her şey: gezi rehberleri, plajlar, yemek, konaklama ve tekne turları. Erdek'i keşfetmek için ErdekOnline Blog.",
  keywords: "erdek blog, erdek rehberi, erdek tatil, erdek gezi, erdek nerede, erdek plajları",
  openGraph: {
    title: "Erdek Rehberi — Blog | ErdekOnline",
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

  return <BlogListClient posts={sorted} categories={categories} />;
}