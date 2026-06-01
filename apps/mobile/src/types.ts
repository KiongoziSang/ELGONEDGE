export type UserRole = "tenant" | "guard" | "manager";

export type QuickAction = {
  id: string;
  title: string;
  detail: string;
  tone: "blue" | "teal" | "amber";
};

export type WorkItem = {
  id: string;
  title: string;
  meta: string;
  status: string;
};

export type Metric = {
  label: string;
  value: string;
  detail: string;
};
