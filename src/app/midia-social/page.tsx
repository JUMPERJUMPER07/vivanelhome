import type { Metadata } from "next";
import Link from "next/link";
import { Download, Instagram, MessageCircle, Music2 } from "lucide-react";
import { Breadcrumbs } from "@/components/store/breadcrumbs";
import { Footer } from "@/components/store/footer";
import { Header } from "@/components/store/header";
import { storeConfig } from "@/lib/store";

export const metadata: Metadata = {
  title: "Midia social",
  description: "Capas prontas para Instagram e TikTok da VivanelHOME.",
};

const assets = [
  {
    title: "Capa Instagram",
    description: "Arte horizontal em PNG para perfis, destaques ou posts promocionais.",
    href: "/midia-social/instagram-image",
    ratio: "aspect-[16/9]",
    icon: Instagram,
  },
  {
    title: "Capa TikTok",
    description: "Arte vertical em PNG para bio, destaques e divulgacao visual.",
    href: "/midia-social/tiktok-image",
    ratio: "aspect-[9/16] max-w-[320px]",
    icon: Music2,
  },
];

export default function SocialMediaPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Midia social" },
          ]}
        />

        <div className="mt-5 rounded-[2.25rem] border border-[var(--brand-orange)]/10 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-orange)]">
            Materiais exportaveis
          </p>
          <h1 className="mt-3 text-3xl font-black text-[var(--brand-text)] md:text-5xl">
            Capas prontas para Instagram e TikTok
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--brand-muted)]">
            Esta area centraliza as artes da marca em formato exportavel. Os links abaixo abrem o PNG final para download direto e podem ser reutilizados em posts, bios ou campanhas.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {assets.map((asset) => {
              const Icon = asset.icon;

              return (
                <article
                  key={asset.title}
                  className="rounded-[2rem] border border-[var(--brand-orange)]/10 bg-[var(--brand-light)] p-5"
                >
                  <div
                    className={`relative overflow-hidden rounded-[1.75rem] ${asset.ratio} bg-[linear-gradient(135deg,#fff1e8_0%,#ffffff_42%,#ffe3d7_100%)] p-5`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,96,0,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(230,57,70,0.15),transparent_32%)]" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-red)]">
                          <Icon size={14} />
                          {asset.title}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--brand-orange)]">
                          VivanelHOME
                        </span>
                      </div>
                      <div className="max-w-md">
                        <h2 className="text-3xl font-black leading-tight text-[var(--brand-text)]">
                          VivanelHOME para sua casa
                        </h2>
                        <p className="mt-3 text-base leading-7 text-[var(--brand-muted)]">
                          Ofertas incriveis todos os dias, com descontos, dicas uteis e economia.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h2 className="text-xl font-black text-[var(--brand-text)]">{asset.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">{asset.description}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        href={asset.href}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#FF6000,#E63946)] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(230,57,70,0.18)]"
                      >
                        <Download size={16} />
                        Abrir PNG
                      </Link>
                      <a
                        href={asset.href}
                        download
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-orange)]/15 px-5 py-3 text-sm font-bold text-[var(--brand-text)]"
                      >
                        Baixar arquivo
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-[var(--brand-text)]">
            <a href={storeConfig.instagramUrl} target="_blank" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-4 py-3">
              <Instagram size={16} />
              Instagram
            </a>
            <a href={storeConfig.tiktokUrl} target="_blank" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-4 py-3">
              <Music2 size={16} />
              TikTok
            </a>
            <a href={storeConfig.whatsappUrl} target="_blank" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-4 py-3">
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
