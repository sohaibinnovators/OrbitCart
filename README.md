# OrbitCart

OrbitCart is a premium frontend e-commerce portfolio demo built with Next.js. It showcases a complete shopping experience — catalog browsing, search, filters, wishlist, cart, and a simulated checkout — without a backend, database, or live payments.

**Brand tagline:** Discover Better. Shop Smarter.

## Technologies

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Browser `localStorage` / `sessionStorage` for demo cart, wishlist, and order confirmation

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Demo-only functionality

- Product data lives in `src/data/products.ts` and `src/data/categories.ts`.
- Cart and wishlist persist in `localStorage`.
- Checkout validates a form, saves a sample order in `sessionStorage`, clears the cart, and redirects to `/order-success`.
- Payment options are simulated. No card numbers are collected and no money is charged.
- Contact and newsletter forms show success states on the page only. No email is sent.
- Ratings and review counts are illustrative demo figures.

## Deployment

The project is ready for Vercel:

1. Push the repository to GitHub (or import the folder in Vercel).
2. Create a new Vercel project from the repo.
3. Optionally set `NEXT_PUBLIC_SITE_URL` to your deployed origin for canonical/sitemap URLs.
4. Deploy. No database or paid API keys are required for the core demo.

## Project structure

- `app/` — routes, layout, metadata, sitemap, robots
- `src/components/` — UI, layout, product, shop, cart, checkout
- `src/context/` — cart/wishlist store
- `src/data/` — products, categories, FAQs, social placeholders
- `src/lib/` — helpers for catalog filtering, cart totals, formatting
- `public/images/` — local product, category, banner, and about imagery
