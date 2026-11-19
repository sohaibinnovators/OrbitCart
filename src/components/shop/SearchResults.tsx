"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { products } from "@/src/data/products";
import { applyCatalog } from "@/src/lib/catalog";
import { fieldClass, btnSecondary } from "@/src/lib/styles";
import { ProductGrid } from "@/src/components/product/ProductGrid";
import { EmptyState } from "@/src/components/ui/EmptyState";

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const results = useMemo(
    () =>
      applyCatalog(products, {
        category: "",
        min: "",
        max: "",
        sale: false,
        inStock: false,
        q: initial,
        sort: "featured",
      }),
    [initial],
  );

  useEffect(() => {
    setQuery(initial);
  }, [initial]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next = query.trim();
    router.replace(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
  }

  return (
    <div>
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="search-page" className="sr-only">
          Search products
        </label>
        <input
          id="search-page"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the catalog"
          className={fieldClass}
        />
        <button type="submit" className={btnSecondary}>
          Search
        </button>
        {initial && (
          <button
            type="button"
            className={btnSecondary}
            onClick={() => {
              setQuery("");
              router.replace("/search");
            }}
          >
            Clear
          </button>
        )}
      </form>
      <p className="mt-6 text-sm text-muted">
        {initial
          ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${initial}”`
          : "Search names, categories, descriptions, and tags."}
      </p>
      <div className="mt-8">
        {!initial ? (
          <div className="rounded-[28px] border border-dashed border-line bg-white px-6 py-14 text-center">
            <h2 className="font-display text-3xl text-ink">Start with a word.</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Try speaker, linen, lamp, serum, or backpack — search looks through the local demo catalog.
            </p>
          </div>
        ) : results.length === 0 ? (
          <EmptyState
            title="No matches."
            text="Try a broader word such as lamp, bag, or beauty. Search only looks through this demo catalog."
            action={{ href: "/shop", label: "Browse the shop" }}
          />
        ) : (
          <ProductGrid products={results} />
        )}
      </div>
    </div>
  );
}
