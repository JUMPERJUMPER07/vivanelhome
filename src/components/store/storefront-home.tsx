"use client";

import { useMemo, useState } from "react";
import { CatalogBrowser } from "./catalog-browser";
import { CategoryStrip } from "./category-strip";
import { CustomProductsShelf } from "./custom-products-shelf";
import { FeaturedStoreLayout } from "./featured-store-layout";
import { Footer } from "./footer";
import { Header } from "./header";
import { HeroBanner } from "./hero-banner";
import { ProductGrid } from "./product-grid";
import { StoreInsights } from "./store-insights";
import { useProductStore } from "./product-store-provider";
import { PromoStrip } from "./promo-strip";

export function StorefrontHome() {
  const { allProducts, customProducts, isLoading } = useProductStore();
  const [search, setSearch] = useState("");
  const bestSellers = useMemo(() => allProducts.filter((product) => product.isBestSeller), [allProducts]);
  const flashDeals = useMemo(() => allProducts.filter((product) => product.isFlashDeal), [allProducts]);
  const underThirty = useMemo(() => allProducts.filter((product) => product.price <= 29.9), [allProducts]);
  const newThisWeek = useMemo(() => allProducts.filter((product) => product.isNew), [allProducts]);
  const favorites = useMemo(() => allProducts.filter((product) => product.isFavorite), [allProducts]);

  return (
    <main>
      <Header searchValue={search} onSearchChange={setSearch} />
      <HeroBanner />
      <StoreInsights />
      <CategoryStrip />

      <ProductGrid
        id="ofertas-relampago"
        eyebrow="Oferta relampago"
        title="Ofertas com mais forca de clique"
        description=""
        products={flashDeals}
      />

      <FeaturedStoreLayout />
      <PromoStrip />
      <CustomProductsShelf products={customProducts} isLoading={isLoading} />

      <ProductGrid
        id="mais-vendidos"
        eyebrow="Mais vendidos"
        title="Os mais vendidos da semana"
        description=""
        products={bestSellers}
      />

      <ProductGrid
        id="ate-2990"
        eyebrow="Achadinhos ate R$29,90"
        title="Achadinhos com preco leve"
        description=""
        products={underThirty}
      />

      <ProductGrid
        eyebrow="Novidades"
        title="Confira as novidades"
        description=""
        products={newThisWeek}
      />

      <ProductGrid
        eyebrow="Queridinhos"
        title="Itens com melhor percepcao de valor"
        description=""
        products={favorites}
      />

      <CatalogBrowser products={allProducts} searchValue={search} onSearchChange={setSearch} />
      <Footer />
    </main>
  );
}
