import type { Metadata } from "next";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { Container } from "@/src/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy notes for the OrbitCart portfolio demonstration. Not legal advice for a live business.",
};

export default function PrivacyPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Privacy Policy" }]} />
      <article className="prose-orbit mt-8 max-w-3xl">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-muted">
          This page explains how the OrbitCart portfolio demonstration handles information. It is not legal advice and is not a final privacy policy for a live commercial business.
        </p>
        <section className="mt-10 space-y-4 text-sm leading-7 text-muted">
          <h2 className="font-display text-2xl text-ink">What OrbitCart is</h2>
          <p>
            OrbitCart is a fictional e-commerce concept built for portfolio use. It has no payment processing, customer account backend, or live order fulfilment.
          </p>
          <h2 className="font-display text-2xl text-ink">Browser storage</h2>
          <p>
            The shopping bag and wishlist are saved in your browser using localStorage. A simulated order confirmation may be saved in sessionStorage after demo checkout. Clearing site data removes them.
          </p>
          <h2 className="font-display text-2xl text-ink">Forms</h2>
          <p>
            Contact and newsletter forms validate on the page and show a success state. They do not send email to a mailing platform or support inbox.
          </p>
          <h2 className="font-display text-2xl text-ink">Analytics and third parties</h2>
          <p>
            The core demo does not require environment variables or paid third-party services. If you deploy the project and add analytics later, update this page to match what you actually collect.
          </p>
        </section>
      </article>
    </Container>
  );
}
