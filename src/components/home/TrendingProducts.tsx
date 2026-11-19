import Image from "next/image";
import Link from "next/link";
import { products } from "@/src/data/products";
import { formatPrice } from "@/src/lib/format";
import { Container } from "@/src/components/ui/Container";

export function TrendingProducts() {
  const trending = products.filter((product) => product.trending).slice(0, 6);
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-faint">Trending</p>
          <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Trending Right Now.</h2>
        </div>
        <div className="-mx-3 mt-10 flex gap-4 overflow-x-auto px-3 pb-4 snap-x sm:mx-0 sm:gap-5 sm:px-0">
          {trending.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group w-[260px] shrink-0 snap-start"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-mist">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="260px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 font-medium text-ink group-hover:text-cobalt">{product.name}</p>
              <p className="text-sm text-muted">{formatPrice(product.price)}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
