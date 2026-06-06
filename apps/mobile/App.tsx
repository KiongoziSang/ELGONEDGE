import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { BrandMark } from "./src/components/BrandMark";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { NavigationProvider } from "./src/context/NavigationContext";
import { AccessScreen } from "./src/screens/AccessScreen";
import { AnnouncementsScreen } from "./src/screens/AnnouncementsScreen";
import { CommunityScreen } from "./src/screens/CommunityScreen";
import { DocumentsScreen } from "./src/screens/DocumentsScreen";
import { ExchangeScreen } from "./src/screens/ExchangeScreen";
import { ForgotPasswordScreen } from "./src/screens/ForgotPasswordScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { MaintenanceScreen } from "./src/screens/MaintenanceScreen";
import { NotificationsScreen } from "./src/screens/NotificationsScreen";
import { PaymentsScreen } from "./src/screens/PaymentsScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { ReceiptsScreen } from "./src/screens/ReceiptsScreen";
import { ServicesScreen } from "./src/screens/ServicesScreen";
import { colors } from "./src/theme";
import type { AppTab, ScreenName } from "./src/types";

const tabs: { id: AppTab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "payments", label: "Payments" },
  { id: "maintenance", label: "Maintenance" },
  { id: "community", label: "Community" },
  { id: "profile", label: "Profile" }
];

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="light" backgroundColor={colors.navy} translucent={false} />
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const { session, restoring } = useAuth();
  const [authScreen, setAuthScreen] = useState<"login" | "forgotPassword">("login");
  const [screen, setScreen] = useState<ScreenName>("home");

  if (restoring) {
    return (
      <View style={styles.restoreScreen}>
        <BrandMark size="large" showText={false} />
        <Text style={styles.restoreLogo}>ElgonOS</Text>
        <Text style={styles.restoreText}>Restoring tenant session...</Text>
      </View>
    );
  }

  if (!session) {
    return authScreen === "forgotPassword" ? (
      <ForgotPasswordScreen onBack={() => setAuthScreen("login")} />
    ) : (
      <LoginScreen onForgotPassword={() => setAuthScreen("forgotPassword")} />
    );
  }

  const activeTab = tabs.some((tab) => tab.id === screen) ? (screen as AppTab) : "home";

  return (
    <View style={styles.app}>
      <NavigationProvider value={{ navigate: setScreen }}>
        <View style={styles.content}>{renderScreen(screen, setScreen)}</View>
        <SafeAreaView edges={["bottom"]} style={styles.tabSafe}>
          <View style={styles.tabs}>
            {tabs.map((tab) => {
              const active = tab.id === activeTab;
              return (
                <Pressable key={tab.id} onPress={() => setScreen(tab.id)} style={styles.tab}>
                  <Text style={[styles.tabIcon, active && styles.tabIconActive]}>{tab.label.slice(0, 1)}</Text>
                  <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </SafeAreaView>
      </NavigationProvider>
    </View>
  );
}

function renderScreen(screen: ScreenName, navigate: (screen: ScreenName) => void) {
  switch (screen) {
    case "home":
      return <HomeScreen navigate={navigate} />;
    case "payments":
      return <PaymentsScreen />;
    case "maintenance":
      return <MaintenanceScreen />;
    case "community":
      return <CommunityScreen navigate={navigate} />;
    case "profile":
      return <ProfileScreen />;
    case "documents":
      return <DocumentsScreen />;
    case "receipts":
      return <ReceiptsScreen />;
    case "announcements":
      return <AnnouncementsScreen />;
    case "notifications":
      return <NotificationsScreen />;
    case "services":
      return <ServicesScreen />;
    case "exchange":
      return <ExchangeScreen />;
    case "access":
      return <AccessScreen />;
    default:
      return <HomeScreen navigate={navigate} />;
  }
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: colors.softGrey,
    flex: 1
  },
  content: {
    flex: 1
  },
  tabs: {
    backgroundColor: colors.white,
    borderTopColor: colors.line,
    borderTopWidth: 1,
    flexDirection: "row",
    paddingBottom: 8,
    paddingTop: 8
  },
  tabSafe: {
    backgroundColor: colors.white
  },
  tab: {
    alignItems: "center",
    flex: 1,
    gap: 4
  },
  tabIcon: {
    backgroundColor: colors.softGrey,
    borderRadius: 999,
    color: colors.slate,
    fontSize: 12,
    fontWeight: "900",
    height: 24,
    lineHeight: 24,
    textAlign: "center",
    width: 24
  },
  tabIconActive: {
    backgroundColor: colors.blue,
    color: colors.white
  },
  tabLabel: {
    color: colors.slate,
    fontSize: 10,
    fontWeight: "800"
  },
  tabLabelActive: {
    color: colors.blue
  },
  restoreScreen: {
    alignItems: "center",
    backgroundColor: colors.navy,
    flex: 1,
    justifyContent: "center",
    padding: 24
  },
  restoreLogo: {
    color: colors.cyan,
    fontSize: 24,
    fontWeight: "900"
  },
  restoreText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 10
  }
});
