export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors?: ProductColor[];
  sizes?: string[];
  stockStatus: StockStatus;
  specifications: ProductSpec[];
  highlights: string[];
  tags: string[];
  featured: boolean;
  trending: boolean;
  bestseller: boolean;
  /** Illustrative demo figure, not verified customer feedback. */
  rating: number;
  /** Illustrative demo figure, not a verified review count. */
  reviewCount: number;
  createdAt: string;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  intro: string;
  image: string;
};

export type CartLine = {
  id: string;
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
};

export type DemoOrderItem = {
  name: string;
  quantity: number;
  price: number;
  variation?: string;
  image: string;
};

export type DemoOrder = {
  reference: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    region: string;
    postal: string;
    country: string;
  };
  delivery: "standard" | "express";
  payment: "cod" | "test";
  items: DemoOrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
};

export type SortKey = "featured" | "price-asc" | "price-desc" | "newest" | "name";

export type FilterState = {
  category: string;
  min: string;
  max: string;
  sale: boolean;
  inStock: boolean;
  q: string;
  sort: SortKey;
};
