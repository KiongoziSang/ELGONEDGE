import { Pressable, StyleSheet, Text, View } from "react-native";
import { getNotifications } from "../services/api/notifications";
import { colors } from "../theme";
import { useApiData } from "../hooks/useApiData";
import { useAppNavigation } from "../context/NavigationContext";

export function NotificationBell() {
  const { navigate } = useAppNavigation();
  const notifications = useApiData(getNotifications, []);
  const unreadCount = notifications.data.filter((item) => !item.read).length;
  const hasUnread = unreadCount > 0;

  return (
    <Pressable
      accessibilityLabel="Open notifications"
      onPress={() => navigate("notifications")}
      style={({ pressed }) => [styles.button, hasUnread && styles.buttonUnread, pressed && styles.pressed]}
    >
      <View style={[styles.bell, hasUnread && styles.bellUnread]}>
        <View style={styles.bellDome} />
        <View style={styles.bellBody} />
        <View style={styles.bellClapper} />
      </View>
      {hasUnread ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unreadCount > 9 ? "9+" : unreadCount}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.16)",
    borderRadius: 18,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: 44
  },
  buttonUnread: {
    backgroundColor: "rgba(0,200,255,0.14)",
    borderColor: "rgba(0,200,255,0.35)"
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }]
  },
  bell: {
    alignItems: "center",
    height: 24,
    justifyContent: "center",
    width: 24
  },
  bellUnread: {
    transform: [{ rotate: "-4deg" }]
  },
  bellDome: {
    borderColor: "#D8ECF8",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderTopWidth: 2.4,
    height: 9,
    width: 17
  },
  bellBody: {
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderColor: "#D8ECF8",
    borderLeftWidth: 2.4,
    borderRightWidth: 2.4,
    borderTopWidth: 2.4,
    height: 11,
    marginTop: -2,
    width: 20
  },
  bellClapper: {
    backgroundColor: "#D8ECF8",
    borderRadius: 999,
    height: 4,
    marginTop: 1,
    width: 4
  },
  badge: {
    alignItems: "center",
    backgroundColor: colors.cyan,
    borderColor: colors.navy,
    borderRadius: 999,
    borderWidth: 2,
    height: 19,
    justifyContent: "center",
    minWidth: 19,
    paddingHorizontal: 4,
    position: "absolute",
    right: -4,
    top: -5
  },
  badgeText: {
    color: colors.navy,
    fontSize: 9,
    fontWeight: "900"
  }
});
