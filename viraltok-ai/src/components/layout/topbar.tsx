"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Topbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [notified, setNotified] = useState(false);

  const runSearch = () => {
    const value = query.toLowerCase();
    if (value.includes("template")) router.push("/templates");
    else if (value.includes("trend")) router.push("/trends");
    else if (value.includes("calend")) router.push("/calendar");
    else if (value.includes("idea")) router.push("/ideas");
    else router.push("/dashboard");
  };

  return (
    <header className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-xl font-semibold">Painel ViralTok AI</h1>
        <p className="text-sm text-[var(--muted)]">Fluxo diario de criacao de videos virais com IA</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch();
          }}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#101a2e] px-3 py-2 text-sm text-[var(--muted)]"
        >
          <Search size={14} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar modulo"
            className="w-28 bg-transparent outline-none placeholder:text-[var(--muted)]"
          />
        </form>
        <Badge className="bg-emerald-400/20 text-emerald-200">Plano Pro</Badge>
        <button
          type="button"
          onClick={() => setNotified((prev) => !prev)}
          className="rounded-xl border border-white/15 bg-white/5 p-2 text-[var(--muted)]"
          title="Notificacoes"
        >
          <Bell size={16} />
        </button>
        {notified ? <Badge className="bg-blue-400/20 text-blue-100">Sem alertas novos</Badge> : null}
      </div>
    </header>
  );
}
