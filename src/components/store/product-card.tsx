import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { currency } from "@/lib/store";
import { ProductVisual } from "./product-visual";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="glass-card hover-lift group overflow-hidden rounded-[2rem] transition-all hover:border-[var(--brand-orange)]/35">
      <div className="relative p-3">
        <div className="absolute left-6 top-6 z-10 rounded-full bg-[var(--brand-orange)] px-3 py-1 text-xs font-bold text-white shadow-lg">
          {product.discountLabel}
        </div>
        <ProductVisual product={product} />
      </div>

      <div className="space-y-4 px-5 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="rounded-full bg-[var(--brand-light)] px-3 py-1 text-xs font-semibold text-[var(--brand-orange)]">
              {product.badge}
            </span>
            <h3 className="mt-3 text-lg font-black leading-tight text-[var(--brand-text)]">
              {product.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">
              {product.shortDescription}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-[var(--brand-muted)]">
          <Star size={16} className="fill-[#FFB700] text-[#FFB700]" />
          <span className="font-semibold text-[var(--brand-text)]">{product.rating.toFixed(1)}</span>
          <span>({product.reviewCount} avaliacoes)</span>
        </div>

        <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,#f5f3ff,#ffffff)] p-4">
          <p className="text-sm text-[var(--brand-muted)] line-through">
            de {currency.format(product.oldPrice)}
          </p>
          <div className="mt-1 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-orange)]">
                Preco promocional
              </p>
              <p className="text-3xl font-black text-[var(--brand-text)]">
                {currency.format(product.price)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          {product.isCustom ? (
            <Link
              href={product.affiliateUrl}
              target="_blank"
              className="hover-lift flex-1 rounded-full border border-[var(--brand-orange)]/15 px-4 py-3 text-center text-sm font-bold text-[var(--brand-text)] transition-all hover:border-[var(--brand-orange)]"
            >
              Detalhes
            </Link>
          ) : (
            <Link
              href={`/produto/${product.slug}`}
              className="hover-lift flex-1 rounded-full border border-[var(--brand-orange)]/15 px-4 py-3 text-center text-sm font-bold text-[var(--brand-text)] transition-all hover:border-[var(--brand-orange)]"
            >
              Detalhes
            </Link>
          )}
          <Link
            href={product.affiliateUrl}
            target="_blank"
            className="hover-lift flex flex-1 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#6d28d9,#111111)] px-4 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
          >
            Compre
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
