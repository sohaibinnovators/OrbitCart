import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getRelatedProducts, products } from "@/src/data/products";
import { ProductGallery } from "@/src/components/product/ProductGallery";
import { ProductPurchase } from "@/src/components/product/ProductPurchase";
import { ProductGrid } from "@/src/components/product/ProductGrid";
import { RecentlyViewed } from "@/src/components/product/RecentlyViewed";
import { TrackRecentlyViewed } from "@/src/components/product/TrackRecentlyViewed";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { Container } from "@/src/components/ui/Container";
import { categoryName } from "@/src/lib/catalog";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0], alt: product.name }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelatedProducts(slug);

  return (
    <Container className="py-10">
      <TrackRecentlyViewed productId={product.id} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/shop", label: "Shop" },
          { href: `/category/${product.category}`, label: categoryName(product.category) },
          { label: product.name },
        ]}
      />
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />
        <ProductPurchase product={product} />
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        <section className="rounded-[28px] border border-line bg-white p-6 lg:col-span-2">
          <h2 className="font-display text-3xl text-ink">Description</h2>
          <p className="mt-4 leading-7 text-muted">{product.description}</p>
          <h3 className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-faint">Highlights</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink">
            {product.highlights.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-[28px] border border-line bg-white p-6">
          <h2 className="font-display text-3xl text-ink">Specifications</h2>
          <dl className="mt-4 space-y-3 text-sm">
            {product.specifications.map((spec) => (
              <div key={spec.label} className="flex justify-between gap-4 border-b border-line pb-3">
                <dt className="text-muted">{spec.label}</dt>
                <dd className="text-right text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 space-y-3 text-sm text-muted">
            <p>
              <strong className="text-ink">Shipping:</strong> Illustrative demo note — standard sample delivery
              timelines appear on Shipping & Returns.
            </p>
            <p>
              <strong className="text-ink">Returns:</strong> Illustrative 30-day demo return story. No real
              shipment is made from this store.
            </p>
          </div>
        </section>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-4xl text-ink">Related products</h2>
        <div className="mt-8">
          <ProductGrid products={related} />
        </div>
      </section>
      <RecentlyViewed excludeId={product.id} />
    </Container>
  );
}
