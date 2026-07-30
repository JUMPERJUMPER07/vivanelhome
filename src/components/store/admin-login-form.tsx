"use client";

import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_PRODUCTS_PATH } from "@/lib/admin-routes";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("admin");
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
      className="glass-card-dark rounded-[2rem] border-purple-500/20 bg-[#0c0a13]/80 p-6 shadow-[0_0_40px_rgba(109,40,217,0.15)] backdrop-blur-xl md:p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-indigo-600" />
      <div className="absolute -top-24 -right-24 h-48 w-48 bg-purple-600/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-purple-400">
        <LockKeyhole size={18} className="text-purple-500" />
        Acesso administrativo
      </div>
      <h1 className="relative mt-3 text-3xl font-black text-white drop-shadow-sm">Entrar no painel</h1>
      <p className="mt-3 text-sm leading-6 text-white/70">
        Use seu email de colaborador ou a senha mestre para acessar o painel.
      </p>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-bold text-white/90">
          Email
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-white outline-none focus:border-purple-500 focus:bg-purple-900/10 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-white/30"
            placeholder="admin"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-white/90">
          Senha
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-white outline-none focus:border-purple-500 focus:bg-purple-900/10 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-white/30"
            placeholder="admin"
            required
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 px-6 py-3.5 text-sm font-black text-white shadow-[0_0_25px_rgba(109,40,217,0.4)] transition-all hover:from-purple-600 hover:to-indigo-600 hover:shadow-[0_0_35px_rgba(109,40,217,0.5)] active:scale-[0.98] disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Entrando...
          </>
        ) : (
          "🔐 Entrar no Painel"
        )}
      </button>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 text-center">
          {error}
        </p>
      ) : null}
    </form>
  );
}
