import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { btnPrimary } from "@/src/lib/styles";

export function FinalCta() {
  return (
    <section className="pb-24">
      <Container>
        <div className="overflow-hidden rounded-[36px] border border-line bg-[radial-gradient(circle_at_top_left,#EEEAFE,transparent_45%),linear-gradient(180deg,#FFFFFF,#F8F7F4)] px-6 py-16 text-center sm:px-12">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">Ready to Find Something You Love?</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Start with the full catalog, or jump into a collection. Everything here is a portfolio shopping demo.
          </p>
          <div className="mt-8">
            <Link href="/shop" className={btnPrimary}>
              Start Shopping
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
