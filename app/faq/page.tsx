import type { Metadata } from "next";
import { faqGroups } from "@/src/data/faqs";
import { FAQAccordion } from "@/src/components/ui/FAQAccordion";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { Container } from "@/src/components/ui/Container";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about the OrbitCart demonstration store and its illustrative policies.",
};

export default function FaqPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "FAQ" }]} />
      <div className="mt-6 max-w-2xl">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Frequently Asked Questions</h1>
        <p className="mt-3 text-muted">
          OrbitCart is a demonstration store. The answers below explain how the demo works and use illustrative policy language, not live business commitments.
        </p>
      </div>
      <div className="mt-12 space-y-10">
        {faqGroups.map((group) => (
          <section key={group.id}>
            <h2 className="mb-4 font-display text-3xl text-ink">{group.title}</h2>
            <FAQAccordion items={group.items} />
          </section>
        ))}
      </div>
    </Container>
  );
}
