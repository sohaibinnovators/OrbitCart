export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function stockLabel(status: "in-stock" | "low-stock" | "out-of-stock") {
  if (status === "out-of-stock") return "Out of stock";
  if (status === "low-stock") return "Low stock";
  return "In stock";
}

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
