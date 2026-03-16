import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ShieldCheck, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/store/breadcrumbs";
import { Footer } from "@/components/store/footer";
import { Header } from "@/components/store/header";
import { ProductCard } from "@/components/store/product-card";
import { ProductVisual } from "@/components/store/product-visual";
import { findProductBySlug, products } from "@/data/products";
import { findCustomProductBySlug, readCustomProducts } from "@/lib/custom-products";
import { currency, storeConfig } from "@/lib/store";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductBySlug(slug) ?? (await findCustomProductBySlug(slug));

  if (!product) {
    return { title: "Produto nao encontrado" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = findProductBySlug(slug) ?? (await findCustomProductBySlug(slug));
  const customProducts = await readCustomProducts();
  const allProducts = [...customProducts, ...products];

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter((item) => item.categorySlug === product.categorySlug && item.slug !== product.slug)
    .slice(0, 4);

  return (
    <main>
      <Header />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: product.category, href: `/categorias/${product.categorySlug}` },
            { label: product.name },
          ]}
        />

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductVisual product={product} large />

          <div className="rounded-[2.25rem] border border-[var(--brand-orange)]/10 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] md:p-8">
            <span className="rounded-full bg-[var(--brand-red)]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-red)]">
              {product.badge}
            </span>
            <h1 className="mt-4 text-3xl font-black leading-tight text-[var(--brand-text)] md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--brand-muted)]">{product.description}</p>

            <div className="mt-5 flex items-center gap-2 text-sm text-[var(--brand-muted)]">
              <Star size={16} className="fill-[#FFB700] text-[#FFB700]" />
              <span className="font-semibold text-[var(--brand-text)]">{product.rating.toFixed(1)}</span>
              <span>({product.reviewCount} avaliacoes)</span>
            </div>

            <div className="mt-6 rounded-[1.75rem] bg-[var(--brand-light)] p-5">
              <p className="text-sm text-[var(--brand-muted)] line-through">
                de {currency.format(product.oldPrice)}
              </p>
              <p className="mt-1 text-4xl font-black text-[var(--brand-red)]">
                {currency.format(product.price)}
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--brand-orange)]">
                {product.discountLabel} de desconto nesta oferta
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-black text-[var(--brand-text)]">Beneficios</h2>
              <ul className="mt-3 space-y-3">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm leading-6 text-[var(--brand-muted)]">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--brand-orange)]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={product.affiliateUrl}
                target="_blank"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#FF6000,#E63946)] px-6 py-4 text-base font-bold text-white shadow-[0_14px_28px_rgba(230,57,70,0.22)] transition hover:-translate-y-0.5"
              >
                {product.cta}
                <ExternalLink size={18} />
              </Link>
              <Link
                href={`/categorias/${product.categorySlug}`}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-[var(--brand-orange)]/15 px-6 py-4 text-base font-bold text-[var(--brand-text)] transition hover:border-[var(--brand-orange)]"
              >
                Ver categoria
              </Link>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-dashed border-[var(--brand-orange)]/20 bg-[var(--brand-light)] p-4 text-sm leading-6 text-[var(--brand-muted)]">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 text-[var(--brand-orange)]" size={18} />
                <p>
                  Este produto pode redirecionar para um parceiro externo. {storeConfig.affiliateDisclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-orange)]">
              Mais opcoes
            </p>
            <h2 className="mt-2 text-2xl font-black text-[var(--brand-text)] md:text-3xl">
              Continue explorando a vitrine
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}
