"use client";

import { useId, useState } from "react";
import { btnPrimary, fieldClass } from "@/src/lib/styles";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      setDone(false);
      return;
    }
    setError("");
    setDone(true);
  }

  if (done) {
    return (
      <p className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-ink" role="status">
        You are noted for this demo. No email was sent to a mailing platform.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-3" : "space-y-3"} noValidate>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={id}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className={fieldClass}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button type="submit" className={btnPrimary}>
          Subscribe
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-coral">
          {error}
        </p>
      )}
    </form>
  );
}
