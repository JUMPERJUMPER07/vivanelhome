import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { ADMIN_PRODUCTS_PATH } from "@/lib/admin-routes";
import { Logo } from "./logo";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--brand-border)] bg-[var(--brand-surface)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Logo compact />
          <div className="h-6 w-px bg-[var(--brand-border)] hidden sm:block" />
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 shadow-lg shadow-purple-500/5">
            <ShieldCheck size={14} />
            Gestão de Vitrine
          </span>
        </div>
        <nav className="flex items-center gap-3">
          <Link
            href={ADMIN_PRODUCTS_PATH}
            className="rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] hover:bg-white/5 transition-colors"
          >
            Produtos
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--brand-text)] hover:bg-white/10 transition-all active:scale-95"
          >
            Ver Loja
          </Link>
        </nav>
      </div>
    </header>
  );
}
