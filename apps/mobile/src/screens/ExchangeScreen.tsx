import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert, Image, Linking, StyleSheet, Text, View } from "react-native";
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
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [selectedImage, setSelectedImage] = useState<{ uri: string; name: string; type: string } | null>(null);
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
    try {
      const listing = await createExchangeListing({
        title,
        category,
        price: parsedPrice,
        description,
        contactMethod,
        phone: phone.trim() || undefined,
        whatsapp: whatsapp.trim() || phone.trim() || undefined,
        imageFile: selectedImage ?? undefined
      });
      setItems((current) => [listing, ...current]);
      setTitle("");
      setPrice("");
      setDescription("");
      setPhone("");
      setWhatsapp("");
      setSelectedImage(null);
      setFeedback("Listing submitted for management review.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "We could not submit this listing right now.");
    } finally {
      setSubmitting(false);
    }
  }

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Photo access needed", "Allow photo library access to attach an item image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ["images"],
      quality: 0.82
    });

    if (result.canceled || !result.assets[0]) {
      return;
    }

    const asset = result.assets[0];
    setSelectedImage({
      uri: asset.uri,
      name: asset.fileName ?? `exchange-${Date.now()}.jpg`,
      type: asset.mimeType ?? "image/jpeg"
    });
  }

  return (
    <Screen title="Resident Exchange" subtitle="Moderated household listings from residents in your property community.">
      <SectionHeader title="Create listing" action="Moderated" />
      <AppCard>
        <View style={styles.form}>
          <AppInput label="Title" value={title} onChangeText={setTitle} placeholder="Dining table, sofa, fridge..." />
          <OptionPicker label="Category" options={categories} value={category} onChange={setCategory} />
          <AppInput label="Price" value={price} onChangeText={setPrice} placeholder="12500" keyboardType="phone-pad" />
          <AppInput label="Description" value={description} onChangeText={setDescription} placeholder="Describe the item..." multiline />
          <AppInput label="Contact method" value={contactMethod} onChangeText={setContactMethod} placeholder="Call or WhatsApp seller" />
          <AppInput label="Phone" value={phone} onChangeText={setPhone} placeholder="+254 712 345 678" keyboardType="phone-pad" />
          <AppInput label="WhatsApp" value={whatsapp} onChangeText={setWhatsapp} placeholder="Leave blank to use phone" keyboardType="phone-pad" />
          {selectedImage ? (
            <View style={styles.selectedImageWrap}>
              <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} resizeMode="cover" />
              <AppButton label="Change photo" variant="secondary" onPress={() => void pickImage()} />
            </View>
          ) : (
            <AppButton label="Add item photo" variant="secondary" onPress={() => void pickImage()} />
          )}
          {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
          <AppButton label={submitting ? "Submitting..." : "Submit listing"} onPress={() => void submit()} disabled={submitting} />
        </View>
      </AppCard>

      <SectionHeader title="Listings" />
      {loaded.loading ? <LoadingState label="Loading exchange listings..." /> : null}
      {loaded.error ? <EmptyState title="Unable to load exchange" text={loaded.error} actionLabel="Retry" onAction={() => void loaded.reload()} /> : null}
      {!loaded.loading && !loaded.error && listings.length === 0 ? (
        <EmptyState
          title="No exchange listings for this property yet"
          text="Approved listings are shared between occupants assigned to the same property community. Listings from other properties are kept separate."
        />
      ) : !loaded.loading && !loaded.error ? (
        <View style={styles.stack}>
          {listings.map((listing) => (
            <AppCard key={listing.id}>
              <ListingVisual listing={listing} />
              <View style={styles.row}>
                <View style={styles.copy}>
                  <Text style={styles.title}>{listing.title}</Text>
                  <Text style={styles.meta}>{formatListingMeta(listing)}</Text>
                  <Text style={styles.description}>{listing.description}</Text>
                  <Text style={styles.contact}>{listing.contactMethod}</Text>
                  <View style={styles.listingActions}>
                    <AppButton
                      label="Call"
                      variant="secondary"
                      disabled={!hasPhone(listing.phone)}
                      onPress={() => void openExternalUrl(`tel:${listing.phone}`)}
                    />
                    <AppButton
                      label="WhatsApp"
                      variant="secondary"
                      disabled={!hasPhone(listing.whatsapp ?? listing.phone)}
                      onPress={() => void openExternalUrl(`https://wa.me/${toWhatsAppPhone(listing.whatsapp ?? listing.phone)}`)}
                    />
                  </View>
                </View>
                <BadgeRow labels={[isRecentlyAdded(listing.date) && "NEW", listing.status]} />
              </View>
            </AppCard>
          ))}
        </View>
      ) : null}
    </Screen>
  );
}

function formatListingMeta(listing: ExchangeListing) {
  return [listing.category, listing.price > 0 ? formatKes(listing.price) : "Price on request"].join(" · ");
}

function ListingVisual({ listing }: { listing: ExchangeListing }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(listing.imageUrl && !imageFailed);

  return (
    <View style={styles.visual}>
      {showImage ? (
        <Image source={{ uri: listing.imageUrl }} style={styles.image} resizeMode="cover" onError={() => setImageFailed(true)} />
      ) : (
        <View style={styles.imageFallback}>
          <Text style={styles.imageInitial}>{getCategoryInitial(listing.category)}</Text>
          <Text style={styles.imageCategory}>{listing.category}</Text>
        </View>
      )}
      <View style={styles.visualOverlay}>
        <Text style={styles.visualPrice}>{listing.price > 0 ? formatKes(listing.price) : "Price on request"}</Text>
      </View>
    </View>
  );
}

function getCategoryInitial(category: ExchangeListing["category"]) {
  return category === "Household items" ? "H" : category.slice(0, 1);
}

function hasPhone(value?: string) {
  return Boolean(value && toWhatsAppPhone(value).length >= 7);
}

function toWhatsAppPhone(value?: string) {
  return value?.replace(/\D/g, "") ?? "";
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
  selectedImageWrap: {
    gap: 12
  },
  selectedImage: {
    borderRadius: 18,
    height: 190,
    width: "100%"
  },
  visual: {
    backgroundColor: colors.navy,
    borderRadius: 18,
    marginBottom: 14,
    minHeight: 168,
    overflow: "hidden",
    position: "relative"
  },
  image: {
    height: 188,
    width: "100%"
  },
  imageFallback: {
    alignItems: "center",
    backgroundColor: colors.navy,
    height: 188,
    justifyContent: "center",
    padding: 18
  },
  imageInitial: {
    backgroundColor: colors.infoSoft,
    borderRadius: 26,
    color: colors.blue,
    fontSize: 28,
    fontWeight: "900",
    height: 58,
    lineHeight: 58,
    textAlign: "center",
    width: 58
  },
  imageCategory: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
    marginTop: 12
  },
  visualOverlay: {
    backgroundColor: "rgba(10, 27, 46, 0.82)",
    borderRadius: 999,
    bottom: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: "absolute"
  },
  visualPrice: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900"
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
  },
  listingActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14
  }
});
