import { StyleSheet, Text, View } from "react-native";
import { AmountCard } from "../components/AmountCard";
import { AppCard } from "../components/AppCard";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { QuickActionCard } from "../components/QuickActionCard";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useApiData } from "../hooks/useApiData";
import { getDashboardSummary, getTenantProfile } from "../services/api/tenant";
import { colors } from "../theme";
import type { DashboardSummary, ScreenName, TenantProfile } from "../types";
import { formatDate } from "../utils/format";

const quickActions: { title: string; subtitle: string; screen: ScreenName }[] = [
  { title: "Pay Rent", subtitle: "Instructions and methods", screen: "payments" },
  { title: "Receipts", subtitle: "Confirmed payments", screen: "receipts" },
  { title: "Documents", subtitle: "Lease, invoices, notices", screen: "documents" },
  { title: "Maintenance", subtitle: "Requests and status", screen: "maintenance" },
  { title: "Announcements", subtitle: "Official notices", screen: "announcements" },
  { title: "Community", subtitle: "Controlled resident layer", screen: "community" },
  { title: "Services", subtitle: "Approved providers", screen: "services" },
  { title: "Exchange", subtitle: "Moderated listings", screen: "exchange" },
  { title: "Access", subtitle: "Gate pass placeholder", screen: "access" },
  { title: "Profile", subtitle: "Lease and contacts", screen: "profile" }
];

export function HomeScreen({ navigate }: { navigate: (screen: ScreenName) => void }) {
  const profile = useApiData<TenantProfile>(getTenantProfile, {} as TenantProfile);
  const summary = useApiData<DashboardSummary>(getDashboardSummary, {} as DashboardSummary);

  const loading = profile.loading || summary.loading;
  const error = profile.error ?? summary.error;
  const tenantName = summary.data.tenantName ?? profile.data.fullName;
  const propertyName = summary.data.propertyName ?? profile.data.propertyName;
  const unitNumber = summary.data.unitNumber ?? profile.data.unitNumber;

  return (
    <Screen title="Home" subtitle="Tenant dashboard for Elgon Heights Apartments.">
      {loading ? <LoadingState label="Loading tenant dashboard..." /> : null}
      {error ? <EmptyState title="Unable to load tenant details" text={error} /> : null}
      {!loading && !error ? (
        <>
          <View style={styles.intro}>
            <Text style={styles.welcome}>Welcome, {tenantName}</Text>
            <Text style={styles.location}>
              {propertyName} · Unit {unitNumber}
            </Text>
          </View>
          <View style={styles.balance}>
            <AmountCard
              label="Current rent balance"
              amount={summary.data.rentBalance}
              detail={`Next due ${formatDate(summary.data.nextDueDate)}`}
              status={summary.data.paymentStatus}
            />
          </View>
          <View style={styles.row}>
            <AppCard compact>
              <Text style={styles.smallLabel}>Lease</Text>
              <Text style={styles.smallValue}>{summary.data.leaseStatus}</Text>
            </AppCard>
            <AppCard compact>
              <Text style={styles.smallLabel}>Payment</Text>
              <Text style={styles.smallValue}>{summary.data.paymentStatus}</Text>
            </AppCard>
          </View>
          <SectionHeader title="Recent activity" />
          <AppCard>
            <View style={styles.activityHeader}>
              <Text style={styles.activityTitle}>{summary.data.recentAnnouncement.title}</Text>
              <StatusBadge label={summary.data.recentAnnouncement.read ? "Read" : "Unread"} />
            </View>
            <Text style={styles.activityText}>{summary.data.recentAnnouncement.message}</Text>
          </AppCard>
          <AppCard>
            <View style={styles.activityHeader}>
              <Text style={styles.activityTitle}>{summary.data.recentMaintenance.title}</Text>
              <StatusBadge label={summary.data.recentMaintenance.status} />
            </View>
            <Text style={styles.activityText}>{summary.data.recentMaintenance.description}</Text>
          </AppCard>
          <SectionHeader title="Quick actions" action="MVP1" />
          <View style={styles.actions}>
            {quickActions.map((action) => (
              <QuickActionCard
                key={action.title}
                title={action.title}
                subtitle={action.subtitle}
                onPress={() => navigate(action.screen)}
              />
            ))}
          </View>
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: {
    marginBottom: 18
  },
  welcome: {
    color: colors.navy,
    fontSize: 25,
    fontWeight: "900"
  },
  location: {
    color: colors.slate,
    fontSize: 15,
    marginTop: 4
  },
  balance: {
    marginBottom: 2
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12
  },
  smallLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  smallValue: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 6
  },
  activityHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  activityTitle: {
    color: colors.navy,
    flex: 1,
    fontSize: 16,
    fontWeight: "900"
  },
  activityText: {
    color: colors.slate,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  }
});
