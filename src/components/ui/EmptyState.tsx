import Link from "next/link";
import { btnPrimary } from "@/src/lib/styles";

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="rounded-[28px] border border-dashed border-line bg-white px-6 py-16 text-center">
      <h2 className="font-display text-3xl text-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-muted">{text}</p>
      {action && (
        <Link href={action.href} className={`${btnPrimary} mt-6`}>
          {action.label}
        </Link>
      )}
    </div>
  );
}
