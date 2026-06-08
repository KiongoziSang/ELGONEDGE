import { serviceProviders } from "../../mocks/services";
import type { ServiceCategory, ServiceProvider } from "../../types";
import { apiRequest, isMockMode, mockDelay } from "./client";

export async function getServiceProviders() {
  if (!isMockMode()) {
    const response = await apiRequest<{ items?: Partial<ServiceProvider>[] }>("/api/mobile/tenant/services");
    return Array.isArray(response.items) ? response.items.map(mapServiceProvider).filter(isServiceProvider) : [];
  }

  await mockDelay();
  return serviceProviders;
}

function isServiceProvider(item: ServiceProvider | null): item is ServiceProvider {
  return item !== null;
}

const serviceCategories: ServiceCategory[] = [
  "Gas refill",
  "Drinking water",
  "Cleaning",
  "Plumbing",
  "Electrical",
  "Internet installation",
  "Movers",
  "Carpentry",
  "Tailoring",
  "Other"
];

function mapServiceProvider(item: Partial<ServiceProvider>, index: number): ServiceProvider | null {
  const name = readString(item.name);

  if (!name) {
    return null;
  }

  return {
    id: readString(item.id) ?? `service-${index}`,
    name,
    category: serviceCategories.includes(item.category as ServiceCategory) ? (item.category as ServiceCategory) : "Other",
    phone: readString(item.phone) ?? "",
    description: readString(item.description) ?? "Approved resident service provider.",
    date: readString(item.date),
    status: "Approved"
  };
}

function readString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
