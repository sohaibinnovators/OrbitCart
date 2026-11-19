import { Container } from "@/src/components/ui/Container";
import { NewsletterForm } from "@/src/components/ui/NewsletterForm";

export function NewsletterSection() {
  return (
    <section className="pb-20">
      <Container>
        <div className="rounded-[36px] bg-charcoal px-6 py-14 text-ivory sm:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl sm:text-5xl">A Little Inspiration in Your Inbox.</h2>
            <p className="mt-4 text-white/70">
              Get product inspiration, updates, and occasional special offers. This form is a frontend demo only.
            </p>
            <div className="mx-auto mt-8 max-w-lg text-left">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
