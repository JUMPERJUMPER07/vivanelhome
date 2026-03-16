"use client";

import Link from "next/link";
import { BadgePercent, Menu, MessageCircle, Search, ShieldCheck } from "lucide-react";
import { storeConfig } from "@/lib/store";
import { Logo } from "./logo";
import { useStoreSettings } from "./store-settings-provider";

type HeaderProps = {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
};

export function Header({ searchValue = "", onSearchChange }: HeaderProps) {
  const { settings } = useStoreSettings();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--brand-border)] bg-[var(--brand-surface)] backdrop-blur-xl">
      <div className="bg-gradient-to-r from-[var(--brand-primary)]/20 via-[var(--brand-secondary)]/10 to-transparent">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-[10px] font-bold tracking-wider uppercase sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-[var(--brand-text)]/90">
            <BadgePercent size={12} className="text-[var(--brand-primary)]" />
            Ofertas atualizadas diariamente
          </div>
          <div className="inline-flex items-center gap-2 text-[var(--brand-text)]/60">
            <ShieldCheck size={12} className="text-[var(--brand-secondary)]" />
            Pagamento seguro via parceiros
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--brand-border)] bg-white/5 text-[var(--brand-text)] shadow-sm transition hover:bg-white/10 lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu size={20} />
            </button>
            <Logo compact />
          </div>

          <div className="relative hidden flex-1 lg:block max-w-2xl mx-auto">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--brand-muted)]"
            />
            <input
              type="text"
              placeholder="Encontre o achadinho perfeito..."
              value={searchValue}
              onChange={(event) => onSearchChange?.(event.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--brand-border)] bg-white/5 pl-12 pr-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/10 focus:ring-4 focus:ring-[var(--brand-primary)]/10"
            />
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={settings.whatsappUrl || storeConfig.whatsappUrl}
              className="group flex items-center justify-center gap-2 rounded-2xl bg-[#25D366]/10 px-4 py-2 text-sm font-bold text-[#25D366] transition hover:bg-[#25D366]/20"
              target="_blank"
            >
              <MessageCircle size={18} />
              <span className="hidden sm:inline">Suporte</span>
            </Link>
          </div>
        </div>

        <div className="relative lg:hidden">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--brand-muted)]"
          />
          <input
            type="text"
            placeholder="Buscar achadinhos..."
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
            className="h-11 w-full rounded-xl border border-[var(--brand-border)] bg-white/5 pl-11 pr-4 text-sm text-[var(--brand-text)] outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/10"
          />
        </div>

        <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
          {storeConfig.categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categorias/${category.slug}`}
              className="flex items-center gap-2 shrink-0 rounded-xl border border-[var(--brand-border)] bg-white/5 px-4 py-2 text-xs font-bold text-[var(--brand-text)] transition hover:border-[var(--brand-primary)]/40 hover:bg-[var(--brand-primary)]/5 hover:text-[var(--brand-primary)]"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
