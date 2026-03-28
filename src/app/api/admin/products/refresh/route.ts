import { NextResponse } from "next/server";
import { readCustomProducts, updateCustomProduct } from "@/lib/custom-products";
import { scrapeProductUrl } from "@/lib/scraper";

export async function POST() {
  try {
    const products = await readCustomProducts();
    // Filtramos apenas produtos que pareçam links externos (Shopee etc)
    const externalProducts = products.filter(p => 
      p.affiliateUrl.includes("http")
    );

    const results = {
      total: externalProducts.length,
      updated: 0,
      failed: 0,
      logs: [] as string[]
    };

    for (const product of externalProducts) {
      try {
        const data = await scrapeProductUrl(product.affiliateUrl);
        
        if (data && data.success) {
          const updates: any = {};
          
          if (data.title && data.title !== product.name) {
            updates.name = data.title;
          }
          
          if (data.price && data.price !== String(product.price).replace('.', ',')) {
            // Converte preço formatado "12,90" para número se necessário 
            // ou mantém o formato se o seu sistema aceitar. 
            // No custom-products o price parece ser number.
            const priceNum = parseFloat(data.price.replace('.', '').replace(',', '.'));
            if (!isNaN(priceNum)) {
              updates.price = priceNum;
            }
          }

          if (Object.keys(updates).length > 0) {
            await updateCustomProduct(product.id, updates);
            results.updated++;
            results.logs.push(`✅ [Atualizado] ${product.name.substring(0, 20)}...`);
          } else {
            results.logs.push(`ℹ️ [Sem alteração] ${product.name.substring(0, 20)}...`);
          }
        } else {
          results.failed++;
          results.logs.push(`⚠️ [Falha no Scrape] ${product.name.substring(0, 20)}...`);
        }
        
        // Pequeno delay para não ser bloqueado pela Shopee
        await new Promise(r => setTimeout(r, 500));
      } catch (err: any) {
        results.failed++;
        results.logs.push(`❌ [ERRO] ${product.name.substring(0, 15)}... : ${err.message || 'Erro'}`);
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json({ error: "Erro ao atualizar produtos" }, { status: 500 });
  }
}
