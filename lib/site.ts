import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  BrainCircuit,
  Building2,
  CheckCircle2,
  DatabaseZap,
  FileCheck2,
  Layers3,
  LineChart,
  Network,
  ShieldCheck,
  Workflow
} from "lucide-react";

export const elgonOsUrl = "https://elgonos.elgonedge.com";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/elgonos", label: "ElgonOS" },
  { href: "/contact", label: "Contact" }
];

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  capabilities: string[];
};

export const services: Service[] = [
  {
    title: "Digital Transformation Advisory",
    description: "Modernizing business processes, systems, and operating models.",
    icon: Network,
    capabilities: [
      "Digital maturity assessments",
      "Operating model redesign",
      "Transformation roadmaps",
      "Change and adoption planning"
    ]
  },
  {
    title: "Data Strategy, Governance & Quality",
    description: "Building trusted, governed, and high-quality data foundations.",
    icon: DatabaseZap,
    capabilities: [
      "Data strategy and governance frameworks",
      "Data quality controls",
      "Master data management",
      "Data ownership and stewardship models"
    ]
  },
  {
    title: "Business Intelligence & Executive Analytics",
    description: "Creating dashboards, KPIs, board reports, and actionable insights.",
    icon: BarChart3,
    capabilities: [
      "Executive dashboards",
      "KPI definition and tracking",
      "Board and management reporting",
      "Self-service analytics enablement"
    ]
  },
  {
    title: "AI Readiness & Responsible AI Governance",
    description: "Enabling safe, practical, and governed AI adoption.",
    icon: BrainCircuit,
    capabilities: [
      "AI readiness assessments",
      "Responsible AI policies",
      "Use case prioritization",
      "Risk, privacy, and control frameworks"
    ]
  },
  {
    title: "Intelligent Automation & Agentic AI",
    description: "Automating workflows using RPA, AI agents, and document intelligence.",
    icon: Bot,
    capabilities: [
      "Workflow automation design",
      "AI agent pilots",
      "Document intelligence",
      "Human-in-the-loop review models"
    ]
  },
  {
    title: "Data Migration Assurance & Reconciliation",
    description: "Validating migrated data and ensuring go-live readiness.",
    icon: FileCheck2,
    capabilities: [
      "Migration validation planning",
      "Source-to-target reconciliation",
      "Exception reporting",
      "Go-live readiness controls"
    ]
  },
  {
    title: "Custom Software, SaaS & Digital Platforms",
    description: "Building business apps, portals, SaaS products, and digital platforms.",
    icon: Layers3,
    capabilities: [
      "Custom web applications",
      "SaaS product development",
      "Customer and staff portals",
      "Platform architecture and delivery"
    ]
  }
];

export const differentiators = [
  {
    title: "Practical Modernization",
    description: "Strategy is translated into working systems, measurable processes, and adoption plans.",
    icon: CheckCircle2
  },
  {
    title: "Trusted Data Foundations",
    description: "Governance, quality, and accountability are built into analytics and automation work.",
    icon: ShieldCheck
  },
  {
    title: "Executive Clarity",
    description: "Leadership teams get concise dashboards, metrics, and decision support that hold up.",
    icon: LineChart
  },
  {
    title: "Platform Delivery",
    description: "Consulting insight is backed by implementation capability across web, SaaS, and workflow tools.",
    icon: Building2
  }
];

export const deliverySteps = [
  "Discover the operating context and define the business outcomes.",
  "Design the data, process, governance, and platform blueprint.",
  "Implement with structured delivery, documentation, and stakeholder coordination.",
  "Support adoption, measure outcomes, and improve after go-live."
];

export const serviceInterestOptions = [
  "Digital Transformation Advisory",
  "Data Strategy, Governance & Quality",
  "Business Intelligence & Executive Analytics",
  "AI Readiness & Responsible AI Governance",
  "Intelligent Automation & Agentic AI",
  "Data Migration Assurance & Reconciliation",
  "Custom Software, SaaS & Digital Platforms",
  "ElgonOS"
];

export const workflowIcon = Workflow;
