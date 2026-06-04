import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { ServiceCard } from "@/components/ServiceCard";
import { elgonOsRequestAccessUrl, elgonOsUrl, services } from "@/lib/site";
import { createPageMetadata, JsonLd, siteUrl } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services | Data, AI, Automation and Digital Transformation Consulting",
  path: "/services",
  description:
    "Explore Elgon Edge Consulting services across digital transformation consulting Kenya, data governance consulting, business intelligence consulting, AI strategy consulting, cloud consulting, automation, migration assurance, SaaS platforms, and ElgonOS.",
  absoluteTitle: true,
  keywords: [
    "data analytics consulting Kenya",
    "AI consulting Kenya",
    "cloud consulting Kenya",
    "digital transformation consulting Kenya",
    "data governance consulting Kenya",
    "data governance consulting",
    "business intelligence consulting Kenya",
    "business intelligence consulting",
    "responsible AI governance",
    "enterprise technology consulting",
    "modern data platform consulting",
    "AI strategy consulting",
    "data quality management",
    "Power BI consulting Kenya",
    "BigQuery consulting",
    "technology consulting firm Kenya",
    "SaaS development Kenya"
  ]
});

const servicesJsonLd = services.map((service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/services#${service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  name: service.title,
  description: service.description,
  provider: {
    "@id": `${siteUrl}/#organization`
  },
  areaServed: {
    "@type": "Country",
    name: "Kenya"
  },
  url: `${siteUrl}/services/${service.slug}`
}));

export default function ServicesPage() {
  return (
    <main>
      <JsonLd data={servicesJsonLd} />
      <section className="executive-hero relative overflow-hidden px-4 py-28 text-white sm:px-6 lg:px-10">
        <div className="galaxy-grid absolute inset-0 opacity-22" aria-hidden="true" />
        <div className="absolute right-10 top-8 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1520px] gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Services
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              Strategy, governance, analytics, automation, and platform delivery
            </h1>
            <p className="mt-7 max-w-4xl text-[1.32rem] leading-10 text-slate-200">
              Elgon Edge Consulting Limited supports organizations across the full modernization lifecycle:
              assessing the opportunity, designing the target state, implementing fit-for-purpose systems, and
              embedding the controls needed for long-term value. We combine strategy, architecture, governance,
              engineering, implementation, adoption support, and measurable outcomes. ElgonOS is our flagship
              software product for AI-powered property management in Kenya.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/25 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">Engagement architecture</p>
              <div className="mt-6 grid gap-4">
                {["Assess", "Design", "Implement", "Govern", "Improve"].map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                      <span className="font-bold">{item}</span>
                    </div>
                    <span className="text-xs font-black text-slate-400">0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fine-grid px-4 py-32 sm:px-6 lg:px-10">
        <div className="mx-auto mb-16 flex max-w-[1520px] flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Capability portfolio</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Consulting and delivery capabilities for modern organizations
            </h2>
          </div>
          <a href="/contact" className="inline-flex items-center gap-2 text-base font-black text-brand-blue hover:text-brand-navy">
            Discuss a priority
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className="mx-auto grid max-w-[1520px] gap-9 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={service.title} className={index === services.length - 1 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-1.125rem)] lg:col-span-1 lg:col-start-2 lg:w-full" : ""}>
              <Link href={`/services/${service.slug}`} className="block h-full">
                <ServiceCard service={service} detailed />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1520px] gap-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:p-12">
          <div>
            <p className="section-kicker">Flagship solution</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy">
              ElgonOS shows how our consulting work becomes operating software
            </h2>
            <p className="mt-6 text-[1.12rem] leading-9 text-slate-600">
              ElgonOS is our AI-powered property operations platform for Kenya. It is a product example of Elgon
              Edge&apos;s wider capability in digital platform development, product engineering, business intelligence,
              workflow automation, data quality management, and responsible AI governance.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "AI-powered property management software",
              "M-PESA-aware property management workflows",
              "Property management dashboards and AI reporting",
              "Gated community management software"
            ].map((anchor) => (
              <Link
                key={anchor}
                href={elgonOsUrl}
                className="rounded-[1.25rem] border border-slate-200 bg-white p-5 text-base font-black leading-7 text-brand-navy shadow-sm transition hover:-translate-y-0.5 hover:border-brand-blue/25 hover:text-brand-blue"
              >
                {anchor}
              </Link>
            ))}
            <Link
              href={elgonOsRequestAccessUrl}
              className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-900 md:col-span-2 md:w-max"
            >
              Request ElgonOS access
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Need a practical modernization partner?"
        text="Share the challenge, target outcomes, and current constraints. We will help shape a clear delivery path."
      />
    </main>
  );
}
