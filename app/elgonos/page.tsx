import type { Metadata } from "next";
import { ArrowUpRight, BarChart3, Building2, CheckCircle2, FileText, Receipt, UsersRound } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { elgonOsUrl } from "@/lib/site";
import { createPageMetadata, elgonOsSoftwareJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "ElgonOS | Property Management Software by Elgon Edge Consulting",
  path: "/elgonos",
  description:
    "ElgonOS is a digital property management platform for landlords, property managers, and real estate teams to manage properties, units, tenants, leases, billing, occupancy, and documents.",
  absoluteTitle: true,
  keywords: ["ElgonOS", "ElgonOS property management", "property management software Kenya"]
});

const features = [
  { title: "Properties and units", icon: Building2 },
  { title: "Tenants and leases", icon: UsersRound },
  { title: "Billing and occupancy", icon: Receipt },
  { title: "Documents and records", icon: FileText }
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
              Property Management Made Simple
            </h1>
            <p className="mt-7 text-xl leading-9 text-slate-200">
              ElgonOS is a digital property management platform designed to help landlords, property managers,
              and real estate teams manage properties, units, tenants, leases, occupancy, billing, and documents
              from one platform.
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
                  <p className="text-xs text-slate-400">Portfolio, tenants, leases, billing</p>
                </div>
                <BarChart3 className="h-6 w-6 text-cyan-200" aria-hidden="true" />
              </div>
              <div className="mb-5 grid grid-cols-3 gap-3">
                {["92% occupancy", "KES billing", "18 units"].map((metric) => (
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
          <div className="mb-12 max-w-3xl">
            <p className="section-kicker">Product benefits</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              A cleaner operating layer for property teams
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Centralize operational records for properties, units, tenants, and documents.",
              "Track occupancy, lease status, billing activity, and management workflows.",
              "Give property teams a cleaner platform for repeated daily operations."
            ].map((item) => (
              <article key={item} className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <CheckCircle2 className="h-7 w-7 text-brand-blue" aria-hidden="true" />
                <p className="mt-6 text-lg font-bold leading-8 text-brand-navy">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Launch ElgonOS or discuss a property operations workflow"
        text="Use the live ElgonOS platform or contact Elgon Edge Consulting Limited for implementation and support conversations."
      />
    </main>
  );
}
