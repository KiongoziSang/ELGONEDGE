import { ArrowRight } from "lucide-react";
import { elgonOsUrl } from "@/lib/site";
import { ButtonLink } from "./ButtonLink";

type CTASectionProps = {
  title?: string;
  text?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CTASection({
  title = "Ready to modernize how your organization operates?",
  text = "Talk to Elgon Edge Consulting Limited about data, AI, automation, governance, and digital platform delivery.",
  primaryHref = "/contact",
  primaryLabel = "Contact Us",
  secondaryHref = elgonOsUrl,
  secondaryLabel = "Launch ElgonOS"
}: CTASectionProps) {
  return (
    <section className="px-4 py-28 sm:px-6 lg:px-10">
      <div className="executive-hero relative mx-auto grid max-w-[1520px] overflow-hidden rounded-[2.15rem] border border-white/10 px-8 py-16 text-white shadow-2xl shadow-slate-900/20 md:grid-cols-[1.4fr_auto] md:items-center lg:px-14">
        <div className="galaxy-grid absolute inset-0 opacity-18" aria-hidden="true" />
        <div className="absolute right-8 top-8 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cyan-200">Executive conversation</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">{title}</h2>
          <p className="mt-6 max-w-3xl text-[1.2rem] leading-9 text-slate-200">{text}</p>
        </div>
        <div className="relative mt-8 flex flex-col gap-4 sm:flex-row md:mt-0 md:flex-col lg:flex-row">
          <ButtonLink href={primaryHref} variant="primary" className="gap-2">
            {primaryLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={secondaryHref} variant="glass">
            {secondaryLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
