import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useAppNavigation } from "../context/NavigationContext";
import { useApiData } from "../hooks/useApiData";
import { getTenantProfile } from "../services/api/tenant";
import { colors } from "../theme";
import type { TenantProfile } from "../types";

export function ProfileAvatar() {
  const { session } = useAuth();
  const { navigate } = useAppNavigation();
  const profile = useApiData<TenantProfile>(getTenantProfile, {} as TenantProfile);
  const name = profile.data.fullName || session?.tenant?.fullName || session?.tenant?.email || "Tenant";
  const imageUrl = profile.data.imageUrl || session?.tenant?.imageUrl;
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  return (
    <Pressable
      accessibilityLabel="Open profile"
      onPress={() => navigate("profile")}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      {imageUrl && !imageFailed ? (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" onError={() => setImageFailed(true)} />
      ) : (
        <View style={styles.fallback}>
          <Text style={styles.initials}>{initials(name)}</Text>
        </View>
      )}
    </Pressable>
  );
}

function initials(value: string) {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "T";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 18,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    overflow: "hidden",
    width: 44
  },
  fallback: {
    alignItems: "center",
    backgroundColor: "#EAFBFF",
    height: "100%",
    justifyContent: "center",
    width: "100%"
  },
  image: {
    height: "100%",
    width: "100%"
  },
  initials: {
    color: colors.blue,
    fontSize: 14,
    fontWeight: "900"
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }]
  }
});
