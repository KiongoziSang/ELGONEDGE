import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  FileText,
  Receipt,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { ServiceCard } from "@/components/ServiceCard";
import { deliverySteps, differentiators, elgonOsUrl, services, workflowIcon } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Data, AI and Digital Solutions for Smarter Businesses",
  path: "/",
  keywords: ["data consulting Kenya", "AI consulting Kenya", "digital transformation consulting Kenya"]
});

const WorkflowIcon = workflowIcon;

export default function HomePage() {
  const heroCapabilities = [
    "Data Governance",
    "AI Readiness",
    "Automation",
    "Digital Platforms",
    "Executive Analytics"
  ];
  const productBenefits = [
    { title: "Property management", icon: Building2 },
    { title: "Tenant management", icon: UsersRound },
    { title: "Leases", icon: FileText },
    { title: "Billing", icon: Receipt },
    { title: "Occupancy", icon: CheckCircle2 },
    { title: "Documents", icon: ShieldCheck }
  ];

  return (
    <main>
      <section className="executive-hero relative overflow-hidden px-4 py-32 text-white sm:px-6 lg:px-10 lg:py-40">
        <div className="galaxy-grid absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1520px] gap-16 lg:grid-cols-[1.28fr_0.72fr] lg:items-center xl:gap-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-100 shadow-xl shadow-black/10 backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Enterprise modernization advisory
            </div>
            <h1 className="mt-10 max-w-[1120px] text-5xl font-black leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-[4.55rem] xl:text-[5.2rem] 2xl:text-[5.45rem]">
              <span className="block lg:whitespace-nowrap">Data, AI and Digital Solutions</span>
              <span className="block">for Smarter Businesses</span>
            </h1>
            <p className="mt-9 max-w-[900px] text-[1.38rem] leading-10 text-slate-100/90 lg:text-[1.5rem] lg:leading-[1.75]">
              Elgon Edge Consulting Limited helps organizations modernize operations through data, AI,
              automation, governance, and digital platforms — from strategy to implementation.
            </p>
            <div className="mt-11 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/services" className="gap-2">
                Explore Our Services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={elgonOsUrl} variant="glass">
                Launch ElgonOS
              </ButtonLink>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-1 gap-4 border-t border-white/10 pt-7 sm:grid-cols-3">
              {["Governed data", "Practical AI", "Delivered platforms"].map((item) => (
                <div key={item}>
                  <p className="text-base font-bold text-white">{item}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">Strategy, controls, implementation</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-[2.25rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-400/20 blur-3xl" aria-hidden="true" />
            <div className="relative rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-7">
              <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-7">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">
                    Transformation pillars
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight">Executive modernization map</h2>
                </div>
                <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1.5 text-xs font-bold text-teal-100">
                  Board-ready
                </span>
              </div>
              <div className="mt-7 grid gap-4">
                {heroCapabilities.map((item, index) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 transition hover:bg-white/[0.10]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300/10 text-cyan-100">
                          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <p className="text-[1.05rem] font-bold">{item}</p>
                      </div>
                      <span className="text-xs font-bold text-slate-400">0{index + 1}</span>
                    </div>
                    <div className="mt-5 h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-300" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-2xl font-black">360</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Operating view</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-2xl font-black">AI</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Governed adoption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fine-grid px-4 py-32 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1520px]">
          <div className="max-w-4xl">
            <p className="section-kicker">Consulting capabilities</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Consulting and delivery capabilities for modern organizations
            </h2>
            <p className="mt-6 max-w-4xl text-[1.2rem] leading-9 text-slate-600">
              Senior advisory, governed data foundations, practical AI, workflow automation, and platform delivery
              aligned to business outcomes.
            </p>
          </div>
          <div className="mt-16 grid gap-9 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div key={service.title} className={index === services.length - 1 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-1.125rem)] lg:col-span-1 lg:col-start-2 lg:w-full" : ""}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-32 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1520px]">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="section-kicker">Why Elgon Edge</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Built for credibility, adoption, and measurable delivery
            </h2>
            </div>
            <p className="max-w-3xl text-[1.2rem] leading-9 text-slate-600 lg:justify-self-end">
              We bring the discipline of a consulting engagement and the delivery focus needed to turn modern
              data, AI, and platform ideas into durable operating capability.
            </p>
          </div>
          <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-navy p-3 text-cyan-200 shadow-lg shadow-slate-900/15">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-brand-navy">{item.title}</h3>
                  <p className="mt-4 text-[1.08rem] leading-8 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-32 sm:px-6 lg:px-10">
        <div className="executive-hero relative mx-auto grid max-w-[1520px] overflow-hidden rounded-[2.35rem] p-9 text-white shadow-2xl shadow-slate-900/20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:p-16">
          <div className="galaxy-grid absolute inset-0 opacity-18" aria-hidden="true" />
          <div className="relative p-2 lg:p-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cyan-200">Flagship platform</p>
            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
              ElgonOS — Property Management Made Simple
            </h2>
            <p className="mt-7 max-w-3xl text-[1.2rem] leading-9 text-slate-200">
              ElgonOS is a digital property management platform designed to help landlords, property managers,
              and real estate teams manage properties, units, tenants, leases, occupancy, billing, and documents
              from one platform.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/elgonos" variant="glass">
                Learn More
              </ButtonLink>
              <ButtonLink href={elgonOsUrl}>
                Launch ElgonOS
              </ButtonLink>
            </div>
          </div>
          <div className="relative mt-8 rounded-[1.85rem] border border-white/15 bg-white/[0.08] p-5 backdrop-blur lg:mt-0">
            <div className="rounded-[1.45rem] border border-white/10 bg-slate-950/45 p-5">
              <div className="mb-5 flex items-center justify-between rounded-2xl bg-white/[0.06] px-5 py-4">
                <div>
                  <p className="text-base font-bold">Portfolio dashboard</p>
                  <p className="text-sm text-slate-400">Properties, tenants, billing, documents</p>
                </div>
                <BarChart3 className="h-5 w-5 text-cyan-200" aria-hidden="true" />
              </div>
              <div className="mb-5 grid grid-cols-3 gap-3">
                {["92% Occupancy", "18 Units", "KES Billing"].map((metric) => (
                  <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-sm font-bold">{metric}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
              {productBenefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <article key={benefit.title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                    <Icon className="h-7 w-7 text-cyan-200" aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-bold">{benefit.title}</h3>
                  </article>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fine-grid bg-slate-50 px-4 py-32 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1520px] gap-20 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-blue shadow-soft">
              <WorkflowIcon className="h-8 w-8" aria-hidden="true" />
            </div>
            <p className="section-kicker mt-5">Delivery model</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy">From Strategy to Implementation</h2>
            <p className="mt-6 text-[1.2rem] leading-9 text-slate-600">
              Every engagement is supported by structured project delivery, stakeholder coordination,
              documentation, risk management, implementation tracking, and post-delivery support.
            </p>
          </div>
          <div className="relative grid gap-5 md:grid-cols-2">
            {deliverySteps.map((step, index) => (
              <article key={step} className="rounded-[1.85rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-sm font-black text-white shadow-lg shadow-slate-900/15">
                  0{index + 1}
                </span>
                <p className="mt-6 text-lg font-bold leading-8 text-brand-navy">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
