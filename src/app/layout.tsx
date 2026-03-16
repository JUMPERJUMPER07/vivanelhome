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
  metadataBase: new URL("https://vivanelhome.com"),
  title: {
    default: "VivanelHOME | Casa, cozinha e organizacao",
    template: "%s | VivanelHOME",
  },
  description:
    "Loja vitrine para afiliados com foco em produtos uteis, bonitos e baratos para casa, cozinha e organizacao.",
  openGraph: {
    title: "VivanelHOME",
    description: storeConfig.slogan,
    type: "website",
    locale: "pt_BR",
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
