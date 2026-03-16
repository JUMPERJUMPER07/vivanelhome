import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 pt-6 sm:px-6 lg:grid-cols-[1.5fr_0.5fr] lg:px-8">
      <div className="group relative overflow-hidden rounded-[2.5rem] border border-[var(--brand-border)] bg-[#0f172a] px-8 py-10 text-white shadow-2xl transition-all duration-500 hover:border-[var(--brand-primary)]/30">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/20 via-transparent to-transparent opacity-50" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--brand-secondary)]/10 blur-[100px]" />
        
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold tracking-wide uppercase backdrop-blur-md">
            <Sparkles size={14} className="text-[var(--brand-secondary)]" />
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Seleção Premium VivanelHome
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            Sua casa com <br />
            <span className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] bg-clip-text text-transparent">
              tecnologia & estilo
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Descubra os achadinhos que estão transformando rotinas. Praticidade inteligente para cada canto do seu lar.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#ofertas-relampago"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-[#7c3aed] px-8 py-4 text-sm font-bold shadow-xl shadow-purple-500/20 transition hover:brightness-110 active:scale-95"
            >
              Explorar Ofertas
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#catalogo"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold backdrop-blur-md transition hover:bg-white/10"
            >
              Ver Catálogo
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-[#0f172a] bg-slate-800" />
              ))}
            </div>
            <p className="text-sm font-medium text-white/60">
              <span className="text-white font-bold">+2.400</span> pessoas economizaram esta semana
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-col justify-center rounded-[2.5rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 shadow-xl transition-all duration-300 hover:border-[var(--brand-primary)]/20">
          <div className="inline-flex w-fit rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)]">
            Destaque do Dia
          </div>
          <h2 className="mt-4 text-2xl font-bold leading-tight text-[var(--brand-text)]">
            Cozinha mais <br />inteligente
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--brand-muted)]">
            Utensílios pensados para quem valoriza tempo e estética.
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-[2.5rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 shadow-xl transition-all duration-300 hover:border-[var(--brand-secondary)]/20">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[var(--brand-secondary)]">
            <Star size={14} className="fill-[var(--brand-secondary)]" />
            Top Categorias
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Casa", "Cozinha", "Dicas", "Tech"].map((item) => (
              <span
                key={item}
                className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-xs font-bold text-[var(--brand-text)] transition hover:bg-white/10"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
