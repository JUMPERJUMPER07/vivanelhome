"use client";

import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_PRODUCTS_PATH } from "@/lib/admin-routes";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Senha incorreta. Tente novamente.");
        return;
      }

      const redirectTo = searchParams.get("redirect") || ADMIN_PRODUCTS_PATH;
      router.push(redirectTo);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-[2.5rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 backdrop-blur-md shadow-2xl md:p-12 relative overflow-hidden group"
      >
        <div className="absolute -top-24 -right-24 h-48 w-48 bg-[var(--brand-primary)]/20 blur-[80px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 bg-[var(--brand-secondary)]/10 blur-[80px] rounded-full" />

        <div className="relative">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-primary)]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/20 shadow-lg shadow-purple-500/10">
              <LockKeyhole size={16} />
            </div>
            Acesso Restrito
          </div>
          
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-[var(--brand-text)]">
            Bem-vindo de volta
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--brand-muted)]">
            Insira sua chave mestra para gerenciar os produtos e configurações da sua vitrine premium.
          </p>

          <div className="mt-10 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--brand-text)]/60 ml-1">
                Senha de Acesso
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-14 w-full rounded-2xl border border-white/5 bg-white/5 px-5 text-[var(--brand-text)] outline-none transition-all focus:border-[var(--brand-primary)]/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-[var(--brand-primary)]/10 placeholder:text-white/20"
                placeholder="••••••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-[#7c3aed] text-base font-bold text-white shadow-xl shadow-purple-500/20 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70 disabled:grayscale"
            >
              <span className="relative z-10">{isSubmitting ? "Autenticando..." : "Entrar no Painel"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>

            {error ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm font-bold text-red-400">
                {error}
              </div>
            ) : null}
          </div>
        </div>
      </form>
    </div>
}
