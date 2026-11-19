"use client";

import { useState } from "react";
import { btnPrimary, fieldClass } from "@/src/lib/styles";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email.";
    if (!form.subject.trim()) next.subject = "Subject is required.";
    if (form.message.trim().length < 10) next.message = "Please write a short message.";
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-[28px] border border-line bg-white p-8" role="status">
        <h2 className="font-display text-3xl text-ink">Message noted for this demo.</h2>
        <p className="mt-3 text-muted">
          No email was sent. OrbitCart does not have a live support inbox behind this form.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-line bg-white p-6 sm:p-8" noValidate>
      <div className="grid gap-4">
        <label className="text-sm">
          <span className="mb-2 block font-medium">Name</span>
          <input className={fieldClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          {errors.name && <span className="mt-1 block text-coral">{errors.name}</span>}
        </label>
        <label className="text-sm">
          <span className="mb-2 block font-medium">Email</span>
          <input type="email" className={fieldClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          {errors.email && <span className="mt-1 block text-coral">{errors.email}</span>}
        </label>
        <label className="text-sm">
          <span className="mb-2 block font-medium">Subject</span>
          <input className={fieldClass} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          {errors.subject && <span className="mt-1 block text-coral">{errors.subject}</span>}
        </label>
        <label className="text-sm">
          <span className="mb-2 block font-medium">Message</span>
          <textarea
            rows={5}
            className={fieldClass}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          {errors.message && <span className="mt-1 block text-coral">{errors.message}</span>}
        </label>
        <button type="submit" className={btnPrimary}>
          Send demo message
        </button>
      </div>
    </form>
  );
}
