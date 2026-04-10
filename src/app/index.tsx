import { Ionicons } from "@expo/vector-icons";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { VariableHeaderBlurView } from "../../modules/variable-header-blur";
export const HeroCard = () => {
  return (
    <View style={styles.card}>
      {/* User-themed Icon (SF Symbol: person.2.fill) */}
      <View style={styles.iconContainer}>
        <SymbolView
          name="person.2.fill"
          size={22}
          tintColor="#5856D6" // iOS Indigo for a friendlier feel
          weight="bold"
        />
      </View>

      {/* Content: "Find Friends" or "People Nearby" */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Find Friends</Text>
        <Text style={styles.subtitle}>24 people you know are active</Text>
      </View>

      {/* Action: "Connect" or "Add" */}
      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
      >
        <Text style={styles.buttonText}>Connect</Text>
      </Pressable>
    </View>
  );
};
//Generate random color Blusish greeneish redes
const colors = [
  "rgb(134, 187, 252)",
  "rgb(167, 243, 208)",
  "rgb(250, 204, 21)",
  "rgb(236, 72, 153)",
  "rgb(217, 70, 239)",
  "rgb(192, 132, 252)",
];
export default function App() {
  const insets = useSafeAreaInsets();

  // Mock data for the vibrant indigo widgets
  const widgets = [
    { id: 1, title: "Deep Focus", sub: "Lofi Beats", color: "#4F46E5" },
    { id: 2, title: "Midnight", sub: "System Status", color: "#4338CA" },
    { id: 3, title: "Ultra", sub: "Premium Plan", color: "#6366F1" },
    { id: 4, title: "Vibe", sub: "Weekend Mix", color: "#3730A3" },
    { id: 5, title: "Neon", sub: "Active", color: "#818CF8" },
    { id: 6, title: "Abyss", sub: "Dark Mode", color: "#312E81" },
  ];

  return (
    <View style={styles.container}>
      {/* 1. SCROLLABLE CONTENT WITH RICH COLORS */}
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.scrollPadding,
          { paddingTop: 80 + insets.top }, // Offset for the floating header
        ]}
      >
        <HeroCard />
        <Text style={styles.sectionTitle}>Directory</Text>
        <View style={styles.userList}>
          {Array.from({ length: 50 }).map((_, i) => (
            <Pressable key={i} style={styles.userCard}>
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: colors[i % colors.length] },
                ]}
              >
                <Text style={styles.avatarText}>
                  {String.fromCharCode(65 + (i % 26))}
                </Text>
              </View>

              <View style={styles.userInfo}>
                <Text style={styles.userName}>User {i + 1}</Text>
                <Text style={styles.userBio} numberOfLines={1}>
                  Verified member • Active 2m ago
                </Text>
              </View>

              <SymbolView
                name="chevron.right"
                size={14}
                tintColor="#C7C7CC"
                weight="bold"
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* 2. THE NATIVE CONTAINER HEADER */}
      <VariableHeaderBlurView
        maxBlurRadius={15}
        tintOpacityTop={0.4}
        tintOpacityMiddle={0.1}
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <View style={styles.headerRow}>
          {/* Left Icon */}
          <Pressable style={styles.headerButton}>
            <Ionicons name="share-outline" size={22} color="black" />
          </Pressable>

          {/* Center Pill */}
          <View style={styles.pill}>
            <Text style={styles.pillEmoji}>🇩🇪</Text>
            <Text style={styles.pillText}>Germany</Text>
            <Ionicons name="chevron-down" size={14} color="#666" />
          </View>

          {/* Right Icon */}
          <Pressable style={styles.headerButton}>
            <Ionicons name="settings-outline" size={22} color="black" />
          </Pressable>
        </View>
      </VariableHeaderBlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20, // Extra rounded for that modern iOS look
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    // Subtle shadow so it "floats" over the background
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    marginVertical: 10,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F2FF", // Very light blue tint
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
    color: "#000",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "#8E8E93",
    marginTop: 1,
  },
  button: {
    backgroundColor: "#007AFF", // Standard iOS Blue
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  scrollPadding: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    // The height is now determined by the children + safe area padding
    zIndex: 100,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12, // Space between buttons and the bottom of the blur
    height: 64,
  },
  userList: {
    gap: 1, // Creates a subtle divider look if background is slightly different
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pillEmoji: { fontSize: 16 },
  pillText: { fontSize: 15, fontWeight: "600" },

  // WIDGET STYLES
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 20,
    color: "#111827",
  },
  fillerCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  fillerText: {
    color: "#9CA3AF",
    fontWeight: "500",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5EA",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  userBio: {
    fontSize: 14,
    color: "#8E8E93",
  },
});
