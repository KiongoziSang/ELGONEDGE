import { StyleSheet, View } from "react-native";
import { StatusBadge } from "./StatusBadge";

export function BadgeRow({ labels }: { labels: (string | false | null | undefined)[] }) {
  const visibleLabels = labels.filter((label): label is string => Boolean(label));

  if (visibleLabels.length === 0) {
    return null;
  }

  return (
    <View style={styles.row}>
      {visibleLabels.map((label) => (
        <StatusBadge key={label} label={label} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "flex-end",
    flexShrink: 0,
    gap: 6
  }
});
