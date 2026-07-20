import type { Metadata } from "next";
import { Nunito, Sora } from "next/font/google";
import "./globals.css";
import { ProductStoreProvider } from "@/components/store/product-store-provider";
import { StoreSettingsProvider } from "@/components/store/store-settings-provider";
import { storeConfig } from "@/lib/store";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vivanelhome.com.br"),
  title: {
    default: "VivanelHOME | Casa, Cozinha e Organização Inteligente",
    template: "%s | VivanelHOME",
  },
  description:
    "Descubra os melhores achadinhos para facilitar sua rotina. Produtos inovadores, organizadores criativos e itens de alta qualidade para casa e cozinha com o melhor custo-benefício.",
  keywords: ["organização", "casa e cozinha", "achadinhos", "produtos virais", "decoração", "praticidade", "compras inteligentes"],
  authors: [{ name: "VivanelHOME" }],
  creator: "VivanelHOME",
  publisher: "VivanelHOME",
  robots: "index, follow",
  openGraph: {
    title: "VivanelHOME | Casa e Organização",
    description: "Os melhores achadinhos para facilitar sua rotina. Tecnologia e estilo para sua casa.",
    url: "https://vivanelhome.com.br",
    siteName: "VivanelHOME",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "VivanelHOME",
    description: "Os melhores achadinhos para sua casa.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${sora.variable} ${nunito.variable} bg-[var(--brand-bg)] text-[var(--brand-text)] antialiased`}
      >
        <StoreSettingsProvider>
          <ProductStoreProvider>{children}</ProductStoreProvider>
        </StoreSettingsProvider>
      </body>
    </html>
  );
}
