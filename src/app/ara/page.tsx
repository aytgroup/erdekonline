"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";

function AraContent() {
  const params = useSearchParams();
  const q = params.get("q") || "";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Üst bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-sky-600 transition-colors">
            <ArrowLeft size={22} />
          </Link>
          <div className="flex-1 flex items-center bg-gray-100 rounded-xl px-4 py-2.5 gap-3">
            <Search size={18} className="text-gray-400" />
            <span className="text-gray-800 font-medium">{q}</span>
          </div>
        </div>
      </div>

      {/* Sonuçlar */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-black text-gray-800 mb-3">
          &ldquo;{q}&rdquo; için sonuçlar
        </h2>
        <p className="text-gray-500 mb-8">
          Arama sistemi yakında aktif olacak. Şimdilik kategorilere göz atabilirsiniz.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors"
        >
          <ArrowLeft size={16} /> Ana Sayfaya Dön
        </Link>
      </div>
    </main>
  );
}

export default function AraPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Yükleniyor...</div>}>
      <AraContent />
    </Suspense>
  );
}