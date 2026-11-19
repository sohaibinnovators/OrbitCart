"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      className="text-left text-sm text-white/80 hover:text-white"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Back to top
    </button>
  );
}
