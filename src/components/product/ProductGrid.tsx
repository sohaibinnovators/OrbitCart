import type { Product } from "@/src/data/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  variant = "standard",
}: {
  products: Product[];
  variant?: "standard" | "quiet";
}) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  );
}
