import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { ADMIN_PRODUCTS_PATH } from "@/lib/admin-routes";
import { Logo } from "./logo";

export function AdminHeader() {
  return (
    <header className="border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Logo compact />
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
            <ShieldCheck size={14} />
            Painel Admin
          </span>
        </div>
        <nav className="flex items-center gap-2 text-sm font-semibold">
          <Link
            href={ADMIN_PRODUCTS_PATH}
            className="rounded-full bg-[var(--brand-light)] px-4 py-2 text-[var(--brand-text)]"
          >
            Produtos
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[var(--brand-orange)]/15 px-4 py-2 text-[var(--brand-text)]"
          >
            Ver loja
          </Link>
        </nav>
      </div>
    </header>
  );
}
