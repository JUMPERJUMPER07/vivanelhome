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

      <div className="mt-5 rounded-[2.25rem] border border-[var(--brand-orange)]/10 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-orange)]">
              Cadastro manual
            </p>
            <h1 className="mt-3 text-3xl font-black text-[var(--brand-text)] md:text-5xl">
              Adicione produtos e links da Shopee
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--brand-muted)]">
              Preencha o formulario abaixo com o produto e o link do anuncio. Quando o cliente clicar no botao da oferta, ele sera direcionado para a Shopee usando a URL cadastrada.
            </p>
          </div>
          <AdminLogoutButton />
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <ProductManager />
        <StoreSettingsManager />
      </div>
    </section>
  );
}
