import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { SectionHeader } from "@/components/store/section-header";

export default function AffiliateDisclosurePage() {
  return (
    <main className="min-h-screen bg-[var(--brand-bg)]">
      <Header />
      
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader 
          eyebrow="Transparência"
          title="Aviso de Afiliados"
          description="Como mantemos nosso trabalho de curadoria gratuito e acessível para todos."
        />
        
        <div className="mt-12 space-y-10 text-[var(--brand-muted)] leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--brand-text)]">O que é um site de afiliados?</h2>
            <p>
              A VivanelHOME participa de programas de marketing de afiliados. Isso significa que, quando você clica em 
              um link de produto em nossa vitrine e realiza uma compra na loja de destino, nós podemos receber uma 
              pequena porcentagem de comissão pela venda.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--brand-text)]">Isso aumenta o preço para mim?</h2>
            <p className="text-lg font-semibold text-[var(--brand-primary)]">
              Não. Absolutamente nada.
            </p>
            <p>
              O preço que você paga no produto é exatamente o mesmo, quer você use nosso link ou vá diretamente à loja. 
              A comissão é paga pela própria marca como uma verba de marketing por termos levado um novo cliente até eles. 
              Muitas vezes, por termos parcerias, conseguimos inclusive listar produtos com descontos exclusivos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--brand-text)]">Nossa Curadoria</h2>
            <p>
              Apesar de sermos comissionados, nosso compromisso principal é com você, o visitante. Só selecionamos 
              produtos que possuem boas avaliações, vendedores confiáveis e que realmente agreguem valor à sua 
              casa e rotina. Nossa integridade vale mais do que qualquer comissão.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[var(--brand-text)]">Por que fazemos isso?</h2>
            <p>
              Essas comissões nos ajudam a pagar os custos de servidor, desenvolvimento e o tempo gasto pela nossa 
              equipe de curadoria em busca dos melhores "achadinhos". É a forma de manter esse serviço sustentável 
              e gratuito para você.
            </p>
          </section>

          <p className="pt-8 text-sm italic">Última atualização: 15 de Março de 2026. Obrigado por apoiar a VivanelHOME e ajudar a manter nosso trabalho vivo!</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
