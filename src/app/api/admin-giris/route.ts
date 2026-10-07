import { NextRequest, NextResponse } from "next/server";

// PIN sadece server-side'da tutuluyor — client bundle'a gömülmüyor
const ADMIN_PIN = process.env.ADMIN_PIN || "erdek2026";

export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json();
    if (pin === ADMIN_PIN) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, hata: "Yanlis PIN" }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false, hata: "Gecersiz istek" }, { status: 400 });
  }
}
