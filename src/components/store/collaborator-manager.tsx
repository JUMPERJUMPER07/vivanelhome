"use client";

import { useEffect, useState } from "react";
import { UserPlus, Users, Trash2, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import type { Collaborator } from "@/lib/collaborator-service";

export function CollaboratorManager() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function fetchCollaborators() {
    try {
      const response = await fetch("/api/admin/collaborators");
      const data = await response.json();
      if (data.collaborators) {
        setCollaborators(data.collaborators);
      }
    } catch {
      setErrorMessage("Erro ao carregar colaboradores.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCollaborators();
  }, []);

  async function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/collaborators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Erro ao adicionar.");

      setSuccessMessage(`Colaborador ${form.name} adicionado!`);
      setForm({ name: "", email: "", password: "" });
      fetchCollaborators();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Erro ao adicionar colaborador.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja remover este colaborador?")) return;

    try {
      const response = await fetch("/api/admin/collaborators", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Erro ao excluir.");
      fetchCollaborators();
    } catch (error) {
      alert("Nao foi possivel excluir.");
    }
  }

  return (
    <section className="rounded-[2.5rem] border border-purple-500/15 bg-purple-950/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(109,40,217,0.08)] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
          Equipe e Acessos
        </p>
        <h2 className="mt-3 text-2xl font-black text-white drop-shadow-sm">
          Gerenciar Colaboradores
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-white/60">
          Adicione outros membros da equipe para que possam incluir produtos simultaneamente.
        </p>
      </div>

      <form onSubmit={handleAdd} className="mt-6 grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="grid gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
            Nome
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
              placeholder="Ex: João Silva"
            />
          </label>
          <label className="grid gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
              placeholder="colaborador@vivanel.com"
            />
          </label>
        </div>

        <label className="grid gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
          Senha (opcional - gera aleatória se vazio)
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
            placeholder="Mínimo 6 caracteres"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex w-full sm:w-fit items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 px-6 py-3.5 text-sm font-black text-white shadow-[0_0_20px_rgba(109,40,217,0.3)] transition-all hover:from-purple-600 hover:to-indigo-600 active:scale-[0.98] disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <UserPlus size={16} />}
          Adicionar Colaborador
        </button>

        {successMessage && (
          <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-400">
            <CheckCircle2 size={16} />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-bold text-red-400">
            <AlertCircle size={16} />
            {errorMessage}
          </div>
        )}
      </form>

      <div className="mt-8 border-t border-white/10 pt-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
          <Users size={16} className="text-purple-400" />
          Colaboradores Ativos
        </h3>

        {isLoading ? (
          <div className="mt-4 flex justify-center py-6">
            <Loader2 className="animate-spin text-purple-400" />
          </div>
        ) : collaborators.length === 0 ? (
          <p className="mt-4 text-xs text-white/50 italic">Nenhum colaborador adicional cadastrado.</p>
        ) : (
          <ul className="mt-4 divide-y divide-white/5">
            {collaborators.map((collab) => (
              <li key={collab.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-bold text-sm text-white">{collab.name}</p>
                  <p className="text-xs text-white/60">{collab.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(collab.id)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                  title="Remover acesso"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
