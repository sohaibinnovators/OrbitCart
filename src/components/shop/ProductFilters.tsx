"use client";

import { useEffect, useState } from "react";
import { categories } from "@/src/data/categories";
import type { FilterState } from "@/src/data/types";
import { fieldClass } from "@/src/lib/styles";

export function ProductFilters({
  state,
  lockedCategory,
  onChange,
  onClear,
}: {
  state: FilterState;
  lockedCategory?: string;
  onChange: (patch: Partial<FilterState>) => void;
  onClear: () => void;
}) {
  const [min, setMin] = useState(state.min);
  const [max, setMax] = useState(state.max);

  useEffect(() => {
    setMin(state.min);
    setMax(state.max);
  }, [state.min, state.max]);

  return (
    <div className="space-y-6">
      {!lockedCategory && (
        <fieldset>
          <legend className="text-sm font-medium text-ink">Category</legend>
          <div className="mt-3 space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="category"
                checked={state.category === ""}
                onChange={() => onChange({ category: "" })}
              />
              All
            </label>
            {categories.map((category) => (
              <label key={category.slug} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="category"
                  checked={state.category === category.slug}
                  onChange={() => onChange({ category: category.slug })}
                />
                {category.name}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          onChange({ min, max });
        }}
      >
        <p className="text-sm font-medium text-ink">Price</p>
        <div className="grid grid-cols-2 gap-2">
          <input
            inputMode="decimal"
            placeholder="Min"
            aria-label="Minimum price"
            value={min}
            onChange={(event) => setMin(event.target.value)}
            className={fieldClass}
          />
          <input
            inputMode="decimal"
            placeholder="Max"
            aria-label="Maximum price"
            value={max}
            onChange={(event) => setMax(event.target.value)}
            className={fieldClass}
          />
        </div>
        <button type="submit" className="text-sm font-medium text-cobalt">
          Apply price
        </button>
      </form>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={state.sale} onChange={(event) => onChange({ sale: event.target.checked })} />
        Sale products
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={state.inStock}
          onChange={(event) => onChange({ inStock: event.target.checked })}
        />
        In stock only
      </label>
      <button type="button" onClick={onClear} className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
        Clear filters
      </button>
    </div>
  );
}
