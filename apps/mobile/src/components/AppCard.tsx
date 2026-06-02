import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { colors, shadow, spacing } from "../theme";

export function AppCard({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return <View style={[styles.card, compact && styles.compact]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: spacing.radius,
    borderWidth: 1,
    padding: spacing.card,
    ...shadow
  },
  compact: {
    padding: 12
  }
});
