import Link from "next/link";
import { ArrowRight, Flame, Sparkles, Star, TrendingUp, Zap } from "lucide-react";

const stats = [
  { value: "+2.4k", label: "Clientes felizes" },
  { value: "98%", label: "Satisfação" },
  { value: "Diária", label: "Curadoria" },
];

export function HeroBanner() {
  return (
    <section className="relative mx-auto grid max-w-7xl gap-4 px-4 pt-8 pb-4 sm:px-6 lg:grid-cols-[1.6fr_0.4fr] lg:px-8">
      {/* Card principal */}
      <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/8 bg-[#080f1f] px-8 py-10 text-white shadow-2xl transition-all duration-500">
        {/* Blob decorativo animado */}
        <div
          className="animate-blob pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(6,182,212,0.3) 50%, transparent 70%)",
          }}
        />

        {/* Linhas decorativas de grade */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold tracking-wide uppercase backdrop-blur-md">
            <Sparkles size={13} className="text-[var(--brand-secondary)]" />
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Seleção Premium VivanelHome
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight md:text-6xl">
            Sua casa com{" "}
            <span className="relative inline-block">
              <span className="gradient-text">tecnologia</span>
            </span>
            <br />
            <span className="gradient-text">&amp; estilo</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65">
            Descubra achadinhos que estão transformando rotinas. Praticidade
            inteligente para cada canto do seu lar — curado todos os dias.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#ofertas-relampago"
              className="group/btn inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-[#7c3aed] px-8 py-4 text-sm font-bold shadow-xl shadow-purple-500/25 transition-all hover:scale-[1.03] hover:shadow-purple-500/40 active:scale-95"
            >
              <Flame size={16} className="animate-pulse" />
              Explorar Ofertas
              <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
            <Link
              href="#catalogo"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold backdrop-blur-md transition hover:bg-white/10"
            >
              Ver Catálogo
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-black text-white">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  {stat.label}
                </p>
              </div>
            ))}

            <div className="ml-auto hidden sm:flex -space-x-3">
              {[
                "from-purple-400 to-violet-600",
                "from-cyan-400 to-blue-600",
                "from-pink-400 to-rose-600",
                "from-amber-400 to-orange-600",
              ].map((gradient, i) => (
                <div
                  key={i}
                  className={`h-9 w-9 rounded-full border-2 border-[#080f1f] bg-gradient-to-br ${gradient} shadow-lg`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating badge canto direito */}
        <div className="animate-float absolute bottom-8 right-8 hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm lg:flex lg:flex-col lg:items-center lg:gap-1 lg:text-center">
          <TrendingUp size={20} className="text-[var(--brand-secondary)]" />
          <p className="text-xs font-black text-white">+120 produtos</p>
          <p className="text-[10px] text-white/50">adicionados este mês</p>
        </div>
      </div>

      {/* Cards laterais */}
      <div className="grid gap-4">
        {/* Card 1 — Destaque do Dia */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/8 bg-gradient-to-br from-[var(--brand-primary)]/20 via-[#080f1f] to-[#080f1f] p-7 shadow-xl transition-all duration-300 hover:border-[var(--brand-primary)]/40">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--brand-primary)]">
              <Zap size={10} />
              Destaque do Dia
            </div>
            <h2 className="mt-4 text-xl font-black leading-tight text-[var(--brand-text)]">
              Cozinha mais <br />inteligente
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-[var(--brand-muted)]">
              Utensílios pensados para quem valoriza tempo e estética.
            </p>
          </div>
          <Link
            href="/categorias/cozinha-pratica"
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-primary)] transition hover:gap-3"
          >
            Ver agora <ArrowRight size={12} />
          </Link>
        </div>

        {/* Card 2 — Top Categorias */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/8 bg-gradient-to-br from-[var(--brand-secondary)]/15 via-[#080f1f] to-[#080f1f] p-7 shadow-xl transition-all duration-300 hover:border-[var(--brand-secondary)]/40">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--brand-secondary)]">
              <Star size={12} className="fill-[var(--brand-secondary)]" />
              Top Categorias
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Casa", "Cozinha", "Dicas", "Tech"].map((item) => (
                <span
                  key={item}
                  className="rounded-xl border border-white/8 bg-white/5 px-3 py-2 text-[11px] font-bold text-[var(--brand-text)] transition hover:bg-white/10 hover:text-[var(--brand-secondary)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 text-[10px] text-[var(--brand-muted)]">
            Explore por categoria →
          </p>
        </div>
      </div>
    </section>
  );
}
