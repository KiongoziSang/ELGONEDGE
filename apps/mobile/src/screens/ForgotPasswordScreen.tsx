import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppInput } from "../components/AppInput";
import { useAuth } from "../context/AuthContext";
import { colors, spacing } from "../theme";

export function ForgotPasswordScreen({ onBack }: { onBack: () => void }) {
  const { resetPassword, loading, error } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function submit() {
    const response = await resetPassword(identifier);
    setMessage(response);
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.subtitle}>Enter the email or phone number linked to your tenant account.</Text>
      <AppCard>
        <View style={styles.form}>
          <AppInput
            label="Email or phone number"
            value={identifier}
            onChangeText={setIdentifier}
            placeholder="grace.wanjiku@example.com"
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {message ? <Text style={styles.success}>{message}</Text> : null}
          <AppButton label={loading ? "Sending..." : "Send reset instructions"} onPress={() => void submit()} disabled={loading} />
          <AppButton label="Back to login" variant="secondary" onPress={onBack} />
        </View>
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.softGrey,
    flex: 1,
    padding: spacing.screen,
    paddingTop: 72
  },
  title: {
    color: colors.navy,
    fontSize: 31,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.slate,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 18,
    marginTop: 8
  },
  form: {
    gap: 14
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "800"
  },
  success: {
    color: colors.success,
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 19
  }
});
