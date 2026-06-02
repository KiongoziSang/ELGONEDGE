import type { ServiceProvider } from "../types";

export const serviceProviders: ServiceProvider[] = [
  {
    id: "svc-gas",
    name: "Maua Gas Refill",
    category: "Gas refill",
    phone: "+254 711 220 330",
    description: "Approved LPG refill provider for doorstep delivery.",
    status: "Approved"
  },
  {
    id: "svc-water",
    name: "Blue Ridge Drinking Water",
    category: "Drinking water",
    phone: "+254 733 440 550",
    description: "Water refill and dispenser bottle delivery.",
    status: "Approved"
  },
  {
    id: "svc-cleaning",
    name: "Safisha Homes",
    category: "Cleaning",
    phone: "+254 722 660 770",
    description: "Move-in, move-out, and weekly apartment cleaning.",
    status: "Approved"
  }
];
