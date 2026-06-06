import type { ExchangeListing } from "../types";

export const exchangeListings: ExchangeListing[] = [
  {
    id: "ex-sofa",
    title: "Three-seater sofa",
    category: "Furniture",
    price: 12500,
    description: "Clean grey sofa, used for one year. Pickup from Block B.",
    contactMethod: "Call or WhatsApp seller",
    date: "2026-06-04",
    status: "Approved"
  },
  {
    id: "ex-fridge",
    title: "Samsung fridge",
    category: "Electronics",
    price: 28000,
    description: "Medium fridge in good condition. Seller moving out this month.",
    contactMethod: "WhatsApp seller",
    date: "2026-06-01",
    status: "Approved"
  },
  {
    id: "ex-table",
    title: "Dining table listing",
    category: "Moving sale",
    price: 9000,
    description: "Submitted for review before residents can see it.",
    contactMethod: "Hidden until approved",
    date: "2026-06-06",
    status: "Pending review"
  }
];
