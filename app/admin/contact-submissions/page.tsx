import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { ArrowRight, CheckCircle2, Inbox, LockKeyhole, LogOut, Mail, Trash2 } from "lucide-react";
import { isAdminAuthenticated, isAdminPasswordConfigured } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";
import { deleteSubmission, loginAdmin, logoutAdmin, updateSubmissionStatus } from "./actions";

export const metadata: Metadata = {
  title: "Contact Submissions",
  description: "Admin dashboard for reviewing Elgon Edge Consulting Limited contact form submissions.",
  robots: {
    index: false,
    follow: false
  }
};

type AdminContactSubmissionsPageProps = {
  searchParams?: {
    login?: string;
  };
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Nairobi"
  }).format(date);
}

function LoginPanel({ login }: { login?: string }) {
  return (
    <main className="executive-hero relative overflow-hidden px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="galaxy-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            Admin access
          </div>
          <h1 className="mt-7 text-5xl font-black leading-tight tracking-tight sm:text-6xl">
            Contact submissions dashboard
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-200">
            Review enquiries submitted through the Elgon Edge Consulting Limited website.
          </p>
        </div>

        <form action={loginAdmin} className="rounded-[2rem] border border-white/15 bg-white p-7 text-brand-navy shadow-2xl shadow-black/25 sm:p-8">
          <p className="section-kicker">Secure dashboard</p>
          <h2 className="mt-3 text-2xl font-black tracking-tight">Enter admin password</h2>
          {!isAdminPasswordConfigured() ? (
            <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
              Set ADMIN_DASHBOARD_PASSWORD in .env before using this dashboard.
            </p>
          ) : null}
          {login === "invalid" ? (
            <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
              The password was not correct.
            </p>
          ) : null}
          <label className="mt-6 grid gap-2 text-sm font-bold text-brand-navy">
            Password
            <input
              name="password"
              type="password"
              required
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-normal text-slate-900 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
              placeholder="Admin password"
            />
          </label>
          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-teal px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30"
          >
            Open dashboard
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </main>
  );
}

export default async function AdminContactSubmissionsPage({ searchParams }: AdminContactSubmissionsPageProps) {
  noStore();

  if (!isAdminAuthenticated()) {
    return <LoginPanel login={searchParams?.login} />;
  }

  const [submissions, totalCount, newCount, readCount] = await Promise.all([
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 100
    }),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.contactSubmission.count({ where: { status: "read" } })
  ]);

  return (
    <main className="fine-grid bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Admin dashboard</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Contact submissions
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              View and manage enquiries submitted through the corporate website contact form.
            </p>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-brand-navy shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Sign out
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          {[
            { label: "Total enquiries", value: totalCount, icon: Inbox },
            { label: "New enquiries", value: newCount, icon: Mail },
            { label: "Read enquiries", value: readCount, icon: CheckCircle2 }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <Icon className="h-7 w-7 text-brand-blue" aria-hidden="true" />
                <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                <p className="mt-2 text-4xl font-black text-brand-navy">{item.value}</p>
              </article>
            );
          })}
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-xl font-black text-brand-navy">Latest enquiries</h2>
          </div>

          {submissions.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <Inbox className="mx-auto h-10 w-10 text-slate-300" aria-hidden="true" />
              <p className="mt-4 text-lg font-bold text-brand-navy">No submissions yet</p>
              <p className="mt-2 text-slate-500">New contact form enquiries will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {["Status", "Contact", "Service", "Message", "Submitted", "Actions"].map((heading) => (
                      <th key={heading} className="px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="align-top">
                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${
                            submission.status === "new"
                              ? "bg-cyan-50 text-brand-blue"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-5 py-5">
                        <p className="font-black text-brand-navy">{submission.name}</p>
                        <a className="mt-1 block text-brand-blue hover:text-brand-navy" href={`mailto:${submission.email}`}>
                          {submission.email}
                        </a>
                        {submission.phone ? <p className="mt-1 text-slate-500">{submission.phone}</p> : null}
                        {submission.company ? <p className="mt-1 text-slate-500">{submission.company}</p> : null}
                      </td>
                      <td className="max-w-[220px] px-5 py-5 font-semibold text-slate-700">{submission.serviceInterest}</td>
                      <td className="max-w-md px-5 py-5 leading-7 text-slate-600">{submission.message}</td>
                      <td className="whitespace-nowrap px-5 py-5 text-slate-500">{formatDate(submission.createdAt)}</td>
                      <td className="px-5 py-5">
                        <div className="flex flex-col gap-2">
                          <form action={updateSubmissionStatus}>
                            <input type="hidden" name="id" value={submission.id} />
                            <input type="hidden" name="status" value={submission.status === "new" ? "read" : "new"} />
                            <button
                              type="submit"
                              className="w-full rounded-full border border-slate-200 px-4 py-2 text-xs font-black text-brand-navy transition hover:border-brand-blue hover:text-brand-blue"
                            >
                              Mark {submission.status === "new" ? "read" : "new"}
                            </button>
                          </form>
                          <form action={deleteSubmission}>
                            <input type="hidden" name="id" value={submission.id} />
                            <button
                              type="submit"
                              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-100 px-4 py-2 text-xs font-black text-red-600 transition hover:bg-red-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                              Delete
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
