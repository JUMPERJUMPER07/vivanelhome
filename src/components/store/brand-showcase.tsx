import Link from "next/link";
import { Instagram, MessageCircle, Music2 } from "lucide-react";
import { storeConfig } from "@/lib/store";
import { Logo } from "./logo";

function SocialCover({
  platform,
  subtitle,
  ratio,
}: {
  platform: string;
  subtitle: string;
  ratio: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] ${ratio} bg-[linear-gradient(135deg,#111111_0%,#241143_46%,#f5f3ff_100%)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)]`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.24),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.14),transparent_30%)]" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-orange)]">
            {platform}
          </span>
          <Logo compact />
        </div>
        <div className="max-w-md">
          <h3 className="text-3xl font-black leading-tight text-white md:text-4xl">
            VivanelHOME para sua casa
          </h3>
          <p className="mt-3 text-base text-white/78">{subtitle}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {storeConfig.promoPhrases.map((phrase) => (
              <span
                key={phrase}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--brand-orange)] shadow-sm"
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BrandShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2.25rem] border border-[var(--brand-orange)]/12 bg-[rgba(255,255,255,0.84)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur md:p-8">
        <div className="mb-6">
          <div>
            <h2 className="text-2xl font-black text-[var(--brand-text)] md:text-3xl">
              Logo, capa horizontal e versao compacta
            </h2>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] bg-[linear-gradient(160deg,#ffffff,#f5f3ff)] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-orange)]">
              Logo horizontal
            </p>
            <div className="mt-4">
              <Logo />
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-orange)]">
              Logo compacto
            </p>
            <div className="mt-4">
              <Logo compact />
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--brand-muted)]">
              <span className="rounded-full bg-white px-3 py-2 font-semibold">#8B5CF6</span>
              <span className="rounded-full bg-white px-3 py-2 font-semibold">#111111</span>
              <span className="rounded-full bg-white px-3 py-2 font-semibold">#F5F3FF</span>
              <span className="rounded-full bg-white px-3 py-2 font-semibold">#FFFFFF</span>
            </div>
          </div>

          <div className="grid gap-4">
            <SocialCover
              platform="Instagram"
              subtitle="Capa sugerida com foco em achadinhos, descontos e dicas uteis."
              ratio="aspect-[16/9]"
            />
            <SocialCover
              platform="TikTok"
              subtitle="Versao vertical pronta como referencia para capa ou thumbnails promocionais."
              ratio="aspect-[9/16] max-w-[320px]"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-[var(--brand-text)]">
          <Link
            href="/midia-social"
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#6d28d9,#111111)] px-4 py-3 text-white shadow-[0_14px_28px_rgba(91,33,182,0.22)]"
          >
            Baixar capas sociais
          </Link>
          <a
            href={storeConfig.instagramUrl}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-4 py-3"
          >
            <Instagram size={16} />
            Instagram
          </a>
          <a
            href={storeConfig.tiktokUrl}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-light)] px-4 py-3"
          >
            <Music2 size={16} />
            TikTok
          </a>

        </div>
      </div>
    </section>
  );
}
