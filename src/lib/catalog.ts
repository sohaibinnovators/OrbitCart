import { categories } from "@/src/data/categories";
import type { FilterState, Product, SortKey } from "@/src/data/types";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name: A to Z" },
];

export function sortProducts(list: Product[], sort: SortKey) {
  const next = [...list];
  if (sort === "price-asc") next.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") next.sort((a, b) => b.price - a.price);
  else if (sort === "newest") {
    next.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  } else if (sort === "name") {
    next.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    next.sort((a, b) => {
      const score = (product: Product) =>
        (product.featured ? 4 : 0) + (product.bestseller ? 2 : 0) + (product.trending ? 1 : 0);
      return score(b) - score(a) || a.name.localeCompare(b.name);
    });
  }
  return next;
}

export function applyCatalog(list: Product[], state: FilterState) {
  const query = state.q.trim().toLowerCase();
  const filtered = list.filter((product) => {
    if (state.category && product.category !== state.category) return false;
    if (state.sale && !(product.originalPrice && product.originalPrice > product.price)) {
      return false;
    }
    if (state.inStock && product.stockStatus === "out-of-stock") return false;
    const min = Number(state.min);
    const max = Number(state.max);
    if (state.min && !Number.isNaN(min) && product.price < min) return false;
    if (state.max && !Number.isNaN(max) && product.price > max) return false;
    if (query) {
      const category = categories.find((item) => item.slug === product.category)?.name ?? "";
      const haystack = [
        product.name,
        product.shortDescription,
        product.description,
        category,
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
  return sortProducts(filtered, state.sort);
}

export function filtersFromParams(params: URLSearchParams, lockedCategory = ""): FilterState {
  const sort = params.get("sort");
  const allowed: SortKey[] = ["featured", "price-asc", "price-desc", "newest", "name"];
  return {
    category: lockedCategory || params.get("category") || "",
    min: params.get("min") || "",
    max: params.get("max") || "",
    sale: params.get("sale") === "1",
    inStock: params.get("stock") === "1",
    q: params.get("q") || "",
    sort: allowed.includes(sort as SortKey) ? (sort as SortKey) : "featured",
  };
}

export function paramsFromFilters(state: FilterState, lockedCategory = "") {
  const params = new URLSearchParams();
  if (!lockedCategory && state.category) params.set("category", state.category);
  if (state.min) params.set("min", state.min);
  if (state.max) params.set("max", state.max);
  if (state.sale) params.set("sale", "1");
  if (state.inStock) params.set("stock", "1");
  if (state.q) params.set("q", state.q);
  if (state.sort !== "featured") params.set("sort", state.sort);
  return params;
}

export function categoryName(slug: string) {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}
