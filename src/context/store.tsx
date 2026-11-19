"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProductById } from "@/src/data/products";
import type { CartLine } from "@/src/data/types";
import { lineId } from "@/src/lib/cart";

const CART_KEY = "orbitcart-cart";
const WISH_KEY = "orbitcart-wishlist";
const PROMO_KEY = "orbitcart-promo";

type Toast = { id: number; message: string };

type StoreValue = {
  ready: boolean;
  cart: CartLine[];
  wishlist: string[];
  promo: string;
  toasts: Toast[];
  cartCount: number;
  wishlistCount: number;
  searchOpen: boolean;
  cartOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (input: {
    productId: string;
    quantity?: number;
    color?: string;
    size?: string;
  }) => void;
  updateQty: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  toast: (message: string) => void;
  dismissToast: (id: number) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [promo, setPromo] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  useEffect(() => {
    setCart(readJson<CartLine[]>(CART_KEY, []));
    setWishlist(readJson<string[]>(WISH_KEY, []));
    setPromo(localStorage.getItem(PROMO_KEY) ?? "");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(PROMO_KEY, promo);
  }, [promo, ready]);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key === CART_KEY) {
        setCart(event.newValue ? (JSON.parse(event.newValue) as CartLine[]) : []);
      }
      if (event.key === WISH_KEY) {
        setWishlist(event.newValue ? (JSON.parse(event.newValue) as string[]) : []);
      }
      if (event.key === PROMO_KEY) {
        setPromo(event.newValue ?? "");
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toast = useCallback((message: string) => {
    const id = Date.now() + Math.round(Math.random() * 1000);
    setToasts((current) => [...current.slice(-3), { id, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 2800);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const addToCart = useCallback(
    (input: { productId: string; quantity?: number; color?: string; size?: string }) => {
      const product = getProductById(input.productId);
      if (!product || product.stockStatus === "out-of-stock") {
        toast("This sample is out of stock.");
        return;
      }
      const quantity = Math.min(8, Math.max(1, input.quantity ?? 1));
      const id = lineId(input.productId, input.color, input.size);
      setCart((current) => {
        const existing = current.find((line) => line.id === id);
        if (existing) {
          return current.map((line) =>
            line.id === id
              ? { ...line, quantity: Math.min(8, line.quantity + quantity) }
              : line,
          );
        }
        return [
          ...current,
          {
            id,
            productId: input.productId,
            quantity,
            color: input.color,
            size: input.size,
          },
        ];
      });
      toast(`${product.name} added to your bag.`);
      setCartOpen(true);
    },
    [toast],
  );

  const updateQty = useCallback((id: string, quantity: number) => {
    setCart((current) =>
      current
        .map((line) =>
          line.id === id ? { ...line, quantity: Math.min(8, Math.max(0, quantity)) } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const removeFromCart = useCallback(
    (id: string) => {
      setCart((current) => {
        const line = current.find((item) => item.id === id);
        const product = line ? getProductById(line.productId) : null;
        if (product) toast(`${product.name} removed from your bag.`);
        return current.filter((item) => item.id !== id);
      });
    },
    [toast],
  );

  const clearCart = useCallback(() => {
    setCart([]);
    setPromo("");
  }, []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      const product = getProductById(productId);
      setWishlist((current) => {
        const exists = current.includes(productId);
        toast(exists ? "Removed from wishlist." : `${product?.name ?? "Item"} saved to wishlist.`);
        return exists ? current.filter((id) => id !== productId) : [...current, productId];
      });
    },
    [toast],
  );

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  );

  const applyPromo = useCallback(
    (code: string) => {
      if (code.trim().toUpperCase() === "ORBIT10") {
        setPromo("ORBIT10");
        toast("Demo code ORBIT10 applied.");
        return true;
      }
      toast("That demo code is not recognized.");
      return false;
    },
    [toast],
  );

  const clearPromo = useCallback(() => setPromo(""), []);

  const value = useMemo<StoreValue>(
    () => ({
      ready,
      cart,
      wishlist,
      promo,
      toasts,
      cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
      wishlistCount: wishlist.length,
      searchOpen,
      cartOpen,
      openSearch,
      closeSearch,
      openCart,
      closeCart,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
      applyPromo,
      clearPromo,
      toast,
      dismissToast,
    }),
    [
      ready,
      cart,
      wishlist,
      promo,
      toasts,
      searchOpen,
      cartOpen,
      openSearch,
      closeSearch,
      openCart,
      closeCart,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
      applyPromo,
      clearPromo,
      toast,
      dismissToast,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
