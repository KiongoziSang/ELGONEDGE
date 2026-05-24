import type { Metadata } from "next";
import { CheckCircle2, Sparkles } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { differentiators, edgeCommitments } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Elgon Edge Consulting Limited",
  path: "/about",
  description:
    "Elgon Edge Consulting Limited is a modern consulting and technology delivery company focused on the EDGE Framework, data-driven governed execution, data, AI, automation, governance, and digital platforms.",
  absoluteTitle: true,
  keywords: [
    "Elgon Edge Consulting Limited",
    "EDGE Framework",
    "Explore Design Govern Execute",
    "data-driven governed execution",
    "strategy to implementation",
    "AI consulting Kenya",
    "data consulting Kenya"
  ]
});

export default function AboutPage() {
  return (
    <main>
      <section className="executive-hero relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="galaxy-grid absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="absolute left-12 top-12 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              About us
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              Modernizing how organizations operate, decide, and deliver value
            </h1>
            <p className="mt-7 text-xl leading-9 text-slate-200">
              Elgon Edge Consulting Limited is a technology, data, AI, and digital transformation consulting
              company helping organizations modernize how they operate, make decisions, and deliver value.
            </p>
            <p className="mt-4 text-xl leading-9 text-slate-200">
              We work from strategy to implementation, combining advisory depth with hands-on delivery across data
              foundations, analytics, responsible AI, automation, governance, and business platforms.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-6 shadow-2xl shadow-black/25 backdrop-blur">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-200">Focus areas</p>
            <div className="mt-6 grid gap-4">
              {["Data", "AI", "Automation", "Governance", "Digital platforms"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
                  <CheckCircle2 className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                  <p className="font-bold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="fine-grid bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="section-kicker">How we work</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Credible consulting with implementation discipline
            </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">
              We combine executive advisory, delivery governance, technical execution, and post-delivery support
              so transformation work can move from strategy documents into working operating capability.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-navy text-cyan-200 shadow-lg shadow-slate-900/15">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-brand-navy">{item.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="fine-grid bg-slate-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="section-kicker">EDGE commitment</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
                The EDGE Commitment
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-slate-600 lg:justify-self-end">
              EDGE represents our commitment to enabling data-driven, governed execution for modern organizations.
            </p>
          </div>
          <div className="mt-14 grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-4">
            {edgeCommitments.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="premium-card-border flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-navy text-cyan-200 shadow-lg shadow-slate-900/15">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black tracking-[0.18em] text-brand-blue">
                      EDGE
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-black text-brand-navy">{item.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ["Advisory", "Clear direction, executive alignment, and modernization roadmaps."],
            ["Governance", "Controls, ownership, quality standards, and delivery discipline."],
            ["Implementation", "Hands-on systems, dashboards, automation, and platform execution."]
          ].map(([title, text]) => (
            <article key={title} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-soft">
              <p className="section-kicker">{title}</p>
              <p className="mt-5 text-xl font-bold leading-8 text-brand-navy">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
