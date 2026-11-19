"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/src/data/products";
import { useStore } from "@/src/context/store";
import { formatPrice } from "@/src/lib/format";
import { btnPrimary, btnSecondary } from "@/src/lib/styles";
import { EmptyState } from "@/src/components/ui/EmptyState";

export function WishlistPageClient() {
  const { wishlist, ready, toggleWishlist, addToCart } = useStore();
  const items = wishlist.map((id) => getProductById(id)).filter(Boolean);

  if (!ready) return <p className="text-sm text-muted">Loading wishlist…</p>;

  if (items.length === 0) {
    return (
      <EmptyState
        title="Nothing saved yet."
        text="Tap the heart on a product to keep it here. Wishlist items are saved in this browser."
        action={{ href: "/shop", label: "Continue shopping" }}
      />
    );
  }

  return (
    <div className="space-y-4">
      {items.map((product) =>
        product ? (
          <article
            key={product.id}
            className="grid gap-4 rounded-[28px] border border-line bg-white p-4 sm:grid-cols-[120px_1fr_auto] sm:items-center"
          >
            <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden rounded-2xl bg-mist">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="120px" />
            </Link>
            <div>
              <h2 className="font-medium text-ink">
                <Link href={`/product/${product.slug}`} className="hover:text-cobalt">
                  {product.name}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-muted">{formatPrice(product.price)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={btnPrimary}
                disabled={product.stockStatus === "out-of-stock"}
                onClick={() =>
                  addToCart({
                    productId: product.id,
                    color: product.colors?.[0]?.name,
                    size: product.sizes?.[0],
                  })
                }
              >
                Add to cart
              </button>
              <button type="button" className={btnSecondary} onClick={() => toggleWishlist(product.id)}>
                Remove
              </button>
            </div>
          </article>
        ) : null,
      )}
      <Link href="/shop" className={`${btnSecondary} mt-4`}>
        Continue shopping
      </Link>
    </div>
  );
}
