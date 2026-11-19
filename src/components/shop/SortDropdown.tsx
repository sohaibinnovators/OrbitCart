"use client";

import { sortOptions } from "@/src/lib/catalog";
import type { SortKey } from "@/src/data/types";

export function SortDropdown({ value, onChange }: { value: SortKey; onChange: (value: SortKey) => void }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-muted">
      Sort
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortKey)}
        className="rounded-full border border-line bg-white px-3 py-2 text-sm text-ink"
        aria-label="Sort products"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
