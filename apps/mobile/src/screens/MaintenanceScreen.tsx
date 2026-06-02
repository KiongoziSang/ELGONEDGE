import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppInput } from "../components/AppInput";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { OptionPicker } from "../components/OptionPicker";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useApiData } from "../hooks/useApiData";
import { maintenanceCategories, priorities } from "../mocks/maintenance";
import { createMaintenanceRequest, getMaintenanceRequests } from "../services/api/maintenance";
import { colors } from "../theme";
import type { MaintenanceCategory, MaintenanceRequest, Priority } from "../types";
import { formatDate } from "../utils/format";

export function MaintenanceScreen() {
  const loaded = useApiData<MaintenanceRequest[]>(getMaintenanceRequests, []);
  const [items, setItems] = useState<MaintenanceRequest[]>([]);
  const [category, setCategory] = useState<MaintenanceCategory>("Plumbing");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const requests = items.length > 0 ? [...items, ...loaded.data] : loaded.data;

  async function submit() {
    if (!description.trim()) {
      setSuccess("Add a short description before submitting.");
      return;
    }

    setSubmitting(true);
    const request = await createMaintenanceRequest({ category, priority, description });
    setItems((current) => [request, ...current]);
    setDescription("");
    setSuccess("Maintenance request submitted in mock mode.");
    setSubmitting(false);
  }

  return (
    <Screen title="Maintenance" subtitle="Raise and track maintenance requests for your unit.">
      <SectionHeader title="Create request" action="Image placeholder" />
      <AppCard>
        <View style={styles.form}>
          <OptionPicker label="Category" options={maintenanceCategories} value={category} onChange={setCategory} />
          <OptionPicker label="Priority" options={priorities} value={priority} onChange={setPriority} />
          <AppInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the issue..."
            multiline
          />
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>Optional image attachment placeholder</Text>
          </View>
          {success ? <Text style={styles.success}>{success}</Text> : null}
          <AppButton label={submitting ? "Submitting..." : "Submit request"} onPress={() => void submit()} disabled={submitting} />
        </View>
      </AppCard>

      <SectionHeader title="Request status" />
      {loaded.loading ? <LoadingState label="Loading maintenance requests..." /> : null}
      {loaded.error ? <EmptyState title="Unable to load requests" text={loaded.error} /> : null}
      {!loaded.loading && requests.length === 0 ? (
        <EmptyState title="No maintenance requests yet" text="Submitted requests and status updates will appear here." />
      ) : (
        <View style={styles.stack}>
          {requests.map((request) => (
            <AppCard key={request.id}>
              <View style={styles.row}>
                <View style={styles.copy}>
                  <Text style={styles.title}>{request.title}</Text>
                  <Text style={styles.meta}>
                    {request.category} · {request.priority} · {formatDate(request.date)}
                  </Text>
                  <Text style={styles.description}>{request.description}</Text>
                </View>
                <StatusBadge label={request.status} />
              </View>
            </AppCard>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 14
  },
  imagePlaceholder: {
    backgroundColor: colors.softGrey,
    borderColor: colors.line,
    borderRadius: 14,
    borderStyle: "dashed",
    borderWidth: 1,
    padding: 14
  },
  imageText: {
    color: colors.slate,
    fontSize: 13,
    fontWeight: "800"
  },
  success: {
    color: colors.success,
    fontSize: 13,
    fontWeight: "800"
  },
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
  description: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8
  }
});
