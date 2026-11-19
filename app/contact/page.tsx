import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/src/components/contact/ContactForm";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { Container } from "@/src/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the OrbitCart demo. The form validates on the page and does not send a real email.",
};

export default function ContactPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Contact" }]} />
      <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">Contact</h1>
          <p className="mt-4 text-muted">
            Questions about this portfolio demo? Use the form. It confirms on the page only and does not deliver a real email.
          </p>
          <div className="relative mt-8 min-h-[260px] overflow-hidden rounded-[28px]">
            <Image
              src="/images/about/studio.jpg"
              alt="Calm studio still life for the OrbitCart contact page"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div className="mt-6 rounded-[28px] border border-line bg-white p-6 text-sm text-muted">
            <p className="font-medium text-ink">Demo contact information</p>
            <p className="mt-2">Email placeholder: hello@orbitcart.demo</p>
            <p className="mt-1">Location: Portfolio concept · not a physical storefront</p>
            <p className="mt-4">
              Looking for answers first? Visit the{" "}
              <Link href="/faq" className="text-cobalt hover:underline">
                FAQ
              </Link>
              .
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </Container>
  );
}
