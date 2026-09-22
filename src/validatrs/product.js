const { z } = require("zod");

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional().default(""),
  categoryId: z.string().uuid().optional().nullable(),
  price: z.coerce.number().nonnegative(),
  compareAtPrice: z.coerce.number().nonnegative().optional().nullable(),
  costPrice: z.coerce.number().nonnegative().optional().nullable(),
  stock: z.coerce.number().int().nonnegative().default(0),
  sku: z.string().optional().nullable(),
  images: z.array(z.string().url()).default([]),
  active: z.boolean().default(true)
});

module.exports = { productSchema };
