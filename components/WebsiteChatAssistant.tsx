"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, Bot, MessageCircle, Send, X } from "lucide-react";

type Message = {
  id: string;
  role: "assistant" | "user";
  text: string;
  links?: Array<{ label: string; href: string }>;
};

type LeadForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  interestArea: string;
  message: string;
};

const quickActions = [
  {
    label: "Consulting Services",
    response:
      "Elgon Edge supports digital transformation, data strategy, governance, business intelligence, AI readiness, automation, cloud platforms, software delivery, training, and technology talent support.",
    links: [{ label: "View services", href: "/services" }],
  },
  {
    label: "Data & AI",
    response:
      "We help organizations build trusted data foundations, executive dashboards, AI strategy, responsible AI governance, data quality controls, and AI-ready operating models.",
    links: [{ label: "Explore Data & AI services", href: "/services/data-strategy-governance-quality" }],
  },
  {
    label: "Cloud & Digital Platforms",
    response:
      "Elgon Edge designs and delivers modern cloud, SaaS, workflow, portal, dashboard, and digital platform solutions that connect strategy to measurable execution.",
    links: [{ label: "Platform delivery", href: "/services/custom-software-saas-digital-platforms" }],
  },
  {
    label: "ElgonOS",
    response:
      "ElgonOS is our flagship AI-powered property operations platform for landlords, property managers, gated communities, apartments, and real estate teams in Kenya, including resident experience capabilities such as Resident Connect in supported deployments.",
    links: [
      { label: "ElgonOS overview", href: "/elgonos" },
      { label: "Visit platform site", href: "https://elgonos.elgonedge.com/" },
    ],
  },
  {
    label: "Request a Consultation",
    response:
      "Share your context and the team will follow up on the right advisory, delivery, training, or technology talent support option.",
    links: [{ label: "Contact Elgon Edge", href: "/contact" }],
  },
  {
    label: "Company Profile",
    response:
      "You can view or download the Elgon Edge Consulting profile for a concise overview of our services, delivery approach, and company positioning.",
    links: [{ label: "Open company profile", href: "/company-profile" }],
  },
];

const interestAreas = [
  "ElgonOS Demo",
  "ElgonOS Pricing",
  "Technical Support",
  "Elgon Edge Consulting",
  "Partnership",
  "Other",
];

const faqResponses = [
  {
    keys: ["pricing", "cost", "fee"],
    text:
      "For ElgonOS pricing, visit the platform pricing page. For consulting, training, or technology talent support, pricing depends on scope, timeline, and delivery model.",
    links: [
      { label: "ElgonOS pricing", href: "https://elgonos.elgonedge.com/pricing" },
      { label: "Request consultation", href: "/contact" },
    ],
  },
  {
    keys: ["profile", "company profile", "brochure"],
    text: "The company profile gives a concise overview of Elgon Edge Consulting, services, industries, and delivery approach.",
    links: [{ label: "Company profile", href: "/company-profile" }],
  },
  {
    keys: ["training", "power bi", "workshop", "capability"],
    text:
      "Elgon Edge provides practical role-based training and executive workshops across data literacy, Power BI, AI readiness, responsible AI governance, data governance, automation, cloud, and digital transformation.",
    links: [{ label: "Training services", href: "/services/training-capability-building" }],
  },
  {
    keys: ["staff", "augmentation", "talent", "outsourcing"],
    text:
      "We support delivery teams with vetted specialists across data engineering, BI, AI/ML, cloud, software engineering, automation, business analysis, product management, and project delivery.",
    links: [{ label: "Technology talent support", href: "/services/technology-talent-staff-augmentation" }],
  },
  {
    keys: ["resident connect", "neighbor", "neighbour", "resident experience", "unit-to-unit", "parking"],
    text:
      "Resident Connect is a practical ElgonOS product innovation for privacy-first unit-to-unit resident notices. On Elgon Edge, we discuss it as an example of resident experience design, platform engineering, and digital transformation for real estate.",
    links: [
      {
        label: "Read the insight",
        href: "/insights/why-resident-experience-is-the-next-frontier-in-property-operations",
      },
      { label: "Visit ElgonOS", href: "https://elgonos.elgonedge.com/" },
    ],
  },
  {
    keys: ["elgonos", "property", "rent", "tenant"],
    text:
      "ElgonOS supports property operations with rent workflows, tenant and lease visibility, maintenance, access workflows, resident services, Resident Connect in supported deployments, dashboards, and AI-assisted reporting.",
    links: [{ label: "Visit ElgonOS", href: "https://elgonos.elgonedge.com/" }],
  },
];

const fallbackResponse =
  "I can help with Elgon Edge services, data and AI, cloud and digital platforms, ElgonOS, company profile, and contacting the team. Choose a quick action or ask a short question.";

function makeMessage(role: Message["role"], text: string, links?: Message["links"]): Message {
  return { id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`, role, text, links };
}

function findResponse(input: string) {
  const normalized = input.toLowerCase();
  return faqResponses.find((item) => item.keys.some((key) => normalized.includes(key)));
}

export function WebsiteChatAssistant() {
  const greeting = useMemo(
    () =>
      makeMessage(
        "assistant",
        "Hi, I’m the Elgon Edge Assistant. I can help you explore our services, solutions, ElgonOS, and how to contact the team."
      ),
    []
  );
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"chat" | "handoff">("chat");
  const [lead, setLead] = useState<LeadForm>({
    name: "",
    email: "",
    phone: "",
    company: "",
    interestArea: "Elgon Edge Consulting",
    message: "",
  });
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const saved = sessionStorage.getItem("elgon-edge-chat-open");
    if (saved === "true") setOpen(true);
    const timer = window.setTimeout(() => setShowHint(true), 4500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("elgon-edge-chat-open", String(open));
    if (open) setShowHint(false);
  }, [open]);

  function handleQuickAction(action: (typeof quickActions)[number]) {
    setMessages((current) => [
      ...current,
      makeMessage("user", action.label),
      makeMessage("assistant", action.response, action.links),
    ]);
  }

  function handleAsk(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    const response = findResponse(question);
    setMessages((current) => [
      ...current,
      makeMessage("user", question),
      makeMessage("assistant", response?.text ?? fallbackResponse, response?.links),
    ]);
    setInput("");
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadStatus("sending");
    try {
      const response = await fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          source: "Elgon Edge website chat",
          sourcePage: window.location.href,
        }),
      });

      if (!response.ok) throw new Error("Lead request failed");

      setLeadStatus("success");
      setMessages((current) => [
        ...current,
        makeMessage("assistant", "Thanks. Our team has received your request and will contact you shortly."),
      ]);
    } catch {
      setLeadStatus("error");
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[80] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {!open && showHint ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="max-w-[280px] rounded-2xl border border-cyan-200/70 bg-white px-4 py-3 text-left text-sm font-bold leading-6 text-slate-700 shadow-2xl shadow-slate-950/15 transition hover:-translate-y-0.5"
        >
          Need help choosing a service or reaching the team?
        </button>
      ) : null}

      {open ? (
        <section className="w-[min(420px,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] border border-cyan-200/30 bg-white shadow-2xl shadow-slate-950/30">
          <div className="flex items-center justify-between bg-brand-navy px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-200">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-black">Elgon Edge Assistant</p>
                <p className="text-xs font-semibold text-cyan-100/80">Services, ElgonOS, and contact help</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand-blue"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="max-h-[56vh] space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "assistant"
                    ? "mr-7 border border-slate-200 bg-white text-slate-700"
                    : "ml-7 bg-brand-navy text-white"
                }`}
              >
                <p>{message.text}</p>
                {message.links?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-brand-blue transition hover:bg-cyan-100"
                      >
                        {link.label}
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t border-slate-200 bg-white p-4">
            {mode === "chat" ? (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() => handleQuickAction(action)}
                      className="rounded-2xl border border-slate-200 px-3 py-2 text-left text-xs font-black text-brand-navy transition hover:border-brand-blue hover:bg-cyan-50"
                    >
                      {action.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setMode("handoff")}
                    className="rounded-2xl bg-brand-navy px-3 py-2 text-left text-xs font-black text-white transition hover:bg-brand-blue"
                  >
                    Talk to a Live Agent
                  </button>
                </div>
                <form onSubmit={handleAsk} className="flex gap-2">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    className="min-w-0 flex-1 rounded-full border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-blue"
                    placeholder="Ask about services, ElgonOS, or contact..."
                  />
                  <button
                    type="submit"
                    className="grid h-12 w-12 place-items-center rounded-full bg-brand-navy text-white transition hover:bg-brand-blue"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
                <p className="text-xs leading-5 text-slate-500">
                  This assistant provides general website guidance. Details you submit for live follow-up are sent to the Elgon Edge team.
                </p>
              </>
            ) : (
              <form onSubmit={(event) => void submitLead(event)} className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-brand-navy">Live agent request</p>
                  <button type="button" onClick={() => setMode("chat")} className="text-xs font-black text-brand-blue">
                    Back to chat
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <input required placeholder="Name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} className="rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
                  <input required type="email" placeholder="Email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} className="rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
                  <input placeholder="Phone" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} className="rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
                  <input placeholder="Company / property" value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} className="rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
                </div>
                <select value={lead.interestArea} onChange={(e) => setLead({ ...lead, interestArea: e.target.value })} className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue">
                  {interestAreas.map((area) => (
                    <option key={area}>{area}</option>
                  ))}
                </select>
                <textarea required placeholder="How can we help?" value={lead.message} onChange={(e) => setLead({ ...lead, message: e.target.value })} className="min-h-24 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
                {leadStatus === "error" ? <p className="text-sm font-bold text-red-600">We could not send this request. Please try again or use the contact page.</p> : null}
                {leadStatus === "success" ? <p className="text-sm font-bold text-emerald-700">Thanks. Our team has received your request and will contact you shortly.</p> : null}
                <button disabled={leadStatus === "sending"} className="w-full rounded-full bg-brand-navy px-4 py-3 text-sm font-black text-white transition hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-60">
                  {leadStatus === "sending" ? "Sending..." : "Send request"}
                </button>
                <p className="text-xs leading-5 text-slate-500">
                  We only use these details to respond to your enquiry. Do not include passwords or confidential credentials.
                </p>
              </form>
            )}
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group grid h-16 w-16 place-items-center rounded-full bg-brand-navy text-white shadow-2xl shadow-slate-950/30 ring-4 ring-cyan-200/40 transition hover:-translate-y-1 hover:bg-brand-blue"
          aria-label="Open Elgon Edge Assistant"
        >
          <MessageCircle className="h-7 w-7 transition group-hover:scale-110" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
