"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-routes";

export function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push(ADMIN_LOGIN_PATH);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-5 py-3 text-sm font-bold text-[var(--brand-text)] transition hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 active:scale-95"
    >
      <LogOut size={18} className="transition-transform group-hover:-translate-x-1" />
      Encerrar Sessão
    </button>
  );
}
