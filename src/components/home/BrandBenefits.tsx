import { CheckCircle2, Headphones, Package, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/src/components/ui/Container";

const benefits = [
  {
    icon: Sparkles,
    title: "Carefully Selected Products",
    text: "A short, curated demo catalog instead of an endless shelf of noise.",
  },
  {
    icon: Package,
    title: "Easy Shopping Experience",
    text: "Browse, filter, save, and check out without accounts or setup.",
  },
  {
    icon: ShieldCheck,
    title: "Secure-Feeling Checkout Interface",
    text: "A calm checkout layout that clearly marks payment as simulated.",
  },
  {
    icon: CheckCircle2,
    title: "Clear Order Information",
    text: "Demo totals, shipping notes, and confirmation summaries stay readable.",
  },
  {
    icon: Headphones,
    title: "Friendly Customer Support",
    text: "A contact form and FAQ for the demo — no live support inbox behind them.",
  },
];

export function BrandBenefits() {
  return (
    <section className="py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-faint">Why OrbitCart</p>
          <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Shopping Made Simple.</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-[28px] border border-line bg-white p-6">
              <benefit.icon className="text-cobalt" size={22} />
              <h3 className="mt-4 font-medium text-ink">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{benefit.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
