import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { apiConfig } from "./src/config";
import {
  guardMetrics,
  guardQueue,
  managerApprovals,
  managerMetrics,
  tenantActions,
  tenantFeed,
  tenantMetrics
} from "./src/mockData";
import { colors, spacing } from "./src/theme";
import type { Metric, QuickAction, UserRole, WorkItem } from "./src/types";

const roles: { id: UserRole; label: string }[] = [
  { id: "tenant", label: "Tenant" },
  { id: "guard", label: "Guard" },
  { id: "manager", label: "Manager" }
];

export default function App() {
  const [role, setRole] = useState<UserRole>("tenant");

  const content = useMemo(() => {
    if (role === "guard") {
      return {
        eyebrow: "Access control",
        title: "Validate visitors, gate passes, and guard workflows.",
        summary: "Fast checks for expected visitors, service providers, entry logs, and access exceptions.",
        metrics: guardMetrics,
        itemsTitle: "Visitor queue",
        items: guardQueue,
        portalPath: apiConfig.guardPortalPath
      };
    }

    if (role === "manager") {
      return {
        eyebrow: "Manager approvals",
        title: "Approve the operating work that should not wait.",
        summary: "Community moderation, service providers, construction reservations, and access exceptions in one queue.",
        metrics: managerMetrics,
        itemsTitle: "Approval queue",
        items: managerApprovals,
        portalPath: apiConfig.managerPortalPath
      };
    }

    return {
      eyebrow: "Resident experience",
      title: "Rent, requests, passes, services, and documents for tenants.",
      summary: "A practical tenant companion for M-PESA workflows, maintenance, Resident Community, and Resident Exchange.",
      metrics: tenantMetrics,
      itemsTitle: "Resident feed",
      items: tenantFeed,
      portalPath: apiConfig.tenantPortalPath
    };
  }, [role]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.brand}>ElgonOS Mobile</Text>
          <Text style={styles.eyebrow}>{content.eyebrow}</Text>
          <Text style={styles.heroTitle}>{content.title}</Text>
          <Text style={styles.heroSummary}>{content.summary}</Text>
          <View style={styles.segment}>
            {roles.map((item) => {
              const selected = item.id === role;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => setRole(item.id)}
                  style={[styles.segmentButton, selected && styles.segmentButtonActive]}
                >
                  <Text style={[styles.segmentText, selected && styles.segmentTextActive]}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.metricGrid}>
          {content.metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </View>

        {role === "tenant" ? <TenantQuickActions /> : null}

        <SectionTitle title={content.itemsTitle} action="Synced mock data" />
        <View style={styles.stack}>
          {content.items.map((item) => (
            <WorkItemCard key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.integrationCard}>
          <Text style={styles.integrationLabel}>API seam</Text>
          <Text style={styles.integrationTitle}>Ready for ElgonOS backend wiring</Text>
          <Text style={styles.integrationText}>
            Base URL: {apiConfig.baseUrl}
            {"\n"}
            Role path: {content.portalPath}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TenantQuickActions() {
  return (
    <>
      <SectionTitle title="Tenant quick actions" action="MVP scope" />
      <View style={styles.actionGrid}>
        {tenantActions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
      </View>
    </>
  );
}

function SectionTitle({ title, action }: { title: string; action: string }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionAction}>{action}</Text>
    </View>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{metric.label}</Text>
      <Text style={styles.metricValue}>{metric.value}</Text>
      <Text style={styles.metricDetail}>{metric.detail}</Text>
    </View>
  );
}

function ActionCard({ action }: { action: QuickAction }) {
  const toneStyle =
    action.tone === "teal" ? styles.toneTeal : action.tone === "amber" ? styles.toneAmber : styles.toneBlue;

  return (
    <Pressable style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}>
      <View style={[styles.actionIcon, toneStyle]}>
        <Text style={styles.actionIconText}>{action.title.slice(0, 2).toUpperCase()}</Text>
      </View>
      <Text style={styles.actionTitle}>{action.title}</Text>
      <Text style={styles.actionDetail}>{action.detail}</Text>
    </Pressable>
  );
}

function WorkItemCard({ item }: { item: WorkItem }) {
  return (
    <Pressable style={({ pressed }) => [styles.workItem, pressed && styles.pressed]}>
      <View style={styles.workCopy}>
        <Text style={styles.workTitle}>{item.title}</Text>
        <Text style={styles.workMeta}>{item.meta}</Text>
      </View>
      <View style={styles.statusPill}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.navy
  },
  screen: {
    flex: 1,
    backgroundColor: colors.soft
  },
  content: {
    paddingBottom: 34
  },
  hero: {
    backgroundColor: colors.navy,
    paddingHorizontal: spacing.screen,
    paddingBottom: 24,
    paddingTop: 18
  },
  brand: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0
  },
  eyebrow: {
    color: "#8ee7ff",
    fontSize: 12,
    fontWeight: "900",
    marginTop: 22,
    textTransform: "uppercase"
  },
  heroTitle: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 38,
    marginTop: 10
  },
  heroSummary: {
    color: "#cbd5e1",
    fontSize: 16,
    lineHeight: 25,
    marginTop: 12
  },
  segment: {
    backgroundColor: "rgba(255,255,255,0.09)",
    borderRadius: 999,
    flexDirection: "row",
    gap: 6,
    marginTop: 24,
    padding: 5
  },
  segmentButton: {
    alignItems: "center",
    borderRadius: 999,
    flex: 1,
    paddingVertical: 11
  },
  segmentButtonActive: {
    backgroundColor: colors.white
  },
  segmentText: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: "900"
  },
  segmentTextActive: {
    color: colors.navy
  },
  metricGrid: {
    gap: 12,
    paddingHorizontal: spacing.screen,
    paddingTop: 18
  },
  metricCard: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: spacing.radius,
    borderWidth: 1,
    padding: spacing.card
  },
  metricLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  metricValue: {
    color: colors.navy,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 8
  },
  metricDetail: {
    color: colors.slate,
    fontSize: 15,
    marginTop: 4
  },
  sectionTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.screen,
    paddingTop: 24
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 20,
    fontWeight: "900"
  },
  sectionAction: {
    color: colors.blue,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: spacing.screen,
    paddingTop: 12
  },
  actionCard: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: spacing.radius,
    borderWidth: 1,
    minHeight: 154,
    padding: spacing.card,
    width: "48%"
  },
  actionIcon: {
    alignItems: "center",
    borderRadius: 18,
    height: 48,
    justifyContent: "center",
    width: 48
  },
  toneBlue: {
    backgroundColor: colors.blue
  },
  toneTeal: {
    backgroundColor: colors.teal
  },
  toneAmber: {
    backgroundColor: "#f59e0b"
  },
  actionIconText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900"
  },
  actionTitle: {
    color: colors.navy,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 14
  },
  actionDetail: {
    color: colors.slate,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8
  },
  stack: {
    gap: 12,
    paddingHorizontal: spacing.screen,
    paddingTop: 12
  },
  workItem: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: spacing.radius,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    padding: spacing.card
  },
  workCopy: {
    flex: 1
  },
  workTitle: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "900"
  },
  workMeta: {
    color: colors.slate,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5
  },
  statusPill: {
    backgroundColor: colors.cyanSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  statusText: {
    color: colors.blue,
    fontSize: 11,
    fontWeight: "900"
  },
  integrationCard: {
    backgroundColor: colors.navy,
    borderRadius: spacing.radius,
    marginHorizontal: spacing.screen,
    marginTop: 24,
    padding: spacing.card
  },
  integrationLabel: {
    color: "#8ee7ff",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  integrationTitle: {
    color: colors.white,
    fontSize: 19,
    fontWeight: "900",
    marginTop: 8
  },
  integrationText: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.99 }]
  }
});
