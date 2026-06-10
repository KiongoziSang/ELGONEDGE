import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "../theme";
import { BrandMark } from "./BrandMark";
import { NotificationBell } from "./NotificationBell";
import { ProfileAvatar } from "./ProfileAvatar";

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 18 }]}>
      <View style={styles.topRow}>
        <BrandMark size="medium" light />
        <View style={styles.actions}>
          <ProfileAvatar />
          <NotificationBell />
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.navy,
    paddingBottom: 18,
    paddingHorizontal: spacing.screen
  },
  topRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  actions: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 34,
    marginTop: 16
  },
  subtitle: {
    color: "#C8D5E2",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8
  }
});
