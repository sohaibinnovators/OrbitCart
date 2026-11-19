"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useStore } from "@/src/context/store";
import { summarizeCart } from "@/src/lib/cart";
import { formatPrice } from "@/src/lib/format";
import { btnPrimary, btnSecondary } from "@/src/lib/styles";
import { CartItem } from "@/src/components/cart/CartItem";

export function CartDrawer() {
  const { cartOpen, closeCart, cart, promo, updateQty, removeFromCart, ready } = useStore();
  const summary = summarizeCart(cart, "standard", promo);

  useEffect(() => {
    if (!cartOpen) return;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-[60] overflow-x-hidden overflow-y-hidden overscroll-none ${cartOpen ? "visible" : "invisible pointer-events-none"}`}
      aria-hidden={!cartOpen}
    >
      <button
        type="button"
        aria-label="Close cart overlay"
        className={`absolute inset-0 bg-ink/40 transition ${cartOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeCart}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute inset-y-0 right-0 flex w-[min(100%,26rem)] max-w-full flex-col overflow-x-hidden bg-ivory shadow-2xl transition-transform duration-300 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-2xl text-ink">Your bag</h2>
          <button type="button" aria-label="Close bag" onClick={closeCart} className="grid h-10 w-10 place-items-center">
            <X />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5">
          {!ready ? (
            <p className="py-16 text-center text-sm text-muted">Loading your bag…</p>
          ) : summary.detailed.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-3xl text-ink">Your bag is empty</p>
              <p className="mt-2 text-sm text-muted">Add a product to see it here. The bag is saved in this browser.</p>
              <Link href="/shop" onClick={closeCart} className={`${btnPrimary} mt-6`}>
                Continue shopping
              </Link>
            </div>
          ) : (
            summary.detailed.map((line) => (
              <CartItem
                key={line.id}
                product={line.product}
                quantity={line.quantity}
                color={line.color}
                size={line.size}
                onQuantity={(quantity) => updateQty(line.id, quantity)}
                onRemove={() => removeFromCart(line.id)}
              />
            ))
          )}
        </div>
        {summary.detailed.length > 0 && (
          <div className="border-t border-line bg-white p-5">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(summary.subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted">Shipping estimate</span>
              <span>{summary.shipping === 0 ? "Free" : formatPrice(summary.shipping)}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Link href="/cart" onClick={closeCart} className={`${btnSecondary} flex-1`}>
                View cart
              </Link>
              <Link href="/checkout" onClick={closeCart} className={`${btnPrimary} flex-1`}>
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
