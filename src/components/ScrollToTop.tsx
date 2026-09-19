"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [gorunur, setGorunur] = useState(false);

  useEffect(() => {
    const handleScroll = () => setGorunur(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!gorunur) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Yukarı çık"
      className="fixed bottom-24 left-6 z-50 w-11 h-11 bg-white border border-gray-200 shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all hover:-translate-y-0.5"
    >
      <ChevronUp size={20} />
    </button>
  );
}