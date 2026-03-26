"use client";

import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_PRODUCTS_PATH } from "@/lib/admin-routes";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Credenciais incorretas. Tente novamente.");
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
    <form
      onSubmit={handleSubmit}
      className="glass rounded-[2.5rem] p-8 shadow-2xl md:p-12 animate-fade-up border border-white/5"
    >
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[var(--brand-primary)]">
        <LockKeyhole size={16} />
        Acesso Seguro
      </div>
      <h1 className="mt-4 text-4xl font-black tracking-tighter text-white">Portal Admin</h1>
      <p className="mt-4 text-sm leading-relaxed text-[var(--brand-muted)] font-medium">
        Bem-vindo de volta! Identifique-se para gerenciar seus achadinhos e colaboradores.
      </p>

      <div className="mt-10 grid gap-6">
        <label className="grid gap-2 text-[10px] font-black uppercase tracking-widest text-white/50 ml-1">
          Email de Colaborador
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-14 rounded-2xl border border-white/5 bg-white/5 px-5 text-sm text-white outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/[0.08]"
            placeholder="colaborador@vivanelhome.com"
          />
        </label>

        <label className="grid gap-2 text-[10px] font-black uppercase tracking-widest text-white/50 ml-1">
          Senha de Acesso
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-14 rounded-2xl border border-white/5 bg-white/5 px-5 text-sm text-white outline-none transition focus:border-[var(--brand-primary)]/50 focus:bg-white/[0.08]"
            placeholder="••••••••"
            required
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-10 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-[var(--brand-primary)] px-8 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
      >
        {isSubmitting ? "Autenticando..." : "Entrar no Painel ↗"}
      </button>

      {error ? (
        <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-xs font-bold text-red-500">
          {error}
        </div>
      ) : null}
    </form>
  );
}
