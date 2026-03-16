import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/data/products";
import { currency } from "@/lib/store";
import { ProductVisual } from "./product-visual";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[var(--brand-primary)]/50 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)]">
      <div className="relative p-4">
        <div className="absolute left-6 top-6 z-10 rounded-full bg-[var(--brand-accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
          {product.discountLabel}
        </div>
        <ProductVisual product={product} />
      </div>

      <div className="flex flex-col gap-4 px-6 pb-6">
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-[var(--brand-muted)]">
            {product.shortDescription}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-[var(--brand-muted)]">
          <div className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-[var(--brand-text)]">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs">({product.reviewCount} avaliações)</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-[var(--brand-primary)]">
            {currency.format(product.price)}
          </span>
          <span className="text-sm text-[var(--brand-muted)] line-through">
            {currency.format(product.oldPrice)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {product.isCustom ? (
            <Link
              href={product.affiliateUrl}
              target="_blank"
              className="flex items-center justify-center rounded-xl border border-[var(--brand-border)] bg-white/5 py-3 text-xs font-bold text-[var(--brand-text)] transition hover:bg-white/10"
            >
              Ver produto
            </Link>
          ) : (
            <Link
              href={`/produto/${product.slug}`}
              className="flex items-center justify-center rounded-xl border border-[var(--brand-border)] bg-white/5 py-3 text-xs font-bold text-[var(--brand-text)] transition hover:bg-white/10"
            >
              Detalhes
            </Link>
          )}
          <Link
            href={product.affiliateUrl}
            target="_blank"
            className="flex items-center justify-center rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[#7c3aed] py-3 text-xs font-bold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110 active:scale-95"
          >
            Ver Oferta
          </Link>
        </div>
      </div>
    </article>
  );
}
