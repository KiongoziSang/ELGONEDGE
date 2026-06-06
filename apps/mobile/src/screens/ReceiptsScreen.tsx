import { StyleSheet, Text, View } from "react-native";
import { AppCard } from "../components/AppCard";
import { BadgeRow } from "../components/BadgeRow";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { Screen } from "../components/Screen";
import { useApiData } from "../hooks/useApiData";
import { getReceipts } from "../services/api/payments";
import { colors } from "../theme";
import type { Receipt } from "../types";
import { isRecentlyAdded } from "../utils/badges";
import { formatDate, formatKes } from "../utils/format";

export function ReceiptsScreen() {
  const receipts = useApiData<Receipt[]>(getReceipts, []);

  return (
    <Screen title="Receipts" subtitle="Confirmed payment receipts and supporting records.">
      {receipts.loading ? <LoadingState label="Loading receipts..." /> : null}
      {receipts.error ? (
        <EmptyState title="Unable to load receipts" text={receipts.error} actionLabel="Retry" onAction={() => void receipts.reload()} />
      ) : null}
      {!receipts.loading && !receipts.error && receipts.data.length === 0 ? (
        <EmptyState title="No receipts found" text="Payment receipts will appear after confirmation." />
      ) : !receipts.loading && !receipts.error ? (
        <View style={styles.stack}>
          {receipts.data.map((receipt) => (
            <AppCard key={receipt.id}>
              <View style={styles.row}>
                <View style={styles.copy}>
                  <Text style={styles.title}>{receipt.title}</Text>
                  <Text style={styles.meta}>{receipt.receiptNumber} · {formatDate(receipt.date)}</Text>
                  <Text style={styles.amount}>{formatKes(receipt.amount)}</Text>
                  <Text style={styles.placeholder}>View/download available when enabled</Text>
                </View>
                <BadgeRow labels={[isRecentlyAdded(receipt.date) && "NEW", receipt.status]} />
              </View>
            </AppCard>
          ))}
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 10
  },
  row: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  copy: {
    flex: 1
  },
  title: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "900"
  },
  meta: {
    color: colors.slate,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 5
  },
  amount: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 8
  },
  placeholder: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 8
  }
});
