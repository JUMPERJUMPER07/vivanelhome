import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/store/breadcrumbs";
import { Footer } from "@/components/store/footer";
import { Header } from "@/components/store/header";
import { ProductCard } from "@/components/store/product-card";
import { products } from "@/data/products";
import { readCustomProducts } from "@/lib/custom-products";
import { storeConfig } from "@/lib/store";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = storeConfig.categories.find((item) => item.slug === slug);

  if (!category) {
    return { title: "Categoria nao encontrada" };
  }

  return {
    title: category.name,
    description: `Ofertas e achadinhos da categoria ${category.name} na Achadinhos Top.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = storeConfig.categories.find((item) => item.slug === slug);
  const customProducts = await readCustomProducts();
  const allProducts = [...customProducts, ...products];

  if (!category) {
    notFound();
  }

  const categoryProducts =
    slug === "mais-vendidos"
      ? allProducts.filter((product) => product.isBestSeller)
      : slug === "promocoes-do-dia"
        ? allProducts.filter((product) => product.isFlashDeal)
        : allProducts.filter((product) => 
            product.categorySlug === slug || product.iconKey === slug
          );

  let themeStyle = {};
  if (slug === "shopee") {
    themeStyle = { "--brand-primary": "#f97316" } as React.CSSProperties; // Laranja
  } else if (slug === "mercado-livre") {
    themeStyle = { "--brand-primary": "#eab308" } as React.CSSProperties; // Amarelo
  } else if (slug === "amazon") {
    themeStyle = { "--brand-primary": "#0ea5e9" } as React.CSSProperties; // Azul
  }

  return (
    <main className="min-h-screen bg-[#07070a]" style={themeStyle}>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative">
        {/* Glow de fundo com a cor dinâmica */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-full max-w-3xl bg-[var(--brand-primary)]/10 blur-[100px] pointer-events-none rounded-full" />
        
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Categorias", href: "/" },
            { label: category.name },
          ]}
        />

        <div className="relative mt-8 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-xl md:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-primary)]">
            Explorar Categoria
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            {category.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Produtos úteis, bonitos e com ótimo custo-benefício.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4 relative z-10">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
