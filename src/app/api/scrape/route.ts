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
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Accept-Language": "pt-BR,pt;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Não foi possível carregar a página. O site pode estar bloqueando acessos automáticos." }, { status: 500 });
    }

    const html = await response.text();

    // Funções auxiliares simples para extração por Regex
    const extractMeta = (pattern: RegExp) => {
      const match = html.match(pattern);
      if (match && match[1]) {
        return match[1]
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/&#39;/g, "'")
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');
      }
      return null;
    };

    // Tenta extrair dados via Open Graph Tags (padrão de redes sociais usado por todos)
    const title = extractMeta(/<meta property="og:title" content="([^"]+)"/i) || 
                extractMeta(/<title>([^<]+)<\/title>/i);
    
    const image = extractMeta(/<meta property="og:image" content="([^"]+)"/i) || 
                 extractMeta(/<meta name="twitter:image" content="([^"]+)"/i);
    
    const description = extractMeta(/<meta property="og:description" content="([^"]+)"/i) || 
                       extractMeta(/<meta name="description" content="([^"]+)"/i);

    // Tenta preço via meta tags específicas (mais variado)
    const priceStr = extractMeta(/<meta property="product:price:amount" content="([^"]+)"/i) || 
                   extractMeta(/<meta name="twitter:data1" content="([^"]+)"/i);

    return NextResponse.json({
      title: title?.trim(),
      image: image,
      description: description?.substring(0, 3000), // Respeitando seu limite
      price: priceStr ? priceStr.replace(/[^0-9,.]/g, "") : null,
      success: true
    });

  } catch (error) {
    console.error("Scrape error:", error);
    return NextResponse.json({ error: "Erro interno ao processar o link" }, { status: 500 });
  }
}
