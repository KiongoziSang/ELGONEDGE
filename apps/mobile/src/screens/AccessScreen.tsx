import { StyleSheet, Text, View } from "react-native";
import { AppCard } from "../components/AppCard";
import { BadgeRow } from "../components/BadgeRow";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { Screen } from "../components/Screen";
import { useApiData } from "../hooks/useApiData";
import { getAccessInfo } from "../services/api/access";
import { colors } from "../theme";
import type { AccessInfo } from "../types";

export function AccessScreen() {
  const access = useApiData<AccessInfo>(getAccessInfo, {} as AccessInfo);

  return (
    <Screen
      title="Access & Visitors"
      subtitle="Visitor pre-registration and gate pass workflows are available for properties that enable access management."
    >
      {access.loading ? <LoadingState label="Loading access information..." /> : null}
      {access.error ? <EmptyState title="Unable to load access" text={access.error} actionLabel="Retry" onAction={() => void access.reload()} /> : null}
      {!access.loading && !access.error ? (
        <View style={styles.stack}>
          <InfoCard title="Access card status" value={access.data.accessCardStatus} status="Active" />
          <InfoCard title="Unit access information" value={access.data.unitAccessInfo} status="Unit B-204" />
          <InfoCard title="Visitor pre-registration" value={access.data.visitorPreRegistration} status="Setup dependent" />
          <InfoCard title="Gate pass" value={access.data.gatePassStatus} status="Setup dependent" />
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
        <BadgeRow labels={[status]} />
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
