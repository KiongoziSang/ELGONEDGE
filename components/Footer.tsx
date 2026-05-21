import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { elgonOsUrl, services } from "@/lib/site";

export function Footer() {
  return (
    <footer className="executive-hero text-white">
      <div className="mx-auto grid max-w-[1520px] gap-14 px-4 py-24 sm:px-6 md:grid-cols-[1.3fr_0.8fr_1.15fr_0.8fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-[1.35rem] border border-white/10 bg-white px-5 py-4 shadow-xl shadow-black/20">
              <Image
                src="/elgon-edge-consulting-logo.png"
                alt="Elgon Edge Consulting Limited"
                width={360}
                height={98}
                className="h-16 w-auto rounded-xl object-contain"
              />
            </div>
          </div>
          <p className="mt-7 max-w-md text-[1.18rem] leading-9 text-slate-300">
            Premium consulting for data, AI, automation, governance, and digital platforms.
          </p>
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
            <Link href="/elgonos" className="text-slate-300 transition hover:text-white">
              ElgonOS
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
              <Link key={service.title} href="/services" className="text-slate-300 transition hover:text-white">
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-200">Product</p>
          <Link
            href={elgonOsUrl}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-black text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-white/15"
          >
            Launch ElgonOS
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Elgon Edge Consulting Limited · All rights reserved.
      </div>
    </footer>
  );
}
