import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { services } from "@/lib/site";
import { createPageMetadata, JsonLd, siteUrl } from "@/lib/seo";

type ServicePageProps = {
  params: {
    slug: string;
  };
};

function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getService(params.slug);

  if (!service) {
    return {};
  }

  return createPageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    absoluteTitle: true,
    keywords: [service.title, ...service.capabilities]
  });
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getService(params.slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/services/${service.slug}#service`,
    name: service.title,
    description: service.seoDescription,
    provider: {
      "@id": `${siteUrl}/#organization`
    },
    areaServed: {
      "@type": "Country",
      name: "Kenya"
    },
    url: `${siteUrl}/services/${service.slug}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} capabilities`,
      itemListElement: service.capabilities.map((capability) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: capability
        }
      }))
    }
  };

  return (
    <main>
      <JsonLd data={serviceJsonLd} />
      <section className="executive-hero relative overflow-hidden px-4 py-28 text-white sm:px-6 lg:px-10">
        <div className="galaxy-grid absolute inset-0 opacity-22" aria-hidden="true" />
        <div className="absolute right-10 top-8 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1520px] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-cyan-100 hover:text-white">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Services
            </Link>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Consulting capability
            </div>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-7 max-w-4xl text-[1.28rem] leading-10 text-slate-200">
              {service.overview}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/25 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-7">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-100">
                <Icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">Example capabilities</p>
              <div className="mt-5 grid gap-4">
                {service.capabilities.map((capability) => (
                  <div key={capability} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4">
                    <CheckCircle2 className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                    <span className="font-bold">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fine-grid px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1520px] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="section-kicker">Client outcomes</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Practical delivery focused on measurable value
            </h2>
            <p className="mt-6 text-[1.16rem] leading-9 text-slate-600">
              Every engagement is shaped around business outcomes, implementation readiness, governance, and adoption.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {service.outcomes.map((outcome) => (
              <article key={outcome} className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
                <CheckCircle2 className="h-7 w-7 text-brand-blue" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-black leading-8 text-brand-navy">{outcome}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Discuss ${service.title}`}
        text="Share your current priorities, constraints, and target outcomes. Elgon Edge Consulting Limited can help shape the delivery path."
        primaryHref="/contact"
        primaryLabel="Contact Us"
        secondaryHref="/services"
        secondaryLabel="View Services"
      />
    </main>
  );
}
