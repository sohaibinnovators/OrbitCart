import Image from "next/image";
import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { btnSecondary } from "@/src/lib/styles";

export function EditorialSection() {
  return (
    <section className="pb-20">
      <Container>
        <div className="grid overflow-hidden rounded-[36px] bg-lavender lg:grid-cols-2">
          <div className="relative min-h-[320px]">
            <Image
              src="/images/banners/editorial.jpg"
              alt="Calm bedroom corner with linen bedding, a sleep mask, candle, and lamp"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
            <p className="text-xs uppercase tracking-[0.18em] text-cobalt">Editorial</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              More Than Products. Better Everyday Living.
            </h2>
            <p className="mt-4 max-w-md text-muted">
              OrbitCart is a fictional retail concept built around useful objects and quieter design. The idea is simple: shopping should feel inspiring without feeling like work.
            </p>
            <div className="mt-8">
              <Link href="/about" className={btnSecondary}>
                Read the story
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
