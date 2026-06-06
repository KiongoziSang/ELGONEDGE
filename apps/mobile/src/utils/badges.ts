const recentWindowMs = 7 * 24 * 60 * 60 * 1000;

export function isRecentlyAdded(value: string | undefined | null) {
  if (!value) {
    return false;
  }

  const timestamp = new Date(value).getTime();
  if (!Number.isFinite(timestamp)) {
    return false;
  }

  return Date.now() - timestamp <= recentWindowMs;
}
