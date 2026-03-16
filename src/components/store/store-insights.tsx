import { Clock3, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

const items = [
  {
    title: "Curadoria diaria",
    icon: Sparkles,
  },
  {
    title: "Ofertas em destaque",
    icon: TrendingUp,
  },
  {
    title: "Atualizacao constante",
    icon: Clock3,
  },
  {
    title: "Compra em parceiro",
    icon: ShieldCheck,
  },
];

export function StoreInsights() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="group flex items-center gap-4 rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-5 backdrop-blur-md transition-all duration-300 hover:border-[var(--brand-primary)]/30 hover:bg-white/5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--brand-primary)]/20 to-[var(--brand-secondary)]/20 text-[var(--brand-primary)] transition-transform group-hover:scale-110">
                <Icon size={20} />
              </div>
              <h3 className="text-sm font-bold tracking-tight text-[var(--brand-text)]">{item.title}</h3>
            </article>
          );
        })}
      </div>
    </section>
  );
}
