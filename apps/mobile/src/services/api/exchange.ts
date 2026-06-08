import { exchangeListings } from "../../mocks/exchange";
import type { ExchangeListing } from "../../types";
import { apiMultipartRequest, apiRequest, getApiBaseUrl, isEndpointUnavailableError, isMockMode, mockDelay } from "./client";

type ExchangeListingResponse = Partial<ExchangeListing> & {
  photoUrl?: unknown;
  phone?: unknown;
  whatsapp?: unknown;
  whatsappPhone?: unknown;
  sellerPhone?: unknown;
  sellerWhatsapp?: unknown;
  contactPhone?: unknown;
  contactWhatsapp?: unknown;
  thumbnailUrl?: unknown;
  coverImageUrl?: unknown;
  coverPhotoUrl?: unknown;
  mediaUrl?: unknown;
  fileUrl?: unknown;
  url?: unknown;
  imagePath?: unknown;
  photoPath?: unknown;
  attachmentUrl?: unknown;
  image?: {
    url?: unknown;
    src?: unknown;
    path?: unknown;
  };
  photo?: {
    url?: unknown;
    src?: unknown;
    path?: unknown;
  };
  coverImage?: {
    url?: unknown;
    src?: unknown;
    path?: unknown;
  };
  primaryImage?: {
    url?: unknown;
    src?: unknown;
    path?: unknown;
  };
  images?: unknown[];
  photos?: unknown[];
  media?: unknown[];
  attachments?: unknown[];
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
  phone?: string;
  whatsapp?: string;
  imageUrl?: string;
  imageFile?: {
    uri: string;
    name: string;
    type: string;
  };
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
    phone: input.phone,
    whatsapp: input.whatsapp,
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
  phone?: string;
  whatsapp?: string;
  imageUrl?: string;
  imageFile?: {
    uri: string;
    name: string;
    type: string;
  };
}) {
  try {
    if (input.imageFile) {
      return await apiMultipartRequest<ExchangeListingResponse>("/api/mobile/exchange/listings", {
        body: createExchangeFormData(input)
      });
    }

    return await apiRequest<ExchangeListingResponse>("/api/mobile/exchange/listings", {
      method: "POST",
      body: createExchangeJsonBody(input)
    });
  } catch (error) {
    if (!isEndpointUnavailableError(error)) {
      throw error;
    }

    if (input.imageFile) {
      return apiMultipartRequest<ExchangeListingResponse>("/api/mobile/tenant/exchange", {
        body: createExchangeFormData(input)
      });
    }

    return apiRequest<ExchangeListingResponse>("/api/mobile/tenant/exchange", {
      method: "POST",
      body: createExchangeJsonBody(input)
    });
  }
}

function createExchangeJsonBody(input: {
  title: string;
  category: ExchangeListing["category"];
  price: number;
  description: string;
  contactMethod: string;
  phone?: string;
  whatsapp?: string;
  imageUrl?: string;
}) {
  const body: { [key: string]: string | number } = {
    title: input.title,
    category: input.category,
    price: input.price,
    description: input.description,
    contactMethod: input.contactMethod
  };

  if (input.phone) {
    body.phone = input.phone;
    body.contactPhone = input.phone;
  }

  if (input.whatsapp) {
    body.whatsapp = input.whatsapp;
    body.contactWhatsapp = input.whatsapp;
  }

  if (input.imageUrl) {
    body.imageUrl = input.imageUrl;
  }

  return body;
}

function createExchangeFormData(input: {
  title: string;
  category: ExchangeListing["category"];
  price: number;
  description: string;
  contactMethod: string;
  phone?: string;
  whatsapp?: string;
  imageUrl?: string;
  imageFile?: {
    uri: string;
    name: string;
    type: string;
  };
}) {
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("category", input.category);
  formData.append("price", String(input.price));
  formData.append("description", input.description);
  formData.append("contactMethod", input.contactMethod);

  if (input.phone) {
    formData.append("phone", input.phone);
    formData.append("contactPhone", input.phone);
  }

  if (input.whatsapp) {
    formData.append("whatsapp", input.whatsapp);
    formData.append("contactWhatsapp", input.whatsapp);
  }

  if (input.imageUrl) {
    formData.append("imageUrl", input.imageUrl);
  }

  if (input.imageFile) {
    formData.append("photo", input.imageFile as unknown as Blob);
    formData.append("image", input.imageFile as unknown as Blob);
  }

  return formData;
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
    phone: readContactPhone(item),
    whatsapp: readContactWhatsapp(item),
    date: readString(item.date),
    imageUrl: readImageUrl(item),
    status: exchangeStatuses.includes(item.status as ExchangeListing["status"])
      ? (item.status as ExchangeListing["status"])
      : "Pending review"
  };
}

function readContactPhone(item: ExchangeListingResponse) {
  return (
    readString(item.phone) ??
    readString(item.sellerPhone) ??
    readString(item.contactPhone) ??
    readPhoneFromText(readString(item.contactMethod))
  );
}

function readContactWhatsapp(item: ExchangeListingResponse) {
  return (
    readString(item.whatsapp) ??
    readString(item.whatsappPhone) ??
    readString(item.sellerWhatsapp) ??
    readString(item.contactWhatsapp) ??
    readContactPhone(item)
  );
}

function readPhoneFromText(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const match = value.match(/(?:\+?\d[\d\s().-]{6,}\d)/);
  return match ? match[0].trim() : undefined;
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
  const directUrl =
    readString(item.imageUrl) ??
    readString(item.photoUrl) ??
    readString(item.thumbnailUrl) ??
    readString(item.coverImageUrl) ??
    readString(item.coverPhotoUrl) ??
    readString(item.mediaUrl) ??
    readString(item.fileUrl) ??
    readString(item.attachmentUrl) ??
    readString(item.imagePath) ??
    readString(item.photoPath);

  if (directUrl) {
    return toAbsoluteImageUrl(directUrl);
  }

  const nestedUrl =
    readNestedImageUrl(item.image) ??
    readNestedImageUrl(item.photo) ??
    readNestedImageUrl(item.coverImage) ??
    readNestedImageUrl(item.primaryImage);

  if (nestedUrl) {
    return toAbsoluteImageUrl(nestedUrl);
  }

  const listUrl =
    readFirstImageUrl(item.images) ??
    readFirstImageUrl(item.photos) ??
    readFirstImageUrl(item.media) ??
    readFirstImageUrl(item.attachments);

  if (listUrl) {
    return toAbsoluteImageUrl(listUrl);
  }

  const url = readString(item.url);
  if (url && looksLikeImageUrl(url)) {
    return toAbsoluteImageUrl(url);
  }

  return undefined;
}

function readNestedImageUrl(value: unknown) {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const candidate = value as { url?: unknown; src?: unknown; path?: unknown; fileUrl?: unknown; publicUrl?: unknown };
  return (
    readString(candidate.url) ??
    readString(candidate.src) ??
    readString(candidate.path) ??
    readString(candidate.fileUrl) ??
    readString(candidate.publicUrl)
  );
}

function readFirstImageUrl(value: unknown[] | undefined) {
  const firstImage = Array.isArray(value) ? value[0] : undefined;

  if (typeof firstImage === "string") {
    return readString(firstImage);
  }

  return readNestedImageUrl(firstImage);
}

function toAbsoluteImageUrl(value: string) {
  if (/^https?:\/\//i.test(value) || value.startsWith("data:")) {
    return value;
  }

  if (value.startsWith("//")) {
    return `https:${value}`;
  }

  const baseUrl = getApiBaseUrl().replace(/\/+$/, "");
  const path = value.startsWith("/") ? value : `/${value}`;
  return `${baseUrl}${path}`;
}

function looksLikeImageUrl(value: string) {
  return /\.(avif|gif|jpe?g|png|webp)(\?|#|$)/i.test(value) || value.includes("/uploads/") || value.includes("/images/");
}
