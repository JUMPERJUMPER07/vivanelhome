"use client";

import Link from "next/link";
import { Instagram, MessageCircle, Music2 } from "lucide-react";
import { storeConfig } from "@/lib/store";
import { Logo } from "./logo";
import { useStoreSettings } from "./store-settings-provider";

export function Footer() {
  const { settings } = useStoreSettings();

  return (
    <footer className="mt-20 border-t border-[var(--brand-border)] bg-[var(--brand-bg)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_0.5fr] lg:px-8">
        <div className="space-y-6">
          <Logo />
          <p className="max-w-xl text-sm leading-relaxed text-[var(--brand-muted)]">
            {storeConfig.slogan}. Uma vitrine tecnológica e sofisticada, projetada para quem busca praticidade sem abrir mão do estilo. Curadoria diária dos melhores achadinhos para seu lar.
          </p>
          <div className="flex items-center gap-4">
            <Link 
              href={settings.instagramUrl || storeConfig.instagramUrl} 
              target="_blank" 
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[var(--brand-text)] transition hover:bg-[var(--brand-primary)] hover:text-white"
            >
              <Instagram size={20} />
            </Link>
            <Link 
              href={settings.tiktokUrl || storeConfig.tiktokUrl} 
              target="_blank" 
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[var(--brand-text)] transition hover:bg-[var(--brand-primary)] hover:text-white"
            >
              <Music2 size={20} />
            </Link>
            <Link 
              href={settings.whatsappUrl || storeConfig.whatsappUrl} 
              target="_blank" 
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[var(--brand-text)] transition hover:bg-[#25D366] hover:text-white"
            >
              <MessageCircle size={20} />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--brand-text)]">Legal</h4>
          <div className="grid gap-3 text-sm text-[var(--brand-muted)]">
            <Link href="/politica-de-privacidade" className="hover:text-[var(--brand-primary)] transition-colors">Políticas de Privacidade</Link>
            <Link href="/termos-de-uso" className="hover:text-[var(--brand-primary)] transition-colors">Termos de Uso</Link>
            <Link href="/aviso-de-afiliados" className="hover:text-[var(--brand-primary)] transition-colors">Aviso de Afiliados</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--brand-border)] bg-black/20 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-[10px] font-bold uppercase tracking-widest text-[var(--brand-muted)] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2024 VivanelHOME - Tecnologia para sua Casa.</p>
          <p className="max-w-md text-center md:text-right opacity-60">
            {storeConfig.affiliateDisclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
