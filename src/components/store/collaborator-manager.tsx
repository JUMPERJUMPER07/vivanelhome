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
    <section className="rounded-[2rem] border border-[var(--brand-orange)]/10 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-orange)]">
          Equipe e Acessos
        </p>
        <h2 className="mt-3 text-2xl font-black text-[var(--brand-text)]">
          Gerenciar Colaboradores
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">
          Adicione outros membros da equipe para que possam incluir produtos simultaneamente.
        </p>
      </div>

      <form onSubmit={handleAdd} className="mt-6 grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)]">
            Nome
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
              placeholder="Ex: João Silva"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)]">
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
              placeholder="colaborador@vivanel.com"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)]">
          Senha (opcional - gera aleatória se vazio)
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
            placeholder="Mínimo 6 caracteres"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[linear-gradient(135deg,#FF6000,#E63946)] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(230,57,70,0.18)]"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <UserPlus size={16} />}
          Adicionar Colaborador
        </button>

        {successMessage && (
          <div className="flex items-center gap-2 rounded-2xl bg-green-50 p-4 text-sm text-green-700">
            <CheckCircle2 size={16} />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center gap-2 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={16} />
            {errorMessage}
          </div>
        )}
      </form>

      <div className="mt-8 border-t border-black/5 pt-6">
        <h3 className="text-lg font-bold text-[var(--brand-text)] flex items-center gap-2">
          <Users size={18} />
          Colaboradores Ativos
        </h3>

        {isLoading ? (
          <div className="mt-4 flex justify-center py-6">
            <Loader2 className="animate-spin text-[var(--brand-orange)]" />
          </div>
        ) : collaborators.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--brand-muted)] italic">Nenhum colaborador adicional cadastrado.</p>
        ) : (
          <ul className="mt-4 divide-y divide-black/5">
            {collaborators.map((collab) => (
              <li key={collab.id} className="flex items-center justify-between py-4">
                <div>
                  <p className="font-bold text-[var(--brand-text)]">{collab.name}</p>
                  <p className="text-xs text-[var(--brand-muted)]">{collab.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(collab.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  title="Remover acesso"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
