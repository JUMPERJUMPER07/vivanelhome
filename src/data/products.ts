export type Product = {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  oldPrice: number;
  price: number;
  discountLabel: string;
  category: string;
  categorySlug: string;
  affiliateUrl: string;
  cta: string;
  badge: string;
  rating: number;
  reviewCount: number;
  soldLabel?: string;
  imageUrl?: string;
  iconKey:
    | "chef-hat"
    | "sparkles"
    | "package"
    | "droplets"
    | "utensils"
    | "shield"
    | "bubbles"
    | "heart"
    | "flower-2"
    | "monitor"
    | "smartphone"
    | "tv"
    | "baby"
    | "paw"
    | "store"
    | "globe"
    | "shopee"
    | "amazon"
    | "mercado-livre"
    | "lightbulb";
  accentFrom: string;
  accentTo: string;
  benefits: string[];
  isBestSeller?: boolean;
  isFlashDeal?: boolean;
  isNew?: boolean;
  isFavorite?: boolean;
  isCustom?: boolean;
};

// Os produtos reais serao cadastrados via painel administrativo.
export const products: Product[] = [];

export const findProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
