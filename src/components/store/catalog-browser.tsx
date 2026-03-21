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
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Tabs System */}
      <div className="mb-10 w-full">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-4 pt-2">
          {tabItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex h-12 shrink-0 items-center gap-2 rounded-2xl border px-6 text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white shadow-[0_0_20px_rgba(110,64,255,0.3)]"
                    : "border-white/5 bg-white/5 text-[var(--brand-muted)] hover:border-white/10 hover:bg-white/10"
                }`}
              >
                {Icon && <Icon size={14} className={isActive ? "text-white" : "text-[var(--brand-primary)]"} />}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Sidebar Filters */}
        <aside className="h-fit rounded-[2.5rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 backdrop-blur-md lg:sticky lg:top-32">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
            <SlidersHorizontal size={16} />
            Refinar Busca
          </div>

          <div className="mt-8 space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--brand-muted)] ml-1">Buscar</label>
              <div className="relative">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--brand-muted)]"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => updateSearch(event.target.value)}
                  placeholder="Ex.: cozinha, kit..."
                  className="h-12 w-full rounded-2xl border border-[var(--brand-border)] bg-white/5 pl-11 pr-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/10"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--brand-muted)] ml-1">Preço Máximo</label>
                <span className="text-sm font-bold text-[var(--brand-primary)]">
                  R$ {maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                step="5"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-[var(--brand-primary)]"
                title="Arraste para definir o preço máximo"
              />
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-muted)] transition hover:border-white/40 hover:text-[var(--brand-text)]"
            >
              <RotateCcw size={12} />
              Limpar Filtros
            </button>
          </div>
        </aside>

        {/* Products Results */}
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-black tracking-tight text-[var(--brand-text)] uppercase tracking-widest">
              {tabItems.find(t => t.id === selectedCategory)?.label}
            </h2>
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-muted)]">
               <Zap size={14} className="text-[var(--brand-primary)]" />
               {filteredProducts.length} itens encontrados
               {deferredSearch && (
                 <span className="ml-2 inline-flex items-center rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-[10px] text-[var(--brand-primary)] border border-[var(--brand-primary)]/20">
                   Busca: {deferredSearch}
                 </span>
               )}
            </div>
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
              <h3 className="text-2xl font-black text-[var(--brand-text)]">Nada encontrado</h3>
              <p className="mt-3 text-[var(--brand-muted)] max-w-sm mx-auto text-sm font-medium">
                Tente ajustar os filtros ou trocar a categoria selecionada.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-8 rounded-2xl bg-[var(--brand-primary)] px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(110,64,255,0.2)]"
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
