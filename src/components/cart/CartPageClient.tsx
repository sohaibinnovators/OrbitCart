"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/src/context/store";
import { summarizeCart } from "@/src/lib/cart";
import { formatPrice } from "@/src/lib/format";
import { btnPrimary, btnSecondary, fieldClass } from "@/src/lib/styles";
import { CartItem } from "@/src/components/cart/CartItem";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { freeShippingThreshold, promoCode } from "@/src/lib/site";

export function CartPageClient() {
  const {
    cart,
    promo,
    ready,
    updateQty,
    removeFromCart,
    applyPromo,
    clearPromo,
    clearCart,
    toast,
  } = useStore();
  const [code, setCode] = useState("");
  const summary = summarizeCart(cart, "standard", promo);
  const remainingForFree = Math.max(0, freeShippingThreshold - summary.subtotal);

  useEffect(() => {
    setCode(promo);
  }, [promo]);

  if (!ready) {
    return <p className="text-sm text-muted">Loading your bag…</p>;
  }

  if (summary.detailed.length === 0) {
    return (
      <EmptyState
        title="Your bag is empty."
        text="Browse the shop and add something you like. Cart items are saved in this browser."
        action={{ href: "/shop", label: "Continue shopping" }}
      />
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {summary.detailed.length} {summary.detailed.length === 1 ? "line item" : "line items"}
          </p>
          <button
            type="button"
            className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
            onClick={() => {
              clearCart();
              toast("Your bag was cleared.");
            }}
          >
            Clear bag
          </button>
        </div>
        <div className="rounded-[28px] border border-line bg-white px-4 sm:px-6">
          {summary.detailed.map((line) => (
            <CartItem
              key={line.id}
              product={line.product}
              quantity={line.quantity}
              color={line.color}
              size={line.size}
              onQuantity={(quantity) => updateQty(line.id, quantity)}
              onRemove={() => removeFromCart(line.id)}
            />
          ))}
        </div>
      </div>
      <aside className="h-fit rounded-[28px] border border-line bg-white p-6">
        <h2 className="font-display text-3xl text-ink">Order summary</h2>
        <div className="mt-5 rounded-2xl bg-mist px-4 py-3 text-sm text-muted">
          {remainingForFree > 0 ? (
            <p>
              Add {formatPrice(remainingForFree)} more for free demo shipping over{" "}
              {formatPrice(freeShippingThreshold)}.
            </p>
          ) : (
            <p className="text-ink">You’ve unlocked free demo shipping on this bag.</p>
          )}
        </div>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd>{formatPrice(summary.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Shipping estimate</dt>
            <dd>{summary.shipping === 0 ? "Free" : formatPrice(summary.shipping)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Discount</dt>
            <dd>{summary.discount > 0 ? `−${formatPrice(summary.discount)}` : formatPrice(0)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3 text-base font-medium">
            <dt>Grand total</dt>
            <dd>{formatPrice(summary.total)}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-faint">
          Free shipping on orders over {formatPrice(freeShippingThreshold)} in this demo. Try code {promoCode} for 10% off.
        </p>
        <form
          className="mt-5 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            applyPromo(code);
          }}
        >
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Promo code"
            className={fieldClass}
            aria-label="Promo code"
          />
          <button type="submit" className={btnSecondary}>
            Apply
          </button>
        </form>
        {promo && (
          <button type="button" onClick={clearPromo} className="mt-2 text-sm text-muted underline">
            Remove {promo}
          </button>
        )}
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/checkout" className={btnPrimary}>
            Proceed to checkout
          </Link>
          <Link href="/shop" className={btnSecondary}>
            Continue shopping
          </Link>
        </div>
      </aside>
    </div>
  );
}
