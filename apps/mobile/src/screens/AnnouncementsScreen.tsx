import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppCard } from "../components/AppCard";
import { BadgeRow } from "../components/BadgeRow";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { Screen } from "../components/Screen";
import { useApiData } from "../hooks/useApiData";
import { getAnnouncements, markAnnouncementRead } from "../services/api/announcements";
import { colors } from "../theme";
import type { Announcement } from "../types";
import { isRecentlyAdded } from "../utils/badges";
import { formatDate } from "../utils/format";

export function AnnouncementsScreen() {
  const announcements = useApiData<Announcement[]>(getAnnouncements, []);
  const [items, setItems] = useState<Announcement[]>([]);
  const propertyName = items.find((announcement) => announcement.propertyName)?.propertyName;

  useEffect(() => {
    setItems(announcements.data);
  }, [announcements.data]);

  async function markRead(announcement: Announcement) {
    if (announcement.read) {
      return;
    }

    setItems((current) => current.map((item) => (item.id === announcement.id ? { ...item, read: true } : item)));
    try {
      await markAnnouncementRead(announcement);
    } catch {
      setItems((current) => current.map((item) => (item.id === announcement.id ? { ...item, read: false } : item)));
    }
  }

  return (
    <Screen
      title="Announcements"
      subtitle={propertyName ? `Official property communication for ${propertyName}.` : "Official property communication."}
    >
      {announcements.loading ? <LoadingState label="Loading announcements..." /> : null}
      {announcements.error ? (
        <EmptyState
          title="Unable to load announcements"
          text={announcements.error}
          actionLabel="Retry"
          onAction={() => void announcements.reload()}
        />
      ) : null}
      {!announcements.loading && !announcements.error && items.length === 0 ? (
        <EmptyState title="No announcements available" text="Official property notices will appear here." />
      ) : !announcements.loading && !announcements.error ? (
        <View style={styles.stack}>
          {items.map((announcement) => (
            <Pressable key={`${announcement.source ?? "notification"}-${announcement.id}`} onPress={() => void markRead(announcement)}>
              <AppCard>
                <View style={styles.row}>
                  <View style={styles.copy}>
                    <Text style={styles.title}>{announcement.title}</Text>
                    <Text style={styles.meta}>{formatAnnouncementMeta(announcement)}</Text>
                    <Text style={styles.message}>{announcement.message}</Text>
                  </View>
                  <BadgeRow labels={[isRecentlyAdded(announcement.date) && "NEW", announcement.read ? "Read" : "Unread"]} />
                </View>
              </AppCard>
            </Pressable>
          ))}
        </View>
      ) : null}
    </Screen>
  );
}

function formatAnnouncementMeta(announcement: Announcement) {
  return [announcement.propertyName, announcement.date ? formatDate(announcement.date) : "Date not shared"]
    .filter(Boolean)
    .join(" · ");
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
