import type { Metadata } from "next";
import { Mail, Send, Sparkles } from "lucide-react";
import { createContactSubmission } from "./actions";
import { serviceInterestOptions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Elgon Edge Consulting Limited for data, AI, automation, governance, digital transformation, and ElgonOS enquiries.",
  alternates: {
    canonical: "/contact"
  }
};

type ContactPageProps = {
  searchParams?: {
    submitted?: string;
  };
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const submitted = searchParams?.submitted;

  return (
    <main>
      <section className="executive-hero relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="galaxy-grid absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="absolute right-10 top-10 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Contact
            </div>
            <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              Let us discuss your modernization priorities
            </h1>
            <p className="mt-7 text-xl leading-9 text-slate-200">
              Share what you are trying to improve, launch, govern, automate, or measure. Your enquiry is stored
              securely so the right conversation can be followed up.
            </p>
            <div className="mt-8 rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-6 backdrop-blur">
              <Mail className="h-7 w-7 text-cyan-200" aria-hidden="true" />
              <p className="mt-5 text-lg font-bold">Executive enquiry intake</p>
              <p className="mt-2 leading-7 text-slate-300">
                Use this form for consulting, platform, governance, analytics, automation, and ElgonOS conversations.
              </p>
            </div>
          </div>

          <form
            action={createContactSubmission}
            className="rounded-[2rem] border border-white/15 bg-white p-6 text-brand-navy shadow-2xl shadow-black/25 sm:p-8"
          >
            <div className="mb-7 border-b border-slate-200 pb-6">
              <p className="section-kicker">Project brief</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight">Tell us what you want to modernize</h2>
              {submitted === "success" ? (
                <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                  Thank you. Your enquiry has been received.
                </p>
              ) : null}
              {submitted === "invalid" ? (
                <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
                  Please complete your name, email, service interest, and message.
                </p>
              ) : null}
              {submitted === "error" ? (
                <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
                  We could not save the enquiry right now. Please try again after the database is configured.
                </p>
              ) : null}
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-brand-navy">
                Name
                <input
                  name="name"
                  type="text"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-brand-navy">
                Email
                <input
                  name="email"
                  type="email"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                  placeholder="you@company.com"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-brand-navy">
                Phone
                <input
                  name="phone"
                  type="tel"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                  placeholder="+254..."
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-brand-navy">
                Company
                <input
                  name="company"
                  type="text"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                  placeholder="Organization name"
                />
              </label>
            </div>

            <label className="mt-5 grid gap-2 text-sm font-semibold text-brand-navy">
              Service interest
              <select
                name="serviceInterest"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a service
                </option>
                {serviceInterestOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-5 grid gap-2 text-sm font-semibold text-brand-navy">
              Message
              <textarea
                name="message"
                rows={6}
                className="resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                placeholder="Tell us about the challenge or opportunity."
                required
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-teal px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 sm:w-auto"
            >
              Submit
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
