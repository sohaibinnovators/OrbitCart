const KEY = "orbitcart-recently-viewed";
const MAX = 8;

export function readRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function trackRecentlyViewed(productId: string) {
  if (typeof window === "undefined") return;
  const next = [productId, ...readRecentlyViewed().filter((id) => id !== productId)].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(next));
}
