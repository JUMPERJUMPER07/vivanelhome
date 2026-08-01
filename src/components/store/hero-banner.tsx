import Link from "next/link";
import { ArrowRight, Flame, ShieldCheck, Sparkles, Star, TrendingUp } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-4 pt-5 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#050505_0%,#27114f_42%,#8b5cf6_100%)] px-6 py-8 text-white shadow-[0_28px_80px_rgba(67,56,202,0.24)] md:px-10 md:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.34),transparent_32%)]" />
        <div className="absolute -right-12 top-10 h-40 w-40 rounded-full border border-white/10 bg-white/5 blur-2xl" />
        <div className="relative max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-2 text-sm font-semibold backdrop-blur">
            <Sparkles size={16} />
            VivanelHOME com vitrine organizada e pronta para vender
          </div>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] md:text-6xl">
            Produtos úteis com cara de loja moderna e compra rápida
          </h1>
          <p className="mt-4 max-w-lg text-base text-white/85 md:text-lg">
            Descubra ofertas para casa, academia, ferramentas e automotiva em uma vitrine mais limpa, confiável e feita para mobile.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#ofertas-relampago"
              className="hover-lift inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-bold text-[var(--brand-text)] transition-all"
            >
              Comprar com desconto
              <ArrowRight size={18} />
            </Link>
            <Link
              href="#catalogo"
              className="hover-lift inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-base font-bold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              Explorar categorias
            </Link>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="hover-lift rounded-[1.5rem] border border-white/12 bg-white/10 px-4 py-4 backdrop-blur transition-all">
              <p className="text-xs uppercase tracking-[0.22em] text-white/70">Mais buscados</p>
              <p className="mt-2 text-lg font-black">Casa e cozinha</p>
            </div>
            <div className="hover-lift rounded-[1.5rem] border border-white/12 bg-white/10 px-4 py-4 backdrop-blur transition-all">
              <p className="text-xs uppercase tracking-[0.22em] text-white/70">Compra direta</p>
              <p className="mt-2 text-lg font-black">Link para parceiro</p>
            </div>
            <div className="hover-lift rounded-[1.5rem] border border-white/12 bg-white/10 px-4 py-4 backdrop-blur transition-all">
              <p className="text-xs uppercase tracking-[0.22em] text-white/70">Faixa popular</p>
              <p className="mt-2 text-lg font-black">Até R$ 29,90</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[2rem] border border-purple-500/20 bg-[#0e0c16] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-white transition-all">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-950/60 border border-purple-500/30 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">
              <Flame size={14} className="text-purple-400" />
              Oferta relâmpago
            </span>
            <TrendingUp size={18} className="text-purple-400" />
          </div>
          <h2 className="mt-4 text-2xl font-black text-white tracking-tight leading-snug">
            Seção pronta para atrair clique logo na primeira tela
          </h2>
          <div className="mt-4 space-y-3">
            {[
              "Descontos em destaque",
              "Botões fortes para compra",
              "Leitura fácil no celular",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-purple-500/20 bg-[#161324] px-4 py-3 text-sm font-bold text-white shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card-dark hover-lift rounded-[2rem] p-5 text-white transition-all">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Star size={16} className="fill-[#FFB700] text-[#FFB700]" />
            Benefícios da vitrine
          </div>
          <div className="mt-4 space-y-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/8 px-4 py-4">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/75">
                <ShieldCheck size={16} />
                Experiência de loja real
              </div>
              <p className="mt-2 text-lg font-black">Setores claros, banner forte e navegação objetiva</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Cozinha", "Academia", "Ferramentas", "Auto"].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-white/10 bg-white/8 px-4 py-4 text-center text-sm font-semibold"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
