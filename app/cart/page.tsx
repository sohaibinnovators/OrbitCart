import type { Metadata } from "next";
import { CartPageClient } from "@/src/components/cart/CartPageClient";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { Container } from "@/src/components/ui/Container";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review products in your OrbitCart demo bag. Cart data is stored in this browser only.",
};

export default function CartPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Cart" }]} />
      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Your bag</h1>
      <div className="mt-8">
        <CartPageClient />
      </div>
    </Container>
  );
}
