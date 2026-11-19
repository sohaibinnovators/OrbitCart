import type { Metadata } from "next";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { Container } from "@/src/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms for using the OrbitCart portfolio demonstration. Not legal advice for a live business.",
};

export default function TermsPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Terms & Conditions" }]} />
      <article className="mt-8 max-w-3xl">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Terms & Conditions</h1>
        <p className="mt-4 text-muted">
          These terms describe the OrbitCart demonstration experience. They are not legal advice and are not intended as final terms for a live store.
        </p>
        <section className="mt-10 space-y-4 text-sm leading-7 text-muted">
          <h2 className="font-display text-2xl text-ink">Demo use</h2>
          <p>
            OrbitCart showcases frontend e-commerce design and interaction. Product data is fictional sample content. Checkout is simulated and does not create a real purchase.
          </p>
          <h2 className="font-display text-2xl text-ink">No real transactions</h2>
          <p>
            Selecting Cash on Delivery — Demo or Test Payment — Simulated does not charge money, arrange shipment, or create a binding order with a merchant.
          </p>
          <h2 className="font-display text-2xl text-ink">Local data</h2>
          <p>
            Cart and wishlist state live in your browser. Demo order summaries live in session storage. They are for exploring the interface, not for customer account history.
          </p>
          <h2 className="font-display text-2xl text-ink">Intellectual property</h2>
          <p>
            The OrbitCart brand presentation in this project is a portfolio concept. Product photography is used as local demo imagery. Do not treat sample policies, ratings, or review counts as verified claims.
          </p>
        </section>
      </article>
    </Container>
  );
}
