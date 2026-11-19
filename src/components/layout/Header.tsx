"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { Logo } from "@/src/components/ui/Logo";
import { useStore } from "@/src/context/store";
import { DesktopNavigation } from "./DesktopNavigation";
import { MegaMenu } from "./MegaMenu";
import { MobileNavigation } from "./MobileNavigation";

function Count({ value }: { value: number }) {
  if (value <= 0) return null;
  return (
    <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-coral px-1 text-[10px] font-medium leading-none text-white">
      {value}
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const { cartCount, wishlistCount, openSearch, openCart, closeSearch, closeCart, ready } = useStore();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    closeSearch();
    closeCart();
  }, [pathname, closeSearch, closeCart]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!megaOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMegaOpen(false);
    }
    function onPointer(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-mega-root='true']")) return;
      setMegaOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, [megaOpen]);

  useEffect(() => {
    function onResize() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setMobileOpen(false);
      } else {
        setMegaOpen(false);
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/90"
        data-mega-root="true"
      >
        <div className="relative mx-auto flex h-14 w-full max-w-7xl items-center gap-2 px-3 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink transition active:bg-mist sm:h-11 sm:w-11 lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="min-w-0 shrink">
            <Logo compact />
          </div>

          <div className="mx-auto hidden lg:block">
            <DesktopNavigation megaOpen={megaOpen} onToggleMega={() => setMegaOpen((open) => !open)} />
          </div>

          <div className="ml-auto flex shrink-0 items-center">
            <Link
              href="/shop"
              className="mr-2 hidden items-center justify-center rounded-full bg-cobalt px-4 py-2 text-sm font-medium text-white transition hover:bg-[#4338ca] lg:inline-flex"
            >
              Shop Now
            </Link>
            <button
              type="button"
              aria-label="Search products"
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition active:bg-mist sm:h-11 sm:w-11"
              onClick={openSearch}
            >
              <Search size={20} />
            </button>
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${ready ? wishlistCount : 0} items`}
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink transition active:bg-mist sm:h-11 sm:w-11"
            >
              <Heart size={20} />
              <Count value={ready ? wishlistCount : 0} />
            </Link>
            <button
              type="button"
              aria-label={`Shopping bag, ${ready ? cartCount : 0} items`}
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink transition active:bg-mist sm:h-11 sm:w-11"
              onClick={openCart}
            >
              <ShoppingBag size={20} />
              <Count value={ready ? cartCount : 0} />
            </button>
          </div>

          <MegaMenu open={megaOpen} onNavigate={() => setMegaOpen(false)} />
        </div>
      </header>
      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
