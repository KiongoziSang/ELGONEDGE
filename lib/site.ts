import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Compass,
  DatabaseZap,
  Facebook,
  FileCheck2,
  Instagram,
  Layers3,
  Linkedin,
  LineChart,
  Network,
  PenTool,
  Rocket,
  ShieldCheck,
  Twitter,
  Workflow,
  Youtube
} from "lucide-react";

export const elgonOsUrl = "https://elgonos.elgonedge.com";
export const companyProfilePdfPath = "/elgon-edge-consulting-company-profile.pdf";

export const contactInfo = {
  phone: "+254 755 366 306",
  phoneHref: "tel:+254755366306",
  email: "info@elgonedge.com",
  emailHref: "mailto:info@elgonedge.com"
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/company-profile", label: "Profile" },
  { href: "/insights", label: "Insights" },
  { href: "/elgonos", label: "ElgonOS" },
  { href: "/contact", label: "Contact" }
];

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/122783999/admin/dashboard/",
    icon: Linkedin
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/elgonedge",
    icon: Facebook
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/elgonedge",
    icon: Instagram
  },
  {
    label: "X",
    href: "https://x.com/elgonedge",
    icon: Twitter
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCx35fgw50b0QoF6pPGZkA6g",
    icon: Youtube
  }
];

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  capabilities: string[];
  seoTitle: string;
  seoDescription: string;
  overview: string;
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "digital-transformation-advisory",
    title: "Digital Transformation Advisory",
    description: "Modernizing business processes, systems, and operating models.",
    icon: Network,
    capabilities: [
      "Digital maturity assessments",
      "Operating model redesign",
      "Transformation roadmaps",
      "Change and adoption planning"
    ],
    seoTitle: "Digital Transformation Advisory | Elgon Edge Consulting Limited",
    seoDescription:
      "Digital transformation advisory for organizations modernizing business processes, systems, operating models, governance, and digital platforms.",
    overview:
      "Elgon Edge Consulting Limited helps organizations define practical modernization roadmaps, align stakeholders, and move transformation priorities from strategy into structured implementation.",
    outcomes: [
      "Clear modernization roadmap aligned to business outcomes",
      "Improved process visibility and operating model clarity",
      "Better stakeholder alignment before implementation"
    ]
  },
  {
    slug: "data-strategy-governance-quality",
    title: "Data Strategy, Governance & Quality",
    description: "Building trusted, governed, and high-quality data foundations.",
    icon: DatabaseZap,
    capabilities: [
      "Data strategy and governance frameworks",
      "Data quality controls",
      "Master data management",
      "Data ownership and stewardship models"
    ],
    seoTitle: "Data Strategy, Governance and Quality Consulting | Elgon Edge Consulting Limited",
    seoDescription:
      "Data strategy, governance, and quality consulting for organizations building trusted data foundations, ownership models, controls, and reporting confidence.",
    overview:
      "We help organizations strengthen data foundations through governance frameworks, data quality controls, stewardship models, and practical standards that support analytics, automation, and AI adoption.",
    outcomes: [
      "Trusted data foundations for reporting and decision-making",
      "Clear ownership, stewardship, and governance controls",
      "Reduced reporting inconsistencies and data quality issues"
    ]
  },
  {
    slug: "business-intelligence-executive-analytics",
    title: "Business Intelligence & Executive Analytics",
    description: "Creating dashboards, KPIs, board reports, and actionable insights.",
    icon: BarChart3,
    capabilities: [
      "Executive dashboards",
      "KPI definition and tracking",
      "Board and management reporting",
      "Self-service analytics enablement"
    ],
    seoTitle: "Business Intelligence and Executive Analytics Consulting | Elgon Edge Consulting Limited",
    seoDescription:
      "Business intelligence consulting for dashboards, KPIs, executive analytics, board reporting, and decision-ready management insights.",
    overview:
      "Elgon Edge Consulting Limited designs dashboards, KPI frameworks, board reports, and executive analytics that help leadership teams understand performance and act with confidence.",
    outcomes: [
      "Clear executive dashboards and performance indicators",
      "Reduced manual reporting effort",
      "Better decision support for leadership and operational teams"
    ]
  },
  {
    slug: "ai-readiness-responsible-ai-governance",
    title: "AI Readiness & Responsible AI Governance",
    description: "Enabling safe, practical, and governed AI adoption.",
    icon: BrainCircuit,
    capabilities: [
      "AI readiness assessments",
      "Responsible AI policies",
      "Use case prioritization",
      "Risk, privacy, and control frameworks"
    ],
    seoTitle: "AI Readiness and Responsible AI Governance Consulting | Elgon Edge Consulting Limited",
    seoDescription:
      "AI readiness and responsible AI governance consulting for organizations adopting practical, safe, governed, and business-aligned AI capabilities.",
    overview:
      "We help organizations assess AI readiness, identify practical use cases, define responsible AI controls, and build adoption roadmaps grounded in data readiness, governance, and risk management.",
    outcomes: [
      "Prioritized AI use cases linked to business value",
      "Responsible AI policies, controls, and governance structures",
      "Improved readiness for practical and safe AI adoption"
    ]
  },
  {
    slug: "intelligent-automation-agentic-ai",
    title: "Intelligent Automation & Agentic AI",
    description: "Automating workflows using RPA, AI agents, and document intelligence.",
    icon: Bot,
    capabilities: [
      "Workflow automation design",
      "AI agent pilots",
      "Document intelligence",
      "Human-in-the-loop review models"
    ],
    seoTitle: "Intelligent Automation and Agentic AI Consulting | Elgon Edge Consulting Limited",
    seoDescription:
      "Automation consulting for workflows, RPA, AI agents, document intelligence, approvals, notifications, and human-in-the-loop operating models.",
    overview:
      "Elgon Edge Consulting Limited helps organizations reduce repetitive work and improve process consistency using workflow automation, AI-assisted processes, document intelligence, and agentic AI pilots.",
    outcomes: [
      "Reduced manual work across repeatable workflows",
      "Improved turnaround time and process consistency",
      "Automation controls that support review, exception handling, and accountability"
    ]
  },
  {
    slug: "data-migration-assurance-reconciliation",
    title: "Data Migration Assurance & Reconciliation",
    description: "Validating migrated data and ensuring go-live readiness.",
    icon: FileCheck2,
    capabilities: [
      "Migration validation planning",
      "Source-to-target reconciliation",
      "Exception reporting",
      "Go-live readiness controls"
    ],
    seoTitle: "Data Migration Assurance and Reconciliation | Elgon Edge Consulting Limited",
    seoDescription:
      "Data migration assurance consulting for source-to-target reconciliation, validation, exception reporting, controls, and go-live readiness.",
    overview:
      "We support migration teams with validation plans, reconciliation checks, exception reporting, and readiness controls so organizations can move into new systems with stronger confidence in their data.",
    outcomes: [
      "Reduced data migration and go-live risk",
      "Clear reconciliation evidence and exception tracking",
      "Improved confidence in migrated data completeness and accuracy"
    ]
  },
  {
    slug: "custom-software-saas-digital-platforms",
    title: "Custom Software, SaaS & Digital Platforms",
    description: "Building business apps, portals, SaaS products, marketplaces, and digital platforms.",
    icon: Layers3,
    capabilities: [
      "Custom web applications",
      "SaaS product development",
      "Customer and staff portals",
      "Marketplace and directory workflows",
      "Moderated resident community workflows",
      "Resident exchange and display board workflows",
      "Platform architecture and delivery"
    ],
    seoTitle: "Custom Software, SaaS and Digital Platform Development | Elgon Edge Consulting Limited",
    seoDescription:
      "SaaS development and custom software delivery for business applications, portals, marketplaces, workflow platforms, dashboards, and digital operating systems.",
    overview:
      "Elgon Edge Consulting Limited designs and builds custom software, SaaS products, portals, marketplace workflows, moderated resident community features, resident exchange features, and digital operating systems that support modern business operations, including ElgonOS resident services.",
    outcomes: [
      "Digital platforms aligned to real operating workflows",
      "Scalable applications with role-based access and data foundations",
      "Service directories and approval flows that reduce manual coordination",
      "Moderated communication layers for notices, grievances, approvals, and official responses",
      "Moderated community listing workflows for resident-to-resident exchange",
      "Better user experience, reporting, and operational control"
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

export const edgeFrameworkSteps = [
  {
    title: "Explore",
    description: "Understand business challenges, operating context, stakeholders, risks, and desired outcomes.",
    icon: Compass
  },
  {
    title: "Design",
    description: "Design practical data, AI, automation, governance, and digital platform solutions.",
    icon: PenTool
  },
  {
    title: "Govern",
    description: "Govern delivery, risk, adoption, documentation, controls, and accountability.",
    icon: ShieldCheck
  },
  {
    title: "Execute",
    description: "Implement with structure, track outcomes, support adoption, and deliver measurable value.",
    icon: Rocket
  }
];

export const edgeCommitments = [
  {
    title: "Enable",
    description: "Enable organizations to modernize operations and make better decisions.",
    icon: CheckCircle2
  },
  {
    title: "Data-driven",
    description: "Use trusted data, analytics, and insight to guide transformation.",
    icon: LineChart
  },
  {
    title: "Governed",
    description: "Build governance, controls, accountability, and responsible delivery into every engagement.",
    icon: ShieldCheck
  },
  {
    title: "Execution",
    description: "Move beyond strategy into implementation, adoption, and measurable outcomes.",
    icon: Rocket
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
