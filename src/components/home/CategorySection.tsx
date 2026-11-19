import { categories } from "@/src/data/categories";
import { products } from "@/src/data/products";
import { CategoryCard } from "@/src/components/product/CategoryCard";
import { Container } from "@/src/components/ui/Container";

export function CategorySection() {
  return (
    <section id="collections" className="py-14 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-faint">Collections</p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl md:text-5xl">Explore Our Collections.</h2>
        </div>
        <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-6 md:grid-rows-2">
          {categories.map((category, index) => {
            const count = products.filter((product) => product.category === category.slug).length;
            const span =
              index === 0
                ? "min-h-[280px] sm:min-h-[340px] md:col-span-3 md:row-span-2 md:min-h-[420px]"
                : index === 1
                  ? "min-h-[200px] md:col-span-3"
                  : "min-h-[180px] sm:min-h-[200px] md:col-span-1";
            return (
              <CategoryCard
                key={category.slug}
                category={category}
                count={count}
                className={span}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
