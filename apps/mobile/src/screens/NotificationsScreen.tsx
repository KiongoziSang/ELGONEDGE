import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppCard } from "../components/AppCard";
import { BadgeRow } from "../components/BadgeRow";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { Screen } from "../components/Screen";
import { useApiData } from "../hooks/useApiData";
import { getNotifications, markNotificationRead } from "../services/api/notifications";
import { colors } from "../theme";
import type { AppNotification } from "../types";
import { isRecentlyAdded } from "../utils/badges";
import { formatDate } from "../utils/format";

export function NotificationsScreen() {
  const loaded = useApiData<AppNotification[]>(getNotifications, []);
  const [items, setItems] = useState<AppNotification[]>([]);

  useEffect(() => {
    setItems(loaded.data);
  }, [loaded.data]);

  async function markRead(item: AppNotification) {
    if (item.read) {
      return;
    }

    setItems((current) => current.map((next) => (next.id === item.id ? { ...next, read: true } : next)));
    try {
      await markNotificationRead(item);
    } catch {
      setItems((current) => current.map((next) => (next.id === item.id ? { ...next, read: false } : next)));
    }
  }

  const unreadCount = items.filter((item) => !item.read).length;

  return (
    <Screen
      title="Notifications"
      subtitle={unreadCount ? `${unreadCount} unread update${unreadCount === 1 ? "" : "s"}.` : "All updates are read."}
    >
      {loaded.loading ? <LoadingState label="Loading notifications..." /> : null}
      {loaded.error ? (
        <EmptyState
          title="Unable to load notifications"
          text={loaded.error}
          actionLabel="Retry"
          onAction={() => void loaded.reload()}
        />
      ) : null}
      {!loaded.loading && !loaded.error && items.length === 0 ? (
        <EmptyState title="No notifications yet" text="Important notices, community updates, and service alerts will appear here." />
      ) : !loaded.loading && !loaded.error ? (
        <View style={styles.stack}>
          {items.map((item) => (
            <Pressable key={`${item.source ?? "notification"}-${item.id}`} onPress={() => void markRead(item)}>
              <AppCard>
                <View style={styles.row}>
                  <View style={styles.copy}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.meta}>{formatNotificationMeta(item)}</Text>
                    <Text style={styles.message}>{item.message}</Text>
                  </View>
                  <BadgeRow labels={[isRecentlyAdded(item.date) && "NEW", item.read ? "Read" : "Unread"]} />
                </View>
              </AppCard>
            </Pressable>
          ))}
        </View>
      ) : null}
    </Screen>
  );
}

function formatNotificationMeta(item: AppNotification) {
  return [item.type, item.date ? formatDate(item.date) : "Date not shared"].filter(Boolean).join(" · ");
}

const styles = StyleSheet.create({
  stack: {
    gap: 10
  },
  row: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  copy: {
    flex: 1
  },
  title: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "900"
  },
  meta: {
    color: colors.slate,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 5
  },
  message: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8
  }
});
