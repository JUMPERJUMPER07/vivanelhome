import { BadgePercent, ShieldCheck, Smartphone } from "lucide-react";

const items = [
  {
    title: "Ofertas relâmpago em evidência",
    subtitle: "Preços exclusivos por tempo limitado",
    icon: BadgePercent,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    title: "Seleção útil para casa e rotina",
    subtitle: "Curadoria feita com carinho",
    icon: ShieldCheck,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    title: "Acesso rápido no celular",
    subtitle: "Interface otimizada para mobile",
    icon: Smartphone,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

export function PromoStrip() {
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 py-4 sm:px-6 md:grid-cols-3 lg:px-8">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className={`group relative overflow-hidden rounded-2xl border ${item.border} bg-[var(--brand-surface)] p-5 shadow-[0_16px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color} border ${item.border} transition-transform group-hover:scale-110`}>
                <Icon size={18} />
              </div>
              <div>
                <h3 className="text-sm font-black text-[var(--brand-text)]">{item.title}</h3>
                <p className="mt-0.5 text-[11px] text-[var(--brand-muted)]">{item.subtitle}</p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
