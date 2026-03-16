"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { BadgePercent, RotateCcw, Search, SlidersHorizontal, Zap } from "lucide-react";
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
        (selectedCategory === "mais-vendidos" && product.isBestSeller) ||
        (selectedCategory === "promocoes-do-dia" && product.isFlashDeal) ||
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

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="h-fit rounded-[2.5rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 backdrop-blur-md lg:sticky lg:top-32">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
            <SlidersHorizontal size={16} />
            Filtros Avançados
          </div>

          <div className="mt-8 space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--brand-muted)]">Busca por termo</label>
              <div className="relative">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--brand-muted)]"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => updateSearch(event.target.value)}
                  placeholder="Ex.: organizador, kit..."
                  className="h-12 w-full rounded-2xl border border-[var(--brand-border)] bg-white/5 pl-11 pr-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/10"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--brand-muted)]">Categoria</label>
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="h-12 w-full rounded-2xl border border-[var(--brand-border)] bg-white/5 px-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/10 appearance-none"
              >
                <option value="all">Todas as categorias</option>
                {storeConfig.categories.map((category) => (
                  <option key={category.slug} value={category.slug} className="bg-[#0f172a]">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--brand-muted)]">Preço máximo</label>
                <span className="text-sm font-bold text-[var(--brand-primary)]">
                  R$ {maxPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <input
                type="range"
                min="19"
                max="300"
                step="5"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-[var(--brand-primary)]"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setFlashOnly(!flashOnly)}
                className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-sm font-bold transition-all ${
                  flashOnly 
                    ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]" 
                    : "border-[var(--brand-border)] bg-white/5 text-[var(--brand-text)] hover:bg-white/10"
                }`}
              >
                <Zap size={16} />
                Ofertas Relâmpago
              </button>
              
              <button
                onClick={() => setCheapOnly(!cheapOnly)}
                className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-sm font-bold transition-all ${
                  cheapOnly 
                    ? "border-[var(--brand-secondary)] bg-[var(--brand-secondary)]/10 text-[var(--brand-secondary)]" 
                    : "border-[var(--brand-border)] bg-white/5 text-[var(--brand-text)] hover:bg-white/10"
                }`}
              >
                <BadgePercent size={16} />
                Até R$ 29,90
              </button>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 px-4 py-4 text-xs font-bold uppercase tracking-widest text-[var(--brand-muted)] transition hover:border-white/40 hover:text-[var(--brand-text)]"
            >
              <RotateCcw size={14} />
              Resetar Filtros
            </button>
          </div>
        </aside>

        <div className="space-y-8">
          <SectionHeader
            eyebrow="Catálogo Completo"
            title="Explore todos os achadinhos"
            description="Filtre e encontre exatamente o que você precisa para sua casa com os melhores preços da internet."
          />

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-[var(--brand-border)] bg-[var(--brand-surface)] px-5 py-2.5 text-xs font-bold text-[var(--brand-text)] shadow-sm">
              <Zap size={14} className="text-[var(--brand-primary)]" />
              {filteredProducts.length} itens encontrados
            </div>
            {deferredSearch && (
              <div className="rounded-full bg-[var(--brand-primary)]/10 px-4 py-2 text-xs font-medium text-[var(--brand-primary)] border border-[var(--brand-primary)]/20">
                Busca: <span className="font-bold">{deferredSearch}</span>
              </div>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-[3rem] border border-dashed border-white/10 bg-white/5 p-16 text-center backdrop-blur-sm">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 text-white/20">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold text-[var(--brand-text)]">Nenhum achadinho encontrado</h3>
              <p className="mt-3 text-[var(--brand-muted)] max-w-sm mx-auto">
                Tente ajustar seus filtros ou buscar por algo diferente.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-8 rounded-2xl bg-white/10 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Limpar Tudo
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
