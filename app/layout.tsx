import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "@/src/components/providers";
import { AnnouncementBar } from "@/src/components/layout/AnnouncementBar";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { site } from "@/src/lib/site";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "OrbitCart — Discover Better. Shop Smarter.",
    template: "%s · OrbitCart",
  },
  description: site.description,
  applicationName: "OrbitCart",
  openGraph: {
    title: "OrbitCart — Discover Better. Shop Smarter.",
    description: site.description,
    siteName: "OrbitCart",
    type: "website",
    images: [{ url: "/images/banners/hero.jpg", width: 1800, height: 1012, alt: "OrbitCart editorial still life" }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Providers>
          <AnnouncementBar />
          <Suspense fallback={<div className="h-16 border-b border-line bg-ivory" />}>
            <Header />
          </Suspense>
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
