import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

type BrandMarkProps = {
  size?: "small" | "medium" | "large";
  showText?: boolean;
  light?: boolean;
};

export function BrandMark({ size = "small", showText = true, light = false }: BrandMarkProps) {
  const imageSize = size === "large" ? 86 : size === "medium" ? 48 : 42;

  return (
    <View style={[styles.row, size === "medium" && styles.rowMedium]}>
      <Image
        source={require("../../assets/elgonos-logo.png")}
        resizeMode="cover"
        style={[
          styles.logo,
          {
            height: imageSize,
            width: imageSize,
            borderRadius: imageSize / 2
          }
        ]}
      />
      {showText ? (
        <View>
          <Text style={[styles.name, size === "medium" && styles.nameMedium, light && styles.nameLight]}>ElgonOS</Text>
          <Text style={[styles.sub, size === "medium" && styles.subMedium, light && styles.subLight]}>by Elgon Edge</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10
  },
  rowMedium: {
    gap: 11
  },
  logo: {
    backgroundColor: colors.navy
  },
  name: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: "900"
  },
  nameMedium: {
    fontSize: 20
  },
  nameLight: {
    color: colors.white
  },
  sub: {
    color: colors.slate,
    fontSize: 11,
    fontWeight: "900",
    marginTop: 1,
    textTransform: "uppercase"
  },
  subMedium: {
    fontSize: 12
  },
  subLight: {
    color: "#C8D5E2"
  }
});
