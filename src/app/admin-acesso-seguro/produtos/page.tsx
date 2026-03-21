import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/store/breadcrumbs";
import { AdminLogoutButton } from "@/components/store/admin-logout-button";
import { ProductManager } from "@/components/store/product-manager";
import { StoreSettingsManager } from "@/components/store/store-settings-manager";
import { ADMIN_PRODUCTS_PATH } from "@/lib/admin-routes";

export const metadata: Metadata = {
  title: "Painel de produtos",
  description: "Cadastre produtos com link da Shopee para a vitrine da VivanelHOME.",
};

export default function ProductPanelPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Painel", href: ADMIN_PRODUCTS_PATH },
          { label: "Produtos" },
        ]}
      />

      <div className="mt-8 rounded-[2.5rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 backdrop-blur-md shadow-xl md:p-12 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-10 -right-10 h-40 w-40 bg-[var(--brand-primary)]/10 blur-[60px] rounded-full" />
        
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--brand-primary)]">
              Console de Administração
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-[var(--brand-text)] md:text-5xl lg:text-6xl">
              Gestão de Vitrine
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--brand-muted)]">
              Adicione novos produtos, brilhe nos achadinhos e mantenha sua vitrine sempre atualizada com as melhores ofertas.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-4">
            <AdminLogoutButton />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-8">
        <ProductManager />
        <StoreSettingsManager />
      </div>
    </section>
  );
}
