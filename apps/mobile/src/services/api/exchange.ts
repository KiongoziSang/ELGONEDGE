import { exchangeListings } from "../../mocks/exchange";
import type { ExchangeListing } from "../../types";
import { apiRequest, isMockMode, mockDelay } from "./client";

export async function getExchangeListings() {
  if (!isMockMode()) {
    const response = await apiRequest<{ items?: Partial<ExchangeListing>[] }>("/api/mobile/tenant/exchange");
    return Array.isArray(response.items) ? response.items.map(mapExchangeListing).filter(isExchangeListing) : [];
  }

  await mockDelay();
  return exchangeListings;
}

export async function createExchangeListing(input: {
  title: string;
  category: ExchangeListing["category"];
  price: number;
  description: string;
  contactMethod: string;
}): Promise<ExchangeListing> {
  if (!isMockMode()) {
    const response = await apiRequest<Partial<ExchangeListing>>("/api/mobile/tenant/exchange", {
      method: "POST",
      body: input
    });
    return mapExchangeListing(response, Date.now());
  }

  await mockDelay();

  return {
    id: `exchange-${Date.now()}`,
    title: input.title,
    category: input.category,
    price: input.price,
    description: input.description,
    contactMethod: input.contactMethod,
    status: "Pending review"
  };
}

const exchangeCategories: ExchangeListing["category"][] = [
  "Furniture",
  "Electronics",
  "Household items",
  "Moving sale",
  "Services",
  "Other"
];

const exchangeStatuses: ExchangeListing["status"][] = ["Pending review", "Approved", "Sold/Closed"];

function mapExchangeListing(item: Partial<ExchangeListing>, index: number): ExchangeListing {
  return {
    id: readString(item.id) ?? `exchange-${index}`,
    title: readString(item.title) ?? "Resident listing",
    category: exchangeCategories.includes(item.category as ExchangeListing["category"])
      ? (item.category as ExchangeListing["category"])
      : "Other",
    price: readNumber(item.price, 0),
    description: readString(item.description) ?? "Details will be shared by the resident or property team.",
    contactMethod: readString(item.contactMethod) ?? "Contact through management",
    date: readString(item.date),
    status: exchangeStatuses.includes(item.status as ExchangeListing["status"])
      ? (item.status as ExchangeListing["status"])
      : "Pending review"
  };
}

function isExchangeListing(item: ExchangeListing): item is ExchangeListing {
  return Boolean(item.id && item.title);
}

function readString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function readNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
