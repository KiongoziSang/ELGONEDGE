import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Download, Mail, Phone } from "lucide-react";
import {
  companyProfilePdfPath,
  contactInfo,
  elgonOsPricingUrl,
  elgonOsRequestAccessUrl,
  elgonOsUrl,
  services,
  socialLinks
} from "@/lib/site";

export function Footer() {
  return (
    <footer className="executive-hero text-white">
      <div className="mx-auto grid max-w-[1520px] gap-14 px-4 py-24 sm:px-6 md:grid-cols-[1.3fr_0.8fr_1.15fr_0.8fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-[1.35rem] border border-white/10 bg-white px-5 py-4 shadow-xl shadow-black/20">
              <Image
                src="/elgon-edge-consulting-logo-transparent.png"
                alt="Elgon Edge Consulting Limited"
                width={360}
                height={98}
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>
          <p className="mt-7 max-w-md text-[1.18rem] leading-9 text-slate-300">
            Technology consulting for data, AI, automation, governance, cloud, digital platforms, and flagship
            products including ElgonOS.
          </p>
          {socialLinks.length > 0 ? (
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Elgon Edge Consulting on ${label}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-slate-200 shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:border-cyan-200/60 hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-brand-navy"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">Company</p>
          <div className="grid gap-4 text-[1.08rem]">
            <Link href="/services" className="text-slate-300 transition hover:text-white">
              Services
            </Link>
            <Link href="/about" className="text-slate-300 transition hover:text-white">
              About
            </Link>
            <Link href="/company-profile" className="text-slate-300 transition hover:text-white">
              Company Profile
            </Link>
            <a href={companyProfilePdfPath} download className="inline-flex items-center gap-2 text-slate-300 transition hover:text-white">
              Download Profile
              <Download className="h-4 w-4 text-cyan-200" aria-hidden="true" />
            </a>
            <Link href="/insights" className="text-slate-300 transition hover:text-white">
              Insights
            </Link>
            <Link href="/elgonos" className="text-slate-300 transition hover:text-white">
              ElgonOS Property Management
            </Link>
            <Link href="/contact" className="text-slate-300 transition hover:text-white">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">Services</p>
          <div className="grid gap-4 text-[1.08rem]">
            {services.slice(0, 5).map((service) => (
              <Link key={service.title} href={`/services/${service.slug}`} className="text-slate-300 transition hover:text-white">
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">Contact</p>
          <div className="grid gap-4 text-[1.02rem]">
            <Link href={contactInfo.phoneHref} className="group flex items-center gap-3 text-slate-300 transition hover:text-white">
              <Phone className="h-4 w-4 text-cyan-200 transition group-hover:text-white" aria-hidden="true" />
              <span>{contactInfo.phone}</span>
            </Link>
            <Link href={contactInfo.emailHref} className="group flex items-center gap-3 text-slate-300 transition hover:text-white">
              <Mail className="h-4 w-4 text-cyan-200 transition group-hover:text-white" aria-hidden="true" />
              <span>{contactInfo.email}</span>
            </Link>
          </div>
          <div className="mt-7 grid gap-3">
            <Link
              href={elgonOsUrl}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              ElgonOS property operations platform
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold">
              <Link href={elgonOsPricingUrl} className="text-slate-300 transition hover:text-white">
                ElgonOS pricing
              </Link>
              <Link href={elgonOsRequestAccessUrl} className="text-slate-300 transition hover:text-white">
                Request access
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Elgon Edge Consulting Limited · All rights reserved.
      </div>
    </footer>
  );
}
