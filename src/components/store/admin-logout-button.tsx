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
      className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-orange)]/15 px-4 py-3 text-sm font-bold text-[var(--brand-text)]"
    >
      <LogOut size={16} />
      Sair
    </button>
  );
}
