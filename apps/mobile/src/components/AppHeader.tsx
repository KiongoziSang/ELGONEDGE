import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../theme";
import { BrandMark } from "./BrandMark";

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.header}>
      <BrandMark light />
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.navy,
    paddingBottom: 18,
    paddingHorizontal: spacing.screen,
    paddingTop: 18
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 34,
    marginTop: 18
  },
  subtitle: {
    color: "#C8D5E2",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8
  }
});
