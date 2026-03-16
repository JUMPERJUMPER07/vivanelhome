import Link from "next/link";
import { ArrowRight, CarFront, Dumbbell, Home, Wrench } from "lucide-react";

const collections = [
  {
    title: "Casa pronta para o dia a dia",
    badge: "Colecao principal",
    href: "/categorias/casa-organizada",
    icon: Home,
    points: ["Organizacao bonita", "Pecas uteis", "Visual clean"],
  },
  {
    title: "Treino e rotina ativa",
    badge: "Academia",
    href: "/categorias/academia",
    icon: Dumbbell,
    points: ["Faixas e acessorios", "Home gym", "Praticidade"],
  },
  {
    title: "Ferramentas e automotiva",
    badge: "Casa e carro",
    href: "/categorias/ferramentas",
    icon: Wrench,
    points: ["Pequenos reparos", "Itens uteis", "Mais autonomia"],
  },
];

export function FeaturedStoreLayout() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-orange)]">
            Colecoes em destaque
          </p>
          <h2 className="mt-2 text-2xl font-black text-[var(--brand-text)] md:text-3xl">
            Setores montados como loja real
          </h2>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {collections.map((collection, index) => {
          const Icon = collection.icon;
          const themeClass =
            index === 0
              ? "bg-[linear-gradient(145deg,#101827,#5b21b6)] text-white"
              : "border border-white/8 bg-[var(--brand-surface)]";

          return (
            <article
              key={collection.title}
              className={`rounded-[1.25rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22)] ${themeClass}`}
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${
                  index === 0
                    ? "bg-white/12 text-white"
                    : "bg-[rgba(139,92,246,0.12)] text-[var(--brand-orange)]"
                }`}
              >
                <Icon size={20} />
              </div>
              <p
                className={`mt-5 text-xs font-bold uppercase tracking-[0.22em] ${
                  index === 0 ? "text-white/65" : "text-[var(--brand-orange)]"
                }`}
              >
                {collection.badge}
              </p>
              <h3
                className={`mt-3 text-2xl font-black leading-tight ${
                  index === 0 ? "text-white" : "text-[var(--brand-text)]"
                }`}
              >
                {collection.title}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {collection.points.map((point) => (
                  <span
                    key={point}
                    className={`rounded-full px-3 py-2 text-sm font-semibold ${
                      index === 0
                        ? "bg-white/12 text-white"
                        : "bg-[rgba(255,255,255,0.04)] text-[var(--brand-text)]"
                    }`}
                  >
                    {point}
                  </span>
                ))}
              </div>
              <Link
                href={collection.href}
                className={`mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold ${
                  index === 0
                    ? "bg-white text-[#0f172a]"
                    : "border border-white/10 text-[var(--brand-text)]"
                }`}
              >
                Ver setor
                <ArrowRight size={16} />
              </Link>
            </article>
          );
        })}

        <article className="rounded-[1.25rem] border border-white/8 bg-[var(--brand-surface)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22)] lg:col-span-3">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-[rgba(255,255,255,0.03)] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(139,92,246,0.12)] text-[var(--brand-orange)]">
                <Dumbbell size={18} />
              </div>
              <p className="mt-4 text-lg font-black text-[var(--brand-text)]">Academia</p>
              <p className="mt-2 text-sm font-medium text-[var(--brand-muted)]">Produtos para treino, mobilidade e rotina ativa.</p>
            </div>
            <div className="rounded-xl bg-[rgba(255,255,255,0.03)] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(139,92,246,0.12)] text-[var(--brand-orange)]">
                <Wrench size={18} />
              </div>
              <p className="mt-4 text-lg font-black text-[var(--brand-text)]">Ferramentas</p>
              <p className="mt-2 text-sm font-medium text-[var(--brand-muted)]">Mais praticidade para pequenos reparos e ajustes.</p>
            </div>
            <div className="rounded-xl bg-[rgba(255,255,255,0.03)] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(139,92,246,0.12)] text-[var(--brand-orange)]">
                <CarFront size={18} />
              </div>
              <p className="mt-4 text-lg font-black text-[var(--brand-text)]">Automotiva</p>
              <p className="mt-2 text-sm font-medium text-[var(--brand-muted)]">Itens uteis para deixar o carro mais organizado e funcional.</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
