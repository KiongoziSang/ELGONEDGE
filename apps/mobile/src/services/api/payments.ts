import { invoices, paymentInstructions, paymentMethods, receipts } from "../../mocks/payments";
import { mockDelay } from "./client";

export async function getInvoices() {
  await mockDelay();
  return invoices;
}

export async function getReceipts() {
  await mockDelay();
  return receipts;
}

export async function getPaymentInstructions() {
  await mockDelay();
  return { paymentMethods, paymentInstructions };
}
