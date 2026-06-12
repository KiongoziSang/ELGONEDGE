import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Banknote,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Compass,
  DatabaseZap,
  Facebook,
  FileCheck2,
  GraduationCap,
  HeartPulse,
  Instagram,
  Landmark,
  Layers3,
  Linkedin,
  LineChart,
  Network,
  PenTool,
  Rocket,
  ShieldCheck,
  Twitter,
  UsersRound,
  Workflow,
  Youtube
} from "lucide-react";

export const elgonOsUrl = "https://elgonos.elgonedge.com";
export const elgonOsPricingUrl = "https://elgonos.elgonedge.com/pricing";
export const elgonOsRequestAccessUrl = "https://elgonos.elgonedge.com/request-access";
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
    description: "Digital transformation consulting Kenya teams can use to modernize processes, systems, and operating models.",
    icon: Network,
    capabilities: [
      "Digital maturity assessments",
      "Operating model redesign",
      "Transformation roadmaps",
      "Change and adoption planning"
    ],
    seoTitle: "Digital Transformation Advisory | Elgon Edge Consulting Limited",
    seoDescription:
      "Digital transformation consulting Kenya organizations can use for business processes, operating models, cloud consulting, governance, and enterprise technology delivery.",
    overview:
      "Elgon Edge Consulting Limited helps organizations define practical modernization roadmaps, align stakeholders, and move transformation priorities from strategy into structured implementation across cloud, data, AI, workflow, and enterprise technology programs.",
    outcomes: [
      "Clear modernization roadmap aligned to business outcomes",
      "Improved process visibility and operating model clarity",
      "Better stakeholder alignment before implementation"
    ]
  },
  {
    slug: "data-strategy-governance-quality",
    title: "Data Strategy, Governance & Quality",
    description: "Data governance consulting, data quality management, and modern data platform foundations.",
    icon: DatabaseZap,
    capabilities: [
      "Data strategy and governance frameworks",
      "Enterprise data model and semantic layer foundations",
      "Data quality controls",
      "Master data management",
      "Data ownership and stewardship models"
    ],
    seoTitle: "Data Strategy, Governance and Quality Consulting | Elgon Edge Consulting Limited",
    seoDescription:
      "Data governance consulting, data quality management, modern data platform consulting, and BigQuery consulting for trusted data foundations.",
    overview:
      "We help organizations strengthen data foundations through governance frameworks, data quality controls, stewardship models, BigQuery-aware architecture patterns, and practical standards that support analytics, automation, and AI adoption.",
    outcomes: [
      "Trusted data foundations for reporting and decision-making",
      "Clear ownership, stewardship, and governance controls",
      "Reduced reporting inconsistencies and data quality issues"
    ]
  },
  {
    slug: "business-intelligence-executive-analytics",
    title: "Business Intelligence & Executive Analytics",
    description: "Business intelligence consulting, Power BI consulting Kenya teams, dashboards, KPIs, and board reporting.",
    icon: BarChart3,
    capabilities: [
      "Executive dashboards",
      "KPI definition and tracking",
      "Metric layer design",
      "Board and management reporting",
      "Self-service analytics enablement"
    ],
    seoTitle: "Business Intelligence and Executive Analytics Consulting | Elgon Edge Consulting Limited",
    seoDescription:
      "Business intelligence consulting and Power BI consulting Kenya organizations can use for dashboards, KPIs, executive analytics, board reporting, and decision-ready insights.",
    overview:
      "Elgon Edge Consulting Limited designs Power BI and modern analytics dashboards, KPI frameworks, board reports, and executive analytics that help leadership teams understand performance and act with confidence.",
    outcomes: [
      "Clear executive dashboards and performance indicators",
      "Reduced manual reporting effort",
      "Better decision support for leadership and operational teams"
    ]
  },
  {
    slug: "ai-readiness-responsible-ai-governance",
    title: "AI Readiness & Responsible AI Governance",
    description: "AI consulting Kenya organizations can use for AI strategy, readiness, and responsible AI governance.",
    icon: BrainCircuit,
    capabilities: [
      "AI readiness assessments",
      "Responsible AI policies",
      "Use case prioritization",
      "Risk, privacy, and control frameworks"
    ],
    seoTitle: "AI Readiness and Responsible AI Governance Consulting | Elgon Edge Consulting Limited",
    seoDescription:
      "AI consulting Kenya, AI strategy consulting, and responsible AI governance for organizations adopting practical, safe, governed, and business-aligned AI capabilities.",
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
    description: "Custom SaaS, platform engineering, cloud consulting, portals, marketplaces, and digital operating systems.",
    icon: Layers3,
    capabilities: [
      "Custom web applications",
      "SaaS product development",
      "Customer and staff portals",
      "Marketplace and directory workflows",
      "Moderated resident community workflows",
      "Privacy-first resident notice workflows",
      "Resident exchange and display board workflows",
      "Property, construction, maintenance, and access workflows",
      "Platform architecture and delivery"
    ],
    seoTitle: "Custom Software, SaaS and Digital Platform Development | Elgon Edge Consulting Limited",
    seoDescription:
      "Custom SaaS development, cloud consulting, platform engineering, portals, marketplaces, workflow platforms, dashboards, and digital operating systems.",
    overview:
      "Elgon Edge Consulting Limited designs and builds custom software, SaaS products, portals, marketplace workflows, governed workflow platforms, resident experience layers, and digital operating systems that support modern business operations. ElgonOS is our flagship AI-powered property operations platform for Kenya and demonstrates our product engineering, automation, data, AI, dashboard, resident communication, and governance capability in a real operating domain.",
    outcomes: [
      "Digital platforms aligned to real operating workflows",
      "Scalable applications with role-based access and data foundations",
      "Service directories and approval flows that reduce manual coordination",
      "Moderated communication layers for notices, grievances, approvals, and official responses",
      "Privacy-first resident communication patterns for verified unit-to-unit notices",
      "Moderated community listing workflows for resident-to-resident exchange",
      "Property operations workflows for construction progress, maintenance, access, approvals, reminders, and audit trails",
      "Better user experience, reporting, and operational control"
    ]
  },
  {
    slug: "training-capability-building",
    title: "Training & Capability Building",
    description:
      "Practical training for teams on data, AI, governance, dashboards, automation, cloud, and modern digital platforms.",
    icon: GraduationCap,
    capabilities: [
      "Data literacy and analytics adoption",
      "Power BI and executive dashboard training",
      "AI readiness and GenAI awareness",
      "Responsible AI governance",
      "Data governance and data quality",
      "Workflow automation",
      "Cloud and modern data platforms",
      "Executive data and AI strategy workshops"
    ],
    seoTitle: "Training and Capability Building | Elgon Edge Consulting Limited",
    seoDescription:
      "Data training Kenya, AI training Kenya, Power BI training Kenya, data governance training, responsible AI training, and executive workshops for practical capability building.",
    overview:
      "Elgon Edge Consulting Limited helps organizations build internal capability through practical, role-based training and executive workshops across data literacy, Power BI, AI readiness, responsible AI governance, data governance, data quality, workflow automation, cloud platforms, and digital transformation.",
    outcomes: [
      "Stronger internal data, AI, and digital confidence",
      "Role-based learning linked to real operating needs",
      "Improved adoption of dashboards, governance, automation, and platforms"
    ]
  },
  {
    slug: "technology-talent-staff-augmentation",
    title: "Technology Talent & Staff Augmentation",
    description:
      "Flexible access to vetted data, AI, cloud, software, BI, and automation professionals to support delivery teams.",
    icon: UsersRound,
    capabilities: [
      "Data analysts",
      "BI developers",
      "Data engineers",
      "AI/ML engineers",
      "Cloud engineers",
      "Software engineers",
      "Automation specialists",
      "Business analysts",
      "Product managers",
      "Project delivery support"
    ],
    seoTitle: "Technology Talent and Staff Augmentation | Elgon Edge Consulting Limited",
    seoDescription:
      "Technology staff augmentation Kenya, IT staff augmentation Kenya, data engineering talent, BI developer outsourcing, and AI and cloud talent support for delivery teams.",
    overview:
      "Elgon Edge Consulting Limited helps organizations extend delivery capacity with vetted technology professionals across data engineering, business intelligence, AI/ML, cloud, software engineering, automation, business analysis, product management, and project delivery support. This service complements our advisory and platform delivery work through embedded specialists and flexible delivery support.",
    outcomes: [
      "Extended delivery capacity without weakening governance",
      "Access to vetted technology professionals and embedded specialists",
      "Flexible implementation support across data, AI, cloud, software, BI, and automation"
    ]
  }
];

export const differentiators = [
  {
    title: "Practical Modernization",
    description: "Strategy, architecture, governance, engineering, implementation, and adoption support are tied to measurable outcomes.",
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

export const industries = [
  {
    title: "Financial services",
    description: "Trusted data, controls, dashboards, automation, and governed AI for regulated operating environments.",
    icon: Banknote
  },
  {
    title: "Insurance",
    description: "Cleaner customer, policy, claims, reporting, and workflow foundations for better operational visibility.",
    icon: ShieldCheck
  },
  {
    title: "Real estate and property management",
    description: "Property operations platforms, rent workflows, tenant visibility, maintenance, access, resident services, and community communication.",
    icon: Building2
  },
  {
    title: "Public sector",
    description: "Data governance, service delivery dashboards, workflow modernization, and accountable digital programs.",
    icon: Landmark
  },
  {
    title: "Education",
    description: "Student, finance, performance, reporting, and engagement data patterns for better institutional decisions.",
    icon: GraduationCap
  },
  {
    title: "Healthcare",
    description: "Operational dashboards, data quality controls, workflow improvement, and responsible AI readiness.",
    icon: HeartPulse
  },
  {
    title: "Manufacturing",
    description: "Production visibility, quality monitoring, inventory data, maintenance workflows, and operational dashboards.",
    icon: Workflow
  },
  {
    title: "SMEs and growing enterprises",
    description: "Practical systems, dashboards, automation, and SaaS patterns that scale with the business.",
    icon: BriefcaseBusiness
  }
];

export const solutionAccelerators = [
  {
    title: "ElgonOS property operations platform",
    description: "A flagship AI-powered property operations product for landlords, property managers, gated communities, apartments, and real estate teams in Kenya, including resident experience patterns such as Resident Connect.",
    icon: Building2,
    href: "/elgonos"
  },
  {
    title: "Customer 360 accelerators",
    description: "Implementation patterns for consolidating customer, account, service, communication, and performance views.",
    icon: UsersRound,
    href: "/services/data-strategy-governance-quality"
  },
  {
    title: "Enterprise Data Model & Semantic Layer Accelerators",
    description:
      "Reusable data models, KPI definitions, metric layer design, and domain structures for standardized reporting, analytics, and AI-ready data products.",
    icon: Layers3,
    href: "/services/data-strategy-governance-quality"
  },
  {
    title: "Data Governance Operating Model Frameworks",
    description:
      "Practical governance frameworks for data ownership, stewardship, policies, standards, issue management, data quality controls, and accountability routines.",
    icon: ShieldCheck,
    href: "/services/data-strategy-governance-quality"
  },
  {
    title: "Data Quality Monitoring dashboards",
    description: "Dashboard templates and controls for tracking completeness, consistency, exceptions, ownership, and remediation.",
    icon: DatabaseZap,
    href: "/services/data-strategy-governance-quality"
  },
  {
    title: "Responsible AI governance toolkit",
    description: "Engagement assets for AI policies, risk review, use case prioritization, human oversight, and adoption controls.",
    icon: BrainCircuit,
    href: "/services/ai-readiness-responsible-ai-governance"
  },
  {
    title: "Digital performance monitoring tools",
    description: "Solution patterns for KPIs, service levels, exception tracking, executive dashboards, and improvement routines.",
    icon: BarChart3,
    href: "/services/business-intelligence-executive-analytics"
  },
  {
    title: "Workflow automation accelerators",
    description: "Reusable process patterns for approvals, reminders, handoffs, document intelligence, audit trails, and controlled automation.",
    icon: Workflow,
    href: "/services/intelligent-automation-agentic-ai"
  },
  {
    title: "Executive dashboard frameworks",
    description: "Board-ready reporting structures for strategy, finance, operations, risk, customer, and delivery performance.",
    icon: LineChart,
    href: "/services/business-intelligence-executive-analytics"
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
  "Training & Capability Building",
  "Technology Talent & Staff Augmentation",
  "ElgonOS"
];

export const workflowIcon = Workflow;
