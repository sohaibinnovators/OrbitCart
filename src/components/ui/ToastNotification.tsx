"use client";

import { X } from "lucide-react";
import { useStore } from "@/src/context/store";

export function ToastNotification() {
  const { toasts, dismissToast } = useStore();
  if (toasts.length === 0) return null;
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[70] flex w-[min(100%-2rem,360px)] flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="pointer-events-auto flex items-start justify-between gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-white shadow-lg fade-up"
        >
          <p>{toast.message}</p>
          <button
            type="button"
            aria-label="Dismiss notification"
            className="text-white/70 hover:text-white"
            onClick={() => dismissToast(toast.id)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
