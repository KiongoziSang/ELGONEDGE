import { useState } from "react";
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
import { useApiData } from "../hooks/useApiData";
import { createExchangeListing, getExchangeListings } from "../services/api/exchange";
import { colors } from "../theme";
import type { ExchangeListing } from "../types";
import { isRecentlyAdded } from "../utils/badges";
import { formatKes } from "../utils/format";

const categories: ExchangeListing["category"][] = [
  "Furniture",
  "Electronics",
  "Household items",
  "Moving sale",
  "Services",
  "Other"
];

export function ExchangeScreen() {
  const loaded = useApiData<ExchangeListing[]>(getExchangeListings, []);
  const [items, setItems] = useState<ExchangeListing[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ExchangeListing["category"]>("Furniture");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [contactMethod, setContactMethod] = useState("WhatsApp seller");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const listings = [...items, ...loaded.data];

  async function submit() {
    const parsedPrice = Number(price);
    if (!title.trim() || !description.trim() || Number.isNaN(parsedPrice)) {
      setFeedback("Add a title, numeric price, and description before submitting.");
      return;
    }

    setSubmitting(true);
    const listing = await createExchangeListing({ title, category, price: parsedPrice, description, contactMethod });
    setItems((current) => [listing, ...current]);
    setTitle("");
    setPrice("");
    setDescription("");
    setFeedback("Listing submitted for management review.");
    setSubmitting(false);
  }

  return (
    <Screen title="Resident Exchange" subtitle="Moderated household listings from residents in your property.">
      <SectionHeader title="Create listing" action="Moderated" />
      <AppCard>
        <View style={styles.form}>
          <AppInput label="Title" value={title} onChangeText={setTitle} placeholder="Dining table, sofa, fridge..." />
          <OptionPicker label="Category" options={categories} value={category} onChange={setCategory} />
          <AppInput label="Price" value={price} onChangeText={setPrice} placeholder="12500" keyboardType="phone-pad" />
          <AppInput label="Description" value={description} onChangeText={setDescription} placeholder="Describe the item..." multiline />
          <AppInput label="Contact method" value={contactMethod} onChangeText={setContactMethod} placeholder="Call or WhatsApp seller" />
          {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
          <AppButton label={submitting ? "Submitting..." : "Submit listing"} onPress={() => void submit()} disabled={submitting} />
        </View>
      </AppCard>

      <SectionHeader title="Listings" />
      {loaded.loading ? <LoadingState label="Loading exchange listings..." /> : null}
      {loaded.error ? <EmptyState title="Unable to load exchange" text={loaded.error} /> : null}
      {!loaded.loading && listings.length === 0 ? (
        <EmptyState title="No exchange listings yet" text="Approved household listings will appear here." />
      ) : (
        <View style={styles.stack}>
          {listings.map((listing) => (
            <AppCard key={listing.id}>
              <View style={styles.row}>
                <View style={styles.copy}>
                  <Text style={styles.title}>{listing.title}</Text>
                  <Text style={styles.meta}>{listing.category} · {formatKes(listing.price)}</Text>
                  <Text style={styles.description}>{listing.description}</Text>
                  <Text style={styles.contact}>{listing.contactMethod}</Text>
                </View>
                <BadgeRow labels={[isRecentlyAdded(listing.date) && "NEW", listing.status]} />
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
  feedback: {
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
  },
  contact: {
    color: colors.blue,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 8
  }
});
