import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { ADMIN_PRODUCTS_PATH } from "@/lib/admin-routes";
import { Logo } from "./logo";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-purple-500/10 bg-[rgba(7,7,10,0.92)] backdrop-blur-xl">
      {/* Linha de cor roxa no topo */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-700 via-indigo-500 to-purple-700" />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 text-white">
          <Logo compact />
          <div className="h-6 w-px bg-white/10 hidden sm:block" />
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-600/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-purple-400 border border-purple-500/20 shadow-lg shadow-purple-900/10">
            <ShieldCheck size={14} />
            Gestão de Vitrine
          </span>
        </div>
        <nav className="flex items-center gap-3">
          <Link
            href={ADMIN_PRODUCTS_PATH}
            className="rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            Produtos
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/80 hover:bg-purple-600/20 hover:border-purple-500/30 hover:text-white transition-all active:scale-95"
          >
            Ver Loja
          </Link>
        </nav>
      </div>
    </header>
  );
}
