"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/src/data/faqs";

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-[28px] border border-line bg-white">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="font-medium text-ink">{item.question}</span>
              <Plus
                size={18}
                className={`shrink-0 text-cobalt transition ${expanded ? "rotate-45" : ""}`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-6 text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
