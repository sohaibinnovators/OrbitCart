"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { products as catalog } from "@/src/data/products";
import type { Product } from "@/src/data/types";
import { applyCatalog, filtersFromParams, paramsFromFilters } from "@/src/lib/catalog";
import { fieldClass } from "@/src/lib/styles";
import { ProductGrid } from "@/src/components/product/ProductGrid";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { ProductFilters } from "./ProductFilters";
import { SortDropdown } from "./SortDropdown";

export function Catalog({
  products = catalog,
  lockedCategory = "",
  showSearch = true,
}: {
  products?: Product[];
  lockedCategory?: string;
  showSearch?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawer, setDrawer] = useState(false);
  const queryKey = searchParams.toString();
  const state = useMemo(
    () => filtersFromParams(new URLSearchParams(queryKey), lockedCategory),
    [queryKey, lockedCategory],
  );
  const [searchInput, setSearchInput] = useState(state.q);
  const results = useMemo(() => applyCatalog(products, state), [products, state]);

  useEffect(() => {
    setSearchInput(state.q);
  }, [state.q]);

  useEffect(() => {
    if (searchInput === state.q) return;
    const timer = window.setTimeout(() => {
      const next = paramsFromFilters({ ...state, q: searchInput }, lockedCategory);
      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchInput, state, lockedCategory, pathname, router]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  function update(patch: Partial<typeof state>) {
    const next = paramsFromFilters({ ...state, ...patch }, lockedCategory);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function clear() {
    setSearchInput("");
    router.replace(pathname, { scroll: false });
    setDrawer(false);
  }

  const filters = (
    <ProductFilters
      state={state}
      lockedCategory={lockedCategory}
      onChange={update}
      onClear={clear}
    />
  );

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-line pb-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {results.length} {results.length === 1 ? "product" : "products"}
          </p>
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <SortDropdown value={state.sort} onChange={(sort) => update({ sort })} />
            <button
              type="button"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm lg:hidden"
              onClick={() => setDrawer(true)}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
        </div>
        {showSearch && (
          <>
            <label className="sr-only" htmlFor="catalog-search">
              Search this collection
            </label>
            <input
              id="catalog-search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search this collection"
              className={`${fieldClass} w-full sm:max-w-sm`}
            />
          </>
        )}
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">{filters}</aside>
        <div>
          {results.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-line bg-white px-6 py-16 text-center">
              <h2 className="font-display text-3xl text-ink">Nothing matches yet.</h2>
              <p className="mx-auto mt-3 max-w-md text-muted">
                Try a different price, category, or search word. The catalog is a small demo collection.
              </p>
              <button
                type="button"
                onClick={clear}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm font-medium text-white transition hover:bg-[#4338ca]"
              >
                Reset this view
              </button>
            </div>
          ) : (
            <ProductGrid products={results} />
          )}
        </div>
      </div>
      <div className={`fixed inset-0 z-50 lg:hidden ${drawer ? "" : "pointer-events-none"}`}>
        <button
          type="button"
          aria-label="Close filters"
          className={`absolute inset-0 bg-ink/40 transition ${drawer ? "opacity-100" : "opacity-0"}`}
          onClick={() => setDrawer(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 w-[min(100%,22rem)] overflow-y-auto bg-ivory p-5 shadow-2xl transition-transform ${drawer ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-2xl">Filters</h2>
            <button type="button" aria-label="Close filters" onClick={() => setDrawer(false)}>
              <X />
            </button>
          </div>
          {filters}
          <button
            type="button"
            className="mt-6 w-full rounded-full bg-cobalt px-6 py-3 text-sm font-medium text-white"
            onClick={() => setDrawer(false)}
          >
            Show {results.length} {results.length === 1 ? "product" : "products"}
          </button>
        </div>
      </div>
    </div>
  );
}
