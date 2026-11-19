import type { Metadata } from "next";
import { WishlistPageClient } from "@/src/components/wishlist/WishlistPageClient";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { Container } from "@/src/components/ui/Container";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Saved OrbitCart demo products. Wishlist data is stored in this browser only.",
};

export default function WishlistPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Wishlist" }]} />
      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Wishlist</h1>
      <div className="mt-8">
        <WishlistPageClient />
      </div>
    </Container>
  );
}
