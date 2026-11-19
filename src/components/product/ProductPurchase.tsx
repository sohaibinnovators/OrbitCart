"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import type { Product } from "@/src/data/types";
import { useStore } from "@/src/context/store";
import { categoryName } from "@/src/lib/catalog";
import { formatPrice, stockLabel } from "@/src/lib/format";
import { btnPrimary, btnSecondary } from "@/src/lib/styles";
import { QuantitySelector } from "@/src/components/ui/QuantitySelector";

export function ProductPurchase({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted, ready } = useStore();
  const [color, setColor] = useState(product.colors?.[0]?.name);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const saved = ready && isWishlisted(product.id);
  const unavailable = product.stockStatus === "out-of-stock";
  const onSale = Boolean(product.originalPrice && product.originalPrice > product.price);

  return (
    <div>
      <Link href={`/category/${product.category}`} className="text-xs uppercase tracking-[0.18em] text-cobalt">
        {categoryName(product.category)}
      </Link>
      <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">{product.name}</h1>
      <p className="mt-3 text-sm text-faint" title="Illustrative demo rating, not verified reviews">
        {product.rating.toFixed(1)} sample rating · {product.reviewCount} sample reviews
      </p>
      <div className="mt-5 flex items-end gap-3">
        <p className="font-display text-3xl text-ink">{formatPrice(product.price)}</p>
        {onSale && product.originalPrice && (
          <p className="mb-1 text-muted line-through">{formatPrice(product.originalPrice)}</p>
        )}
        {onSale && <span className="mb-1 rounded-full bg-coral px-2.5 py-1 text-xs text-white">Sale</span>}
      </div>
      <p className="mt-4 max-w-xl text-muted">{product.shortDescription}</p>
      <p className={`mt-4 text-sm font-medium ${unavailable ? "text-coral" : "text-ink"}`}>
        {stockLabel(product.stockStatus)}
        {product.stockStatus === "low-stock" ? " in this demo catalog" : ""}
      </p>

      {product.colors && (
        <fieldset className="mt-6">
          <legend className="text-sm font-medium text-ink">Color · {color}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((option) => (
              <button
                key={option.name}
                type="button"
                aria-pressed={color === option.name}
                onClick={() => setColor(option.name)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${color === option.name ? "border-cobalt bg-lavender text-ink" : "border-line bg-white"}`}
              >
                <span className="h-3.5 w-3.5 rounded-full border border-line" style={{ background: option.hex }} />
                {option.name}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {product.sizes && (
        <fieldset className="mt-6">
          <legend className="text-sm font-medium text-ink">Size · {size}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={size === option}
                onClick={() => setSize(option)}
                className={`h-10 min-w-10 rounded-full border px-3 text-sm ${size === option ? "border-cobalt bg-cobalt text-white" : "border-line bg-white"}`}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <button
          type="button"
          className={btnPrimary}
          disabled={unavailable}
          onClick={() => addToCart({ productId: product.id, quantity, color, size })}
        >
          Add to Cart
        </button>
        <button type="button" className={btnSecondary} onClick={() => toggleWishlist(product.id)}>
          <Heart size={16} className={saved ? "fill-coral text-coral" : ""} />
          {saved ? "Saved" : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}
