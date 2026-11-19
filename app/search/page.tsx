import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "@/src/components/shop/SearchResults";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { Container } from "@/src/components/ui/Container";
import { ProductGridSkeleton } from "@/src/components/ui/LoadingSkeleton";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the OrbitCart demo catalog by name, category, description, or tag.",
};

export default function SearchPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Search" }]} />
      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Search</h1>
      <div className="mt-8">
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <SearchResults />
        </Suspense>
      </div>
    </Container>
  );
}
