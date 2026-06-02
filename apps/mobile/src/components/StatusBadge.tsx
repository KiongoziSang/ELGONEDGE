import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function StatusBadge({ label }: { label: string }) {
  const tone =
    label.includes("Overdue") || label.includes("High") || label.includes("Urgent")
      ? "danger"
      : label.includes("Pending") || label.includes("Due") || label.includes("review")
        ? "warning"
        : "success";

  return (
    <View style={[styles.badge, styles[tone]]}>
      <Text style={[styles.text, styles[`${tone}Text`]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  text: {
    fontSize: 11,
    fontWeight: "900"
  },
  success: {
    backgroundColor: colors.successSoft
  },
  warning: {
    backgroundColor: colors.warningSoft
  },
  danger: {
    backgroundColor: colors.dangerSoft
  },
  successText: {
    color: colors.success
  },
  warningText: {
    color: colors.warning
  },
  dangerText: {
    color: colors.danger
  }
});
