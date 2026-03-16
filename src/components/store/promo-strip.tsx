import { BadgePercent, ShieldCheck, Truck } from "lucide-react";

const items = [
  {
    title: "Ofertas relampago em evidencia",
    icon: BadgePercent,
  },
  {
    title: "Selecao util para casa e rotina",
    icon: ShieldCheck,
  },
  {
    title: "Acesso rapido no celular",
    icon: Truck,
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
            className="rounded-xl border border-white/8 bg-[var(--brand-surface)] p-5 shadow-[0_16px_30px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(139,92,246,0.12)] text-[var(--brand-orange)]">
                <Icon size={18} />
              </div>
              <h3 className="text-base font-black text-[var(--brand-text)]">{item.title}</h3>
            </div>
          </div>
        );
      })}
    </section>
  );
}
