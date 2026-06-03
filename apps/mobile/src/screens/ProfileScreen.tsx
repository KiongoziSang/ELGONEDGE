import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { Screen } from "../components/Screen";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";
import { useApiData } from "../hooks/useApiData";
import { getLeaseDetails, getTenantProfile } from "../services/api/tenant";
import { colors } from "../theme";
import type { LeaseDetails, TenantProfile } from "../types";
import { formatDate, formatKes } from "../utils/format";

export function ProfileScreen() {
  const { logout } = useAuth();
  const profile = useApiData<TenantProfile>(getTenantProfile, {} as TenantProfile);
  const lease = useApiData<LeaseDetails>(getLeaseDetails, {} as LeaseDetails);
  const loading = profile.loading || lease.loading;
  const error = profile.error ?? lease.error;

  return (
    <Screen title="Profile" subtitle="Tenant profile and lease details.">
      {loading ? <LoadingState label="Loading profile..." /> : null}
      {error ? <EmptyState title="Unable to load profile" text={error} /> : null}
      {!loading && !error ? (
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
            rows={buildProfileRows(profile.data, lease.data)}
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

function buildProfileRows(profile: TenantProfile, lease: LeaseDetails): [string, string][] {
  const rows: [string, string][] = [
    ["Property", profile.propertyName],
    ["Unit", profile.unitNumber],
    ["Lease start", formatDisplayDate(lease.startDate)],
    ["Lease end", formatDisplayDate(lease.endDate)],
    ["Lease status", lease.status]
  ];

  if (lease.rentAmount) {
    rows.push(["Rent", formatKes(lease.rentAmount)]);
  }

  if (lease.depositAmount) {
    rows.push(["Deposit", formatKes(lease.depositAmount)]);
  }

  rows.push(["Emergency contact", profile.emergencyContact]);

  return rows;
}

function formatDisplayDate(value: string) {
  return value ? formatDate(value) : "Not available";
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
