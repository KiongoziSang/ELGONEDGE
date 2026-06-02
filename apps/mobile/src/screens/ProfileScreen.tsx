import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { Screen } from "../components/Screen";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";
import { useApiData } from "../hooks/useApiData";
import { getTenantProfile } from "../services/api/tenant";
import { colors } from "../theme";
import type { TenantProfile } from "../types";
import { formatDate } from "../utils/format";

export function ProfileScreen() {
  const { logout } = useAuth();
  const profile = useApiData<TenantProfile>(getTenantProfile, {} as TenantProfile);

  return (
    <Screen title="Profile" subtitle="Tenant profile and lease details.">
      {profile.loading ? <LoadingState label="Loading profile..." /> : null}
      {profile.error ? <EmptyState title="Unable to load profile" text={profile.error} /> : null}
      {!profile.loading && !profile.error ? (
        <View style={styles.stack}>
          <AppCard>
            <View style={styles.row}>
              <View style={styles.copy}>
                <Text style={styles.name}>{profile.data.fullName}</Text>
                <Text style={styles.meta}>{profile.data.phone}</Text>
                <Text style={styles.meta}>{profile.data.email}</Text>
              </View>
              <StatusBadge label={profile.data.leaseStatus} />
            </View>
          </AppCard>
          <DetailsCard
            rows={[
              ["Property", profile.data.propertyName],
              ["Unit", profile.data.unitNumber],
              ["Lease start", formatDate(profile.data.leaseStartDate)],
              ["Lease end", formatDate(profile.data.leaseEndDate)],
              ["Lease status", profile.data.leaseStatus],
              ["Emergency contact", profile.data.emergencyContact]
            ]}
          />
          <AppButton label="Log out" onPress={logout} />
        </View>
      ) : null}
    </Screen>
  );
}

function DetailsCard({ rows }: { rows: [string, string][] }) {
  return (
    <AppCard>
      {rows.map(([label, value]) => (
        <View key={label} style={styles.detailRow}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 12
  },
  row: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  copy: {
    flex: 1
  },
  name: {
    color: colors.navy,
    fontSize: 22,
    fontWeight: "900"
  },
  meta: {
    color: colors.slate,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 5
  },
  detailRow: {
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    gap: 4,
    paddingVertical: 11
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  value: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "700"
  }
});
