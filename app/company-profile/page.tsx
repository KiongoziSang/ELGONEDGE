import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, Eye, FileText, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { companyProfilePdfPath } from "@/lib/site";
import { createPageMetadata, JsonLd, siteUrl } from "@/lib/seo";

const profilePath = companyProfilePdfPath;

export const metadata: Metadata = createPageMetadata({
  title: "Company Profile | Elgon Edge Consulting Limited",
  path: "/company-profile",
  description:
    "View and download the Elgon Edge Consulting Limited company profile covering our consulting approach, EDGE Framework, services, and delivery focus.",
  absoluteTitle: true,
  keywords: [
    "Elgon Edge Consulting company profile",
    "Elgon Edge Consulting profile PDF",
    "EDGE Framework company profile",
    "consulting company profile Kenya"
  ]
});

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "@id": `${siteUrl}/company-profile#document`,
  name: "Elgon Edge Consulting Limited Company Profile",
  url: `${siteUrl}${profilePath}`,
  encodingFormat: "application/pdf",
  about: {
    "@id": `${siteUrl}/#organization`
  },
  publisher: {
    "@id": `${siteUrl}/#organization`
  }
};

export default function CompanyProfilePage() {
  const profileHighlights = [
    "Technology, data, AI, and digital transformation consulting",
    "Strategy-to-implementation delivery across advisory, governance, and platforms",
    "EDGE Framework: Explore, Design, Govern, Execute"
  ];

  return (
    <main>
      <JsonLd data={profileJsonLd} />
      <section className="executive-hero relative overflow-hidden px-4 py-24 text-white sm:px-6 lg:px-10">
        <div className="galaxy-grid absolute inset-0 opacity-22" aria-hidden="true" />
        <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1520px] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Company profile
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              Elgon Edge Consulting Limited company profile
            </h1>
            <p className="mt-7 max-w-4xl text-[1.32rem] leading-10 text-slate-200">
              A concise reference for our consulting focus, EDGE delivery framework, core services, and how we
              help organizations modernize operations through data, AI, automation, governance, and digital platforms.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={profilePath} className="gap-2">
                Open Profile
                <Eye className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <a
                href={profilePath}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-[0.95rem] font-black text-white shadow-xl shadow-black/20 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-brand-navy"
              >
                Download PDF
                <Download className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/25 backdrop-blur">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-6">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-100">
                  <FileText className="h-7 w-7" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">PDF profile</p>
                  <p className="mt-1 text-xl font-black">Company capability overview</p>
                </div>
              </div>
              <div className="mt-7 grid gap-4">
                {profileHighlights.map((item, index) => (
                  <div key={item} className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4">
                    <p className="font-bold leading-7 text-slate-100">{item}</p>
                    <span className="shrink-0 text-xs font-black text-slate-400">0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fine-grid px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1520px]">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Read online</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
                View the full company profile
              </h2>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 text-base font-black text-brand-blue hover:text-brand-navy">
              Discuss an engagement
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft">
            <iframe
              src={profilePath}
              title="Elgon Edge Consulting Limited company profile PDF"
              className="h-[78vh] min-h-[620px] w-full bg-slate-100"
            />
          </div>
        </div>
      </section>

      <CTASection
        title="Need the profile tailored for a proposal or partner review?"
        text="Share the context, audience, and decision criteria. We can align the discussion around the services and outcomes that matter most."
      />
    </main>
  );
}
