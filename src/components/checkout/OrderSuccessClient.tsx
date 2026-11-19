"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { DemoOrder } from "@/src/data/types";
import { formatPrice } from "@/src/lib/format";
import { btnPrimary, btnSecondary } from "@/src/lib/styles";
import { EmptyState } from "@/src/components/ui/EmptyState";

export function OrderSuccessClient() {
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("orbitcart-demo-order");
      setOrder(raw ? (JSON.parse(raw) as DemoOrder) : null);
    } catch {
      setOrder(null);
    }
    setReady(true);
  }, []);

  if (!ready) return <p className="text-sm text-muted">Loading confirmation…</p>;

  if (!order) {
    return (
      <EmptyState
        title="No demo order found."
        text="Complete the simulated checkout to see a confirmation summary here."
        action={{ href: "/shop", label: "Continue shopping" }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-[32px] border border-line bg-white p-6 text-center sm:p-10">
        <CheckCircle2 className="mx-auto text-cobalt" size={48} />
        <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">Your Demo Order Is Confirmed!</h1>
        <p className="mt-3 text-muted">Reference {order.reference}</p>
        <p className="mt-5 rounded-2xl bg-lavender px-4 py-3 text-sm text-ink">
          This is a demonstration checkout. No real payment or shipment has been processed.
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-[28px] border border-line bg-white p-6">
          <h2 className="font-display text-2xl text-ink">Shipping summary</h2>
          <p className="mt-3 text-sm text-muted">
            {order.customer.fullName}
            <br />
            {order.customer.email}
            <br />
            {order.customer.phone}
          </p>
          <p className="mt-4 text-sm text-muted">
            {order.address.street}
            <br />
            {order.address.city}, {order.address.region} {order.address.postal}
            <br />
            {order.address.country}
          </p>
          <p className="mt-4 text-sm text-ink">
            {order.delivery === "express" ? "Express Delivery" : "Standard Delivery"} ·{" "}
            {order.payment === "cod" ? "Cash on Delivery — Demo" : "Test Payment — Simulated"}
          </p>
        </section>
        <section className="rounded-[28px] border border-line bg-white p-6">
          <h2 className="font-display text-2xl text-ink">Totals</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatPrice(order.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd>{formatPrice(order.shipping)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Discount</dt><dd>{formatPrice(order.discount)}</dd></div>
            <div className="flex justify-between border-t border-line pt-2 text-base font-medium">
              <dt>Total</dt>
              <dd>{formatPrice(order.total)}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="mt-6 rounded-[28px] border border-line bg-white p-6">
        <h2 className="font-display text-2xl text-ink">Order summary</h2>
        <ul className="mt-4 space-y-4">
          {order.items.map((item) => (
            <li key={`${item.name}-${item.variation ?? ""}`} className="flex items-center gap-4">
              <span className="relative h-16 w-16 overflow-hidden rounded-xl bg-mist">
                <Image src={item.image} alt="" fill className="object-cover" sizes="64px" />
              </span>
              <span className="flex-1 text-sm">
                <span className="block font-medium text-ink">{item.name}</span>
                <span className="text-muted">
                  Qty {item.quantity}
                  {item.variation ? ` · ${item.variation}` : ""}
                </span>
              </span>
              <span className="text-sm">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className={btnPrimary}>
          Continue Shopping
        </Link>
        <Link href="/" className={btnSecondary}>
          Back home
        </Link>
      </div>
    </div>
  );
}
