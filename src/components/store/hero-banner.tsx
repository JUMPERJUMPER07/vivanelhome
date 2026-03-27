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
  const featured = (() => {
    const explicitlyFeatured = allProducts.filter(p => p.isBestSeller || p.isFlashDeal);
    if (explicitlyFeatured.length > 0) return explicitlyFeatured.slice(0, 6);
    return allProducts.slice(0, 6);
  })();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const current = featured[currentIndex];

  return (
    <section className="relative mx-auto max-w-[1800px] px-0 sm:px-4 pt-4 pb-4">
      <div className="group relative overflow-hidden rounded-none sm:rounded-[3rem] bg-gradient-to-br from-[#ee4d2d] via-[#f15c3c] to-[#ff7337] text-white shadow-2xl">
        {/* Decorative Circles — Shopee Style */}
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full border-[30px] border-white/10" />
        <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full border-[30px] border-white/10" />
        
        <div className="relative z-10 grid items-center lg:grid-cols-2">
          {/* Left Side: Massive Promo Content */}
          <div className="flex flex-col items-start gap-6 p-10 md:p-20 lg:pr-0">
             <div className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-black text-[#ee4d2d] uppercase italic tracking-tighter">
               <Zap size={18} fill="currentColor" />
               LIQUIDAÇÃO 4.4
             </div>
             
             <div className="space-y-2">
                <h2 className="text-5xl font-black italic leading-[0.85] tracking-tighter text-white uppercase md:text-8xl">
                   Ofertas <br />
                   <span className="text-yellow-300 drop-shadow-[0_4px_0_rgba(0,0,0,0.2)]">Exclusivas</span>
                </h2>
                <div className="flex items-center gap-4 mt-4">
                   <div className="h-2 w-20 bg-white rounded-full" />
                   <span className="text-xl font-bold uppercase tracking-widest text-white/90">VivanelHome</span>
                </div>
             </div>

             <div className="mt-4 flex flex-wrap gap-3">
                <div className="rounded-xl border-2 border-white/20 bg-black/10 px-6 py-3 backdrop-blur-md">
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Melhor Preço</p>
                   <p className="text-2xl font-black text-yellow-300">Garantido</p>
                </div>
                <div className="rounded-xl border-2 border-white/20 bg-blue-600/20 px-6 py-3 backdrop-blur-md border-blue-400/30">
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Frete Grátis</p>
                   <p className="text-2xl font-black text-white italic">Shopee</p>
                </div>
             </div>
          </div>

          {/* Right Side: Big Product Frame */}
          <div className="relative p-6 md:p-12 lg:p-20 flex items-center justify-center">
             <Link href={`/produto/${current.slug}`} className="relative block w-full max-w-2xl transform transition-transform duration-500 hover:scale-[1.02]">
                <div className="relative overflow-hidden rounded-[2.5rem] border-[12px] border-white/10 bg-white p-2 shadow-2xl">
                   <ProductVisual 
                     product={current} 
                     forceRatio="1/1" 
                     objectFit="contain"
                     imagePadding="1rem"
                     className="rounded-[1.5rem]" 
                   />
                   
                   {/* Price Badge on Image */}
                   <div className="absolute -bottom-2 -right-2 rounded-tl-[2rem] rounded-br-[1.5rem] bg-[#ee4d2d] px-10 py-6 text-white shadow-2xl">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-80">Por apenas</p>
                      <p className="text-4xl font-black tracking-tighter">R$ {current.price.toFixed(2)}</p>
                   </div>
                </div>

                {/* Floating Product Name */}
                <div className="mt-8 text-center lg:text-right px-4">
                   <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white drop-shadow-lg line-clamp-1">
                      {current.name}
                   </h3>
                </div>
             </Link>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => setCurrentIndex(prev => (prev - 1 + featured.length) % featured.length)}
          className="absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 h-14 w-14 items-center justify-center rounded-2xl bg-black/20 text-white backdrop-blur-md transition hover:bg-black/40 md:flex"
        >
          <ArrowLeft size={24} />
        </button>
        <button 
          onClick={() => setCurrentIndex(prev => (prev + 1) % featured.length)}
          className="absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 h-14 w-14 items-center justify-center rounded-2xl bg-black/20 text-white backdrop-blur-md transition hover:bg-black/40 md:flex"
        >
          <ArrowRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-10 left-10 flex gap-2">
           {featured.map((_, i) => (
             <button
               key={i}
               onClick={() => setCurrentIndex(i)}
               className={`h-2 rounded-full transition-all duration-500 ${
                 i === currentIndex ? "w-10 bg-yellow-300" : "w-2 bg-white/30"
               }`}
             />
           ))}
        </div>
      </div>
    </section>
  );
}
