"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search, ShoppingBag, X } from "lucide-react";
import { categories } from "@/src/data/categories";
import { Logo } from "@/src/components/ui/Logo";
import { useStore } from "@/src/context/store";
import { cn } from "@/src/lib/format";
import { btnPrimary } from "@/src/lib/styles";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const { openSearch, cartCount, wishlistCount, ready } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[100] overflow-x-hidden overflow-y-hidden overscroll-none lg:hidden",
        open ? "visible" : "invisible pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close menu overlay"
        className={cn(
          "absolute inset-0 bg-ink/45 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "absolute inset-y-0 right-0 flex w-[min(100%,22rem)] max-w-full flex-col overflow-x-hidden overflow-y-hidden bg-ivory shadow-2xl transition-transform duration-300 ease-out",
          "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-4 py-3.5">
          <div id={titleId} className="min-w-0">
            <Logo compact onClick={onClose} />
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-5">
          <nav aria-label="Mobile primary" className="flex flex-col">
            {primaryLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "rounded-2xl px-3 py-3 text-lg font-medium transition",
                    active ? "bg-lavender text-cobalt" : "text-ink active:bg-mist",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <p className="mt-6 px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-faint">
            Categories
          </p>
          <nav aria-label="Mobile categories" className="mt-2 flex flex-col">
            {categories.map((category) => {
              const active = pathname === `/category/${category.slug}`;
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  onClick={onClose}
                  className={cn(
                    "rounded-2xl px-3 py-3 text-base transition",
                    active ? "bg-white text-cobalt" : "text-ink active:bg-mist",
                  )}
                >
                  {category.name}
                </Link>
              );
            })}
          </nav>

          <Link href="/shop" onClick={onClose} className={`${btnPrimary} mt-6 w-full`}>
            Shop Now
          </Link>
        </div>

        <div className="grid shrink-0 grid-cols-3 gap-2 border-t border-line bg-white p-3">
          <button
            type="button"
            className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl bg-mist text-xs font-medium text-ink"
            onClick={() => {
              onClose();
              window.setTimeout(() => openSearch(), 180);
            }}
          >
            <Search size={18} />
            Search
          </button>
          <Link
            href="/wishlist"
            onClick={onClose}
            className="relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl bg-mist text-xs font-medium text-ink"
          >
            <Heart size={18} />
            Wishlist
            {ready && wishlistCount > 0 && (
              <span className="absolute right-2 top-2 grid h-4 min-w-4 place-items-center rounded-full bg-coral px-1 text-[10px] text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            onClick={onClose}
            className="relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl bg-mist text-xs font-medium text-ink"
          >
            <ShoppingBag size={18} />
            Cart
            {ready && cartCount > 0 && (
              <span className="absolute right-2 top-2 grid h-4 min-w-4 place-items-center rounded-full bg-coral px-1 text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
