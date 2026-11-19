import Link from "next/link";
import { Container } from "@/src/components/ui/Container";
import { btnPrimary, btnSecondary } from "@/src/lib/styles";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-coral">404</p>
      <h1 className="mt-3 font-display text-5xl text-ink">This page drifted out of orbit.</h1>
      <p className="mt-4 max-w-md text-muted">
        The link may be broken, or the product may have been removed from this demo catalog.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={btnPrimary}>
          Go home
        </Link>
        <Link href="/shop" className={btnSecondary}>
          Browse the shop
        </Link>
      </div>
    </Container>
  );
}
