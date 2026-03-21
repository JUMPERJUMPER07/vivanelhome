import { z } from "zod";
import type { Product } from "@/data/products";

const iconKeys = [
  "chef-hat",
  "sparkles",
  "package",
  "droplets",
  "utensils",
  "shield",
  "bubbles",
] as const satisfies Product["iconKey"][];

const productBaseSchema = z.object({
  name: z.string().trim().min(3).max(120),
  shortDescription: z.string().trim().min(8).max(180),
  description: z.string().trim().min(2).max(3000),
  oldPrice: z.coerce.number().min(0).default(0),
  price: z.coerce.number().positive(),
  discountLabel: z.string().trim().max(30).optional().default(""),
  category: z.string().trim().min(2).max(80),
  categorySlug: z.string().trim().min(2).max(80),
  rating: z.coerce.number().min(0).max(5).default(5),
  reviewCount: z.coerce.number().min(0).default(1),
  soldLabel: z.string().trim().optional().default(""),
  affiliateUrl: z
    .string()
    .trim()
    .url()
    .refine(
      (value) => value.toLowerCase().includes("shopee") || value.toLowerCase().includes("shope.ee"),
      "Use um link válido da Shopee (shopee.com.br ou shope.ee)."
    ),
  cta: z.string().trim().min(1).default("Ver Produto"),
  badge: z.string().trim().min(0).default("Novo"),
  iconKey: z.enum(iconKeys),
  accentFrom: z
    .string()
    .trim()
    .regex(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/)
    .default("#8b5cf6"),
  accentTo: z
    .string()
    .trim()
    .regex(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/)
    .default("#06b6d4"),
  existingImageUrl: z.string().trim().optional(),
  removeImage: z
    .string()
    .trim()
    .optional()
    .transform((value) => value === "true"),
});

export type ValidatedProductInput = z.infer<typeof productBaseSchema> & {
  imageFile?: File | null;
};

export async function parseProductFormData(formData: FormData) {
  const imageEntry = formData.get("image");
  const payload = productBaseSchema.safeParse({
    name: formData.get("name"),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    oldPrice: formData.get("oldPrice"),
    price: formData.get("price"),
    discountLabel: formData.get("discountLabel") || undefined,
    category: formData.get("category"),
    categorySlug: formData.get("categorySlug"),
    rating: formData.get("rating"),
    reviewCount: formData.get("reviewCount"),
    soldLabel: formData.get("soldLabel"),
    affiliateUrl: formData.get("affiliateUrl"),
    cta: formData.get("cta") || undefined,
    badge: formData.get("badge") || undefined,
    iconKey: formData.get("iconKey"),
    accentFrom: formData.get("accentFrom") || undefined,
    accentTo: formData.get("accentTo") || undefined,
    existingImageUrl: formData.get("existingImageUrl") || undefined,
    removeImage: formData.get("removeImage") || "false",
  });

  if (!payload.success) {
    return {
      success: false as const,
      errors: payload.error.flatten(),
    };
  }

  if (payload.data.oldPrice > 0 && payload.data.price > payload.data.oldPrice) {
    return {
      success: false as const,
      errors: {
        formErrors: ["O preco promocional nao pode ser maior que o preco antigo."],
        fieldErrors: {},
      },
    };
  }

  const imageFile = imageEntry instanceof File && imageEntry.size > 0 ? imageEntry : null;

  return {
    success: true as const,
    data: {
      ...payload.data,
      imageFile,
    },
  };
}

export function buildProductPayload(input: ValidatedProductInput, imageUrl?: string): Omit<Product, "id" | "slug"> {
  return {
    name: input.name,
    shortDescription: input.shortDescription,
    description: input.description,
    oldPrice: input.oldPrice,
    price: input.price,
    discountLabel: input.discountLabel,
    category: input.category,
    categorySlug: input.categorySlug,
    affiliateUrl: input.affiliateUrl,
    cta: input.cta,
    badge: input.badge,
    rating: input.rating,
    reviewCount: input.reviewCount,
    soldLabel: input.soldLabel,
    imageUrl,
    iconKey: input.iconKey,
    accentFrom: input.accentFrom,
    accentTo: input.accentTo,
    benefits: [
      "Link pronto para redirecionar o cliente",
      "Ideal para divulgar na sua vitrine de afiliado",
      "Edite depois conforme sua campanha",
    ],
    isNew: true,
    isFavorite: true,
    isCustom: true,
  };
}
