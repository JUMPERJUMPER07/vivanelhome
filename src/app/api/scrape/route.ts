import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL é obrigatória" }, { status: 400 });
    }

    // Tenta buscar o conteúdo da página
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Accept-Language": "pt-BR,pt;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Cache-Control": "no-cache",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: `O site ${new URL(url).hostname} recusou a conexão automática. Tente preencher manualmente.` }, { status: 500 });
    }

    const html = await response.text();

    // Funções auxiliares simples para extração por Regex
    const extractMeta = (patterns: RegExp[]) => {
      for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match && match[1]) {
          return match[1]
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/\\u002F/g, '/')
            .trim();
        }
      }
      return null;
    };

    // Estratégias múltiplas para capturar os dados
    const title = extractMeta([
      /<meta property="og:title" content="([^"]+)"/i,
      /<meta name="twitter:title" content="([^"]+)"/i,
      /<title>([^<]+)<\/title>/i
    ]);
    
    const image = extractMeta([
      /<meta property="og:image" content="([^"]+)"/i,
      /<meta name="twitter:image" content="([^"]+)"/i,
      /<meta property="og:image:secure_url" content="([^"]+)"/i,
      /image":\s*"([^"]+)"/i // fallback para JSON dentro do HTML
    ]);
    
    const description = extractMeta([
      /<meta property="og:description" content="([^"]+)"/i,
      /<meta name="description" content="([^"]+)"/i,
      /<meta name="twitter:description" content="([^"]+)"/i
    ]);

    // Tenta preço (muito variável entre lojas)
    let priceFound = extractMeta([
      /<meta property="product:price:amount" content="([^"]+)"/i,
      /"price":\s*"([^"]+)"/i,
      /"amount":\s*([0-9.]+)/i
    ]);

    return NextResponse.json({
      title,
      image,
      description: description?.substring(0, 3000),
      price: priceFound,
      success: true
    });

  } catch (error) {
    console.error("Scrape error:", error);
    return NextResponse.json({ error: "Erro interno ao processar o link" }, { status: 500 });
  }
}
