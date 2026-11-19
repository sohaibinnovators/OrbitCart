import type { MetadataRoute } from "next";
import { categories } from "@/src/data/categories";
import { products } from "@/src/data/products";
import { site } from "@/src/lib/site";

const LAST_MODIFIED = new Date("2026-11-19");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/search",
    "/wishlist",
    "/cart",
    "/checkout",
    "/about",
    "/contact",
    "/faq",
    "/shipping-returns",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${site.url}/category/${category.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes = products.map((product) => ({
    url: `${site.url}/product/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
