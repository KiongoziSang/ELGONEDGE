export type JsonPrimitive = string | number | boolean | null;

export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export type ApiError = {
  code: string;
  message: string;
  status?: number;
  details?: JsonValue;
};

export type Session = {
  token: string;
  userId: string;
  refreshToken?: string;
  expiresAt?: string;
  tenant?: {
    id: string;
    fullName: string;
    phone?: string;
    email?: string;
  };
};

export type AuthSession = Session;

export type AuthLoginRequest = {
  identifier: string;
  password: string;
};

export type AuthLoginResponse = {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  expiresAt?: string;
  user?: {
    id: string;
    name?: string;
    email: string;
    role: string;
    tenantId?: string;
    propertyId?: string;
    unitId?: string;
  };
  tenant: {
    id: string;
    fullName: string;
    phone?: string;
    email?: string;
  };
};

export type TenantProfile = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  propertyId?: string;
  propertyName: string;
  unitId?: string;
  unitNumber: string;
  leaseId?: string;
  leaseStartDate: string;
  leaseEndDate: string;
  leaseStatus: "Active" | "Expiring" | "Ended";
  emergencyContact: string;
};

export type LeaseDetails = {
  id: string;
  propertyName: string;
  unitNumber: string;
  startDate: string;
  endDate: string;
  rentAmount?: number;
  depositAmount?: number;
  status: TenantProfile["leaseStatus"];
};

export type PaymentMethod = "M-PESA PayBill" | "Bank PayBill" | "Till" | "Bank Transfer" | "Card";

export type Invoice = {
  id: string;
  title: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "Due" | "Paid" | "Overdue";
};

export type Receipt = {
  id: string;
  title: string;
  receiptNumber: string;
  date: string;
  amount: number;
  status: "Confirmed" | "Pending";
};

export type TenantDocument = {
  id: string;
  title: string;
  type: "Lease agreement" | "Rent invoice" | "Payment receipt" | "Notice" | "Access card";
  date: string;
  status: "Available" | "Pending" | "Archived";
  amount?: number;
};

export type MaintenanceRequest = {
  id: string;
  title: string;
  category: MaintenanceCategory;
  description: string;
  priority: Priority;
  date: string;
  status: "Submitted" | "In review" | "Assigned" | "Closed";
};

export type MaintenanceCategory =
  | "Plumbing"
  | "Electrical"
  | "Security"
  | "Cleaning"
  | "Internet"
  | "Access / Gate"
  | "Other";

export type Priority = "Low" | "Medium" | "High";

export type Announcement = {
  id: string;
  title: string;
  propertyName: string;
  date: string;
  message: string;
  read: boolean;
};

export type CommunityPost = {
  id: string;
  title: string;
  type: "Public resident post" | "Private grievance" | "Official notice" | "Pinned update";
  date: string;
  status: "Pending review" | "Approved" | "Closed" | "Private";
  message: string;
};

export type ServiceProvider = {
  id: string;
  name: string;
  category: ServiceCategory;
  phone: string;
  description: string;
  status: "Approved";
};

export type ServiceCategory =
  | "Gas refill"
  | "Drinking water"
  | "Cleaning"
  | "Plumbing"
  | "Electrical"
  | "Internet installation"
  | "Movers"
  | "Carpentry"
  | "Tailoring"
  | "Other";

export type ExchangeListing = {
  id: string;
  title: string;
  category: "Furniture" | "Electronics" | "Household items" | "Moving sale" | "Services" | "Other";
  price: number;
  description: string;
  contactMethod: string;
  status: "Pending review" | "Approved" | "Sold/Closed";
};

export type AccessInfo = {
  accessCardStatus: string;
  unitAccessInfo: string;
  visitorPreRegistration: string;
  gatePassStatus: string;
};

export type DashboardSummary = {
  tenantName?: string;
  propertyName?: string;
  unitNumber?: string;
  rentBalance: number;
  currency?: string;
  nextDueDate: string;
  paymentStatus: string;
  leaseStatus: string;
  recentAnnouncement: Announcement;
  recentMaintenance: MaintenanceRequest;
};

export type AppTab = "home" | "payments" | "maintenance" | "community" | "profile";

export type ScreenName =
  | AppTab
  | "documents"
  | "receipts"
  | "announcements"
  | "services"
  | "exchange"
  | "access";

export type LoadingState<T> = {
  data: T;
  loading: boolean;
  error: string | null;
};
