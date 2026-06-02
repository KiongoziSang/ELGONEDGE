import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  icon?: ReactNode;
};

export function AppButton({ label, onPress, variant = "primary", disabled = false, icon }: AppButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed
      ]}
    >
      {icon}
      <Text style={[styles.label, variant === "primary" ? styles.primaryLabel : styles.secondaryLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 50,
    paddingHorizontal: 18
  },
  primary: {
    backgroundColor: colors.blue
  },
  secondary: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderWidth: 1
  },
  ghost: {
    backgroundColor: "transparent"
  },
  label: {
    fontSize: 15,
    fontWeight: "900"
  },
  primaryLabel: {
    color: colors.white
  },
  secondaryLabel: {
    color: colors.blue
  },
  disabled: {
    opacity: 0.55
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }]
  }
});
