export function formatKes(amount: number) {
  return `KES ${amount.toLocaleString("en-KE")}`;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
