import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalog } from "@/src/components/shop/Catalog";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { Container } from "@/src/components/ui/Container";
import { ProductGridSkeleton } from "@/src/components/ui/LoadingSkeleton";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore the full OrbitCart demo catalog of electronics, fashion, home, beauty, and accessories.",
};

export default function ShopPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Shop" }]} />
      <div className="mt-6 max-w-2xl">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Explore Everything.</h1>
        <p className="mt-3 text-muted">
          Find something useful, beautiful, and worth bringing into your everyday routine.
        </p>
      </div>
      <div className="mt-10">
        <Suspense fallback={<ProductGridSkeleton />}>
          <Catalog />
        </Suspense>
      </div>
    </Container>
  );
}
