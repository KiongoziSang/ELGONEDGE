import { invoices, paymentInstructions, paymentMethods, receipts } from "../../mocks/payments";
import type { Invoice, Receipt } from "../../types";
import { apiRequest, isMockMode, mockDelay } from "./client";

export async function getInvoices() {
  if (!isMockMode()) {
    const response = await apiRequest<PaymentsResponse>("/api/mobile/tenant/payments");
    return response.invoices ?? [];
  }

  await mockDelay();
  return invoices;
}

export async function getReceipts() {
  if (!isMockMode()) {
    const response = await apiRequest<PaymentsResponse>("/api/mobile/tenant/payments");
    return response.receipts ?? [];
  }

  await mockDelay();
  return receipts;
}

export async function getPaymentInstructions() {
  if (!isMockMode()) {
    const response = await apiRequest<PaymentsResponse>("/api/mobile/tenant/payments");
    return {
      paymentMethods: response.paymentMethods ?? [],
      paymentInstructions: response.paymentInstructions ?? paymentInstructions
    };
  }

  await mockDelay();
  return { paymentMethods, paymentInstructions };
}

type PaymentsResponse = {
  invoices?: Invoice[];
  receipts?: Receipt[];
  paymentMethods?: string[];
  paymentInstructions?: typeof paymentInstructions;
};
