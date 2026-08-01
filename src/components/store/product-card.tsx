import Link from "next/link";
import { ArrowUpRight, Star, ShoppingBag, Handshake, Package } from "lucide-react";
import type { Product } from "@/data/products";
import { currency } from "@/lib/store";
import { ProductVisual } from "./product-visual";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const getMarketplaceStyle = (url: string) => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes("shopee") || lowerUrl.includes("shope.ee")) {
      return {
        bg: "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-[0_4px_20px_rgba(249,115,22,0.35)]",
        icon: <ShoppingBag size={18} />,
      };
    }
    if (lowerUrl.includes("mercadolivre") || lowerUrl.includes("meli")) {
      return {
        bg: "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black shadow-[0_4px_20px_rgba(234,179,8,0.35)]",
        icon: <Handshake size={18} />,
      };
    }
    if (lowerUrl.includes("amazon") || lowerUrl.includes("amzn")) {
      return {
        bg: "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-[0_4px_20px_rgba(14,165,233,0.35)]",
        icon: <Package size={18} />,
      };
    }
    return {
      bg: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_4px_20px_rgba(109,40,217,0.35)]",
      icon: <ArrowUpRight size={18} />,
    };
  };

  const mpStyle = getMarketplaceStyle(product.affiliateUrl);

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-purple-500/20 bg-[#0e0c16] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/50 hover:shadow-[0_15px_40px_rgba(109,40,217,0.25)] flex flex-col justify-between">
      <div>
        <div className="relative overflow-hidden rounded-[1.5rem] bg-[#161324] border border-purple-500/10">
          {product.discountLabel && (
            <div className="absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-xs font-black text-white shadow-lg">
              {product.discountLabel}
            </div>
          )}
          <ProductVisual product={product} />
        </div>

        <div className="mt-4 space-y-3 px-1">
          <div>
            <span className="inline-flex items-center rounded-full bg-purple-950/60 border border-purple-500/30 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-purple-300">
              {product.badge}
            </span>
            <h3 className="mt-2 text-base font-black leading-snug tracking-tight text-white line-clamp-2">
              {product.name}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-white/60 line-clamp-2">
              {product.shortDescription}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="font-bold text-white">{product.rating.toFixed(1)}</span>
            <span className="text-white/50">({product.reviewCount} avaliações)</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3 px-1">
        <div className="rounded-[1.25rem] border border-purple-500/20 bg-[#161324] p-3.5">
          {product.oldPrice > 0 && (
            <p className="text-xs text-white/40 line-through">
              de {currency.format(product.oldPrice)}
            </p>
          )}
          <div className="mt-0.5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-purple-400">
                Preço promocional
              </p>
              <p className="text-2xl font-black text-white drop-shadow-sm">
                {currency.format(product.price)}
              </p>
            </div>
          </div>
        </div>

        <Link
          href={product.affiliateUrl}
          target="_blank"
          className={`flex items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm font-black transition-all hover:scale-[1.02] active:scale-95 ${mpStyle.bg}`}
        >
          Compre
          {mpStyle.icon}
        </Link>
      </div>
    </article>
  );
}
