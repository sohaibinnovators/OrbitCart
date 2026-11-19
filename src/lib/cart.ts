import { getProductById } from "@/src/data/products";
import type { CartLine } from "@/src/data/types";
import {
  expressShipping,
  freeShippingThreshold,
  promoCode,
  standardShipping,
} from "@/src/lib/site";

export function lineId(productId: string, color?: string, size?: string) {
  return [productId, color ?? "", size ?? ""].join("::");
}

export function shippingAmount(
  subtotal: number,
  method: "standard" | "express" = "standard",
) {
  if (subtotal <= 0) return 0;
  if (method === "express") return expressShipping;
  return subtotal >= freeShippingThreshold ? 0 : standardShipping;
}

export function summarizeCart(
  lines: CartLine[],
  method: "standard" | "express" = "standard",
  promo = "",
) {
  const detailed = lines
    .map((line) => {
      const product = getProductById(line.productId);
      if (!product) return null;
      return {
        ...line,
        product,
        lineTotal: product.price * line.quantity,
      };
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line));

  const subtotal = detailed.reduce((sum, line) => sum + line.lineTotal, 0);
  const discount =
    promo.trim().toUpperCase() === promoCode ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const shipping = shippingAmount(subtotal, method);
  const total = Math.max(0, Math.round((subtotal - discount + shipping) * 100) / 100);

  return { detailed, subtotal, discount, shipping, total };
}
