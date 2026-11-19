"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/format";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function DesktopNavigation({
  megaOpen,
  onToggleMega,
}: {
  megaOpen: boolean;
  onToggleMega: () => void;
}) {
  const pathname = usePathname();
  const onCategory = pathname.startsWith("/category/");

  return (
    <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Primary">
      {links.slice(0, 2).map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium",
            pathname === link.href ? "text-cobalt" : "text-ink hover:text-cobalt",
          )}
        >
          {link.label}
        </Link>
      ))}
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium",
          megaOpen || onCategory ? "text-cobalt" : "text-ink hover:text-cobalt",
        )}
        aria-expanded={megaOpen}
        aria-haspopup="true"
        onClick={onToggleMega}
      >
        Categories
        <ChevronDown size={15} className={cn("transition", megaOpen && "rotate-180")} />
      </button>
      {links.slice(2).map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium",
            pathname === link.href ? "text-cobalt" : "text-ink hover:text-cobalt",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
