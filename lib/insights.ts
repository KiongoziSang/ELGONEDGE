export type Insight = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  relatedServiceSlugs?: string[];
  relatedLinks?: {
    label: string;
    href: string;
  }[];
  intro: string;
  sections: {
    heading: string;
    body: string;
  }[];
};

export const insights: Insight[] = [
  {
    slug: "ai-property-operations-kenya",
    title: "How AI Is Changing Property Operations in Kenya",
    description:
      "How AI, dashboards, automation, tenant insights, governance, and decision support are changing property operations in Kenya.",
    image: "/insights/automation-platform-insight.png",
    imageAlt: "AI-assisted property operations dashboard with tenant insights, workflows, and governance controls",
    keywords: [
      "AI consulting Kenya",
      "responsible AI governance",
      "AI property operations Kenya",
      "property operations platform",
      "AI automation consulting Kenya"
    ],
    relatedServiceSlugs: [
      "ai-readiness-responsible-ai-governance",
      "business-intelligence-executive-analytics",
      "custom-software-saas-digital-platforms"
    ],
    relatedLinks: [
      {
        label: "AI-powered property management software",
        href: "https://elgonos.elgonedge.com/ai-property-management-software-kenya"
      },
      {
        label: "ElgonOS property operations platform",
        href: "https://elgonos.elgonedge.com/"
      }
    ],
    intro:
      "AI is starting to change property operations in Kenya by helping teams see risk earlier, automate routine follow-up, and turn fragmented tenant, payment, service, and portfolio data into clearer decisions.",
    sections: [
      {
        heading: "Property operations are becoming more data-driven",
        body:
          "Many property teams already hold useful data across rent records, tenant interactions, maintenance requests, access workflows, lease dates, arrears notes, and service history. The next operating shift is connecting that information into dashboards and decision support rather than leaving it scattered across spreadsheets, messages, and manual files."
      },
      {
        heading: "AI works best when the operating model is clear",
        body:
          "AI can support tenant insights, reporting, exception detection, reminders, and portfolio questions, but it depends on clean data definitions, stable workflows, access controls, and human review. This is where responsible AI governance matters: teams need to understand what AI can suggest, what managers must approve, and how decisions are tracked."
      },
      {
        heading: "Dashboards turn AI into management action",
        body:
          "Useful AI in property operations should not stop at chat responses. It should connect to dashboards, arrears views, maintenance backlogs, occupancy trends, tenant predictability, and service-level indicators so managers can see what requires action and whether follow-up is improving performance."
      },
      {
        heading: "ElgonOS as a practical example",
        body:
          "ElgonOS reflects Elgon Edge's product engineering, data, AI, automation, and governance capability in a real operating domain. For detailed ElgonOS features, pricing, and access, visit the standalone ElgonOS platform site."
      }
    ]
  },
  {
    slug: "rent-collection-to-property-operations-platforms",
    title: "From Rent Collection to Property Operations Platforms",
    description:
      "Why property teams are moving from simple rent collection tools toward broader platforms for tenants, maintenance, access, resident services, dashboards, AI reporting, and governance.",
    image: "/insights/automation-platform-insight.png",
    imageAlt: "Property operations platform connecting rent collection, tenant lifecycle, maintenance, access, and dashboards",
    keywords: [
      "digital platform development Kenya",
      "business intelligence consulting",
      "workflow automation",
      "property operations platform",
      "product engineering Kenya"
    ],
    relatedServiceSlugs: [
      "custom-software-saas-digital-platforms",
      "intelligent-automation-agentic-ai",
      "business-intelligence-executive-analytics"
    ],
    relatedLinks: [
      {
        label: "Rent collection software for Kenya",
        href: "https://elgonos.elgonedge.com/rent-collection-software-kenya"
      },
      {
        label: "ElgonOS property operations platform",
        href: "https://elgonos.elgonedge.com/"
      }
    ],
    intro:
      "Rent collection is still central to property management, but the market is moving toward broader property operations platforms that connect payments with tenants, services, reporting, controls, and operating maturity.",
    sections: [
      {
        heading: "Rent collection is only one operating workflow",
        body:
          "Payment visibility matters, but property teams also manage tenant onboarding, leases, documents, maintenance, access, communication, arrears follow-up, resident requests, and management reporting. When those workflows sit in separate tools, leaders still lack a complete operating view."
      },
      {
        heading: "The tenant lifecycle needs connected records",
        body:
          "A stronger platform connects prospect, tenant, unit, lease, billing, receipt, service, access, and communication records. This reduces repeated data entry and gives managers a clearer view of each tenant relationship from onboarding through renewal, exit, or escalation."
      },
      {
        heading: "Dashboards and AI reporting raise operating maturity",
        body:
          "As portfolios grow, teams need dashboards for arrears, occupancy, service backlog, access activity, construction readiness, resident services, and exception management. AI-assisted reporting can help managers ask better questions, but governance and data quality still determine whether the answers are useful."
      },
      {
        heading: "Platforms require governance, not just features",
        body:
          "A property operations platform should support roles, approvals, audit trails, data quality checks, and clear operating routines. These controls turn software into a repeatable management system rather than another place to store records."
      }
    ]
  },
  {
    slug: "mpesa-property-management-workflows",
    title: "Why M-PESA-Aware Workflows Matter in Property Management",
    description:
      "Why local payment visibility, rent tracking, billing, receipts, reconciliation workflows, integration readiness, and operating fit matter for property management in Kenya.",
    image: "/insights/data-governance-ai-insight.png",
    imageAlt: "M-PESA-aware property management workflow with billing, receipts, reconciliation, and dashboard controls",
    keywords: [
      "data quality management",
      "workflow automation",
      "data governance consulting",
      "business intelligence consulting",
      "M-PESA-aware property management workflows"
    ],
    relatedServiceSlugs: [
      "data-strategy-governance-quality",
      "intelligent-automation-agentic-ai",
      "business-intelligence-executive-analytics"
    ],
    relatedLinks: [
      {
        label: "M-PESA-aware property management workflows",
        href: "https://elgonos.elgonedge.com/mpesa-property-management-software-kenya"
      },
      {
        label: "Rent collection software for Kenya",
        href: "https://elgonos.elgonedge.com/rent-collection-software-kenya"
      }
    ],
    intro:
      "In Kenya, property management workflows need to understand how local payment channels affect billing, receipts, rent tracking, reconciliations, exceptions, and management visibility.",
    sections: [
      {
        heading: "Local payment fit affects daily control",
        body:
          "Rent teams need to know which tenant paid, which unit the payment relates to, whether a payment is partial or late, whether a receipt has been issued, and what still needs follow-up. M-PESA-aware workflows help teams align software with how money actually moves in the local market."
      },
      {
        heading: "Reconciliation is an operating workflow",
        body:
          "Payment data is useful only when it can be reconciled against billing records, tenant balances, receipts, and exceptions. A strong workflow should help teams identify unmatched payments, duplicated records, incorrect allocations, delayed receipts, and missing follow-up."
      },
      {
        heading: "Data quality supports better dashboards",
        body:
          "Dashboards depend on accurate payment status, tenant identifiers, unit records, billing periods, and receipt history. Data quality management turns payment visibility into reliable arrears reporting, cash collection analysis, and executive oversight."
      },
      {
        heading: "Integration readiness should be designed early",
        body:
          "Not every organization starts with full integrations, but the data model and workflows should be designed for integration readiness. This makes it easier to connect payment channels, accounting tools, dashboards, and AI-assisted reporting as operating maturity grows."
      }
    ]
  },
  {
    slug: "building-digital-platforms-for-real-estate",
    title: "Building Digital Platforms for Real Estate and Property Managers",
    description:
      "How consulting, product engineering, data platforms, workflow automation, AI-enabled operations, governance, and scalable delivery come together in real estate technology.",
    image: "/insights/automation-platform-insight.png",
    imageAlt: "Digital platform architecture for real estate operations with data, workflow automation, AI, and governance layers",
    keywords: [
      "digital platform development Kenya",
      "product engineering Kenya",
      "cloud consulting Kenya",
      "modern data platform consulting",
      "enterprise technology consulting"
    ],
    relatedServiceSlugs: [
      "custom-software-saas-digital-platforms",
      "data-strategy-governance-quality",
      "ai-readiness-responsible-ai-governance",
      "digital-transformation-advisory"
    ],
    relatedLinks: [
      {
        label: "ElgonOS property operations platform",
        href: "https://elgonos.elgonedge.com/"
      },
      {
        label: "Request ElgonOS access",
        href: "https://elgonos.elgonedge.com/request-access"
      }
    ],
    intro:
      "Real estate and property management platforms succeed when product engineering, workflow automation, data architecture, AI enablement, governance, and adoption are designed as one operating system.",
    sections: [
      {
        heading: "Start with the operating model",
        body:
          "A digital platform should reflect how property teams actually work: tenant lifecycle, rent operations, maintenance, access, resident services, approvals, communication, reporting, and management review. Technology choices should follow the operating model rather than forcing teams into generic screens."
      },
      {
        heading: "Use platform engineering discipline",
        body:
          "Scalable real estate platforms need role-based access, clean domain models, reliable workflows, audit trails, integration readiness, responsive interfaces, and maintainable cloud architecture. Product engineering is the discipline that turns a workflow idea into software that can survive real use."
      },
      {
        heading: "Build data and AI foundations early",
        body:
          "AI-enabled operations depend on trusted data foundations. Property, unit, tenant, lease, billing, service, access, and communication data should be structured well enough to support dashboards, questions, predictions, and exception handling without weakening governance."
      },
      {
        heading: "Connect delivery to adoption",
        body:
          "A platform is only valuable when teams use it consistently. Implementation should include migration planning, data cleanup, training, operating routines, issue tracking, and governance so the system becomes part of daily management rather than a side project."
      }
    ]
  },
  {
    slug: "best-property-management-software-in-kenya",
    title: "Best Property Management Software in Kenya: What Landlords and Property Managers Should Compare",
    description:
      "A practical guide to choosing AI-powered property management software in Kenya, including rent collection, M-PESA workflows, tenant management, leases, dashboards, and rollout support.",
    image: "/insights/automation-platform-insight.png",
    imageAlt: "Property management software dashboard with rent collection, tenant workflows, and reporting controls",
    keywords: [
      "best property management software Kenya",
      "AI-powered property management software Kenya",
      "property management software Kenya",
      "rent collection software Kenya",
      "M-PESA rent collection software",
      "tenant management software Kenya",
      "ElgonOS"
    ],
    relatedServiceSlugs: ["custom-software-saas-digital-platforms"],
    intro:
      "The best property management software in Kenya should fit local rent collection workflows, tenant operations, reporting needs, and the realities of implementation.",
    sections: [
      {
        heading: "Start with local rent collection workflows",
        body:
          "For landlords and property managers in Kenya, payment workflows are central. A useful property management system should support how teams handle rent billing, M-PESA and bank payment channels, receipts, arrears follow-up, reconciliations, and portfolio-level visibility."
      },
      {
        heading: "Compare tenant, lease, unit, and document management",
        body:
          "Strong tenant management software should centralize property records, units, tenant profiles, lease details, occupancy status, documents, bookings, feedback, and service workflows. This reduces spreadsheet dependence and makes daily operations easier to control."
      },
      {
        heading: "Look for dashboards, controls, and audit trails",
        body:
          "Property teams need more than data entry screens. Good software should provide dashboards, staff roles, audit trails, exception visibility, data quality checks, and reports that help owners and managers understand what needs attention."
      },
      {
        heading: "Check implementation and migration support",
        body:
          "The right software should come with a practical transition path. Before choosing a platform, confirm how property, unit, tenant, lease, billing, and document data will be cleaned, migrated, tested, and adopted by the team."
      },
      {
        heading: "Where ElgonOS fits",
        body:
          "ElgonOS is built by Elgon Edge Consulting Limited for landlords, property managers, and real estate teams that want AI-powered property management software for rent collection workflows, M-PESA-aware payment routing, tenant management, access control, communication, Ask AI reporting, dashboards, and rollout support."
      }
    ]
  },
  {
    slug: "what-is-data-governance-and-why-it-matters",
    title: "What Is Data Governance and Why It Matters for Growing Organizations",
    description:
      "Learn what data governance means, why it matters for growing organizations, and how trusted data foundations support reporting, automation, and AI.",
    image: "/insights/data-governance-ai-insight.png",
    imageAlt: "Abstract data governance dashboard with trusted data blocks and control icons",
    keywords: ["data governance consulting Kenya", "data quality", "trusted data foundations"],
    relatedServiceSlugs: ["data-strategy-governance-quality"],
    intro:
      "Data governance is the operating discipline that helps organizations define ownership, improve quality, protect data, and use information with confidence.",
    sections: [
      {
        heading: "Why data governance matters",
        body:
          "As organizations grow, data often becomes scattered across systems, spreadsheets, departments, and reports. Governance creates the standards, ownership, controls, and accountability needed to keep data useful and trusted."
      },
      {
        heading: "What good governance improves",
        body:
          "Strong governance improves reporting consistency, decision-making, compliance, automation readiness, and AI readiness. It also reduces duplicated work and confusion over which numbers are correct."
      },
      {
        heading: "Where to start",
        body:
          "A practical starting point is to identify critical data domains, assign ownership, document key definitions, define quality rules, and create a process for resolving data issues."
      }
    ]
  },
  {
    slug: "how-ai-readiness-helps-organizations-adopt-ai-responsibly",
    title: "How AI Readiness Helps Organizations Adopt AI Responsibly",
    description:
      "Understand how AI readiness helps organizations identify practical use cases, manage risk, and adopt responsible AI with better governance.",
    image: "/insights/responsible-ai-insight.png",
    imageAlt: "Responsible AI governance concept with neural network, shield, and risk controls",
    keywords: ["AI consulting Kenya", "AI readiness", "responsible AI governance"],
    relatedServiceSlugs: ["ai-readiness-responsible-ai-governance"],
    intro:
      "AI readiness helps organizations understand whether their data, processes, people, governance, and risks are prepared for practical AI adoption.",
    sections: [
      {
        heading: "AI readiness is more than tools",
        body:
          "Buying an AI tool does not guarantee value. Organizations need clear use cases, reliable data, controls, privacy safeguards, human review, and change management."
      },
      {
        heading: "Responsible AI reduces adoption risk",
        body:
          "Responsible AI governance helps define how AI is used, monitored, reviewed, and controlled. It supports safer adoption and clearer accountability."
      },
      {
        heading: "Practical adoption path",
        body:
          "Start by prioritizing use cases, assessing data readiness, defining acceptable risk, piloting controlled workflows, and measuring business outcomes before scaling."
      }
    ]
  },
  {
    slug: "why-businesses-need-a-single-source-of-truth-for-reporting",
    title: "Why Businesses Need a Single Source of Truth for Reporting",
    description:
      "Learn why organizations need a single source of truth for reporting, dashboards, KPIs, business intelligence, and executive decision-making.",
    image: "/insights/data-governance-ai-insight.png",
    imageAlt: "Executive analytics dashboard with governed data flows and reporting panels",
    keywords: ["business intelligence consulting Kenya", "executive analytics", "single source of truth"],
    relatedServiceSlugs: ["business-intelligence-executive-analytics", "data-strategy-governance-quality"],
    intro:
      "A single source of truth gives leaders and teams confidence that reports, dashboards, and KPIs are based on consistent definitions and reliable data.",
    sections: [
      {
        heading: "The problem with fragmented reporting",
        body:
          "When teams use different spreadsheets, definitions, and systems, leaders spend time debating numbers instead of making decisions."
      },
      {
        heading: "What a single source of truth enables",
        body:
          "It supports clearer dashboards, better KPI tracking, consistent board reporting, faster analysis, and stronger accountability across business functions."
      },
      {
        heading: "How to build it",
        body:
          "Organizations should define key metrics, document data sources, improve data quality, automate reporting flows, and create governance around changes to reports."
      }
    ]
  },
  {
    slug: "what-executives-should-expect-from-a-modern-dashboard",
    title: "What Executives Should Expect from a Modern Dashboard",
    description:
      "Learn what makes a modern executive dashboard useful, including clear KPIs, trusted data, decision context, accountability, and action-oriented reporting.",
    image: "/insights/data-governance-ai-insight.png",
    imageAlt: "Executive dashboard concept with governed data flows and performance reporting panels",
    keywords: ["executive dashboards", "KPI reporting", "business intelligence consulting Kenya"],
    relatedServiceSlugs: ["business-intelligence-executive-analytics"],
    intro:
      "A modern executive dashboard should help leaders understand performance quickly, trust the numbers, and move from reporting into informed action.",
    sections: [
      {
        heading: "Start with the decisions leaders need to make",
        body:
          "Dashboards should not begin with every metric that is available. They should begin with the decisions executives need to make, the risks they need to monitor, and the outcomes they are accountable for improving."
      },
      {
        heading: "Use KPIs with clear ownership and definitions",
        body:
          "Every key metric should have a clear definition, data source, owner, update frequency, and interpretation. Without this discipline, dashboards can create more debate than clarity."
      },
      {
        heading: "Connect insight to action",
        body:
          "The best dashboards highlight trends, exceptions, targets, and accountability. They help leadership teams see what needs attention, who owns the follow-up, and whether corrective actions are improving performance."
      }
    ]
  },
  {
    slug: "how-workflow-automation-reduces-manual-work",
    title: "How Workflow Automation Reduces Manual Work",
    description:
      "Explore how workflow automation, RPA, AI agents, and document intelligence reduce manual work and improve operational efficiency.",
    image: "/insights/automation-platform-insight.png",
    imageAlt: "Workflow automation command center with connected documents and digital process lanes",
    keywords: ["automation consulting Kenya", "workflow automation", "agentic AI"],
    relatedServiceSlugs: ["intelligent-automation-agentic-ai"],
    intro:
      "Workflow automation helps organizations reduce repetitive work, improve consistency, speed up approvals, and give teams more time for higher-value activities.",
    sections: [
      {
        heading: "Manual work slows operations",
        body:
          "Repeated data entry, manual approvals, spreadsheet tracking, and email follow-ups create delays, errors, and weak visibility."
      },
      {
        heading: "Automation improves flow",
        body:
          "Automation can route tasks, trigger notifications, extract document information, update systems, and support human review where judgment is needed."
      },
      {
        heading: "Start with the right workflows",
        body:
          "The best candidates are frequent, rules-based, high-volume, and measurable workflows where errors or delays create operational cost."
      }
    ]
  },
  {
    slug: "what-to-check-before-a-data-migration-go-live",
    title: "What to Check Before a Data Migration Go-Live",
    description:
      "A practical checklist for data migration go-live readiness, including reconciliation, completeness, accuracy, exceptions, and post-migration validation.",
    image: "/insights/automation-platform-insight.png",
    imageAlt: "Data migration pathways connecting records, controls, and reporting dashboards",
    keywords: ["data migration assurance", "data reconciliation", "go-live readiness"],
    relatedServiceSlugs: ["data-migration-assurance-reconciliation"],
    intro:
      "A data migration go-live should be supported by clear validation evidence, reconciliation checks, issue tracking, and business readiness.",
    sections: [
      {
        heading: "Validate completeness",
        body:
          "Confirm that expected records moved from source to target, including key master data, transactions, balances, documents, and reference data."
      },
      {
        heading: "Reconcile critical fields",
        body:
          "Compare source and target totals, counts, statuses, dates, balances, and other critical fields. Exceptions should be documented and resolved or accepted formally."
      },
      {
        heading: "Plan post-go-live checks",
        body:
          "After cutover, teams should confirm system usability, reporting accuracy, business process continuity, and any open migration issues."
      }
    ]
  },
  {
    slug: "how-property-managers-can-move-from-spreadsheets-to-elgonos",
    title: "How Property Managers Can Move from Spreadsheets to ElgonOS",
    description:
      "Learn how property managers can move from spreadsheets to ElgonOS for properties, units, tenants, leases, billing, occupancy, and documents.",
    image: "/insights/automation-platform-insight.png",
    imageAlt: "Property operations platform with connected documents, dashboards, and portfolio tiles",
    keywords: ["ElgonOS property management", "AI-powered property management software Kenya", "property management software Kenya", "ElgonOS"],
    relatedServiceSlugs: ["custom-software-saas-digital-platforms"],
    intro:
      "ElgonOS helps property managers move from fragmented spreadsheets to a centralized AI-powered property management platform for daily operations.",
    sections: [
      {
        heading: "Why spreadsheets become difficult",
        body:
          "Spreadsheets are flexible at the start, but they become harder to control as properties, units, tenants, leases, payments, and documents increase."
      },
      {
        heading: "What ElgonOS centralizes",
        body:
          "ElgonOS brings together property records, units, tenants, leases, billing, occupancy, and documents so teams can work from one operating view."
      },
      {
        heading: "How to transition",
        body:
          "Start by cleaning property and tenant data, defining unit records, confirming lease details, organizing billing information, and migrating documents in phases."
      }
    ]
  }
];
