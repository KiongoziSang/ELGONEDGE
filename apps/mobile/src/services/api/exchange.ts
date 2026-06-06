import { exchangeListings } from "../../mocks/exchange";
import type { ExchangeListing } from "../../types";
import { apiRequest, isMockMode, mockDelay } from "./client";

export async function getExchangeListings() {
  if (!isMockMode()) {
    const response = await apiRequest<{ items?: ExchangeListing[] }>("/api/mobile/tenant/exchange");
    return response.items ?? [];
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
    return apiRequest<ExchangeListing>("/api/mobile/tenant/exchange", {
      method: "POST",
      body: input
    });
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
