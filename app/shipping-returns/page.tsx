import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Package, RotateCcw, BadgeDollarSign } from "lucide-react";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { Container } from "@/src/components/ui/Container";
import { FAQAccordion } from "@/src/components/ui/FAQAccordion";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Illustrative shipping and returns policies for the OrbitCart portfolio demonstration.",
};

const cards = [
  {
    icon: Truck,
    title: "Standard delivery",
    text: "Illustrative 4–7 day sample timeline. Free shipping appears in the demo when the bag subtotal is over $75.",
  },
  {
    icon: Package,
    title: "Express delivery",
    text: "Illustrative 1–3 day sample timeline with a higher demo shipping fee at checkout. Not connected to a carrier.",
  },
  {
    icon: RotateCcw,
    title: "Returns process",
    text: "Sample story: request help within 30 days of a demo order. Because nothing ships, nothing can be returned.",
  },
  {
    icon: BadgeDollarSign,
    title: "Refund policy",
    text: "Refund language here is illustrative only. The demo never charges money, so refunds are not processed.",
  },
];

export default function ShippingReturnsPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Shipping & Returns" }]} />
      <div className="mt-6 max-w-2xl">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Shipping & Returns</h1>
        <p className="mt-3 text-muted">
          All timelines and policy examples on this page are illustrative demo policies, not actual delivery guarantees.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <div key={card.title} className="rounded-[28px] border border-line bg-white p-6">
            <card.icon className="text-cobalt" size={22} />
            <h2 className="mt-4 font-display text-2xl text-ink">{card.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{card.text}</p>
          </div>
        ))}
      </div>
      <section className="mt-12 rounded-[28px] border border-line bg-white p-6 sm:p-8">
        <h2 className="font-display text-3xl text-ink">Order processing</h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted">
          In this demonstration, placing an order validates the form, stores a sample confirmation in your browser session, and clears the cart. There is no warehouse, fulfillment partner, or tracking number behind the interface.
        </p>
      </section>
      <section className="mt-12">
        <h2 className="mb-4 font-display text-3xl text-ink">Shipping FAQ</h2>
        <FAQAccordion
          items={[
            {
              question: "Do you really ship products?",
              answer: "No. OrbitCart is a portfolio storefront. Delivery options only change the sample totals in checkout.",
            },
            {
              question: "Where can I read more policies?",
              answer: "See the FAQ, Privacy, and Terms pages. They all explain that this project is a demonstration.",
            },
          ]}
        />
        <p className="mt-6 text-sm text-muted">
          Still curious about the demo?{" "}
          <Link href="/contact" className="text-cobalt hover:underline">
            Contact us
          </Link>
          .
        </p>
      </section>
    </Container>
  );
}
