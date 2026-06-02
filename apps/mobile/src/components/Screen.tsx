import type { ReactNode } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { colors, spacing } from "../theme";
import { AppHeader } from "./AppHeader";

export function Screen({
  title,
  subtitle,
  children,
  footer
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title={title} subtitle={subtitle} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.navy,
    flex: 1
  },
  scroll: {
    backgroundColor: colors.softGrey,
    flex: 1
  },
  content: {
    padding: spacing.screen,
    paddingBottom: 36
  },
  footer: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderTopWidth: 1
  }
});
