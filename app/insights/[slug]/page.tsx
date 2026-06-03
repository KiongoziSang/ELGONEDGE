import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { ShareButtons } from "@/components/ShareButtons";
import { insights } from "@/lib/insights";
import { createPageMetadata, JsonLd, siteUrl } from "@/lib/seo";
import { services } from "@/lib/site";

type InsightPageProps = {
  params: {
    slug: string;
  };
};

function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export function generateMetadata({ params }: InsightPageProps): Metadata {
  const insight = getInsight(params.slug);

  if (!insight) {
    return {};
  }

  return createPageMetadata({
    title: insight.title,
    description: insight.description,
    path: `/insights/${insight.slug}`,
    absoluteTitle: true,
    image: {
      url: insight.image,
      width: 1672,
      height: 941,
      alt: insight.imageAlt
    },
    keywords: insight.keywords
  });
}

export default function InsightPage({ params }: InsightPageProps) {
  const insight = getInsight(params.slug);

  if (!insight) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteUrl}/insights/${insight.slug}#article`,
    headline: insight.title,
    description: insight.description,
    url: `${siteUrl}/insights/${insight.slug}`,
    image: `${siteUrl}${insight.image}`,
    author: {
      "@id": `${siteUrl}/#organization`
    },
    publisher: {
      "@id": `${siteUrl}/#organization`
    },
    inLanguage: "en-KE"
  };
  const relatedServices = services.filter((service) => insight.relatedServiceSlugs?.includes(service.slug));

  return (
    <main>
      <JsonLd data={articleJsonLd} />
      <section className="executive-hero relative overflow-hidden px-4 py-28 text-white sm:px-6 lg:px-10">
        <div className="galaxy-grid absolute inset-0 opacity-22" aria-hidden="true" />
        <div className="absolute right-10 top-8 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1180px]">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-cyan-100 hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All insights
          </Link>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Insight
          </div>
          <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight sm:text-6xl">
            {insight.title}
          </h1>
          <p className="mt-7 max-w-4xl text-[1.28rem] leading-10 text-slate-200">
            {insight.intro}
          </p>
        </div>
      </section>

      <section className="fine-grid px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 shadow-soft">
            <Image
              src={insight.image}
              alt={insight.imageAlt}
              width={1672}
              height={941}
              sizes="(min-width: 1180px) 1120px, 100vw"
              className="aspect-[16/9] w-full object-cover"
              priority
            />
          </div>

          <div className="mt-8">
            <ShareButtons title={insight.title} url={`${siteUrl}/insights/${insight.slug}`} />
          </div>
        </div>

        <article className="mx-auto mt-10 max-w-[980px] rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
          <div className="space-y-10">
            {insight.sections.map((section) => (
              <section key={section.heading}>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 h-7 w-7 flex-none text-brand-blue" aria-hidden="true" />
                  <div>
                    <h2 className="text-3xl font-black tracking-tight text-brand-navy">{section.heading}</h2>
                    <p className="mt-4 text-[1.15rem] leading-9 text-slate-600">{section.body}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </article>

        {relatedServices.length > 0 ? (
          <div className="mx-auto mt-8 max-w-[980px] rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-blue">Relevant services</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black text-brand-navy transition hover:border-brand-blue/35 hover:text-brand-blue"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <CTASection
        title="Need help turning insight into implementation?"
        text="Talk to Elgon Edge Consulting Limited about the data, AI, automation, governance, or platform priority behind your next project."
        primaryHref="/contact"
        primaryLabel="Contact Us"
        secondaryHref="/services"
        secondaryLabel="View Services"
      />
    </main>
  );
}
