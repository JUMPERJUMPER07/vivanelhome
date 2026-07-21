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
      className="glass-card-dark rounded-[2rem] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.15)] md:p-8"
    >
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-orange)]">
        <LockKeyhole size={18} />
        Acesso administrativo
      </div>
      <h1 className="mt-3 text-3xl font-black text-white">Entrar no painel</h1>
      <p className="mt-3 text-sm leading-6 text-white/70">
        Use seu email de colaborador ou a senha mestre para acessar o painel.
      </p>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-white/90">
          Email (opcional para senha mestre)
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-[var(--brand-orange)]"
            placeholder="seu@email.com"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-white/90">
          Senha
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-white outline-none focus:border-[var(--brand-orange)]"
            placeholder="Digite sua senha"
            required
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="hover-lift mt-6 inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#6d28d9,#111111)] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(91,33,182,0.24)] transition-all hover:opacity-90"
      >
        {isSubmitting ? "Entrando..." : "Entrar"}
      </button>

      {error ? <p className="mt-4 text-sm font-semibold text-[#ef4444]">{error}</p> : null}
    </form>
  );
}
