import Image from "next/image";
import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { btnDark, btnPrimary } from "@/src/lib/styles";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0">
        <Image
          src="/images/banners/hero.jpg"
          alt="Warm interior with headphones, lamp, linen, and a mug arranged on a table"
          fill
          priority
          className="object-cover object-[70%_center] sm:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory/92 to-ivory/55 sm:bg-gradient-to-r sm:from-ivory sm:via-ivory/90 sm:to-ivory/20" />
      </div>
      <Container className="relative grid min-h-[min(78vh,760px)] items-center py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-xl fade-up">
          <p className="inline-flex max-w-full rounded-full bg-lavender px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-cobalt sm:text-xs sm:tracking-[0.18em]">
            Demo catalog · Free shipping over $75
          </p>
          <h1 className="mt-4 font-display text-[2.5rem] leading-[1.05] tracking-tight text-ink sm:mt-5 sm:text-6xl lg:text-7xl">
            Find Your Next Favorite Thing.
          </h1>
          <p className="mt-4 max-w-md text-base leading-7 text-muted sm:mt-5 sm:text-lg sm:leading-8">
            Discover thoughtfully selected products for your everyday life — from modern essentials to the little upgrades that make a difference.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Link href="/shop" className={`${btnPrimary} w-full sm:w-auto`}>
              Shop Now
            </Link>
            <Link href="/#collections" className={`${btnDark} w-full sm:w-auto`}>
              Explore Collections
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
