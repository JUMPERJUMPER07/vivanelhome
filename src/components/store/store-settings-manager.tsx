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
    <section className="rounded-[2rem] border border-[var(--brand-orange)]/10 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-orange)]">
          Redes e contato
        </p>
        <h2 className="mt-3 text-2xl font-black text-[var(--brand-text)]">
          Configure Instagram, TikTok e WhatsApp
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)]">
          Os links salvos aqui aparecem na loja para o cliente final nos botões de contato e redes sociais.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)]">
          <span className="inline-flex items-center gap-2">
            <Instagram size={16} />
            Instagram
          </span>
          <input
            type="url"
            value={form.instagramUrl}
            onChange={(event) =>
              setForm((current) => ({ ...current, instagramUrl: event.target.value }))
            }
            disabled={isLoading}
            className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)]">
          <span className="inline-flex items-center gap-2">
            <Music2 size={16} />
            TikTok
          </span>
          <input
            type="url"
            value={form.tiktokUrl}
            onChange={(event) =>
              setForm((current) => ({ ...current, tiktokUrl: event.target.value }))
            }
            disabled={isLoading}
            className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[var(--brand-text)]">
          <span className="inline-flex items-center gap-2">
            <MessageCircle size={16} />
            WhatsApp
          </span>
          <input
            type="url"
            value={form.whatsappUrl}
            onChange={(event) =>
              setForm((current) => ({ ...current, whatsappUrl: event.target.value }))
            }
            disabled={isLoading}
            className="h-12 rounded-2xl border border-black/8 bg-[var(--brand-light)] px-4 outline-none focus:border-[var(--brand-orange)]"
          />
        </label>

        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[linear-gradient(135deg,#6d28d9,#111111)] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(91,33,182,0.24)]"
        >
          <Save size={16} />
          {isSubmitting ? "Salvando..." : "Salvar links"}
        </button>

        {successMessage ? (
          <div className="flex items-start gap-2 rounded-[1.5rem] bg-[#ecfdf3] px-4 py-3 text-sm font-semibold text-[#166534]">
            <CheckCircle2 size={18} className="mt-0.5" />
            <span>{successMessage}</span>
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-[1.5rem] bg-[#fff1f2] px-4 py-3 text-sm font-semibold text-[#be123c]">
            {errorMessage}
          </div>
        ) : null}
      </form>
    </section>
  );
}
