import { Alert, Linking, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { BadgeRow } from "../components/BadgeRow";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { Screen } from "../components/Screen";
import { useApiData } from "../hooks/useApiData";
import { getServiceProviders } from "../services/api/services";
import { colors } from "../theme";
import type { ServiceProvider } from "../types";
import { isRecentlyAdded } from "../utils/badges";

export function ServicesScreen() {
  const providers = useApiData<ServiceProvider[]>(getServiceProviders, []);

  return (
    <Screen title="Resident Services" subtitle="Approved providers connected to your property.">
      {providers.loading ? <LoadingState label="Loading approved services..." /> : null}
      {providers.error ? <EmptyState title="Unable to load services" text={providers.error} actionLabel="Retry" onAction={() => void providers.reload()} /> : null}
      {!providers.loading && providers.data.length === 0 ? (
        <EmptyState title="No resident services available yet" text="Approved providers will appear here when enabled for your property." />
      ) : (
        <View style={styles.stack}>
          {providers.data.map((provider) => (
            <AppCard key={provider.id}>
              <View style={styles.row}>
                <View style={styles.copy}>
                  <Text style={styles.title}>{provider.name}</Text>
                  <Text style={styles.meta}>{provider.category} · {provider.phone}</Text>
                  <Text style={styles.description}>{provider.description}</Text>
                </View>
                <BadgeRow labels={[isRecentlyAdded(provider.date) && "NEW", provider.status]} />
              </View>
              <View style={styles.actions}>
                <AppButton label="Call" variant="secondary" onPress={() => void openExternalUrl(`tel:${provider.phone}`)} />
                <AppButton
                  label="WhatsApp"
                  variant="secondary"
                  onPress={() => void openExternalUrl(`https://wa.me/${provider.phone.replace(/\D/g, "")}`)}
                />
                <AppButton label="Request" variant="ghost" onPress={() => Alert.alert("Request through management", "Service requests are handled through property management where enabled.")} />
              </View>
            </AppCard>
          ))}
        </View>
      )}
    </Screen>
  );
}

async function openExternalUrl(url: string) {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
    return;
  }

  Alert.alert("Action unavailable", "This contact action is not available on this device.");
}

const styles = StyleSheet.create({
  stack: {
    gap: 10
  },
  row: {
    alignItems: "flex-start",
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
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14
  }
});
