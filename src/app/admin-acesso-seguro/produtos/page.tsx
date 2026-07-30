import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/store/breadcrumbs";
import { AdminLogoutButton } from "@/components/store/admin-logout-button";
import { ProductManager } from "@/components/store/product-manager";
import { StoreSettingsManager } from "@/components/store/store-settings-manager";
import { CollaboratorManager } from "@/components/store/collaborator-manager";
import { ADMIN_PRODUCTS_PATH } from "@/lib/admin-routes";

export const metadata: Metadata = {
  title: "Painel de produtos",
  description: "Cadastre produtos com link da Shopee para a vitrine da VivanelHOME.",
};

export default function ProductPanelPage() {
  return (
    <div className="relative min-h-screen bg-[#07070a] text-white">
      {/* Glow roxo de fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[1000px] bg-purple-800/12 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(109,40,217,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(109,40,217,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <section className="relative mx-auto max-w-[1800px] px-4 py-8 sm:px-6 lg:px-12">
        <Breadcrumbs
          items={[
            { label: "Painel", href: ADMIN_PRODUCTS_PATH },
            { label: "Produtos" },
          ]}
        />

        {/* Cabeçalho da página */}
        <div className="mt-5 rounded-[2rem] border border-purple-500/20 bg-[#0e0c16] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden md:p-8">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-700 via-indigo-500 to-purple-700" />
          <div className="absolute -top-16 -right-16 h-48 w-48 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
                ✦ Painel de Gestão Completo
              </p>
              <h1 className="mt-2 text-3xl font-black text-white md:text-4xl drop-shadow-sm">
                Gerenciar Vitrine & Produtos
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/60">
                Cadastre novos achadinhos, atualize os links das ofertas e configure as redes sociais da sua loja em um único painel escuro e de alta performance.
              </p>
            </div>
            <AdminLogoutButton />
          </div>
        </div>

        {/* Layout Principal Expansivo */}
        <div className="mt-8">
          <ProductManager />
        </div>
      </section>
    </div>
  );
}
