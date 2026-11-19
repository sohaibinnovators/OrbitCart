import Image from "next/image";
import Link from "next/link";
import { btnPrimary } from "@/src/lib/styles";

export function PromotionalBanner({
  eyebrow,
  title,
  text,
  href,
  label,
  image,
  alt,
}: {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  label: string;
  image: string;
  alt: string;
}) {
  return (
    <section className="overflow-hidden rounded-[32px] bg-charcoal text-white">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:py-16">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-coral">{eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-md text-white/75">{text}</p>
          <div className="mt-8">
            <Link href={href} className={btnPrimary}>
              {label}
            </Link>
          </div>
        </div>
        <div className="relative min-h-72">
          <Image src={image} alt={alt} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
