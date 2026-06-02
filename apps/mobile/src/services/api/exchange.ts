import { exchangeListings } from "../../mocks/exchange";
import type { ExchangeListing } from "../../types";
import { mockDelay } from "./client";

export async function getExchangeListings() {
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
