import { products } from "@/src/data/products";
import { ProductGrid } from "@/src/components/product/ProductGrid";
import { Container } from "@/src/components/ui/Container";

export function BestSellers() {
  const bestsellers = products.filter((product) => product.bestseller).slice(0, 8);
  return (
    <section className="pb-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-faint">Favorites</p>
          <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Customer Favorites.</h2>
          <p className="mt-3 text-sm text-muted">
            Labels and sample review counts on this page are illustrative demo information, not verified customer data.
          </p>
        </div>
        <div className="mt-10">
          <ProductGrid products={bestsellers} variant="quiet" />
        </div>
      </Container>
    </section>
  );
}
