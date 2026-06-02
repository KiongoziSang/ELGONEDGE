import { StyleSheet, Text, View } from "react-native";
import { AppCard } from "../components/AppCard";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { Screen } from "../components/Screen";
import { StatusBadge } from "../components/StatusBadge";
import { useApiData } from "../hooks/useApiData";
import { getAnnouncements } from "../services/api/announcements";
import { colors } from "../theme";
import type { Announcement } from "../types";
import { formatDate } from "../utils/format";

export function AnnouncementsScreen() {
  const announcements = useApiData<Announcement[]>(getAnnouncements, []);

  return (
    <Screen title="Announcements" subtitle="Official property communication from management.">
      {announcements.loading ? <LoadingState label="Loading announcements..." /> : null}
      {announcements.error ? <EmptyState title="Unable to load announcements" text={announcements.error} /> : null}
      {!announcements.loading && announcements.data.length === 0 ? (
        <EmptyState title="No announcements available" text="Official property notices will appear here." />
      ) : (
        <View style={styles.stack}>
          {announcements.data.map((announcement) => (
            <AppCard key={announcement.id}>
              <View style={styles.row}>
                <View style={styles.copy}>
                  <Text style={styles.title}>{announcement.title}</Text>
                  <Text style={styles.meta}>{announcement.propertyName} · {formatDate(announcement.date)}</Text>
                  <Text style={styles.message}>{announcement.message}</Text>
                </View>
                <StatusBadge label={announcement.read ? "Read" : "Unread"} />
              </View>
            </AppCard>
          ))}
        </View>
      )}
    </Screen>
  );
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
