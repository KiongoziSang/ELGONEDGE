import type { Service } from "@/lib/site";

type ServiceCardProps = {
  service: Service;
  detailed?: boolean;
};

export function ServiceCard({ service, detailed = false }: ServiceCardProps) {
  const Icon = service.icon;
  const featured = ["Data Strategy, Governance & Quality", "AI Readiness & Responsible AI Governance", "Custom Software, SaaS & Digital Platforms"].includes(
    service.title
  );

  return (
    <article
      className={`group h-full rounded-[2.15rem] bg-white p-9 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft sm:p-10 ${
        featured
          ? "premium-card-border border border-transparent bg-gradient-to-br from-white via-white to-blue-50/45"
          : "border border-slate-200 hover:border-brand-blue/25"
      }`}
    >
      <div
        className={`mb-8 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-2xl transition sm:h-20 sm:w-20 ${
          featured
            ? "bg-brand-navy text-cyan-200 shadow-lg shadow-slate-900/15 group-hover:bg-brand-blue group-hover:text-white"
            : "bg-blue-50 text-brand-blue group-hover:bg-brand-blue group-hover:text-white"
        }`}
      >
        <Icon className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden="true" />
      </div>
      {featured ? (
        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-slate-400">
          Featured capability
        </p>
      ) : null}
      <h3 className="text-[1.5rem] font-extrabold leading-tight text-brand-navy">{service.title}</h3>
      <p className="mt-5 text-[1.12rem] leading-9 text-slate-600">{service.description}</p>
      {detailed ? (
        <ul className="mt-7 space-y-3.5">
          {service.capabilities.map((capability) => (
            <li key={capability} className="flex gap-3 text-[1.02rem] leading-8 text-slate-600">
              <span className="mt-3 h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden="true" />
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
