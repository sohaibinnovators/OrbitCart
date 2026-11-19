"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { Product } from "@/src/data/types";
import { formatPrice } from "@/src/lib/format";
import { QuantitySelector } from "@/src/components/ui/QuantitySelector";

export function CartItem({
  product,
  quantity,
  color,
  size,
  onQuantity,
  onRemove,
}: {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
  onQuantity: (quantity: number) => void;
  onRemove: () => void;
}) {
  const variation = [color, size].filter(Boolean).join(" / ");
  return (
    <article className="grid grid-cols-[96px_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[112px_1fr_auto]">
      <Link href={`/product/${product.slug}`} className="relative h-28 overflow-hidden rounded-2xl bg-mist sm:h-32">
        <Image src={product.images[0]} alt="" fill className="object-cover" sizes="112px" />
      </Link>
      <div>
        <h3 className="font-medium text-ink">
          <Link href={`/product/${product.slug}`} className="hover:text-cobalt">
            {product.name}
          </Link>
        </h3>
        {variation && <p className="mt-1 text-sm text-muted">{variation}</p>}
        <p className="mt-1 text-sm text-ink">{formatPrice(product.price)}</p>
        <div className="mt-3 flex items-center gap-3">
          <QuantitySelector value={quantity} onChange={onQuantity} min={1} />
          <button type="button" onClick={onRemove} className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
            <Trash2 size={15} />
            Remove
          </button>
        </div>
      </div>
      <p className="hidden text-right font-medium text-ink sm:block">{formatPrice(product.price * quantity)}</p>
    </article>
  );
}
