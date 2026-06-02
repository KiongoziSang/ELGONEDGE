import type { Invoice, PaymentMethod, Receipt } from "../types";

export const paymentMethods: PaymentMethod[] = [
  "M-PESA PayBill",
  "Bank PayBill",
  "Till",
  "Bank Transfer",
  "Card"
];

export const invoices: Invoice[] = [
  {
    id: "invoice-jun-2026",
    title: "June 2026 Rent",
    invoiceNumber: "INV-2026-0001",
    date: "2026-06-01",
    dueDate: "2026-06-05",
    amount: 18500,
    status: "Due"
  },
  {
    id: "invoice-may-2026",
    title: "May 2026 Rent",
    invoiceNumber: "INV-2026-0000",
    date: "2026-05-01",
    dueDate: "2026-05-05",
    amount: 18500,
    status: "Paid"
  }
];

export const receipts: Receipt[] = [
  {
    id: "receipt-may-2026",
    title: "May rent receipt",
    receiptNumber: "RCT-2026-0214",
    date: "2026-05-04",
    amount: 18500,
    status: "Confirmed"
  },
  {
    id: "receipt-water-2026",
    title: "Water deposit receipt",
    receiptNumber: "RCT-2026-0198",
    date: "2026-04-18",
    amount: 2500,
    status: "Confirmed"
  }
];

export const paymentInstructions = {
  businessNumber: "123456",
  accountReference: "B204-JUN2026",
  bankName: "Elgon Partner Bank",
  bankAccount: "000123456789",
  tillNumber: "654321",
  cardProvider: "Stripe or Flutterwave checkout link pending"
};
