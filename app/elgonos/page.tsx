import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  DatabaseZap,
  ShieldCheck,
  Workflow
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { elgonOsPricingUrl, elgonOsRequestAccessUrl, elgonOsUrl } from "@/lib/site";
import { createPageMetadata, JsonLd, siteUrl } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "ElgonOS Overview | Flagship Property Operations Platform by Elgon Edge",
  path: "/elgonos",
  description:
    "ElgonOS is Elgon Edge's flagship AI-powered property operations platform for Kenya, demonstrating the firm's product engineering, data, AI, automation, dashboards, governance, and delivery capability.",
  absoluteTitle: true,
  keywords: [
    "ElgonOS",
    "property operations platform",
    "product engineering Kenya",
    "digital platform development Kenya",
    "AI consulting Kenya",
    "responsible AI governance",
    "workflow automation",
    "business intelligence consulting"
  ]
});

const capabilities = [
  {
    title: "Property operating workflows",
    description:
      "Rent, tenant, lease, unit, billing, maintenance, access, resident service, construction, and document workflows are connected into one operating layer.",
    icon: Building2
  },
  {
    title: "Dashboards and decision support",
    description:
      "Portfolio dashboards, operational indicators, exception visibility, and AI-assisted reporting help managers move from records into action.",
    icon: BarChart3
  },
  {
    title: "AI-enabled operations",
    description:
      "Ask AI, reporting assistance, tenant insight patterns, and workflow intelligence show how practical AI can support managers with human oversight.",
    icon: Bot
  },
  {
    title: "Governed platform delivery",
    description:
      "Roles, approvals, audit trails, data quality patterns, implementation support, and adoption routines reflect Elgon Edge's consulting discipline.",
    icon: ShieldCheck
  }
];

const engineeringSignals = [
  "Product and platform engineering for a real operating domain",
  "Workflow automation patterns for approvals, reminders, and exceptions",
  "Data quality and reporting foundations for portfolio visibility",
  "Responsible AI governance patterns for practical decision support",
  "Cloud-ready SaaS delivery, rollout support, and adoption planning"
];

const relatedInsights = [
  {
    title: "How AI Is Changing Property Operations in Kenya",
    href: "/insights/ai-property-operations-kenya"
  },
  {
    title: "From Rent Collection to Property Operations Platforms",
    href: "/insights/rent-collection-to-property-operations-platforms"
  },
  {
    title: "Why M-PESA-Aware Workflows Matter in Property Management",
    href: "/insights/mpesa-property-management-workflows"
  },
  {
    title: "Building Digital Platforms for Real Estate and Property Managers",
    href: "/insights/building-digital-platforms-for-real-estate"
  }
];

export default function ElgonOsPage() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/elgonos#webpage`,
    name: "ElgonOS Overview",
    description:
      "An Elgon Edge overview of ElgonOS as a flagship property operations platform and product engineering example.",
    url: `${siteUrl}/elgonos`,
    isPartOf: {
      "@id": `${siteUrl}/#website`
    },
    about: {
      "@type": "SoftwareApplication",
      name: "ElgonOS",
      url: elgonOsUrl,
      applicationCategory: "BusinessApplication",
      creator: {
        "@id": `${siteUrl}/#organization`
      }
    }
  };

  return (
    <main>
      <JsonLd data={pageJsonLd} />
      <section className="executive-hero relative overflow-hidden px-4 py-28 text-white sm:px-6 lg:px-10">
        <div className="galaxy-grid absolute inset-0 opacity-24" aria-hidden="true" />
        <div className="absolute right-10 top-8 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1520px] gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cyan-200">Flagship product by Elgon Edge</p>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              ElgonOS is our AI-powered property operations platform
            </h1>
            <p className="mt-7 max-w-4xl text-[1.25rem] leading-10 text-slate-200">
              ElgonOS is built for landlords, property managers, gated communities, apartments, and real estate
              teams in Kenya. On the Elgon Edge website, ElgonOS is presented as a flagship solution that demonstrates
              our broader consulting capability in product engineering, data, AI, automation, dashboards, governance,
              and delivery.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={elgonOsUrl} className="gap-2">
                Visit ElgonOS
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={elgonOsPricingUrl} variant="glass">
                View Pricing
              </ButtonLink>
              <ButtonLink href={elgonOsRequestAccessUrl} variant="glass">
                Request Access
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/25 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">What it represents</p>
              <div className="mt-6 grid gap-4">
                {[
                  "AI-powered property management software",
                  "M-PESA-aware property management workflows",
                  "Property management dashboards and AI reporting",
                  "Gated community management software"
                ].map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                      <span className="font-bold">{item}</span>
                    </div>
                    <span className="text-xs font-black text-slate-400">0{index + 1}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-300">
                Detailed product features, pricing, access, and onboarding information are available on the
                standalone ElgonOS platform site.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="fine-grid bg-white px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1520px]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="section-kicker">Overview</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
                A product example of Elgon Edge consulting capability
              </h2>
            </div>
            <p className="max-w-3xl text-[1.16rem] leading-9 text-slate-600 lg:justify-self-end">
              ElgonOS shows how Elgon Edge turns strategy into measurable execution through modern data platforms,
              workflow automation, responsible AI governance, business intelligence, cloud-ready engineering, and
              structured adoption support.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <article key={capability.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-7 shadow-sm">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-navy text-cyan-200">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-brand-navy">{capability.title}</h3>
                  <p className="mt-4 text-[1.02rem] leading-8 text-slate-600">{capability.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1520px] gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p className="section-kicker">Engineering and governance signals</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Why ElgonOS belongs under Elgon Edge
            </h2>
            <p className="mt-6 text-[1.12rem] leading-9 text-slate-600">
              ElgonOS is not the whole company. It is one flagship product that proves our ability to design, build,
              govern, and improve digital platforms for operationally demanding teams.
            </p>
          </div>
          <div className="grid gap-4">
            {engineeringSignals.map((signal) => (
              <div key={signal} className="flex gap-4 rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-blue text-white">
                  {signal.includes("Data") ? (
                    <DatabaseZap className="h-5 w-5" aria-hidden="true" />
                  ) : signal.includes("Workflow") ? (
                    <Workflow className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
                <p className="self-center text-base font-bold leading-7 text-slate-700">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1520px]">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="section-kicker">Supporting insights</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
                Thought leadership behind the platform
              </h2>
            </div>
            <p className="max-w-3xl text-[1.16rem] leading-9 text-slate-600 lg:justify-self-end">
              These Elgon Edge insights explore AI, payments, platform engineering, dashboards, workflow automation,
              and governance behind modern property operations. For ElgonOS features, pricing, and access, visit the
              standalone ElgonOS platform site.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {relatedInsights.map((insight) => (
              <Link
                key={insight.href}
                href={insight.href}
                className="group rounded-[1.5rem] border border-slate-200 bg-slate-50 p-7 shadow-sm transition hover:-translate-y-1 hover:border-brand-blue/25 hover:bg-white hover:shadow-soft"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-blue">Insight</p>
                <h3 className="mt-4 text-xl font-black leading-7 text-brand-navy">{insight.title}</h3>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-brand-blue">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Explore ElgonOS or discuss a platform engagement"
        text="Visit the standalone ElgonOS platform site for product details, pricing, and access. Contact Elgon Edge for broader data, AI, automation, governance, and digital platform consulting."
        primaryHref={elgonOsUrl}
        primaryLabel="Visit ElgonOS"
        secondaryHref="/contact"
        secondaryLabel="Talk to Elgon Edge"
      />
    </main>
  );
}
