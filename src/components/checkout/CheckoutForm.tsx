"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { DemoOrder } from "@/src/data/types";
import { useStore } from "@/src/context/store";
import { summarizeCart } from "@/src/lib/cart";
import { formatPrice } from "@/src/lib/format";
import { btnPrimary, btnSecondary, fieldClass } from "@/src/lib/styles";
import { EmptyState } from "@/src/components/ui/EmptyState";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  postal: string;
  country: string;
  delivery: "standard" | "express";
  payment: "cod" | "test";
};

const empty: FormState = {
  fullName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  region: "",
  postal: "",
  country: "United States",
  delivery: "standard",
  payment: "test",
};

export function CheckoutForm() {
  const router = useRouter();
  const { cart, promo, ready, clearCart, toast } = useStore();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const summary = useMemo(
    () => summarizeCart(cart, form.delivery, promo),
    [cart, form.delivery, promo],
  );

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function validate() {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.street.trim()) next.street = "Street address is required.";
    if (!form.city.trim()) next.city = "City is required.";
    if (!form.region.trim()) next.region = "State / region is required.";
    if (!form.postal.trim()) next.postal = "Postal code is required.";
    if (!form.country.trim()) next.country = "Country is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) {
      toast("Please fix the highlighted fields before placing the demo order.");
      return;
    }
    if (summary.detailed.length === 0) return;
    setSubmitting(true);
    const order: DemoOrder = {
      reference: `OC-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      },
      address: {
        street: form.street.trim(),
        city: form.city.trim(),
        region: form.region.trim(),
        postal: form.postal.trim(),
        country: form.country.trim(),
      },
      delivery: form.delivery,
      payment: form.payment,
      items: summary.detailed.map((line) => ({
        name: line.product.name,
        quantity: line.quantity,
        price: line.product.price,
        variation: [line.color, line.size].filter(Boolean).join(" / ") || undefined,
        image: line.product.images[0],
      })),
      subtotal: summary.subtotal,
      shipping: summary.shipping,
      discount: summary.discount,
      total: summary.total,
    };
    sessionStorage.setItem("orbitcart-demo-order", JSON.stringify(order));
    clearCart();
    toast("Demo order confirmed.");
    router.push("/order-success");
  }

  if (!ready) return <p className="text-sm text-muted">Loading checkout…</p>;

  if (summary.detailed.length === 0) {
    return (
      <EmptyState
        title="Nothing to check out."
        text="Add products to your bag before opening the demo checkout."
        action={{ href: "/shop", label: "Browse products" }}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]" noValidate>
      <div className="space-y-6">
        <p className="rounded-2xl bg-lavender px-4 py-3 text-sm text-ink">
          This checkout and payment flow are simulated for portfolio demonstration. No real payment, card data, or shipment is processed.
        </p>

        <section className="rounded-[28px] border border-line bg-white p-6">
          <h2 className="font-display text-3xl text-ink">Customer details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" error={errors.fullName} className="sm:col-span-2">
              <input className={fieldClass} value={form.fullName} onChange={(e) => setField("fullName", e.target.value)} />
            </Field>
            <Field label="Email" error={errors.email}>
              <input type="email" className={fieldClass} value={form.email} onChange={(e) => setField("email", e.target.value)} />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <input className={fieldClass} value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
            </Field>
          </div>
        </section>

        <section className="rounded-[28px] border border-line bg-white p-6">
          <h2 className="font-display text-3xl text-ink">Shipping address</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Street address" error={errors.street} className="sm:col-span-2">
              <input className={fieldClass} value={form.street} onChange={(e) => setField("street", e.target.value)} />
            </Field>
            <Field label="City" error={errors.city}>
              <input className={fieldClass} value={form.city} onChange={(e) => setField("city", e.target.value)} />
            </Field>
            <Field label="State / Region" error={errors.region}>
              <input className={fieldClass} value={form.region} onChange={(e) => setField("region", e.target.value)} />
            </Field>
            <Field label="Postal code" error={errors.postal}>
              <input className={fieldClass} value={form.postal} onChange={(e) => setField("postal", e.target.value)} />
            </Field>
            <Field label="Country" error={errors.country}>
              <input className={fieldClass} value={form.country} onChange={(e) => setField("country", e.target.value)} />
            </Field>
          </div>
        </section>

        <section className="rounded-[28px] border border-line bg-white p-6">
          <h2 className="font-display text-3xl text-ink">Delivery method</h2>
          <div className="mt-5 space-y-3">
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line p-4">
              <input
                type="radio"
                name="delivery"
                checked={form.delivery === "standard"}
                onChange={() => setField("delivery", "standard")}
              />
              <span>
                <span className="block font-medium">Standard Delivery</span>
                <span className="text-sm text-muted">Illustrative 4–7 day sample timeline. Free over $75.</span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line p-4">
              <input
                type="radio"
                name="delivery"
                checked={form.delivery === "express"}
                onChange={() => setField("delivery", "express")}
              />
              <span>
                <span className="block font-medium">Express Delivery</span>
                <span className="text-sm text-muted">Illustrative 1–3 day sample timeline with a higher demo fee.</span>
              </span>
            </label>
          </div>
        </section>

        <section className="rounded-[28px] border border-line bg-white p-6">
          <h2 className="font-display text-3xl text-ink">Payment method</h2>
          <div className="mt-5 space-y-3">
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line p-4">
              <input
                type="radio"
                name="payment"
                checked={form.payment === "cod"}
                onChange={() => setField("payment", "cod")}
              />
              <span>
                <span className="block font-medium">Cash on Delivery — Demo</span>
                <span className="text-sm text-muted">No money is collected. Shown only for interface demonstration.</span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line p-4">
              <input
                type="radio"
                name="payment"
                checked={form.payment === "test"}
                onChange={() => setField("payment", "test")}
              />
              <span>
                <span className="block font-medium">Test Payment — Simulated</span>
                <span className="text-sm text-muted">No card numbers or CVV are collected. Nothing is charged.</span>
              </span>
            </label>
          </div>
        </section>
      </div>

      <aside className="h-fit rounded-[28px] border border-line bg-white p-6">
        <h2 className="font-display text-3xl text-ink">Order summary</h2>
        <ul className="mt-5 space-y-3">
          {summary.detailed.map((line) => (
            <li key={line.id} className="flex justify-between gap-3 text-sm">
              <span className="text-muted">
                {line.product.name} × {line.quantity}
              </span>
              <span>{formatPrice(line.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatPrice(summary.subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd>{formatPrice(summary.shipping)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Discount</dt><dd>{formatPrice(summary.discount)}</dd></div>
          <div className="flex justify-between text-base font-medium"><dt>Total</dt><dd>{formatPrice(summary.total)}</dd></div>
        </dl>
        <button type="submit" className={`${btnPrimary} mt-6 w-full`} disabled={submitting}>
          {submitting ? "Placing demo order…" : "Place demo order"}
        </button>
        <Link href="/cart" className={`${btnSecondary} mt-3 w-full`}>
          Back to cart
        </Link>
      </aside>
    </form>
  );
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-2 block font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-coral">{error}</span>}
    </label>
  );
}
