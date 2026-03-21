import {
  ChefHat,
  Droplets,
  Package,
  ShieldCheck,
  Sparkles,
  SprayCan,
  UtensilsCrossed,
} from "lucide-react";
import type { Product } from "@/data/products";

const categoryThemes: Record<string, { from: string; to: string }> = {
  "cozinha-pratica": { from: "#111111", to: "#7c3aed" },
  "casa-organizada": { from: "#f5f3ff", to: "#8b5cf6" },
  "banheiro-e-limpeza": { from: "#1f1438", to: "#a855f7" },
  "utilidades-do-dia-a-dia": { from: "#111111", to: "#6d28d9" },
  academia: { from: "#111111", to: "#9333ea" },
  ferramentas: { from: "#27272a", to: "#7c3aed" },
  automotiva: { from: "#0f172a", to: "#8b5cf6" },
  "mais-vendidos": { from: "#111111", to: "#7c3aed" },
  "promocoes-do-dia": { from: "#581c87", to: "#111111" },
};

const icons = {
  "chef-hat": ChefHat,
  droplets: Droplets,
  package: Package,
  shield: ShieldCheck,
  sparkles: Sparkles,
  bubbles: SprayCan,
  utensils: UtensilsCrossed,
};

type ProductVisualProps = {
  product: Product;
  large?: boolean;
  forceRatio?: string;
  className?: string;
};

export function ProductVisual({ product, large = false, forceRatio, className }: ProductVisualProps) {
  const Icon = icons[product.iconKey];
  const hasCustomImage = Boolean(product.imageUrl);
  const palette = categoryThemes[product.categorySlug] ?? {
    from: "#111111",
    to: "#8b5cf6",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-white/70 bg-white ${className || ""}`}
      style={{
        background: `linear-gradient(140deg, ${palette.from}, ${palette.to})`,
        aspectRatio: forceRatio || "auto",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.32),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.18),transparent_32%)]" />
      <div
        className={`relative flex items-end justify-between ${
          large ? "min-h-[340px] p-8 md:min-h-[420px]" : "min-h-[210px] p-5"
        }`}
      >
        {hasCustomImage ? (
          <>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </>
        ) : (
          <>
            <div className="max-w-[65%] rounded-[1.5rem] border border-white/35 bg-white/15 p-4 text-white backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                Achadinho Top
              </p>
              <h3 className={`${large ? "mt-3 text-3xl" : "mt-2 text-xl"} font-black leading-tight`}>
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-white/85">{product.shortDescription}</p>
            </div>

            <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/35 bg-white/20 text-white shadow-2xl backdrop-blur-sm md:h-28 md:w-28">
              <Icon size={large ? 52 : 42} strokeWidth={2.2} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
