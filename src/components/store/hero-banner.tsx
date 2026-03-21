"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Flame, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useProductStore } from "./product-store-provider";
import { ProductVisual } from "./product-visual";

const stats = [
  { value: "+2.4k", label: "Clientes felizes" },
  { value: "98%", label: "Satisfação" },
  { value: "Diária", label: "Curadoria" },
];

export function HeroBanner() {
  const { allProducts } = useProductStore();
  const featured = allProducts.filter(p => p.isBestSeller || p.isFlashDeal).slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featured.length]);

  return (
    <section className="relative mx-auto grid max-w-7xl gap-4 px-4 pt-8 pb-4 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
      {/* Card principal (Left) */}
      <div className="group relative overflow-hidden rounded-[3rem] border border-white/8 bg-[#080f1f] px-10 py-12 text-white shadow-2xl transition-all duration-500">
        <div
          className="animate-blob pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(6,182,212,0.3) 50%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black tracking-widest uppercase backdrop-blur-md">
            <Sparkles size={14} className="text-[#a78bfa]" />
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Seleção Premium VivanelHome
            </span>
          </div>

          <h1 className="mt-8 text-6xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Sua casa com <br />
            <span className="gradient-text">tecnologia</span>
            <span className="text-white/40 block text-3xl md:text-5xl mt-2 tracking-widest">&amp; estilo</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/50">
            Descubra os melhores achadinhos que transformam rotinas. Praticidade 
            inteligente curada todos os dias.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#catalogo"
              className="group/btn inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-[#7c3aed] px-10 py-5 text-sm font-black uppercase tracking-widest shadow-2xl shadow-purple-500/25 transition-all hover:scale-[1.03] active:scale-95"
            >
              <Flame size={16} className="animate-pulse" />
              Explorar Ofertas
              <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-left border-l border-white/10 pl-4">
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel (Right) */}
      <div className="relative group/carousel flex flex-col items-center justify-center overflow-hidden rounded-[3rem] border border-white/5 bg-[#0a0a0f] p-4 lg:p-8 shadow-2xl">
        <div className="absolute top-8 left-8 z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)]/15 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 backdrop-blur-sm">
                <Zap size={12} />
                Destaques em Foco
              </div>
        </div>

        {featured.length > 0 ? (
          <div className="relative h-full w-full flex items-center justify-center pt-8">
            <div className="relative aspect-square w-full max-w-[340px] transform transition-all duration-700">
              <div className="absolute -inset-10 bg-[var(--brand-primary)]/10 blur-[60px] rounded-full animate-pulse" />
              <Link href={`/produto/${featured[currentIndex].slug}`} className="block relative z-20 hover:scale-105 transition-transform duration-500">
                <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                   <ProductVisual product={featured[currentIndex]} forceRatio="1/1" className="rounded-3xl shadow-2xl" />
                </div>
              </Link>

              {/* Info flutuante */}
              <div className="absolute -bottom-4 -left-4 -right-4 z-30 rounded-[2rem] border border-white/10 bg-[var(--brand-surface)]/80 p-6 backdrop-blur-xl shadow-2xl">
                  <h3 className="line-clamp-1 text-base font-black text-white uppercase tracking-tight">
                    {featured[currentIndex].name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                     <span className="text-xl font-black text-[var(--brand-primary)]">
                       R$ {featured[currentIndex].price.toFixed(2).replace(".", ",")}
                     </span>
                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-primary)] text-white shadow-lg shadow-purple-500/30">
                        <ArrowRight size={18} />
                     </div>
                  </div>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "w-8 bg-[var(--brand-primary)]" : "w-2 bg-white/10 hover:bg-white/20"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/20">
            <TrendingUp size={60} strokeWidth={1} />
          </div>
        )}
      </div>
    </section>
  );
}
