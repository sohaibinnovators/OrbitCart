"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/src/context/store";
import { cn } from "@/src/lib/format";

export function WishlistButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const { isWishlisted, toggleWishlist, ready } = useStore();
  const saved = ready && isWishlisted(productId);
  const [pop, setPop] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full bg-white/95 text-ink shadow-sm transition hover:text-coral",
        className,
      )}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setPop(true);
        toggleWishlist(productId);
        window.setTimeout(() => setPop(false), 350);
      }}
    >
      <Heart size={18} className={cn(saved && "fill-coral text-coral", pop && "heart-pop")} />
    </button>
  );
}
