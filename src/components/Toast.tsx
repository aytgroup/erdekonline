"use client";

import { useEffect, useState } from "react";
import { CheckCircle, X, AlertCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  mesaj: string;
  tip?: ToastType;
  sure?: number; // ms
  onKapat: () => void;
}

export function Toast({ mesaj, tip = "success", sure = 3000, onKapat }: ToastProps) {
  const [gorunur, setGorunur] = useState(false);

  useEffect(() => {
    setTimeout(() => setGorunur(true), 10);
    const t = setTimeout(() => { setGorunur(false); setTimeout(onKapat, 300); }, sure);
    return () => clearTimeout(t);
  }, [sure, onKapat]);

  const renkler = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-sky-500",
  };
  const ikonlar = {
    success: <CheckCircle size={18} />,
    error: <AlertCircle size={18} />,
    info: <Info size={18} />,
  };

  return (
    <div className={`fixed bottom-24 right-6 z-[100] flex items-center gap-3 ${renkler[tip]} text-white px-5 py-3.5 rounded-2xl shadow-lg shadow-black/20 max-w-xs transition-all duration-300 ${gorunur ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      {ikonlar[tip]}
      <span className="text-sm font-semibold flex-1">{mesaj}</span>
      <button onClick={() => { setGorunur(false); setTimeout(onKapat, 300); }} className="text-white/70 hover:text-white">
        <X size={15} />
      </button>
    </div>
  );
}

// Kullanımı kolay hook
import { useCallback } from "react";

export function useToast() {
  const [toastlar, setToastlar] = useState<{ id: number; mesaj: string; tip: ToastType }[]>([]);

  const goster = useCallback((mesaj: string, tip: ToastType = "success") => {
    const id = Date.now();
    setToastlar(prev => [...prev, { id, mesaj, tip }]);
  }, []);

  const kapat = useCallback((id: number) => {
    setToastlar(prev => prev.filter(t => t.id !== id));
  }, []);

  const ToastContainer = (
    <div className="fixed bottom-24 right-6 z-[100] flex flex-col gap-2">
      {toastlar.map(t => (
        <Toast key={t.id} mesaj={t.mesaj} tip={t.tip} onKapat={() => kapat(t.id)} />
      ))}
    </div>
  );

  return { goster, ToastContainer };
}