import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "glass";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = ""
}: ButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[0.95rem] font-black transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2";
  const variants = {
    primary:
      "bg-gradient-to-r from-brand-blue to-brand-teal text-white shadow-xl shadow-blue-500/20 hover:-translate-y-0.5 hover:shadow-blue-500/30",
    secondary:
      "border border-slate-200 bg-white text-brand-navy shadow-sm hover:-translate-y-0.5 hover:border-brand-blue/40 hover:text-brand-blue hover:shadow-lg",
    dark:
      "bg-gradient-to-r from-brand-navy to-slate-800 text-white shadow-xl shadow-slate-900/20 hover:-translate-y-0.5 hover:shadow-slate-900/30",
    glass:
      "border border-white/20 bg-white/10 text-white shadow-xl shadow-black/20 backdrop-blur hover:-translate-y-0.5 hover:bg-white/15"
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
