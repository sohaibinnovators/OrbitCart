import Link from "next/link";
import { products } from "@/src/data/products";
import { ProductGrid } from "@/src/components/product/ProductGrid";
import { Container } from "@/src/components/ui/Container";

export function FeaturedProducts() {
  const featured = products.filter((product) => product.featured).slice(0, 8);
  return (
    <section className="pb-20">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-faint">Featured</p>
            <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Featured Finds.</h2>
          </div>
          <Link href="/shop" className="text-sm font-medium text-cobalt hover:underline">
            View All Products
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={featured} />
        </div>
      </Container>
    </section>
  );
}
