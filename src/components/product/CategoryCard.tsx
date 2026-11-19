import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/src/data/types";

export function CategoryCard({
  category,
  count,
  className = "",
}: {
  category: Category;
  count: number;
  className?: string;
}) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={`group relative block overflow-hidden rounded-[28px] bg-charcoal ${className}`}
    >
      <Image
        src={category.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="font-display text-3xl">{category.name}</h3>
        <p className="mt-1 max-w-xs text-sm text-white/80">{category.description}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/70">
          {count} {count === 1 ? "product" : "products"}
        </p>
      </div>
    </Link>
  );
}
