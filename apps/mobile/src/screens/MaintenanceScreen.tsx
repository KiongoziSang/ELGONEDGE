import { useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppInput } from "../components/AppInput";
import { BadgeRow } from "../components/BadgeRow";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { OptionPicker } from "../components/OptionPicker";
import { Screen } from "../components/Screen";
import { SectionHeader } from "../components/SectionHeader";
import { maintenanceCategories, priorities } from "../constants/options";
import { useApiData } from "../hooks/useApiData";
import { createMaintenanceRequest, getMaintenanceRequests } from "../services/api/maintenance";
import { colors } from "../theme";
import type { MaintenanceCategory, MaintenanceRequest, Priority } from "../types";
import { isRecentlyAdded } from "../utils/badges";
import { formatDate } from "../utils/format";

export function MaintenanceScreen() {
  const loaded = useApiData<MaintenanceRequest[]>(getMaintenanceRequests, []);
  const [items, setItems] = useState<MaintenanceRequest[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<MaintenanceCategory>("Plumbing");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const requests = useMemo(
    () => dedupeMaintenanceRequests(items.length > 0 ? [...items, ...loaded.data] : loaded.data),
    [items, loaded.data]
  );

  async function submit() {
    if (submittingRef.current) {
      return;
    }

    setSuccess(null);
    setError(null);

    if (!title.trim() || !description.trim()) {
      setError("Please enter a title and description before submitting.");
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    try {
      const request = await createMaintenanceRequest({ title, category, priority, description });
      setItems((current) => dedupeMaintenanceRequests([request, ...current]));
      setTitle("");
      setDescription("");
      setSuccess("Maintenance request submitted successfully.");
      void loaded.reload();
    } catch (error) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[maintenance] submit failed", error);
      }
      setError("We could not submit your maintenance request right now. Please try again.");
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <Screen title="Maintenance" subtitle="Raise and track maintenance requests for your unit.">
      <SectionHeader title="Create request" action="Optional photo" />
      <AppCard>
          <View style={styles.form}>
          <AppInput label="Title" value={title} onChangeText={setTitle} placeholder="Kitchen sink leak, broken bulb..." />
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
            <Text style={styles.imageText}>Optional image attachment</Text>
          </View>
          {success ? <Text style={styles.success}>{success}</Text> : null}
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <AppButton label={submitting ? "Submitting..." : "Submit request"} onPress={() => void submit()} disabled={submitting} />
        </View>
      </AppCard>

      <SectionHeader title="Request status" />
      {loaded.loading ? <LoadingState label="Loading maintenance requests..." /> : null}
      {loaded.error ? <EmptyState title="Unable to load requests" text={loaded.error} actionLabel="Retry" onAction={() => void loaded.reload()} /> : null}
      {!loaded.loading && !loaded.error && requests.length === 0 ? (
        <EmptyState title="No maintenance requests yet" text="Submitted requests and status updates will appear here." />
      ) : !loaded.loading && !loaded.error ? (
        <View style={styles.stack}>
          {requests.map((request) => (
            <AppCard key={maintenanceRequestKey(request)}>
              <View style={styles.row}>
                <View style={styles.copy}>
                  <Text style={styles.title}>{request.title}</Text>
                  <Text style={styles.meta}>
                    {request.category} · {request.priority} · {formatDate(request.date)}
                  </Text>
                  <Text style={styles.description}>{request.description}</Text>
                  {request.latestUpdate ? <Text style={styles.update}>{request.latestUpdate}</Text> : null}
                </View>
                <BadgeRow labels={[isRecentlyAdded(request.date) && "NEW", request.status]} />
              </View>
            </AppCard>
          ))}
        </View>
      ) : null}
    </Screen>
  );
}

function maintenanceRequestKey(request: MaintenanceRequest) {
  return request.id || `${request.category}-${request.title}-${request.date}`;
}

function dedupeMaintenanceRequests(requests: MaintenanceRequest[]) {
  const seen = new Set<string>();
  const deduped: MaintenanceRequest[] = [];

  for (const request of requests) {
    const key = maintenanceRequestKey(request);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    deduped.push(request);
  }

  return deduped;
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
  error: {
    color: colors.danger,
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
  },
  update: {
    color: colors.blue,
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 19,
    marginTop: 8
  }
});
