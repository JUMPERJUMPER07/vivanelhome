import { z } from "zod";

const iconKeys = ["chef-hat", "sparkles", "package", "droplets", "utensils", "shield", "bubbles"] as const;

const productBaseSchema = z.object({
  name: z.string().trim().min(3).max(120),
  shortDescription: z.string().trim().min(8).max(180),
  description: z.string().trim().min(12).max(1200),
  oldPrice: z.coerce.number().min(0).default(0),
  price: z.coerce.number().positive(),
  discountLabel: z.string().trim().max(30).optional().default(""),
  category: z.string().trim().min(2).max(80),
  categorySlug: z.string().trim().min(2).max(80),
  affiliateUrl: z.string().trim().url().refine((value) => value.includes("shopee"), "Use um link valido da Shopee."),
  cta: z.string().trim().min(2).max(40),
  badge: z.string().trim().min(2).max(40),
  iconKey: z.enum(iconKeys),
  accentFrom: z.string().trim().regex(/^#([A-Fa-f0-9]{6})$/),
  accentTo: z.string().trim().regex(/^#([A-Fa-f0-9]{6})$/),
  existingImageUrl: z.string().trim().optional(),
  removeImage: z.string().trim().optional().transform((value) => value === "true"),
});

const payload = productBaseSchema.safeParse({
    name: "Luminaria Teste",
    shortDescription: "Descricao curta aqui",
    description: "Descricao longa da minha luminaria de teste",
    oldPrice: "",
    price: "39.90",
    discountLabel: "",
    category: "Cozinha Pratica",
    categorySlug: "cozinha-pratica",
    affiliateUrl: "https://shopee.com.br/product",
    cta: "Ver Produto",
    badge: "Novo",
    iconKey: "package",
    accentFrom: "#FF6000",
    accentTo: "#E63946",
    existingImageUrl: "",
    removeImage: "false",
});

if (!payload.success) {
  console.log("Failed:", JSON.stringify(payload.error.flatten(), null, 2));
} else {
  console.log("Success");
}
