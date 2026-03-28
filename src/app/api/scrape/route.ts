import { NextResponse } from "next/server";
import { scrapeProductUrl } from "@/lib/scraper";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL é obrigatória" }, { status: 400 });
    }

    const data = await scrapeProductUrl(url);

    if (!data || !data.success) {
      return NextResponse.json({ error: `Não foi possível capturar os dados do link. Verifique o link e tente novamente.` }, { status: 500 });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("Scrape error:", error);
    return NextResponse.json({ error: "Erro interno ao processar o link" }, { status: 500 });
  }
}
