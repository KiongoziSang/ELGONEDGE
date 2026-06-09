import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppInput } from "../components/AppInput";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { Screen } from "../components/Screen";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";
import { useApiData } from "../hooks/useApiData";
import { getLeaseDetails, getTenantProfile, updateEmergencyContact } from "../services/api/tenant";
import { colors } from "../theme";
import type { LeaseDetails, TenantProfile } from "../types";
import { formatDate, formatKes } from "../utils/format";

export function ProfileScreen() {
  const { logout } = useAuth();
  const profile = useApiData<TenantProfile>(getTenantProfile, {} as TenantProfile);
  const lease = useApiData<LeaseDetails>(getLeaseDetails, {} as LeaseDetails);
  const loading = profile.loading || lease.loading;
  const error = profile.error ?? lease.error;
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [savingEmergency, setSavingEmergency] = useState(false);
  const [emergencyMessage, setEmergencyMessage] = useState<string | null>(null);

  useEffect(() => {
    const parsed = parseEmergencyContact(profile.data.emergencyContact);
    setEmergencyName(parsed.name);
    setEmergencyPhone(parsed.phone);
  }, [profile.data.emergencyContact]);

  async function saveEmergencyContact() {
    if (!emergencyName.trim() || !emergencyPhone.trim()) {
      setEmergencyMessage("Add both an emergency contact name and phone number.");
      return;
    }

    setSavingEmergency(true);
    setEmergencyMessage(null);
    try {
      const response = await updateEmergencyContact({
        name: emergencyName.trim(),
        phone: emergencyPhone.trim()
      });
      setEmergencyMessage(response.message ?? "Emergency contact updated.");
      await profile.reload();
    } catch (saveError) {
      setEmergencyMessage(saveError instanceof Error ? saveError.message : "We could not update the emergency contact.");
    } finally {
      setSavingEmergency(false);
    }
  }

  return (
    <Screen title="Profile" subtitle="Tenant profile and lease details.">
      {loading ? <LoadingState label="Loading profile..." /> : null}
      {error ? (
        <EmptyState
          title="Unable to load profile"
          text={error}
          actionLabel="Retry"
          onAction={() => {
            void profile.reload();
            void lease.reload();
          }}
        />
      ) : null}
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
          <AppCard>
            <View style={styles.form}>
              <Text style={styles.sectionTitle}>Emergency contact</Text>
              <AppInput
                label="Name"
                value={emergencyName}
                onChangeText={setEmergencyName}
                placeholder="Emergency contact name"
              />
              <AppInput
                label="Phone"
                value={emergencyPhone}
                onChangeText={setEmergencyPhone}
                placeholder="+254 700 000 001"
                keyboardType="phone-pad"
              />
              {emergencyMessage ? <Text style={styles.feedback}>{emergencyMessage}</Text> : null}
              <AppButton
                label={savingEmergency ? "Saving..." : "Save emergency contact"}
                variant="secondary"
                onPress={() => void saveEmergencyContact()}
                disabled={savingEmergency}
              />
            </View>
          </AppCard>
          <AppButton
            label={loading ? "Refreshing..." : "Refresh profile"}
            variant="secondary"
            onPress={() => {
              void profile.reload();
              void lease.reload();
            }}
            disabled={loading}
          />
          <AppButton label="Log out" onPress={() => void logout()} />
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
    ["Email", profile.email || "Not available"],
    ["Phone", profile.phone || "Not available"],
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

function parseEmergencyContact(value: string | undefined) {
  if (!value || value === "Not provided") {
    return { name: "", phone: "" };
  }

  const [name, ...phoneParts] = value.split(" - ");
  return {
    name: name.trim(),
    phone: phoneParts.join(" - ").trim()
  };
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
  },
  form: {
    gap: 14
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 17,
    fontWeight: "900"
  },
  feedback: {
    color: colors.blue,
    fontSize: 13,
    fontWeight: "800"
  }
});
