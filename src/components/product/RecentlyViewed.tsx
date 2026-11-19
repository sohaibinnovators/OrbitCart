"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/src/data/products";
import { readRecentlyViewed } from "@/src/lib/recently-viewed";
import { ProductGrid } from "@/src/components/product/ProductGrid";

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(readRecentlyViewed().filter((id) => id !== excludeId));
  }, [excludeId]);

  const products = ids
    .map((id) => getProductById(id))
    .filter((product): product is NonNullable<typeof product> => Boolean(product))
    .slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-4xl text-ink">Recently viewed</h2>
      <p className="mt-2 text-sm text-muted">Saved in this browser while you browse the demo catalog.</p>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
