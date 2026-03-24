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

const categoryColors = [
  { bg: "from-violet-500/20 to-purple-500/5", icon: "text-violet-400", hover: "hover:border-violet-500/40" },
  { bg: "from-cyan-500/20 to-sky-500/5", icon: "text-cyan-400", hover: "hover:border-cyan-500/40" },
  { bg: "from-pink-500/20 to-rose-500/5", icon: "text-pink-400", hover: "hover:border-pink-500/40" },
  { bg: "from-amber-500/20 to-yellow-500/5", icon: "text-amber-400", hover: "hover:border-amber-500/40" },
  { bg: "from-emerald-500/20 to-green-500/5", icon: "text-emerald-400", hover: "hover:border-emerald-500/40" },
  { bg: "from-orange-500/20 to-red-500/5", icon: "text-orange-400", hover: "hover:border-orange-500/40" },
  { bg: "from-blue-500/20 to-indigo-500/5", icon: "text-blue-400", hover: "hover:border-blue-500/40" },
  { bg: "from-teal-500/20 to-cyan-500/5", icon: "text-teal-400", hover: "hover:border-teal-500/40" },
  { bg: "from-fuchsia-500/20 to-purple-500/5", icon: "text-fuchsia-400", hover: "hover:border-fuchsia-500/40" },
];

export function CategoryStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {storeConfig.categories.map((category, index) => {
          const Icon = categoryIcons[index] || Sparkles;
          const theme = categoryColors[index] || categoryColors[0];

          return (
            <Link
              key={category.slug}
              href={`/categorias/${category.slug}`}
              className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-[var(--brand-border)] bg-gradient-to-br ${theme.bg} p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 ${theme.hover}`}
            >
              {/* Glow no hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100 rounded-[2rem]" />

              {/* Ícone */}
              <div
                className={`relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 ${theme.icon} transition-all duration-300 group-hover:scale-110`}
              >
                <Icon size={24} />
              </div>

              {/* Nome */}
              <p className={`text-[11px] font-black uppercase tracking-widest text-[var(--brand-text)] transition-colors group-hover:${theme.icon}`}>
                {category.name}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
