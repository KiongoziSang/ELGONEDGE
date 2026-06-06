import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function StatusBadge({ label }: { label: string }) {
  const tone = getTone(label);

  return (
    <View style={[styles.badge, styles[tone]]}>
      <Text style={[styles.text, styles[`${tone}Text`]]}>{label}</Text>
    </View>
  );
}

function getTone(label: string) {
  const normalized = label.trim().toLowerCase();

  if (["new", "new!", "unread"].includes(normalized)) {
    return "info";
  }

  if (
    normalized.includes("overdue") ||
    normalized.includes("high") ||
    normalized.includes("urgent") ||
    normalized.includes("failed") ||
    normalized.includes("denied")
  ) {
    return "danger";
  }

  if (
    normalized.includes("pending") ||
    normalized.includes("due") ||
    normalized.includes("review") ||
    normalized.includes("submitted") ||
    normalized.includes("private")
  ) {
    return "warning";
  }

  if (
    normalized.includes("approved") ||
    normalized.includes("active") ||
    normalized.includes("paid") ||
    normalized.includes("confirmed") ||
    normalized.includes("read") ||
    normalized.includes("closed")
  ) {
    return "success";
  }

  return "neutral";
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 9,
    paddingVertical: 5
  },
  text: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.2,
    textTransform: "uppercase"
  },
  success: {
    backgroundColor: colors.successSoft,
    borderColor: "#BBF7D0"
  },
  warning: {
    backgroundColor: colors.warningSoft,
    borderColor: "#FDE68A"
  },
  danger: {
    backgroundColor: colors.dangerSoft,
    borderColor: "#FECACA"
  },
  info: {
    backgroundColor: colors.infoSoft,
    borderColor: "#A5F3FC"
  },
  neutral: {
    backgroundColor: colors.softGrey,
    borderColor: colors.line
  },
  successText: {
    color: colors.success
  },
  warningText: {
    color: colors.warning
  },
  dangerText: {
    color: colors.danger
  },
  infoText: {
    color: colors.blue
  },
  neutralText: {
    color: colors.slate
  }
});
