"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/src/data/categories";
import { products } from "@/src/data/products";

export function MegaMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  if (!open) return null;
  return (
    <div className="absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-xl lg:block">
      <div className="mx-auto grid max-w-7xl grid-cols-5 gap-3 px-6 py-5 xl:gap-4 xl:px-8 xl:py-6">
        {categories.map((category) => {
          const count = products.filter((product) => product.category === category.slug).length;
          return (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              onClick={onNavigate}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 font-medium text-ink group-hover:text-cobalt">{category.name}</p>
              <p className="mt-1 text-sm text-muted">{count} products</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
