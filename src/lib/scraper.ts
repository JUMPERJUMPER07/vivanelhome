export interface ScrapedData {
  title: string | null;
  image: string | null;
  description: string | null;
  price: string | null;
  rating: string;
  reviewCount: string;
  soldCount: string | null;
  success: boolean;
}

export async function scrapeProductUrl(url: string): Promise<ScrapedData | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "facebookexternalhit/1.1",
        "Accept-Language": "pt-BR,pt;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=1.0,*/*;q=0.8",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) return null;

    const html = await response.text();

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
            .replace(/&#x27;/g, "'")
            .trim();
        }
      }
      return null;
    };

    const title = extractMeta([
      /<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i,
      /<title[^>]*>([^<]+)<\/title>/i,
      /item_name":\s*"([^"]+)"/i
    ]);

    const image = extractMeta([
      /<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i,
      /"image":\s*"([^"]+)"/i,
      /https:\/\/down-br\.img\.susercontent\.com\/file\/([a-z0-9_]+)/i
    ]);

    const price = extractMeta([
      /<meta[^>]*property="product:price:amount"[^>]*content="([^"]+)"/i,
      /R\$\s?(\d{1,3}(?:\.\d{3})*(?:,\d{2}))/,
      /R\$\s?(\d+[,.]\d{2})/,
      /"price":\s*(\d+(?:\.\d+)?)/i
    ]);

    const rating = extractMeta([
      /"ratingValue":\s*"?([\d.]+)"?/i,
      /rating_star":\s*([\d.]+)/i
    ]) || "5.0";

    const soldCount = extractMeta([
      /(\d+)\s?vendidos/i,
      /historical_sold":\s*(\d+)/i
    ]);

    return {
      title: title?.replace(/\s*\|\s*Shopee\s*Brasil/i, '') || null,
      image,
      description: null,
      price,
      rating,
      reviewCount: "1",
      soldCount: soldCount ? `${soldCount}${Number(soldCount) > 1000 ? 'mil+' : ''} Vendidos` : null,
      success: !!title
    };
  } catch (err) {
    console.error("Scrape helper error:", err);
    return null;
  }
}
