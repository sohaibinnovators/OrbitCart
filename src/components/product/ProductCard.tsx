"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/src/context/store";
import type { Product } from "@/src/data/types";
import { categoryName } from "@/src/lib/catalog";
import { formatPrice } from "@/src/lib/format";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({
  product,
  variant = "standard",
}: {
  product: Product;
  variant?: "standard" | "quiet";
}) {
  const { addToCart } = useStore();
  const onSale = Boolean(product.originalPrice && product.originalPrice > product.price);
  const unavailable = product.stockStatus === "out-of-stock";

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-mist">
        <Link href={`/product/${product.slug}`} className="absolute inset-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex gap-2">
          {onSale && (
            <span className="pointer-events-auto rounded-full bg-coral px-2.5 py-1 text-[11px] font-medium text-white">
              Sale
            </span>
          )}
          {unavailable && (
            <span className="pointer-events-auto rounded-full bg-ink px-2.5 py-1 text-[11px] font-medium text-white">
              Out of stock
            </span>
          )}
        </div>
        <WishlistButton productId={product.id} className="absolute right-3 top-3" />
        <button
          type="button"
          disabled={unavailable}
          onClick={() =>
            addToCart({
              productId: product.id,
              color: product.colors?.[0]?.name,
              size: product.sizes?.[0],
            })
          }
          className="absolute inset-x-3 bottom-3 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white opacity-100 transition hover:bg-charcoal disabled:cursor-not-allowed disabled:bg-faint sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus-visible:translate-y-0 sm:focus-visible:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100"
        >
          {unavailable ? "Unavailable" : "Quick Add"}
        </button>
      </div>
      <div className="mt-3 space-y-1">
        {variant === "standard" && (
          <p className="text-xs uppercase tracking-[0.16em] text-faint">{categoryName(product.category)}</p>
        )}
        <h3 className="font-medium text-ink">
          <Link href={`/product/${product.slug}`} className="hover:text-cobalt">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-ink">{formatPrice(product.price)}</span>
          {onSale && product.originalPrice && (
            <span className="text-faint line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <p className="text-xs text-faint" title="Illustrative demo rating, not verified reviews">
          {product.rating.toFixed(1)} · {product.reviewCount} sample reviews
        </p>
      </div>
    </article>
  );
}
