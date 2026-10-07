import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, sifre } = await req.json();
    if (!email || !sifre) {
      return NextResponse.json({ ok: false, hata: "Email ve sifre gerekli" }, { status: 400 });
    }
    // Not: Gercek bir sistemde bu kontrol veritabanindan yapilir.
    // Su an localStorage'a erisim server-side'da mumkun degil,
    // bu nedenle client-side dogrulama ile calisiyoruz.
    // Gelecekte Supabase/DB entegrasyonu burada yapilacak.
    return NextResponse.json({ ok: true, mesaj: "Client-side dogrulama kullanilmali" });
  } catch {
    return NextResponse.json({ ok: false, hata: "Gecersiz istek" }, { status: 400 });
  }
}