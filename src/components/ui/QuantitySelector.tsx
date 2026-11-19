"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 8,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white">
      <button
        type="button"
        className="grid h-10 w-10 place-items-center text-ink disabled:opacity-40"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={16} />
      </button>
      <span className="w-8 text-center text-sm font-medium" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="grid h-10 w-10 place-items-center text-ink disabled:opacity-40"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
