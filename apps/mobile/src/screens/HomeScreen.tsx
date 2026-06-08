import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AmountCard } from "../components/AmountCard";
import { AppCard } from "../components/AppCard";
import { BadgeRow } from "../components/BadgeRow";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { QuickActionCard } from "../components/QuickActionCard";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { useApiData } from "../hooks/useApiData";
import { getDashboardSummary, getTenantProfile } from "../services/api/tenant";
import { colors } from "../theme";
import type { DashboardSummary, ScreenName, TenantProfile } from "../types";
import { isRecentlyAdded } from "../utils/badges";
import { formatDate } from "../utils/format";

const quickActions: { title: string; subtitle: string; screen: ScreenName; badgeKey?: "announcement" | "maintenance" }[] = [
  { title: "Pay Rent", subtitle: "Instructions and methods", screen: "payments" },
  { title: "Receipts", subtitle: "Confirmed payments", screen: "receipts" },
  { title: "Documents", subtitle: "Lease, invoices, notices", screen: "documents" },
  { title: "Maintenance", subtitle: "Requests and status", screen: "maintenance", badgeKey: "maintenance" },
  { title: "Announcements", subtitle: "Official notices", screen: "announcements", badgeKey: "announcement" },
  { title: "Notifications", subtitle: "Unread updates", screen: "notifications", badgeKey: "announcement" },
  { title: "Community", subtitle: "Resident updates", screen: "community", badgeKey: "announcement" },
  { title: "Services", subtitle: "Approved providers", screen: "services" },
  { title: "Exchange", subtitle: "Moderated listings", screen: "exchange" },
  { title: "Access", subtitle: "Gate passes and cards", screen: "access" },
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
  const screenSubtitle = propertyName ? `Tenant dashboard for ${propertyName}.` : "Tenant dashboard";
  const operations = getOperationCards(summary.data);
  const reports = getReportHighlights(summary.data);
  const hasSavedReports = typeof summary.data.savedAiReportCount === "number";

  return (
    <Screen title="Home" subtitle={screenSubtitle}>
      {loading ? <DashboardLoadingState /> : null}
      {!loading && error ? (
        <EmptyState
          title="Unable to load tenant details"
          text={error}
          actionLabel="Retry"
          onAction={() => {
            void profile.reload();
            void summary.reload();
          }}
        />
      ) : null}
      {!loading && !error ? (
        <>
          <View style={styles.intro}>
            <Text style={styles.welcome}>Welcome, {tenantName || "Tenant"}</Text>
            <Text style={styles.location}>{formatLocation(propertyName, unitNumber)}</Text>
          </View>
          <View style={styles.balance}>
            <AmountCard
              label="Current rent balance"
              amount={summary.data.rentBalance}
              detail={`Next due ${formatDate(summary.data.nextDueDate)}`}
              status={summary.data.paymentStatus}
            />
          </View>
          <SectionHeader title="At a glance" />
          <View style={styles.summaryGrid}>
            <SummaryCard label="Lease" value={summary.data.leaseStatus || "Active"} detail="Occupancy status" icon="L" />
            <SummaryCard label="Payment" value={summary.data.paymentStatus || "Unknown"} detail="Current rent state" icon="P" />
            <SummaryCard
              label="Documents"
              value={summary.data.documentStatus || (summary.data.documentCount ? "Available" : "Pending")}
              detail={`${summary.data.documentCount ?? 0} tenant document${summary.data.documentCount === 1 ? "" : "s"}`}
              icon="D"
            />
            <SummaryCard
              label="Requests"
              value={summary.data.openRequestCount ? `${summary.data.openRequestCount} open` : "None"}
              detail="Maintenance follow-up"
              icon="R"
            />
          </View>
          <SectionHeader title="For you" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featureRail}>
            <FeatureCard
              title="Announcements"
              description={summary.data.unreadAnnouncementCount ? `${summary.data.unreadAnnouncementCount} unread property notice${summary.data.unreadAnnouncementCount === 1 ? "" : "s"}` : "Official property notices"}
              count={summary.data.announcementCount}
              badge={getQuickActionBadge("announcement", summary.data)}
              icon="A"
              onPress={() => navigate("announcements")}
            />
            <FeatureCard
              title="Community"
              description="Resident updates and approved posts"
              count={summary.data.communityCount}
              badge={summary.data.communityCount ? "View" : undefined}
              icon="C"
              onPress={() => navigate("community")}
            />
            <FeatureCard
              title="Exchange"
              description="Moderated resident listings"
              count={summary.data.exchangeCount}
              badge={summary.data.exchangeCount ? "View" : undefined}
              icon="E"
              onPress={() => navigate("exchange")}
            />
            <FeatureCard
              title="Services"
              description="Approved providers for your property"
              count={summary.data.servicesCount}
              badge={summary.data.servicesCount ? "View" : undefined}
              icon="S"
              onPress={() => navigate("services")}
            />
          </ScrollView>
          <SectionHeader title="Recent activity" />
          <Pressable onPress={() => navigate("announcements")}>
            <AppCard>
              <View style={styles.activityHeader}>
                <Text style={styles.activityTitle}>{summary.data.recentAnnouncement.title}</Text>
                <BadgeRow
                  labels={[
                    isRecentlyAdded(summary.data.recentAnnouncement.date) && "NEW",
                    summary.data.recentAnnouncement.read ? "Read" : "Unread"
                  ]}
                />
              </View>
              <Text style={styles.activityText}>{summary.data.recentAnnouncement.message}</Text>
            </AppCard>
          </Pressable>
          <Pressable onPress={() => navigate("maintenance")}>
            <AppCard>
              <View style={styles.activityHeader}>
                <Text style={styles.activityTitle}>{summary.data.recentMaintenance.title}</Text>
                <BadgeRow
                  labels={[
                    isRecentlyAdded(summary.data.recentMaintenance.date) && "NEW",
                    summary.data.recentMaintenance.status
                  ]}
                />
              </View>
              <Text style={styles.activityText}>{summary.data.recentMaintenance.description}</Text>
            </AppCard>
          </Pressable>
          <SectionHeader title="Operations" />
          {operations.length ? (
            <View style={styles.operationsGrid}>
              {operations.map((operation) => (
                <OperationCard
                  key={operation.label}
                  label={operation.label}
                  value={operation.value}
                  detail={operation.detail}
                  accent={operation.accent}
                />
              ))}
            </View>
          ) : (
            <UnavailableCard
              title="Operational insights not available yet"
              text="AI, construction, access, and resident service insights will appear here when they are enabled for this tenant."
            />
          )}
          <SectionHeader title="Reports" action={hasSavedReports ? `${summary.data.savedAiReportCount} saved` : undefined} />
          {reports.length ? (
            <View style={styles.reportStack}>
              {reports.map((report) => (
                <ReportCard key={report.title} title={report.title} value={report.value} detail={report.detail} status={report.status} />
              ))}
            </View>
          ) : (
            <UnavailableCard
              title="Reports not available yet"
              text="Saved AI reports and operational summaries will appear once reporting data is available for this tenant."
            />
          )}
          <SectionHeader title="Quick actions" />
          <View style={styles.actions}>
            {quickActions.map((action) => (
              <QuickActionCard
                key={action.title}
                title={action.title}
                subtitle={action.subtitle}
                badge={getQuickActionBadge(action.badgeKey, summary.data)}
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
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 2
  },
  operationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 2
  },
  summaryCard: {
    width: "48%"
  },
  operationCard: {
    width: "48%"
  },
  operationContent: {
    minHeight: 132
  },
  operationAccent: {
    borderRadius: 999,
    height: 8,
    marginBottom: 12,
    width: 42
  },
  operationLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  operationValue: {
    color: colors.navy,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 7
  },
  operationDetail: {
    color: colors.slate,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 8
  },
  reportStack: {
    gap: 10
  },
  reportRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between"
  },
  reportText: {
    flex: 1
  },
  reportTitle: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "900"
  },
  reportDetail: {
    color: colors.slate,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5
  },
  reportValue: {
    color: colors.blue,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "right"
  },
  unavailableTitle: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "900"
  },
  unavailableText: {
    color: colors.slate,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6
  },
  loadingWrap: {
    gap: 14
  },
  loadingHero: {
    backgroundColor: colors.navy,
    borderRadius: 22,
    minHeight: 126,
    padding: 18
  },
  loadingGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  loadingCard: {
    width: "48%"
  },
  loadingBlock: {
    backgroundColor: colors.line,
    borderRadius: 999,
    height: 12,
    opacity: 0.75
  },
  loadingBlockLight: {
    backgroundColor: "#C8D5E2"
  },
  loadingTitle: {
    marginBottom: 12,
    width: "42%"
  },
  loadingAmount: {
    height: 28,
    marginBottom: 12,
    width: "64%"
  },
  loadingDetail: {
    width: "55%"
  },
  loadingCardBody: {
    gap: 12,
    minHeight: 92
  },
  loadingCardTitle: {
    width: "48%"
  },
  loadingCardLine: {
    width: "78%"
  },
  loadingCardLineShort: {
    width: "56%"
  },
  summaryContent: {
    gap: 8
  },
  summaryTop: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10
  },
  summaryIcon: {
    backgroundColor: colors.infoSoft,
    borderRadius: 14,
    color: colors.blue,
    fontSize: 15,
    fontWeight: "900",
    height: 34,
    lineHeight: 34,
    textAlign: "center",
    width: 34
  },
  smallLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  smallValue: {
    color: colors.navy,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 2
  },
  smallDetail: {
    color: colors.slate,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17
  },
  featureRail: {
    gap: 12,
    paddingRight: 4
  },
  featureCard: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 22,
    borderWidth: 1,
    minHeight: 148,
    padding: 15,
    width: 212
  },
  featureTop: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  featureIcon: {
    backgroundColor: colors.navy,
    borderRadius: 16,
    color: colors.cyan,
    fontSize: 17,
    fontWeight: "900",
    height: 42,
    lineHeight: 42,
    textAlign: "center",
    width: 42
  },
  featureTitle: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 14
  },
  featureDescription: {
    color: colors.slate,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6
  },
  featureFooter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14
  },
  featureCount: {
    color: colors.blue,
    fontSize: 12,
    fontWeight: "900"
  },
  featureCta: {
    color: colors.navy,
    fontSize: 12,
    fontWeight: "900"
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

function SummaryCard({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: string }) {
  return (
    <View style={styles.summaryCard}>
      <AppCard compact>
        <View style={styles.summaryContent}>
          <View style={styles.summaryTop}>
            <Text style={styles.summaryIcon}>{icon}</Text>
            <Text style={styles.smallLabel}>{label}</Text>
          </View>
          <Text style={styles.smallValue}>{value}</Text>
          <Text style={styles.smallDetail}>{detail}</Text>
        </View>
      </AppCard>
    </View>
  );
}

function OperationCard({
  label,
  value,
  detail,
  accent
}: {
  label: string;
  value: string;
  detail: string;
  accent: "blue" | "green" | "navy" | "orange";
}) {
  return (
    <View style={styles.operationCard}>
      <AppCard compact>
        <View style={styles.operationContent}>
          <View style={[styles.operationAccent, { backgroundColor: getAccentColor(accent) }]} />
          <Text style={styles.operationLabel}>{label}</Text>
          <Text style={styles.operationValue}>{value}</Text>
          <Text style={styles.operationDetail}>{detail}</Text>
        </View>
      </AppCard>
    </View>
  );
}

function ReportCard({ title, value, detail, status }: { title: string; value: string; detail: string; status?: string }) {
  return (
    <AppCard compact>
      <View style={styles.reportRow}>
        <View style={styles.reportText}>
          <Text style={styles.reportTitle}>{title}</Text>
          <Text style={styles.reportDetail}>{detail}</Text>
        </View>
        <View>
          <Text style={styles.reportValue}>{value}</Text>
          <BadgeRow labels={[status]} />
        </View>
      </View>
    </AppCard>
  );
}

function UnavailableCard({ title, text }: { title: string; text: string }) {
  return (
    <AppCard compact>
      <Text style={styles.unavailableTitle}>{title}</Text>
      <Text style={styles.unavailableText}>{text}</Text>
    </AppCard>
  );
}

function DashboardLoadingState() {
  return (
    <View style={styles.loadingWrap}>
      <LoadingState label="Loading tenant dashboard..." />
      <View style={styles.loadingHero}>
        <ActivityIndicator color={colors.cyan} />
        <View style={[styles.loadingBlock, styles.loadingBlockLight, styles.loadingTitle]} />
        <View style={[styles.loadingBlock, styles.loadingBlockLight, styles.loadingAmount]} />
        <View style={[styles.loadingBlock, styles.loadingBlockLight, styles.loadingDetail]} />
      </View>
      <View style={styles.loadingGrid}>
        {[0, 1, 2, 3].map((item) => (
          <View key={item} style={styles.loadingCard}>
            <AppCard compact>
              <View style={styles.loadingCardBody}>
                <View style={[styles.loadingBlock, styles.loadingCardTitle]} />
                <View style={[styles.loadingBlock, styles.loadingCardLine]} />
                <View style={[styles.loadingBlock, styles.loadingCardLineShort]} />
              </View>
            </AppCard>
          </View>
        ))}
      </View>
    </View>
  );
}

function FeatureCard({
  title,
  description,
  count,
  badge,
  icon,
  onPress
}: {
  title: string;
  description: string;
  count?: number;
  badge?: string;
  icon: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.featureCard, pressed && { opacity: 0.78 }]}>
      <View style={styles.featureTop}>
        <Text style={styles.featureIcon}>{icon}</Text>
        <BadgeRow labels={[badge]} />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
      <View style={styles.featureFooter}>
        <Text style={styles.featureCount}>{typeof count === "number" ? `${count} item${count === 1 ? "" : "s"}` : "Ready"}</Text>
        <Text style={styles.featureCta}>View</Text>
      </View>
    </Pressable>
  );
}

function getQuickActionBadge(
  badgeKey: "announcement" | "maintenance" | undefined,
  summary: DashboardSummary
) {
  if (badgeKey === "announcement") {
    return isRecentlyAdded(summary.recentAnnouncement?.date) || summary.recentAnnouncement?.read === false ? "NEW" : undefined;
  }

  if (badgeKey === "maintenance") {
    return isRecentlyAdded(summary.recentMaintenance?.date) ? "NEW" : undefined;
  }

  return undefined;
}

function formatProgress(value?: number) {
  return typeof value === "number" ? `${Math.round(value)}%` : "Tracked";
}

function getAccentColor(accent: "blue" | "green" | "navy" | "orange") {
  if (accent === "green") return colors.success;
  if (accent === "navy") return colors.navy;
  if (accent === "orange") return colors.warning;
  return colors.blue;
}

type OperationCardData = {
  label: string;
  value: string;
  detail: string;
  accent: "blue" | "green" | "navy" | "orange";
};

function formatLocation(propertyName?: string, unitNumber?: string) {
  if (propertyName && unitNumber) return `${propertyName} · Unit ${unitNumber}`;
  if (propertyName) return propertyName;
  if (unitNumber) return `Unit ${unitNumber}`;
  return "Tenant dashboard";
}

function getOperationCards(summary: DashboardSummary): OperationCardData[] {
  const cards: OperationCardData[] = [];

  if (summary.tenantPredictability || summary.aiInsightSummary || typeof summary.savedAiReportCount === "number") {
    cards.push({
      label: "Ask AI",
      value: summary.tenantPredictability || `${summary.savedAiReportCount ?? 0} saved report${summary.savedAiReportCount === 1 ? "" : "s"}`,
      detail: summary.aiInsightSummary || "AI reporting is enabled for this tenant.",
      accent: "blue"
    });
  }

  if (summary.constructionPhase || typeof summary.constructionProgress === "number" || summary.estimatedReadyDate) {
    cards.push({
      label: "Construction",
      value: formatProgress(summary.constructionProgress),
      detail: `${summary.constructionPhase || "Progress tracking"}${summary.estimatedReadyDate ? ` · Ready ${formatDate(summary.estimatedReadyDate)}` : ""}`,
      accent: "green"
    });
  }

  if (summary.accessStatus || typeof summary.activeGatePassCount === "number" || typeof summary.pendingApprovalCount === "number") {
    const accessDetails = [
      typeof summary.activeGatePassCount === "number" ? `${summary.activeGatePassCount} active gate pass${summary.activeGatePassCount === 1 ? "" : "es"}` : null,
      typeof summary.pendingApprovalCount === "number" ? `${summary.pendingApprovalCount} approval${summary.pendingApprovalCount === 1 ? "" : "s"}` : null
    ].filter(Boolean);

    cards.push({
      label: "Access",
      value: summary.accessStatus || "Access updates",
      detail: accessDetails.length ? accessDetails.join(" · ") : "Visitor and access updates are available.",
      accent: "navy"
    });
  }

  if (
    typeof summary.residentServiceRequestCount === "number" ||
    typeof summary.openCommunityThreadCount === "number" ||
    typeof summary.serviceBacklogCount === "number"
  ) {
    const residentDetails = [
      typeof summary.openCommunityThreadCount === "number" ? `${summary.openCommunityThreadCount} community thread${summary.openCommunityThreadCount === 1 ? "" : "s"}` : null,
      typeof summary.serviceBacklogCount === "number" ? `${summary.serviceBacklogCount} service follow-up${summary.serviceBacklogCount === 1 ? "" : "s"}` : null
    ].filter(Boolean);

    cards.push({
      label: "Resident services",
      value: `${summary.residentServiceRequestCount ?? 0} active`,
      detail: residentDetails.length ? residentDetails.join(" · ") : "Resident service activity is available.",
      accent: "orange"
    });
  }

  return cards.slice(0, 4);
}

function getReportHighlights(summary: DashboardSummary) {
  if (summary.reportHighlights?.length) {
    return summary.reportHighlights;
  }

  const reports = [];

  if (typeof summary.exceptionCount === "number" || summary.arrearsRisk || typeof summary.serviceBacklogCount === "number") {
    reports.push({
      title: "Executive summary",
      value: typeof summary.exceptionCount === "number" ? `${summary.exceptionCount} exception${summary.exceptionCount === 1 ? "" : "s"}` : "Review",
      detail: [
        summary.arrearsRisk,
        typeof summary.serviceBacklogCount === "number" ? `${summary.serviceBacklogCount} service follow-up${summary.serviceBacklogCount === 1 ? "" : "s"}` : null
      ].filter(Boolean).join(" · "),
      status: summary.exceptionCount ? "Review" : "Clear"
    });
  }

  if (typeof summary.communityCount === "number" || typeof summary.servicesCount === "number" || typeof summary.exchangeCount === "number") {
    reports.push({
      title: "Resident operations",
      value: typeof summary.communityCount === "number" ? `${summary.communityCount} post${summary.communityCount === 1 ? "" : "s"}` : "Active",
      detail: [
        typeof summary.servicesCount === "number" ? `${summary.servicesCount} approved provider${summary.servicesCount === 1 ? "" : "s"}` : null,
        typeof summary.exchangeCount === "number" ? `${summary.exchangeCount} exchange listing${summary.exchangeCount === 1 ? "" : "s"}` : null
      ].filter(Boolean).join(" · "),
      status: "Active"
    });
  }

  return reports.filter((report) => report.detail);
}
