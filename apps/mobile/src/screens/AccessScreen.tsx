import { StyleSheet, Text, View } from "react-native";
import { AppCard } from "../components/AppCard";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { Screen } from "../components/Screen";
import { StatusBadge } from "../components/StatusBadge";
import { useApiData } from "../hooks/useApiData";
import { getAccessInfo } from "../services/api/access";
import { colors } from "../theme";
import type { AccessInfo } from "../types";

export function AccessScreen() {
  const access = useApiData<AccessInfo>(getAccessInfo, {} as AccessInfo);

  return (
    <Screen title="Access" subtitle="Tenant-facing access and gate pass placeholders for MVP1.">
      {access.loading ? <LoadingState label="Loading access information..." /> : null}
      {access.error ? <EmptyState title="Unable to load access" text={access.error} /> : null}
      {!access.loading && !access.error ? (
        <View style={styles.stack}>
          <InfoCard title="Access card status" value={access.data.accessCardStatus} status="Active" />
          <InfoCard title="Unit access information" value={access.data.unitAccessInfo} status="Unit B-204" />
          <InfoCard title="Visitor pre-registration" value={access.data.visitorPreRegistration} status="Placeholder" />
          <InfoCard title="Gate pass" value={access.data.gatePassStatus} status="MVP1" />
        </View>
      ) : null}
    </Screen>
  );
}

function InfoCard({ title, value, status }: { title: string; value: string; status: string }) {
  return (
    <AppCard>
      <View style={styles.row}>
        <View style={styles.copy}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{value}</Text>
        </View>
        <StatusBadge label={status} />
      </View>
    </AppCard>
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
  text: {
    color: colors.slate,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8
  }
});
