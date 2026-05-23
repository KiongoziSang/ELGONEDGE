import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu } from "lucide-react";
import { elgonOsUrl, navItems } from "@/lib/site";
import { ButtonLink } from "./ButtonLink";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/82 shadow-sm shadow-slate-900/[0.03] backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-[1520px] items-center justify-between gap-8 px-4 py-4 sm:px-6 lg:gap-10 lg:px-10 lg:py-5">
        <Link
          href="/"
          className="flex items-center rounded-[1.35rem] border border-white/70 bg-white/95 px-4 py-2.5 shadow-[0_16px_38px_rgba(15,23,42,0.10)] ring-1 ring-slate-900/[0.04] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(15,23,42,0.13)] sm:px-5 sm:py-3"
          aria-label="Elgon Edge home"
        >
          <Image
            src="/elgon-edge-consulting-logo-transparent.png"
            alt="Elgon Edge Consulting Limited"
            width={420}
            height={92}
            priority
            className="h-12 w-auto object-contain sm:h-14 lg:h-16"
          />
        </Link>

        <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-gradient-to-b from-slate-800 via-brand-navy to-slate-950 p-2 shadow-[0_18px_45px_rgba(2,6,23,0.22)] ring-1 ring-cyan-200/10 backdrop-blur-xl xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative overflow-hidden rounded-full px-5 py-3 text-base font-black text-slate-300 transition duration-200 hover:-translate-y-0.5 hover:text-white"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-violet-500/20 opacity-0 transition group-hover:opacity-100" />
              <span className="absolute inset-x-3 bottom-1 h-px rounded-full bg-cyan-200/0 transition group-hover:bg-cyan-200/60" />
              <span className="relative">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <ButtonLink href={elgonOsUrl} variant="dark" className="gap-2 px-7 py-3.5">
            Launch ElgonOS
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <details className="relative xl:hidden">
          <summary className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-full border border-white/10 bg-gradient-to-b from-slate-800 via-brand-navy to-slate-950 text-white shadow-lg shadow-slate-900/15">
            <Menu className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Open navigation</span>
          </summary>
          <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 via-brand-navy to-slate-950 p-3 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href={elgonOsUrl} variant="dark" className="mt-3 w-full gap-2">
              Launch ElgonOS
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </details>
      </nav>
    </header>
  );
}
