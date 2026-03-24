import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { SectionHeader } from "@/components/store/section-header";

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-[var(--brand-bg)]">
      <Header />
      
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader 
          eyebrow="Legal"
          title="Termos de Uso"
          description="Diretrizes e responsabilidades para o uso da nossa vitrine de achadinhos."
        />
        
        <div className="mt-12 space-y-10 text-[var(--brand-muted)] leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--brand-text)]">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar a VivanelHOME, você concorda em cumprir estes termos. Caso não concorde com 
              alguma parte, recomendamos que não utilize nossos serviços.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--brand-text)]">2. Natureza da Plataforma</h2>
            <p>
              A VivanelHOME é uma plataforma de curadoria. Nós selecionamos, organizamos e apresentamos produtos 
              de diversos marketplaces. Nós **não vendemos** ou estocamos os produtos listados; apenas facilitamos a 
              descoberta e redirecionamos você para o vendedor final.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--brand-text)]">3. Responsabilidade sobre Preços</h2>
            <p>
              Os preços e a disponibilidade dos produtos são definidos pelas lojas parceiras e podem sofrer alterações 
              sem aviso prévio. Fazemos o possível para manter as informações atualizadas, mas o valor final sempre 
              será o exibido no carrinho da loja externa no momento da compra.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--brand-text)]">4. Garantias e Entregas</h2>
            <p>
              Toda a responsabilidade sobre garantia, troca, devolução e prazo de entrega é exclusiva da loja parceira 
              onde a compra foi finalizada. A VivanelHOME não interfere no processo logístico ou de pós-venda dos vendedores.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--brand-text)]">5. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo visual e estrutural desenvolvido pela VivanelHOME é de nossa propriedade intelectual. 
              As imagens dos produtos pertencem às suas respectivas marcas ou marketplaces, sendo utilizadas aqui de 
              forma informativa para divulgação de afiliados.
            </p>
          </section>

          <p className="pt-8 text-sm italic">Última atualização: 15 de Março de 2026.</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
