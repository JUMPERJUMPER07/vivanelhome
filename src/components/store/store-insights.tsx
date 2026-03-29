import { Clock3, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

const items = [
  {
    title: "Mais vendidos da semana",
    subtitle: "Os itens que todo mundo está amando",
    icon: Sparkles,
    color: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-400",
    border: "hover:border-violet-500/30",
  },
  {
    title: "Produtos em alta",
    subtitle: "Tendências para sua casa",
    icon: TrendingUp,
    color: "from-cyan-500/20 to-sky-500/10",
    iconColor: "text-cyan-400",
    border: "hover:border-cyan-500/30",
  },
  {
    title: "Escolha Popular",
    subtitle: "Muitas avaliações reais",
    icon: Clock3,
    color: "from-emerald-500/20 to-green-500/10",
    iconColor: "text-emerald-400",
    border: "hover:border-emerald-500/30",
  },
  {
    title: "Guia Confiável",
    subtitle: "Só o que realmente é útil",
    icon: ShieldCheck,
    color: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-400",
    border: "hover:border-amber-500/30",
  },
];

export function StoreInsights() {
  return (
    <section className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-12">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className={`group relative overflow-hidden rounded-3xl border border-[var(--brand-border)] bg-gradient-to-br ${item.color} p-5 backdrop-blur-md transition-all duration-300 ${item.border} hover:-translate-y-1`}
            >
              {/* Glow sutil */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100 rounded-3xl" />

              <div className="relative flex items-start gap-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 ${item.iconColor} transition-transform group-hover:scale-110`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-tight text-[var(--brand-text)]">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-[var(--brand-muted)]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
