import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";
import { formatKes } from "../utils/format";
import { StatusBadge } from "./StatusBadge";

export function AmountCard({
  label,
  amount,
  detail,
  status
}: {
  label: string;
  amount: number;
  detail: string;
  status: string;
}) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.amount}>{formatKes(amount)}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
      <StatusBadge label={status} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.navy,
    borderRadius: 22,
    gap: 16,
    padding: 18
  },
  label: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  amount: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "900",
    marginTop: 8
  },
  detail: {
    color: "#C8D5E2",
    fontSize: 14,
    marginTop: 5
  }
});
