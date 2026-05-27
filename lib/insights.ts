export type Insight = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  intro: string;
  sections: {
    heading: string;
    body: string;
  }[];
};

export const insights: Insight[] = [
  {
    slug: "what-is-data-governance-and-why-it-matters",
    title: "What Is Data Governance and Why It Matters for Growing Organizations",
    description:
      "Learn what data governance means, why it matters for growing organizations, and how trusted data foundations support reporting, automation, and AI.",
    image: "/insights/data-governance-ai-insight.png",
    imageAlt: "Abstract data governance dashboard with trusted data blocks and control icons",
    keywords: ["data governance consulting Kenya", "data quality", "trusted data foundations"],
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
    keywords: ["ElgonOS property management", "property management software Kenya", "ElgonOS"],
    intro:
      "ElgonOS helps property managers move from fragmented spreadsheets to a centralized property management platform for daily operations.",
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
