"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  const hasMultiple = images.length > 1;

  function go(delta: number) {
    setActive((index) => (index + delta + images.length) % images.length);
  }

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[28px] bg-mist">
        <Image
          src={current}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink shadow-sm transition hover:bg-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink shadow-sm transition hover:bg-white"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>
      {hasMultiple && (
        <div className="mt-3 flex gap-3" role="listbox" aria-label={`${name} image thumbnails`}>
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              role="option"
              aria-selected={index === active}
              aria-label={`Show image ${index + 1} of ${name}`}
              onClick={() => setActive(index)}
              className={`relative h-20 w-20 overflow-hidden rounded-2xl border ${index === active ? "border-cobalt" : "border-transparent"}`}
            >
              <Image src={image} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
