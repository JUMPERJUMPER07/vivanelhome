import { z } from "zod";

const productBaseSchema = z.object({
  name: z.string().trim().min(3).max(120),
  shortDescription: z.string().trim().min(8).max(180),
  description: z.string().trim().min(12).max(1200),
  oldPrice: z.coerce.number().min(0).default(0),
  price: z.coerce.number().positive(),
  discountLabel: z.string().trim().max(30).optional().default(""),
});

const result1 = productBaseSchema.safeParse({
  name: "Testing product",
  shortDescription: "Short desc testing",
  description: "Description testing 123456",
  oldPrice: "",
  price: "39.90",
  discountLabel: "",
});

console.log("Empty string test:", JSON.stringify(result1, null, 2));

const result2 = productBaseSchema.safeParse({
  name: "Testing product",
  shortDescription: "Short desc testing",
  description: "Description testing 123456",
  oldPrice: null,
  price: "39.90",
  discountLabel: null,
});

console.log("Null test:", JSON.stringify(result2, null, 2));
