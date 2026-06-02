import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

type BrandMarkProps = {
  size?: "small" | "large";
  showText?: boolean;
  light?: boolean;
};

export function BrandMark({ size = "small", showText = true, light = false }: BrandMarkProps) {
  const imageSize = size === "large" ? 86 : 42;

  return (
    <View style={styles.row}>
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
          <Text style={[styles.name, light && styles.nameLight]}>ElgonOS</Text>
          <Text style={[styles.sub, light && styles.subLight]}>by Elgon Edge</Text>
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
  logo: {
    backgroundColor: colors.navy
  },
  name: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: "900"
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
  subLight: {
    color: "#C8D5E2"
  }
});
