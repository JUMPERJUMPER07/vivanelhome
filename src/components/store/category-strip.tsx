import Link from "next/link";
import {
  Boxes,
  CarFront,
  Dumbbell,
  Home,
  Package,
  Sparkles,
  SprayCan,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import { storeConfig } from "@/lib/store";

const categoryIcons = [
  UtensilsCrossed,
  Home,
  SprayCan,
  Boxes,
  Dumbbell,
  Wrench,
  CarFront,
  Package,
  Sparkles,
];

export function CategoryStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {storeConfig.categories.map((category, index) => {
          const Icon = categoryIcons[index] || Sparkles;

          return (
            <Link
              key={category.slug}
              href={`/categorias/${category.slug}`}
              className="group flex flex-col items-center justify-center rounded-[2rem] border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[var(--brand-primary)]/40 hover:bg-white/5"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10 text-[var(--brand-primary)] transition-all duration-300 group-hover:scale-110 group-hover:from-[var(--brand-primary)] group-hover:to-[var(--brand-secondary)] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand-text)] group-hover:text-[var(--brand-primary)] transition-colors">
                {category.name}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
