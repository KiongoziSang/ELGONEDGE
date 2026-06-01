import type { Metadata } from "next";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileText,
  HardHat,
  KeyRound,
  MessageSquareText,
  Monitor,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Tags,
  UsersRound,
  Wrench
} from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { elgonOsUrl } from "@/lib/site";
import { createPageMetadata, elgonOsSoftwareJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "ElgonOS AI-Powered Property Management Software Kenya | Rent, M-PESA, Tenants and Construction",
  path: "/elgonos",
  description:
    "ElgonOS is AI-powered property management software for Kenya by Elgon Edge, covering rent collection, M-PESA workflows, tenants, leases, units, billing, receipts, documents, construction tracking, access control, maintenance, dashboards, and Ask AI.",
  absoluteTitle: true,
  keywords: [
    "ElgonOS",
    "AI-powered property management software Kenya",
    "property management software Kenya",
    "rent collection software Kenya",
    "tenant management software Kenya",
    "M-PESA rent collection software",
    "construction tracking software Kenya",
    "property maintenance software Kenya",
    "landlord software Kenya",
    "property management system Kenya",
    "real estate management software Kenya"
  ]
});

const features = [
  { title: "Rent and M-PESA", icon: CreditCard },
  { title: "Tenant and leases", icon: UsersRound },
  { title: "Documents and receipts", icon: FileText },
  { title: "Access workflows", icon: KeyRound },
  { title: "Construction tracking", icon: HardHat },
  { title: "Maintenance", icon: Wrench },
  { title: "Ask AI", icon: Bot },
  { title: "Resident services", icon: Store },
  { title: "Resident exchange", icon: Tags }
];

const platformPillars = [
  {
    title: "Rent, billing, receipts, and M-PESA workflows",
    icon: CreditCard,
    summary: "Manage rent collection, billing cycles, receipt records, and payment routing around the rails Kenyan teams use.",
    points: ["Rent collection", "M-PESA PayBill", "Bank PayBill", "Till", "Bank transfer", "Receipts"]
  },
  {
    title: "Lease, unit, tenant, and document management",
    icon: FileText,
    summary: "Keep core portfolio records connected so teams can see occupancy, commitments, documents, billing, and tenant history together.",
    points: ["Properties and units", "Tenant records", "Lease files", "Billing records", "Document management"]
  },
  {
    title: "Access control",
    icon: KeyRound,
    summary: "Coordinate entry, visitor movement, and guard-side operating workflows.",
    points: ["Gate passes and cards", "Visitor pre-registration", "Guard workflows", "Visitor workflows", "Entry records"]
  },
  {
    title: "Construction tracking",
    icon: HardHat,
    summary: "Track properties and units under construction from pipeline to tenant-ready handover.",
    points: ["Phases", "Progress %", "Estimated ready dates", "Dashboards", "Reports", "Tenant pipeline reservations"]
  },
  {
    title: "Maintenance workflows",
    icon: Wrench,
    summary: "Capture maintenance requests, coordinate work, and keep service activity visible to managers and tenants.",
    points: ["Tenant requests", "Assignment", "Status tracking", "Updates", "Operational history"]
  },
  {
    title: "Tenant experience",
    icon: CalendarCheck2,
    summary: "Give tenants a smoother way to request, book, sign, refer, respond, find approved local help, and exchange household items.",
    points: ["Bookings", "Wishlist", "Referrals", "Feedback", "Lease signing"]
  },
  {
    title: "Resident Community",
    icon: MessageSquareText,
    summary: "Replace unmanaged WhatsApp group noise with a moderated layer for official notices, private grievances, and approved resident posts.",
    points: ["Official announcements", "Private grievances", "Admin approval", "Pinned responses"]
  },
  {
    title: "Resident Services Marketplace",
    icon: Store,
    summary: "Reduce manual coordination by giving tenants a directory of property-approved local providers.",
    points: ["Provider registration", "Admin approval", "Approved directory", "Direct call or WhatsApp"]
  },
  {
    title: "Resident Exchange",
    icon: Tags,
    summary: "Let residents advertise household items when moving, upgrading, or clearing space, with management approval before listings go live.",
    points: ["Item photos", "Price and condition", "Admin moderation", "Direct buyer-seller contact"]
  },
  {
    title: "Intelligence",
    icon: Sparkles,
    summary: "Use Ask AI, AI-assisted reporting, tenant predictability, dashboards, and insights to turn portfolio data into practical answers.",
    points: ["Ask AI portfolio questions", "Property questions", "AI-assisted reporting", "Tenant predictability", "Executive dashboards", "Operational insights"]
  },
  {
    title: "Automation and controls",
    icon: ClipboardCheck,
    summary: "Standardize approvals, reminders, operating exceptions, and accountability across daily property work.",
    points: ["Approvals", "Reminders", "Audit trails", "Staff roles", "Operational exceptions"]
  },
  {
    title: "Communication",
    icon: MessageSquareText,
    summary: "Keep residents and teams aligned with timely operating alerts and controlled community communication.",
    points: ["Email communication", "SMS-ready reminders", "WhatsApp-ready alerts", "Community notifications"]
  },
  {
    title: "Mobile app",
    icon: Smartphone,
    summary: "A dedicated mobile experience is planned for resident and operations workflows.",
    points: ["Coming soon", "Tenant self-service", "Operational approvals", "Field-ready updates"]
  }
];

const plans = [
  {
    name: "Starter",
    description: "Essentials for teams moving core property records and rent basics into one platform.",
    highlights: ["Properties, units, tenants", "Lease and document records", "Billing and receipt essentials"]
  },
  {
    name: "Growth",
    description: "Rent operations plus tenant demand workflows for expanding portfolios.",
    highlights: ["Rent operations", "Bookings", "Wishlist", "Referrals", "Approved provider directory", "Resident Exchange listings"]
  },
  {
    name: "Professional",
    description: "Full operations for property teams that need stronger controls and service workflows.",
    highlights: [
      "Access control and gate passes",
      "Maintenance workflows",
      "Construction progress tracking",
      "Feedback",
      "Tenant predictability",
      "Audit trail",
      "Staff roles",
      "Resident Community moderation",
      "Resident Services Marketplace",
      "Moderated Resident Exchange",
      "Email, SMS, and WhatsApp-ready communication"
    ]
  },
  {
    name: "Enterprise",
    description: "Advanced operating intelligence, integrations, and rollout support for larger teams.",
    highlights: [
      "AI and conversational reporting",
      "Executive dashboards",
      "Operational insights",
      "Custom workflows",
      "Integrations",
      "Data migration",
      "Mobile rollout support"
    ]
  }
];

const featureMatrix = [
  ["Rent collection", "Rent billing, M-PESA PayBill, Bank PayBill, Till, bank transfer, cards, reminders, receipts, and payment visibility"],
  ["Portfolio records", "Property, unit, tenant, lease, billing, receipt, document, and occupancy management"],
  ["Access", "Gate passes/cards, visitor pre-registration, visitor workflows, guard workflows, and entry records"],
  ["Maintenance", "Tenant maintenance requests, assignment, status tracking, updates, and operational history"],
  ["Construction", "Property and unit construction phases, progress %, estimated ready dates, dashboards, reports, and tenant pipeline reservations"],
  ["Tenant workflows", "Bookings, wishlist, referrals, feedback, lease signing, Resident Community, approved provider directory, Resident Exchange"],
  ["Resident Community", "Moderated notices, private grievances, approved resident posts, official replies, pinned updates, closed threads, and notifications"],
  ["Resident services", "Provider registration, admin approval, approved directory, direct tenant call or WhatsApp"],
  ["Resident Exchange", "Moderated household item listings, listing photos, price, condition, and direct buyer-seller contact"],
  ["Property display board", "Optional lobby or gate display for approved notices, service providers, and resident listings"],
  ["Intelligence", "Ask AI for portfolio and property questions, conversational reporting, tenant predictability, executive dashboards, and operational insights"],
  ["Automation and controls", "Approvals, reminders, audit trails, staff roles, portfolio data quality dashboard, and operational exception visibility"],
  ["Communication", "Email communication plus SMS and WhatsApp-ready reminders, alerts, and resident notifications"],
  ["Mobile", "Mobile app coming soon with rollout support on Enterprise"]
];

const marqueeFeatures = [
  "Entry",
  "ElgonOS Access",
  "Smart gate",
  "Verified identity",
  "Tenant workflows",
  "Resident services",
  "Resident Community",
  "Approved providers",
  "Resident Exchange",
  "Display board",
  "M-PESA routing",
  "Receipts",
  "Documents",
  "Lease signing",
  "Maintenance",
  "Construction tracking",
  "Tenant reservations",
  "Ask AI",
  "Executive dashboards",
  "Audit trail",
  "Mobile-ready"
];

const kenyaBenefits = [
  {
    title: "Rent collection software for Kenya",
    summary:
      "Coordinate rent billing, M-PESA workflows, payment routing, receipts, reminders, and portfolio visibility from one operating layer."
  },
  {
    title: "Tenant management and lease workflows",
    summary:
      "Keep tenant records, lease details, documents, bookings, feedback, resident community workflows, referrals, and service workflows connected."
  },
  {
    title: "Construction tracking for growing portfolios",
    summary:
      "Track property and unit phases, progress percentages, estimated ready dates, dashboards, reports, and tenant pipeline reservations."
  },
  {
    title: "Maintenance workflows with operating history",
    summary:
      "Capture maintenance requests, coordinate assignments, update tenants, and preserve activity records for management review."
  },
  {
    title: "Controlled resident communication",
    summary:
      "Publish official notices, receive private tenant grievances, and approve resident posts before they become visible to the community."
  },
  {
    title: "Resident services without constant coordination",
    summary:
      "Approve trusted local providers once, then let tenants contact them directly from the tenant portal by phone or WhatsApp."
  },
  {
    title: "Resident-to-resident item exchange",
    summary:
      "Give moving or upgrading tenants a moderated way to advertise household items to residents in the same property community."
  },
  {
    title: "M-PESA-aware property operations",
    summary:
      "Support local payment workflows around M-PESA PayBill, bank PayBill, tills, bank transfers, and card channels."
  }
];

const comparisonCriteria = [
  "Local payment workflows such as M-PESA and bank channels",
  "Tenant, lease, unit, document, and occupancy records in one place",
  "Construction phases, progress %, estimated ready dates, and reservations",
  "Maintenance requests, assignments, status updates, and history",
  "Moderated Resident Community for notices, grievances, and approved posts",
  "Approved resident service providers for common tenant needs",
  "Moderated resident listings for household item resale",
  "Automated receipts, approvals, reminders, and communication workflows",
  "Ask AI for portfolio and property questions",
  "Dashboards, reports, tenant predictability, and operational insights",
  "Audit trail, staff roles, controls, and data quality visibility",
  "Implementation support for migration, rollout, and adoption"
];

const faqs = [
  {
    question: "Is ElgonOS AI-powered property management software for Kenya?",
    answer:
      "Yes. ElgonOS is built by Elgon Edge Consulting Limited for Kenyan landlords, property managers, and real estate teams that need AI-assisted reporting, rent operations, tenant workflows, access control, communication, and dashboards in one practical system."
  },
  {
    question: "Does ElgonOS support M-PESA rent collection workflows?",
    answer:
      "ElgonOS is designed around local payment routing workflows, including M-PESA PayBill, bank PayBill, till, bank transfer, and card channels, so property teams can manage billing and rent collection with better operational visibility."
  },
  {
    question: "Can ElgonOS manage tenants, leases, units, and documents?",
    answer:
      "Yes. ElgonOS centralizes properties, units, tenants, leases, occupancy information, billing records, and documents so property teams can reduce spreadsheet dependence."
  },
  {
    question: "Can ElgonOS track construction progress for properties and units?",
    answer:
      "Yes. ElgonOS supports construction tracking for properties and units, including phases, progress percentages, estimated ready dates, dashboards, reports, and tenant pipeline reservations before handover."
  },
  {
    question: "Does ElgonOS include maintenance workflows?",
    answer:
      "Yes. Property teams can manage maintenance requests, assignments, status updates, tenant communication, and operating history from the same property management platform."
  },
  {
    question: "Does ElgonOS include Resident Community?",
    answer:
      "Yes. Resident Community is a controlled communication layer, not social media. It gives property managers a moderated space for official notices, private tenant grievances, approved resident posts, pinned updates, closed threads, official replies, and notifications."
  },
  {
    question: "Does ElgonOS include a Resident Services Marketplace?",
    answer:
      "Yes. ElgonOS includes a Resident Services Marketplace where property managers can approve local providers and tenants can contact approved providers directly from the tenant portal."
  },
  {
    question: "Can residents advertise items they want to sell?",
    answer:
      "ElgonOS can support Resident Exchange listings for household items such as furniture, appliances, electronics, and moving-out sales. Listings should be moderated by property management before other residents see them."
  },
  {
    question: "Does ElgonOS include dashboards and AI-assisted reporting?",
    answer:
      "Yes. ElgonOS includes executive dashboards, AI-assisted reporting, tenant predictability, operational insights, and Ask AI capabilities for portfolio and property questions."
  },
  {
    question: "Who should use ElgonOS?",
    answer:
      "ElgonOS is suitable for landlords, property managers, real estate teams, and organizations that want a more controlled way to manage rent collection, tenants, access, communication, and reporting."
  }
];

export default function ElgonOsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.elgonedge.com/elgonos#faq",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <main>
      <JsonLd data={[elgonOsSoftwareJsonLd, faqJsonLd]} />
      <section className="executive-hero relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="galaxy-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="absolute right-10 top-8 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-cyan-200">ElgonOS AI-powered property management software Kenya</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              AI-Powered Property Management Software for Rent Collection, M-PESA, Tenants, and Property Operations
            </h1>
            <p className="mt-7 text-xl leading-9 text-slate-200">
              ElgonOS helps landlords, property managers, and real estate teams in Kenya use AI-assisted reporting,
              Ask AI, tenant predictability, and operational dashboards alongside rent collection, M-PESA workflows,
              access control, gate passes, visitor and guard workflows, tenant management, leases, units, billing,
              receipts, documents, maintenance, construction tracking, Resident Community, resident services,
              Resident Exchange, communication, and executive visibility from one operating layer built by Elgon Edge.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={elgonOsUrl} className="gap-2">
                Launch ElgonOS
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="glass">
                Talk to Us
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-[2.25rem] border border-white/15 bg-white/[0.08] p-4 shadow-2xl shadow-black/25 backdrop-blur">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-5">
              <div className="mb-5 flex items-center justify-between rounded-2xl bg-white/[0.07] px-5 py-4">
                <div>
                  <p className="text-sm font-bold">Property operations cockpit</p>
                  <p className="text-xs text-slate-400">Billing, access, tenants, intelligence</p>
                </div>
                <BarChart3 className="h-6 w-6 text-cyan-200" aria-hidden="true" />
              </div>
              <div className="mb-5 grid grid-cols-3 gap-3">
                {["M-PESA workflows", "Ask AI", "Construction"].map((metric) => (
                  <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-sm font-black">{metric}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 text-white">
                    <Icon className="h-7 w-7 text-cyan-200" aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
                  </article>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#050b1a] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl border border-cyan-300/30 bg-cyan-400/10 px-3 py-3 shadow-[0_16px_55px_rgba(8,47,73,0.22)]">
            <div className="elgonos-marquee-mask">
              <div className="flex w-max animate-elgonos-marquee items-center gap-0">
                {[...marqueeFeatures, ...marqueeFeatures].map((feature, index) => (
                  <span
                    key={`${feature}-${index}`}
                    className="inline-flex items-center text-[0.78rem] font-extrabold uppercase tracking-[0.28em] text-cyan-100"
                  >
                    {feature}
                    <span className="mx-4 text-cyan-300/80">•</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fine-grid bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="section-kicker">Property management software Kenya</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
                AI-powered for local rent collection, tenant workflows, construction tracking, maintenance, resident layers, and operating control
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-600">
              Property teams in Kenya need more than a generic database. ElgonOS connects AI-powered property
              management software, rent collection software, M-PESA workflows, tenant management software, lease
              records, unit and document management, Resident Community, approved resident services, Resident
              Exchange, construction tracking, maintenance, access workflows, automation, communication, and
              executive dashboards so daily operations can move with stronger visibility and fewer spreadsheets.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {kenyaBenefits.map((benefit) => (
              <article key={benefit.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-7 shadow-sm">
                <CheckCircle2 className="h-7 w-7 text-brand-blue" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-black text-brand-navy">{benefit.title}</h3>
                <p className="mt-4 text-[1.02rem] leading-8 text-slate-600">{benefit.summary}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-2xl font-black tracking-tight text-brand-navy">
              What to compare when choosing property management software in Kenya
            </h3>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {comparisonCriteria.map((criterion) => (
                <div key={criterion} className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
                  <p className="text-sm font-bold leading-6 text-slate-700">{criterion}</p>
                </div>
              ))}
            </div>
            <ButtonLink href="/insights/best-property-management-software-in-kenya" variant="secondary" className="mt-7">
              Read the Selection Guide
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="fine-grid bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="section-kicker">Platform pillars</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
                Built for the full property operating cycle
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-600">
              ElgonOS goes beyond rent collection. It connects payments, access, tenants, leases, units, billing,
              receipts, documents, construction, maintenance, communication, Resident Community, resident services,
              Resident Exchange, AI intelligence, automation, approvals, reminders, and audit trails into a cleaner
              daily system for property teams.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {platformPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-navy text-cyan-200">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl font-black text-brand-navy">{pillar.title}</h3>
                      <p className="mt-3 text-[1.02rem] leading-7 text-slate-600">{pillar.summary}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {pillar.points.map((point) => (
                      <span key={point} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700">
                        {point}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="section-kicker">Resident Community</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              A controlled alternative to unmanaged WhatsApp groups
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Resident Community gives property managers a moderated communication layer for notices, grievances,
              and approved resident posts. Management keeps visibility controlled, auditable, and official while
              reducing misinformation, tenant disputes, repeated calls, and scattered communication.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              "Publish official notices and announcements to tenants",
              "Receive private tenant grievances and feedback",
              "Approve or reject resident posts before they go live",
              "Pin, close, and reply officially with notifications"
            ].map((item) => (
              <article key={item} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
                <MessageSquareText className="h-7 w-7 text-brand-blue" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-black leading-7 text-brand-navy">{item}</h3>
              </article>
            ))}
            <article className="rounded-[1.5rem] border border-slate-200 bg-brand-navy p-7 text-white shadow-sm md:col-span-2">
              <h3 className="text-xl font-black">Simple operating flow</h3>
              <p className="mt-4 leading-8 text-slate-200">
                Tenant message or post, admin review, controlled visibility, official response, and notifications.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="section-kicker">Resident Exchange</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Help residents sell household items without turning managers into brokers
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              When tenants move, upgrade appliances, or refresh their homes, ElgonOS can provide a moderated
              resident-to-resident listing space for furniture, electronics, appliances, curtains, baby items,
              desks, and other household goods. Property managers approve listings before they appear, while
              buyers and sellers contact each other directly.
            </p>
            <p className="mt-5 text-base leading-8 text-slate-500">
              The property team provides the controlled channel, not item guarantees, payment handling, delivery,
              or dispute resolution.
            </p>
          </div>
          <div className="grid gap-5">
            {[
              "Resident creates a listing with photos, price, category, and condition",
              "Admin reviews the listing before it becomes visible",
              "Approved residents browse and contact the seller directly",
              "Optional gate or lobby display can rotate approved listings and notices"
            ].map((step, index) => (
              <article key={step} className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-navy text-cyan-200">
                  {index === 3 ? <Monitor className="h-5 w-5" aria-hidden="true" /> : <Tags className="h-5 w-5" aria-hidden="true" />}
                </span>
                <div>
                  <p className="text-xs font-black tracking-[0.18em] text-slate-400">0{index + 1}</p>
                  <h3 className="mt-2 text-lg font-black leading-7 text-brand-navy">{step}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="section-kicker">Resident Services Marketplace</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Turn common tenant requests into a lighter operating model
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Property managers can approve local providers for gas refills, drinking water, dry cleaning,
              electricians, carpenters, plumbers, cleaners, tailors, movers, and internet installation. Tenants
              contact approved providers directly from the tenant portal by call or WhatsApp, reducing the need
              for the management team to coordinate every service request manually.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              "Provider registration",
              "Admin approval",
              "Approved provider directory",
              "Direct tenant call or WhatsApp"
            ].map((step, index) => (
              <article key={step} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <Store className="h-7 w-7 text-brand-blue" aria-hidden="true" />
                  <span className="text-xs font-black tracking-[0.18em] text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-black text-brand-navy">{step}</h3>
              </article>
            ))}
            <article className="rounded-[1.5rem] border border-slate-200 bg-brand-navy p-7 text-white shadow-sm md:col-span-2">
              <PhoneCall className="h-7 w-7 text-cyan-200" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-black">Built for service convenience, not extra admin work</h3>
              <p className="mt-4 leading-8 text-slate-200">
                Future commercial models can support featured listings, commissions, managed dispatch, or service
                fees as the marketplace matures.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="section-kicker">Plans</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Pricing built around operating maturity
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {plans.map((plan) => (
              <article key={plan.name} className="flex h-full flex-col rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-black text-brand-navy">{plan.name}</h3>
                  <ShieldCheck className="h-5 w-5 text-brand-blue" aria-hidden="true" />
                </div>
                <p className="mt-4 text-[1.02rem] leading-7 text-slate-600">{plan.description}</p>
                <ul className="mt-7 space-y-3">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-bold leading-6 text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="section-kicker">Feature matrix</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Deeper operating coverage below the clean cards
            </h2>
          </div>
          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
            {featureMatrix.map(([area, detail], index) => (
              <div key={area} className={`grid gap-4 px-6 py-5 md:grid-cols-[0.28fr_0.72fr] ${index > 0 ? "border-t border-slate-200" : ""}`}>
                <p className="font-black text-brand-navy">{area}</p>
                <p className="leading-7 text-slate-600">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fine-grid bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="section-kicker">ElgonOS FAQs</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-brand-navy sm:text-5xl">
              Questions about ElgonOS AI-powered property management software
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
                <h3 className="text-xl font-black text-brand-navy">{faq.question}</h3>
                <p className="mt-4 text-[1.02rem] leading-8 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Launch ElgonOS or discuss your property management workflow"
        text="Use the live ElgonOS AI-powered property management platform or contact Elgon Edge Consulting Limited for rent collection, tenant workflow, migration, and rollout support conversations."
      />
    </main>
  );
}
