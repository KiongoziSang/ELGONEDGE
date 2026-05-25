import type { Metadata } from "next";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  CreditCard,
  KeyRound,
  MessageSquareText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UsersRound
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { elgonOsUrl } from "@/lib/site";
import { createPageMetadata, elgonOsSoftwareJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "ElgonOS | Property Management Software by Elgon Edge Consulting",
  path: "/elgonos",
  description:
    "ElgonOS is a property operations platform for billing, payment routing, access control, tenant experience, intelligence, communication, and executive reporting.",
  absoluteTitle: true,
  keywords: ["ElgonOS", "property operations platform", "property management software Kenya"]
});

const features = [
  { title: "Payment routing", icon: CreditCard },
  { title: "Access workflows", icon: KeyRound },
  { title: "Tenant experience", icon: UsersRound },
  { title: "AI intelligence", icon: Bot }
];

const platformPillars = [
  {
    title: "Billing and payment routing",
    icon: CreditCard,
    summary: "Route rent and service charges through the rails property teams already use.",
    points: ["M-PESA PayBill", "Bank PayBill", "Till", "Bank transfer", "Cards"]
  },
  {
    title: "Access control",
    icon: KeyRound,
    summary: "Coordinate entry, visitor movement, and guard-side operating workflows.",
    points: ["Gate passes and cards", "Visitor pre-registration", "Guard workflows", "Entry records"]
  },
  {
    title: "Tenant experience",
    icon: CalendarCheck2,
    summary: "Give tenants a smoother way to request, book, sign, refer, and respond.",
    points: ["Bookings", "Wishlist", "Referrals", "Feedback", "Lease signing"]
  },
  {
    title: "Intelligence",
    icon: Sparkles,
    summary: "Turn operational data into fast answers and leadership visibility.",
    points: ["Ask AI", "Conversational reporting", "Tenant predictability", "Executive dashboards", "Data quality dashboard"]
  },
  {
    title: "Communication",
    icon: MessageSquareText,
    summary: "Keep residents and teams aligned with timely operating alerts.",
    points: ["SMS-ready reminders", "WhatsApp-ready alerts", "Payment and lease nudges", "Operational notifications"]
  },
  {
    title: "Mobile app",
    icon: Smartphone,
    summary: "A dedicated mobile experience is planned for resident and operations workflows.",
    points: ["Coming soon", "Tenant self-service", "Operational approvals", "Field-ready updates"]
  }
];

const plans = [
  {
    name: "Starter",
    description: "Essentials for teams moving core property records and rent basics into one platform.",
    highlights: ["Properties, units, tenants", "Lease and document records", "Billing essentials"]
  },
  {
    name: "Growth",
    description: "Rent operations plus tenant demand workflows for expanding portfolios.",
    highlights: ["Rent operations", "Bookings", "Wishlist", "Referrals"]
  },
  {
    name: "Professional",
    description: "Full operations for property teams that need stronger controls and service workflows.",
    highlights: [
      "Access control",
      "Feedback",
      "Tenant predictability",
      "Audit trail",
      "Staff roles",
      "SMS/WhatsApp-ready communication"
    ]
  },
  {
    name: "Enterprise",
    description: "Advanced operating intelligence, integrations, and rollout support for larger teams.",
    highlights: [
      "AI and conversational reporting",
      "Executive dashboards",
      "Custom workflows",
      "Integrations",
      "Data migration",
      "Mobile rollout support"
    ]
  }
];

const featureMatrix = [
  ["Billing", "M-PESA PayBill, Bank PayBill, Till, bank transfer, cards"],
  ["Access", "Gate passes/cards, visitor pre-registration, guard workflows"],
  ["Tenant workflows", "Bookings, wishlist, referrals, feedback, lease signing"],
  ["Intelligence", "Ask AI, conversational reporting, tenant predictability, executive dashboards"],
  ["Data quality", "Portfolio data quality dashboard and operational exception visibility"],
  ["Communication", "SMS and WhatsApp-ready reminders and alerts"],
  ["Mobile", "Mobile app coming soon with rollout support on Enterprise"]
];

export default function ElgonOsPage() {
  return (
    <main>
      <JsonLd data={elgonOsSoftwareJsonLd} />
      <section className="executive-hero relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="galaxy-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="absolute right-10 top-8 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cyan-200">ElgonOS</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              Property Operations, Run From One Platform
            </h1>
            <p className="mt-7 text-xl leading-9 text-slate-200">
              ElgonOS helps landlords, property managers, and real estate teams coordinate billing, payment routing,
              access control, tenant experience, communication, AI-assisted reporting, and executive visibility from
              one operating layer.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={elgonOsUrl} className="gap-2">
                Launch ElgonOS
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="glass">
                Talk to Us
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-[2.25rem] border border-white/15 bg-white/[0.08] p-4 shadow-2xl shadow-black/25 backdrop-blur">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-5">
              <div className="mb-5 flex items-center justify-between rounded-2xl bg-white/[0.07] px-5 py-4">
                <div>
                  <p className="text-sm font-bold">Property operations cockpit</p>
                  <p className="text-xs text-slate-400">Billing, access, tenants, intelligence</p>
                </div>
                <BarChart3 className="h-6 w-6 text-cyan-200" aria-hidden="true" />
              </div>
              <div className="mb-5 grid grid-cols-3 gap-3">
                {["KES routing", "Gate access", "Ask AI"].map((metric) => (
                  <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-sm font-black">{metric}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 text-white">
                    <Icon className="h-7 w-7 text-cyan-200" aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
                  </article>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fine-grid bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="section-kicker">Platform pillars</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
                Built for the full property operating cycle
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-600">
              ElgonOS goes beyond rent collection. It connects payments, access, tenant workflows, communication,
              intelligence, and operational controls into a cleaner daily system for property teams.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {platformPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-navy text-cyan-200">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl font-black text-brand-navy">{pillar.title}</h3>
                      <p className="mt-3 text-[1.02rem] leading-7 text-slate-600">{pillar.summary}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {pillar.points.map((point) => (
                      <span key={point} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700">
                        {point}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="section-kicker">Plans</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Pricing built around operating maturity
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {plans.map((plan) => (
              <article key={plan.name} className="flex h-full flex-col rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-black text-brand-navy">{plan.name}</h3>
                  <ShieldCheck className="h-5 w-5 text-brand-blue" aria-hidden="true" />
                </div>
                <p className="mt-4 text-[1.02rem] leading-7 text-slate-600">{plan.description}</p>
                <ul className="mt-7 space-y-3">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-bold leading-6 text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="section-kicker">Feature matrix</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Deeper operating coverage below the clean cards
            </h2>
          </div>
          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
            {featureMatrix.map(([area, detail], index) => (
              <div key={area} className={`grid gap-4 px-6 py-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-slate-200" : ""}`}>
                <p className="font-black text-brand-navy">{area}</p>
                <p className="leading-7 text-slate-600">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Launch ElgonOS or discuss your property operations workflow"
        text="Use the live ElgonOS platform or contact Elgon Edge Consulting Limited for implementation, migration, and rollout support conversations."
      />
    </main>
  );
}
