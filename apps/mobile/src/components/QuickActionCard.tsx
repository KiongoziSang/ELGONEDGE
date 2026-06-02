import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";

type QuickActionCardProps = {
  title: string;
  subtitle: string;
  onPress: () => void;
};

export function QuickActionCard({ title, subtitle, onPress }: QuickActionCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Text style={styles.icon}>{title.slice(0, 1)}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    minHeight: 122,
    padding: 14,
    width: "48%"
  },
  icon: {
    backgroundColor: colors.infoSoft,
    borderRadius: 14,
    color: colors.blue,
    fontSize: 18,
    fontWeight: "900",
    height: 38,
    lineHeight: 38,
    textAlign: "center",
    width: 38
  },
  title: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 12
  },
  subtitle: {
    color: colors.slate,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 5
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }]
  }
});
