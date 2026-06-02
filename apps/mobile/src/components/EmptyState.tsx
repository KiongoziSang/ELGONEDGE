import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
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
  }
});
