"use client";

import { useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_PRODUCTS_PATH } from "@/lib/admin-routes";
import { Logo } from "@/components/store/logo";

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

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Glow Effects */}
        <div className="absolute -inset-1 blur-2xl rounded-[2.5rem] bg-gradient-to-br from-[var(--brand-primary)]/30 to-[var(--brand-secondary)]/30 opacity-70 animate-pulse-glow" />

        <form
          onSubmit={handleSubmit}
          className="relative w-full rounded-[2rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 md:p-12 backdrop-blur-xl shadow-2xl overflow-hidden glass"
        >
          {/* Subtle bg noise or pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Logo */}
            <div className="mb-6">
              <Logo />
            </div>

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--brand-primary)] shadow-inner">
              <ShieldCheck size={14} />
              Acesso Exclusivo
            </div>

            <h1 className="mb-2 text-3xl font-display font-bold text-[var(--brand-text)] drop-shadow-sm">
              Área do Administrador
            </h1>
            <p className="mb-8 text-sm text-[var(--brand-muted)] max-w-[280px]">
              Digite sua chave mestra para gerenciar a loja e catálogo de produtos.
            </p>

            <div className="w-full space-y-6">
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--brand-muted)] flex items-center gap-2 ml-1">
                  <LockKeyhole size={14} className="text-[var(--brand-secondary)]" />
                  Chave Mestra
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-14 w-full rounded-2xl border border-[var(--brand-border)] bg-[#020617]/50 px-5 text-[var(--brand-text)] font-semibold tracking-widest outline-none transition-all focus:border-[var(--brand-secondary)]/60 focus:bg-[#020617]/80 focus:ring-4 focus:ring-[var(--brand-secondary)]/20 placeholder:text-[var(--brand-muted)]/40 placeholder:tracking-normal placeholder:font-normal"
                  placeholder="Insira a senha do painel..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-[var(--brand-primary)]/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 drop-shadow-md">
                  {isSubmitting ? "Autenticando acesso..." : "Entrar no Painel"}
                </span>
              </button>

              {error ? (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm font-bold text-red-400 shadow-inner flex items-center justify-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  {error}
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
