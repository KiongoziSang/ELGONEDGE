import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpenText, CheckCircle2, Layers3, SearchCheck, Sparkles } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { insights } from "@/lib/insights";
import { createPageMetadata, JsonLd, siteUrl } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Insights and Blog",
  description:
    "Read Elgon Edge insights on data governance, AI readiness, business intelligence, workflow automation, data migration, and ElgonOS property operations.",
  path: "/insights",
  image: {
    url: "/insights/data-governance-ai-insight.png",
    width: 1672,
    height: 941,
    alt: "Elgon Edge Insights cover image with governed data and AI transformation visuals"
  },
  keywords: [
    "Elgon Edge insights",
    "data governance articles",
    "AI readiness blog",
    "business intelligence insights",
    "workflow automation articles",
    "ElgonOS articles"
  ]
});

function getReadTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));

  return `${minutes} min read`;
}

const featuredInsight = insights[0];
const remainingInsights = insights.slice(1);

export default function InsightsPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/insights#item-list`,
    name: "Elgon Edge Insights",
    itemListElement: insights.map((insight, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/insights/${insight.slug}`,
      name: insight.title,
      description: insight.description
    }))
  };

  return (
    <main>
      <JsonLd data={itemListJsonLd} />
      <section className="executive-hero relative overflow-hidden px-4 py-28 text-white sm:px-6 lg:px-10 lg:py-32">
        <div className="galaxy-grid absolute inset-0 opacity-22" aria-hidden="true" />
        <div className="absolute right-8 top-8 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1520px] gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Insights and blog
            </div>
            <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.5rem]">
              Ideas for governed data, practical AI, and digital execution
            </h1>
            <p className="mt-7 max-w-4xl text-[1.28rem] leading-10 text-slate-200">
              Practical articles from Elgon Edge Consulting Limited on modernization, trusted reporting,
              automation, responsible AI, migration assurance, and property operations with ElgonOS.
            </p>
          </div>

          <div className="grid gap-4 rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/25 backdrop-blur sm:grid-cols-3">
            {[
              { label: "Governed", value: "Data", icon: CheckCircle2 },
              { label: "Practical", value: "AI", icon: SearchCheck },
              { label: "Delivered", value: "Platforms", icon: Layers3 }
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.value} className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-5">
                  <Icon className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                  <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                  <p className="mt-1 text-2xl font-black text-white">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="fine-grid px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1520px]">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="section-kicker">Featured insight</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
                Latest thinking from Elgon Edge
              </h2>
            </div>
            <p className="max-w-3xl text-[1.18rem] leading-9 text-slate-600 lg:justify-self-end">
              Built for leaders and teams moving from fragmented work into controlled, measurable operating
              capability.
            </p>
          </div>

          <article className="premium-card-border mt-14 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft lg:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-[22rem] overflow-hidden">
              <Image
                src={featuredInsight.image}
                alt={featuredInsight.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-950/20 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-10">
                <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-cyan-100">Featured article</p>
                <div className="mt-5 grid gap-3 text-sm font-bold text-slate-200 sm:grid-cols-2">
                  <span>{featuredInsight.keywords[0]}</span>
                  <span>
                    {getReadTime(
                      featuredInsight.intro + " " + featuredInsight.sections.map((section) => section.body).join(" ")
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-8 sm:p-10 lg:p-12">
              <h3 className="text-3xl font-black leading-tight tracking-tight text-brand-navy sm:text-4xl">
                {featuredInsight.title}
              </h3>
              <p className="mt-6 text-[1.16rem] leading-9 text-slate-600">{featuredInsight.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {featuredInsight.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-brand-blue">
                    {keyword}
                  </span>
                ))}
              </div>
              <Link
                href={`/insights/${featuredInsight.slug}`}
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-900"
              >
                Read article
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1520px]">
          <div className="max-w-4xl">
            <p className="section-kicker">All articles</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy">Explore the insight library</h2>
          </div>
          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {remainingInsights.map((insight) => (
              <article
                key={insight.slug}
                className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:border-brand-blue/25 hover:bg-white hover:shadow-soft"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <Image
                    src={insight.image}
                    alt={insight.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-300 hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-start justify-between gap-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-navy text-cyan-200 shadow-lg shadow-slate-900/15">
                      <BookOpenText className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black tracking-[0.14em] text-brand-blue">
                      {getReadTime(insight.intro + " " + insight.sections.map((section) => section.body).join(" "))}
                    </span>
                  </div>
                  <h3 className="mt-7 text-2xl font-black leading-tight tracking-tight text-brand-navy">
                    {insight.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[1.05rem] leading-8 text-slate-600">{insight.description}</p>
                  <Link
                    href={`/insights/${insight.slug}`}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-brand-blue transition hover:text-brand-navy"
                  >
                    Read article
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Have a modernization priority behind the insight?"
        text="Talk to Elgon Edge Consulting Limited about the data, AI, automation, governance, or platform work needed to move from article to execution."
        primaryHref="/contact"
        primaryLabel="Contact Us"
        secondaryHref="/services"
        secondaryLabel="View Services"
      />
    </main>
  );
}
