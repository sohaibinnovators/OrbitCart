import Link from "next/link";
import { categories } from "@/src/data/categories";
import { Logo } from "@/src/components/ui/Logo";
import { NewsletterForm } from "@/src/components/ui/NewsletterForm";
import { SocialIcons } from "./SocialIcons";
import { BackToTop } from "./BackToTop";
import { CopyrightYear } from "./CopyrightYear";

export function Footer() {
  return (
    <footer className="mt-20 bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr] lg:px-8">
        <div>
          <Logo tone="light" />
          <p className="mt-4 font-display text-2xl">Discover Better. Shop Smarter.</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
            OrbitCart is a fictional portfolio store. The catalog, cart, wishlist, and checkout live in your browser so the shopping experience can be explored without a backend.
          </p>
          <div className="mt-6">
            <SocialIcons />
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/50">Shop</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-white">All Products</Link></li>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/category/${category.slug}`} className="text-white/80 hover:text-white">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/50">Customer support</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/shipping-returns" className="hover:text-white">Shipping & Returns</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/50">Notes, not a mailing list</p>
          <p className="mt-4 text-sm text-white/70">A demo form only. Nothing is delivered to an inbox.</p>
          <div className="mt-4">
            <NewsletterForm compact />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© <CopyrightYear /> OrbitCart. A demonstration store, not a real retailer.</p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
