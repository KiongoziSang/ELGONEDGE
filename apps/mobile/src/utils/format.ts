export function formatKes(amount: number) {
  return `KES ${amount.toLocaleString("en-KE")}`;
}

export function formatDate(value: string) {
  if (!value) {
    return "Not scheduled";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not scheduled";
  }

  return new Intl.DateTimeFormat("en-KE", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}
