import { exchangeListings } from "../../mocks/exchange";
import type { ExchangeListing } from "../../types";
import { apiRequest, isEndpointUnavailableError, isMockMode, mockDelay } from "./client";

type ExchangeListingResponse = Partial<ExchangeListing> & {
  photoUrl?: unknown;
  thumbnailUrl?: unknown;
  image?: {
    url?: unknown;
  };
  images?: unknown[];
};

type ExchangeListResponse = {
  items?: ExchangeListingResponse[];
  listings?: ExchangeListingResponse[];
  data?: ExchangeListingResponse[] | { items?: ExchangeListingResponse[]; listings?: ExchangeListingResponse[] };
  results?: ExchangeListingResponse[];
};

export async function getExchangeListings(): Promise<ExchangeListing[]> {
  if (!isMockMode()) {
    const [marketplaceResult, tenantResult] = await Promise.allSettled([
      apiRequest<ExchangeListResponse | ExchangeListingResponse[]>("/api/mobile/exchange/listings"),
      apiRequest<ExchangeListResponse | ExchangeListingResponse[]>("/api/mobile/tenant/exchange")
    ]);

    const marketplaceItems = marketplaceResult.status === "fulfilled" ? readExchangeItems(marketplaceResult.value) : [];
    const tenantItems = tenantResult.status === "fulfilled" ? readExchangeItems(tenantResult.value) : [];
    const listings = dedupeListings([...marketplaceItems, ...tenantItems].map(mapExchangeListing));

    if (!listings.length && marketplaceResult.status === "rejected" && tenantResult.status === "rejected") {
      throw marketplaceResult.reason instanceof Error ? marketplaceResult.reason : new Error("Unable to load exchange listings.");
    }

    return listings;
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
  imageUrl?: string;
}): Promise<ExchangeListing> {
  if (!isMockMode()) {
    const response = await postExchangeListing(input);
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
    imageUrl: input.imageUrl,
    status: "Pending review"
  };
}

async function postExchangeListing(input: {
  title: string;
  category: ExchangeListing["category"];
  price: number;
  description: string;
  contactMethod: string;
  imageUrl?: string;
}) {
  try {
    return await apiRequest<ExchangeListingResponse>("/api/mobile/exchange/listings", {
      method: "POST",
      body: input
    });
  } catch (error) {
    if (!isEndpointUnavailableError(error)) {
      throw error;
    }

    return apiRequest<ExchangeListingResponse>("/api/mobile/tenant/exchange", {
      method: "POST",
      body: input
    });
  }
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

function readExchangeItems(response: ExchangeListResponse | ExchangeListingResponse[] | undefined) {
  if (Array.isArray(response)) {
    return response;
  }

  if (!response) {
    return [];
  }

  if (Array.isArray(response.items)) {
    return response.items;
  }

  if (Array.isArray(response.listings)) {
    return response.listings;
  }

  if (Array.isArray(response.results)) {
    return response.results;
  }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (response.data && typeof response.data === "object") {
    if (Array.isArray(response.data.items)) {
      return response.data.items;
    }

    if (Array.isArray(response.data.listings)) {
      return response.data.listings;
    }
  }

  return [];
}

function dedupeListings(listings: ExchangeListing[]) {
  const seen = new Set<string>();
  return listings.filter((listing) => {
    if (seen.has(listing.id)) {
      return false;
    }

    seen.add(listing.id);
    return true;
  });
}

function mapExchangeListing(item: ExchangeListingResponse, index: number): ExchangeListing {
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
    imageUrl: readImageUrl(item),
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

function readImageUrl(item: ExchangeListingResponse) {
  const directUrl = readString(item.imageUrl) ?? readString(item.photoUrl) ?? readString(item.thumbnailUrl);

  if (directUrl) {
    return directUrl;
  }

  if (item.image && typeof item.image === "object") {
    return readString(item.image.url);
  }

  const firstImage = Array.isArray(item.images) ? item.images[0] : undefined;
  if (typeof firstImage === "string") {
    return readString(firstImage);
  }

  if (firstImage && typeof firstImage === "object" && "url" in firstImage) {
    return readString((firstImage as { url?: unknown }).url);
  }

  return undefined;
}
