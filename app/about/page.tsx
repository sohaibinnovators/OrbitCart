import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { Container } from "@/src/components/ui/Container";
import { btnPrimary } from "@/src/lib/styles";

export const metadata: Metadata = {
  title: "About",
  description:
    "OrbitCart is a fictional portfolio concept for discovering everyday essentials in a clean digital shopping experience.",
};

export default function AboutPage() {
  return (
    <div>
      <Container className="py-10">
        <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "About" }]} />
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-faint">About OrbitCart</p>
            <h1 className="mt-3 font-display text-5xl text-ink">
              A Better Way to Discover Everyday Essentials.
            </h1>
          </div>
          <p className="text-lg leading-8 text-muted">
            OrbitCart is a concept online shopping destination built around discovering useful, stylish, and thoughtfully selected products. We believe shopping should feel simple, inspiring, and enjoyable. Our goal is to bring together a varied collection of everyday essentials in one clean and convenient digital experience.
          </p>
        </div>
      </Container>

      <div className="relative h-[48vh] min-h-[320px]">
        <Image
          src="/images/about/story.jpg"
          alt="Bright retail-inspired studio table with everyday objects"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <Container className="grid gap-8 py-16 lg:grid-cols-2">
        <section className="rounded-[28px] border border-line bg-white p-8">
          <h2 className="font-display text-3xl text-ink">Our Story</h2>
          <p className="mt-4 leading-7 text-muted">
            OrbitCart was created as a portfolio demonstration of modern e-commerce design and development. It is a fictional brand, not an established retailer, and exists to show how a polished shopping experience can feel when the interface, catalog, and flows are designed with care.
          </p>
        </section>
        <section className="rounded-[28px] border border-line bg-white p-8">
          <h2 className="font-display text-3xl text-ink">Our Philosophy</h2>
          <p className="mt-4 leading-7 text-muted">
            Prefer fewer, clearer choices. Show products with honest demo copy. Keep checkout calm and transparent about what is simulated. The result should feel premium without pretending to be a live business operation.
          </p>
        </section>
        <section className="rounded-[28px] border border-line bg-white p-8">
          <h2 className="font-display text-3xl text-ink">What Makes OrbitCart Different</h2>
          <p className="mt-4 leading-7 text-muted">
            Distinctive section layouts, a working local catalog, and browser-side cart and wishlist features make the demo feel complete. There is no invented founding year, team size, or office — only a clear fictional concept store.
          </p>
        </section>
        <section className="relative overflow-hidden rounded-[28px] min-h-[280px]">
          <Image
            src="/images/about/studio.jpg"
            alt="Soft home studio scene with everyday lifestyle objects"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </section>
      </Container>

      <Container className="pb-20">
        <section className="rounded-[36px] bg-charcoal px-6 py-14 text-ivory sm:px-12">
          <h2 className="font-display text-4xl">Our Shopping Approach</h2>
          <p className="mt-4 max-w-2xl text-white/75">
            Browse collections, save favorites, and walk through a simulated checkout. Everything meaningful for a client demo is here; everything that would require a real backend is intentionally left out.
          </p>
          <Link href="/shop" className={`${btnPrimary} mt-8`}>
            Start shopping
          </Link>
        </section>
      </Container>
    </div>
  );
}
