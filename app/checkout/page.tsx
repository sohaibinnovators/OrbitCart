import type { Metadata } from "next";
import { CheckoutForm } from "@/src/components/checkout/CheckoutForm";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { Container } from "@/src/components/ui/Container";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Simulated OrbitCart checkout. No real payment or shipment is processed.",
};

export default function CheckoutPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/cart", label: "Cart" },
          { label: "Checkout" },
        ]}
      />
      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Checkout</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Fill in the demo fields below. Payment options are simulated and no card details are collected.
      </p>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </Container>
  );
}
