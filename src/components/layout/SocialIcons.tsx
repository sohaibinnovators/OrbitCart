import { socialLinks } from "@/src/data/social";

function Icon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, "aria-hidden": true as const };
  if (name === "Instagram") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "Facebook") {
    return (
      <svg {...common}>
        <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.2l.8-3H13V9c0-.6.4-1 1-1z" />
      </svg>
    );
  }
  if (name === "Pinterest") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M11 17.5c.4-1.4.7-2.8.3-3.8-.5 1-1.4 1.2-1.8.4-.6-1 .1-3.2 1.2-4.2 2-1.8 4.6-.2 4.2 2.1-.2 1.5-1.1 2.6-2.2 2.6-.7 0-1.2-.6-.9-1.6.2-.8.4-1.6.2-2.2" />
      </svg>
    );
  }
  if (name === "TikTok") {
    return (
      <svg {...common}>
        <path d="M14 6c.6 2.2 2 3.6 4 4v2.2c-1.4 0-2.7-.4-4-1.2v5.4a4.6 4.6 0 1 1-4-4.6v2.3a2.3 2.3 0 1 0 1.8 2.2V6h2.2z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="4" y="7" width="16" height="11" rx="2" />
      <path d="M10 10.5v5l5-2.5-5-2.5z" />
    </svg>
  );
}

export function SocialIcons({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <ul className="flex gap-2">
      {socialLinks.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className={`grid h-10 w-10 place-items-center rounded-full border ${tone === "light" ? "border-white/15 text-ivory hover:bg-white/10" : "border-line text-ink hover:border-ink"}`}
          >
            <Icon name={link.name} />
          </a>
        </li>
      ))}
    </ul>
  );
}
