"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Instagram, MessageCircle, Music2, Save } from "lucide-react";
import { useStoreSettings } from "./store-settings-provider";

export function StoreSettingsManager() {
  const { settings, updateSettings, isLoading } = useStoreSettings();
  const [form, setForm] = useState(settings);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      setIsSubmitting(true);
      await updateSettings(form);
      setSuccessMessage("Links da loja atualizados com sucesso.");
    } catch {
      setErrorMessage("Nao foi possivel salvar os links agora.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-purple-500/20 bg-[#0c0a14] p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.6)] h-fit relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
          Redes Sociais & Contato
        </div>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-white drop-shadow-sm">
          Configurações da Conta
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-white/60">
          Atualize os canais de comunicação oficial da sua vitrine.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="space-y-4">
          <label className="grid gap-2">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80 ml-1">
              <Instagram size={14} className="text-pink-400" />
              Perfil Instagram
            </span>
            <input
              type="url"
              value={form.instagramUrl}
              onChange={(event) =>
                setForm((current) => ({ ...current, instagramUrl: event.target.value }))
              }
              disabled={isLoading}
              placeholder="https://instagram.com/seu.perfil"
              className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
            />
          </label>

          <label className="grid gap-2">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80 ml-1">
              <Music2 size={14} className="text-cyan-400" />
              Perfil TikTok
            </span>
            <input
              type="url"
              value={form.tiktokUrl}
              onChange={(event) =>
                setForm((current) => ({ ...current, tiktokUrl: event.target.value }))
              }
              disabled={isLoading}
              placeholder="https://tiktok.com/@seu.perfil"
              className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
            />
          </label>

          <label className="grid gap-2">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80 ml-1">
              <MessageCircle size={14} className="text-emerald-400" />
              WhatsApp Business
            </span>
            <input
              type="url"
              value={form.whatsappUrl}
              onChange={(event) =>
                setForm((current) => ({ ...current, whatsappUrl: event.target.value }))
              }
              disabled={isLoading}
              placeholder="https://wa.me/5500000000000"
              className="h-12 rounded-2xl border border-purple-500/20 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-purple-500 focus:bg-purple-950/30 focus:ring-2 focus:ring-purple-500/20 placeholder:text-white/30"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 text-sm font-black text-white shadow-[0_0_20px_rgba(109,40,217,0.3)] transition-all hover:from-purple-600 hover:to-indigo-600 active:scale-[0.98] disabled:opacity-50"
        >
          <Save size={16} className="relative z-10" />
          <span className="relative z-10">{isSubmitting ? "Salvando..." : "Atualizar Configurações"}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>

        {successMessage ? (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center text-sm font-bold text-emerald-400">
            {successMessage}
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm font-bold text-red-400">
            {errorMessage}
          </div>
        ) : null}
      </form>
    </section>
  );
}
