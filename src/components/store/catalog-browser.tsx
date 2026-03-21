"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { BadgePercent, RotateCcw, Search, SlidersHorizontal, Star, Zap } from "lucide-react";
import type { Product } from "@/data/products";
import { storeConfig } from "@/lib/store";
import { ProductCard } from "./product-card";
import { SectionHeader } from "./section-header";

type CatalogBrowserProps = {
  products: Product[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
};

export function CatalogBrowser({
  products,
  searchValue,
  onSearchChange,
}: CatalogBrowserProps) {
  const [internalSearch, setInternalSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(120);
  const [flashOnly, setFlashOnly] = useState(false);
  const [cheapOnly, setCheapOnly] = useState(false);

  const search = searchValue ?? internalSearch;
  const deferredSearch = useDeferredValue(search);

  function updateSearch(value: string) {
    if (onSearchChange) {
      onSearchChange(value);
      return;
    }
    setInternalSearch(value);
  }

  const filteredProducts = useMemo(() => {
    const normalizedQuery = deferredSearch.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${product.name} ${product.shortDescription} ${product.description} ${product.category}`
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesCategory =
        selectedCategory === "all" ||
        (selectedCategory === "featured" && product.isBestSeller) ||
        (selectedCategory === "flash" && product.isFlashDeal) ||
        (selectedCategory === "cheap" && product.price <= 29.9) ||
        product.categorySlug === selectedCategory;

      const matchesPrice = product.price <= maxPrice;
      const matchesFlash = !flashOnly || product.isFlashDeal;
      const matchesCheap = !cheapOnly || product.price <= 29.9;

      return matchesQuery && matchesCategory && matchesPrice && matchesFlash && matchesCheap;
    });
  }, [cheapOnly, deferredSearch, flashOnly, maxPrice, products, selectedCategory]);

  function resetFilters() {
    updateSearch("");
    setSelectedCategory("all");
    setMaxPrice(120);
    setFlashOnly(false);
    setCheapOnly(false);
  }

  const tabItems = [
    { label: "Todos", id: "all", icon: undefined },
    { label: "Mais Vendidos", id: "featured", icon: Star },
    { label: "Promoções", id: "flash", icon: Zap },
    { label: "Até 29,90", id: "cheap", icon: BadgePercent },
    ...storeConfig.categories.map(cat => ({ label: cat.name, id: cat.slug, icon: undefined }))
  ];

  return (
    <section id="catalogo" className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6 lg:px-12">
      {/* Tabs and Sidebar removed as requested */}
      <div className="w-full">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-black tracking-[0.2em] text-[var(--brand-text)] uppercase">
             {deferredSearch ? "Resultados da Busca" : "Coleção Completa"}
          </h2>
          <div className="h-1 w-12 bg-[var(--brand-primary)] rounded-full" />
          {deferredSearch ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-bold text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-6 py-2 rounded-full border border-[var(--brand-primary)]/20 uppercase tracking-widest mt-2">
                 Buscando por: "{deferredSearch}"
              </p>
              <p className="text-[10px] font-bold text-[var(--brand-muted)] uppercase tracking-widest">{filteredProducts.length} itens encontrados</p>
            </div>
          ) : (
            <p className="text-sm font-bold text-[var(--brand-muted)] border border-white/10 px-6 py-2 rounded-full bg-white/5 uppercase tracking-widest mt-2">
               {filteredProducts.length} achadinhos selecionados
            </p>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[3rem] border border-dashed border-white/10 bg-white/5 p-16 text-center backdrop-blur-sm">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 text-white/20">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black text-[var(--brand-text)]">Nada encontrado</h3>
            <p className="mt-3 text-[var(--brand-muted)] max-w-sm mx-auto text-sm font-medium">
              Não encontramos itens com os critérios atuais.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-8 rounded-2xl bg-[var(--brand-primary)] px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(110,64,255,0.2)]"
            >
              Resetar Tudo
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

