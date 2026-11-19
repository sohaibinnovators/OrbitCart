import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { categories, getCategory } from "@/src/data/categories";
import { products } from "@/src/data/products";
import { Catalog } from "@/src/components/shop/Catalog";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { Container } from "@/src/components/ui/Container";
import { ProductGridSkeleton } from "@/src/components/ui/LoadingSkeleton";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const list = products.filter((product) => product.category === category.slug);

  return (
    <div>
      <div className="relative overflow-hidden border-b border-line bg-charcoal text-ivory">
        <Image
          src={category.image}
          alt=""
          fill
          className="object-cover opacity-45"
          sizes="100vw"
          priority
        />
        <Container className="relative py-16">
          <h1 className="font-display text-5xl text-white">{category.name}</h1>
          <p className="mt-4 max-w-2xl text-white/80">{category.intro}</p>
          <p className="mt-4 text-sm uppercase tracking-[0.16em] text-white/60">
            {list.length} {list.length === 1 ? "product" : "products"}
          </p>
        </Container>
      </div>
      <Container className="py-10">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/shop", label: "Shop" },
            { label: category.name },
          ]}
        />
        <div className="mt-8">
          <Suspense fallback={<ProductGridSkeleton />}>
            <Catalog products={list} lockedCategory={category.slug} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
