"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { products } from "@/src/data/products";
import { applyCatalog } from "@/src/lib/catalog";
import { formatPrice } from "@/src/lib/format";
import { useStore } from "@/src/context/store";
import { fieldClass } from "@/src/lib/styles";

export function SearchDialog() {
  const router = useRouter();
  const { searchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!searchOpen) {
      setQuery("");
      return;
    }
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeSearch();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [searchOpen, closeSearch]);

  const results = useMemo(
    () =>
      applyCatalog(products, {
        category: "",
        min: "",
        max: "",
        sale: false,
        inStock: false,
        q: query,
        sort: "featured",
      }).slice(0, 6),
    [query],
  );

  function goToResults() {
    const next = query.trim();
    closeSearch();
    if (next) router.push(`/search?q=${encodeURIComponent(next)}`);
    else router.push("/search");
  }

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button type="button" aria-label="Close search" className="absolute inset-0 bg-ink/45" onClick={closeSearch} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto rounded-none bg-white p-4 shadow-2xl sm:inset-x-auto sm:left-1/2 sm:top-16 sm:w-[min(100%-1.5rem,680px)] sm:-translate-x-1/2 sm:rounded-[28px] sm:p-5"
      >
        <form
          className="flex items-center gap-2 sm:gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            goToResults();
          }}
        >
          <Search size={18} className="shrink-0 text-faint" />
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <input
            id="site-search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            className={`${fieldClass} min-w-0 border-0 px-0`}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="shrink-0 text-sm text-muted"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            aria-label="Close search"
            onClick={closeSearch}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mist"
          >
            <X size={18} />
          </button>
        </form>
        <div className="mt-4 border-t border-line pt-4">
          {query.trim() === "" && (
            <p className="text-sm text-muted">
              Try speaker, scarf, or candle. Press Enter for full results.
            </p>
          )}
          {query.trim() !== "" && results.length === 0 && (
            <div className="rounded-2xl bg-mist px-4 py-6 text-center">
              <p className="text-sm font-medium text-ink">No products match “{query}”.</p>
              <p className="mt-2 text-sm text-muted">Try broader words such as bag, lamp, or beauty.</p>
              <Link href="/shop" onClick={closeSearch} className="mt-4 inline-flex text-sm font-medium text-cobalt">
                Browse all products
              </Link>
            </div>
          )}
          <ul className="space-y-2">
            {query.trim() !== "" &&
              results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={closeSearch}
                    className="flex items-center gap-3 rounded-2xl p-2 active:bg-mist sm:hover:bg-mist"
                  >
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-mist">
                      <Image src={product.images[0]} alt="" fill className="object-cover" sizes="56px" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-ink">{product.name}</span>
                      <span className="text-sm text-muted">{formatPrice(product.price)}</span>
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
          {query.trim() && results.length > 0 && (
            <button type="button" onClick={goToResults} className="mt-4 inline-flex text-sm font-medium text-cobalt">
              View all results
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
