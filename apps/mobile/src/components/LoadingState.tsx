import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator color={colors.blue} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    gap: 10,
    padding: 24
  },
  text: {
    color: colors.slate,
    fontSize: 14,
    fontWeight: "700"
  }
});
