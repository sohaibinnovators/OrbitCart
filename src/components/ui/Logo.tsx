import Link from "next/link";

export function Logo({
  tone = "dark",
  compact = false,
  onClick,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
  onClick?: () => void;
}) {
  const stroke = tone === "light" ? "#F8F7F4" : "#141824";
  return (
    <Link
      href="/"
      onClick={onClick}
      className="inline-flex min-w-0 items-center gap-2"
      aria-label="OrbitCart home"
    >
      <svg
        width={compact ? 24 : 28}
        height={compact ? 24 : 28}
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="16" cy="16" r="10" fill="none" stroke={stroke} strokeWidth="1.6" />
        <circle cx="16" cy="16" r="3.2" fill="#4F46E5" />
        <circle cx="24.2" cy="8.6" r="2.1" fill="#FF7849" />
      </svg>
      <span
        className={`font-display leading-none tracking-tight ${
          compact ? "text-[1.2rem]" : "text-[1.35rem] sm:text-[1.45rem]"
        } ${tone === "light" ? "text-ivory" : "text-ink"}`}
      >
        OrbitCart
      </span>
    </Link>
  );
}
