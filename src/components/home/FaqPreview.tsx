import Link from "next/link";
import { previewFaqs } from "@/src/data/faqs";
import { FAQAccordion } from "@/src/components/ui/FAQAccordion";
import { Container } from "@/src/components/ui/Container";
import { btnSecondary } from "@/src/lib/styles";

export function FaqPreview() {
  return (
    <section className="pb-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-faint">Help</p>
            <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Questions, answered.</h2>
            <p className="mt-4 text-muted">
              Policies and answers on OrbitCart are illustrative for this demonstration store.
            </p>
            <Link href="/faq" className={`${btnSecondary} mt-8`}>
              View all FAQs
            </Link>
          </div>
          <FAQAccordion items={previewFaqs} />
        </div>
      </Container>
    </section>
  );
}
