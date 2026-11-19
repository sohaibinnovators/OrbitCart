import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "electronics",
    name: "Electronics",
    description: "Sound, time, and everyday tech with a quieter sense of design.",
    intro:
      "A small edit of headphones, speakers, and wearables chosen for daily use — useful first, polished second, never noisy for the sake of it.",
    image: "/images/categories/electronics.jpg",
  },
  {
    slug: "fashion",
    name: "Fashion",
    description: "Easy clothes and shoes for days that do not need a costume.",
    intro:
      "Shirts, sneakers, scarves, and bags with clean lines and comfortable proportions. Pieces meant to be worn often, not saved for a single occasion.",
    image: "/images/categories/fashion.jpg",
  },
  {
    slug: "home-living",
    name: "Home & Living",
    description: "Light, texture, and objects that make a room feel settled.",
    intro:
      "Lamps, linen, mugs, and candles for the parts of home you actually touch. Simple materials, warm tones, and shapes that sit quietly on a shelf.",
    image: "/images/categories/home-living.jpg",
  },
  {
    slug: "beauty-wellness",
    name: "Beauty & Wellness",
    description: "Small daily rituals, kept straightforward and calm.",
    intro:
      "Moisturizer, cream, serum, and a silk wrap — a short shelf of everyday care. Formulas in this demo are fictional product stories, not medical claims.",
    image: "/images/categories/beauty-wellness.jpg",
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "The pieces you reach for on the way out the door.",
    intro:
      "Bags, wallets, sunglasses, and small brass details. Practical accessories with a finished look, designed to live in a coat pocket or on a desk.",
    image: "/images/categories/accessories.jpg",
  },
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
