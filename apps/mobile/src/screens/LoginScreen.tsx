import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppInput } from "../components/AppInput";
import { useAuth } from "../context/AuthContext";
import { colors, spacing } from "../theme";

export function LoginScreen({ onForgotPassword }: { onForgotPassword: () => void }) {
  const { login, loading, error } = useAuth();
  const [identifier, setIdentifier] = useState("grace.wanjiku@example.com");
  const [password, setPassword] = useState("password");

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.logo}>ElgonOS</Text>
        <Text style={styles.title}>Tenant mobile access</Text>
        <Text style={styles.subtitle}>
          Sign in to manage rent, documents, maintenance, notices, community, services, and resident exchange.
        </Text>
      </View>
      <AppCard>
        <View style={styles.form}>
          <AppInput
            label="Email or phone number"
            value={identifier}
            onChangeText={setIdentifier}
            keyboardType="email-address"
            placeholder="grace.wanjiku@example.com"
          />
          <AppInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter password"
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <AppButton label={loading ? "Signing in..." : "Log in"} onPress={() => void login(identifier, password)} disabled={loading} />
          <AppButton label="Forgot password" variant="ghost" onPress={onForgotPassword} />
        </View>
      </AppCard>
      <Text style={styles.helper}>Mock login is enabled for MVP1. Real backend authentication can replace the service layer later.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.softGrey,
    flex: 1,
    padding: spacing.screen,
    paddingTop: 54
  },
  hero: {
    backgroundColor: colors.navy,
    borderRadius: 28,
    marginBottom: 18,
    padding: 22
  },
  logo: {
    color: colors.cyan,
    fontSize: 16,
    fontWeight: "900"
  },
  title: {
    color: colors.white,
    fontSize: 31,
    fontWeight: "900",
    lineHeight: 36,
    marginTop: 22
  },
  subtitle: {
    color: "#C8D5E2",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10
  },
  form: {
    gap: 14
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: "800"
  },
  helper: {
    color: colors.slate,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 16,
    textAlign: "center"
  }
});
