import { StyleSheet, Text, View } from "react-native";
import { AppCard } from "../components/AppCard";
import { BadgeRow } from "../components/BadgeRow";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { Screen } from "../components/Screen";
import { useApiData } from "../hooks/useApiData";
import { getDocuments } from "../services/api/documents";
import { colors } from "../theme";
import type { TenantDocument } from "../types";
import { isRecentlyAdded } from "../utils/badges";
import { formatDate, formatKes } from "../utils/format";

export function DocumentsScreen() {
  const documents = useApiData<TenantDocument[]>(getDocuments, []);

  return (
    <Screen title="Documents" subtitle="Lease agreement, invoices, receipts, notices, and access documents.">
      {documents.loading ? <LoadingState label="Loading documents..." /> : null}
      {documents.error ? <EmptyState title="Unable to load documents" text={documents.error} /> : null}
      {!documents.loading && documents.data.length === 0 ? (
        <EmptyState title="No documents available" text="Lease, invoices, receipts, and notices will appear here." />
      ) : (
        <View style={styles.stack}>
          {documents.data.map((document) => (
            <AppCard key={document.id}>
              <View style={styles.row}>
                <View style={styles.copy}>
                  <Text style={styles.title}>{document.title}</Text>
                  <Text style={styles.meta}>{document.type} · {formatDate(document.date)}</Text>
                  {document.amount ? <Text style={styles.amount}>{formatKes(document.amount)}</Text> : null}
                  <Text style={styles.placeholder}>View/download available when enabled</Text>
                </View>
                <BadgeRow labels={[isRecentlyAdded(document.date) && "NEW", document.status]} />
              </View>
            </AppCard>
          ))}
        </View>
      )}
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
