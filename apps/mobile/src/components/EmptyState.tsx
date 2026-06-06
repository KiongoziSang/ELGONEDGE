import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";
import { AppButton } from "./AppButton";

export function EmptyState({
  title,
  text,
  actionLabel,
  onAction
}: {
  title: string;
  text: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      {actionLabel && onAction ? (
        <View style={styles.action}>
          <AppButton label={actionLabel} variant="secondary" onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    padding: 20
  },
  title: {
    color: colors.navy,
    fontSize: 17,
    fontWeight: "900"
  },
  text: {
    color: colors.slate,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
    textAlign: "center"
  },
  action: {
    marginTop: 14,
    minWidth: 150
  }
});
