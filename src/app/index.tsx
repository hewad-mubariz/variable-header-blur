import { Ionicons } from "@expo/vector-icons";
import { SymbolView } from "expo-symbols";
import React from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { VariableHeaderBlurView } from "../../modules/variable-header-blur";

const colors = [
  "rgb(134, 187, 252)",
  "rgb(167, 243, 208)",
  "rgb(250, 204, 21)",
  "rgb(236, 72, 153)",
  "rgb(217, 70, 239)",
  "rgb(192, 132, 252)",
];

export const HeroCard = () => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>
      <SymbolView
        name="person.2.fill"
        size={22}
        tintColor="#5856D6"
        weight="bold"
      />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>Find Friends</Text>
      <Text style={styles.subtitle}>24 people you know are active</Text>
    </View>
    <Pressable
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}
    >
      <Text style={styles.buttonText}>Connect</Text>
    </Pressable>
  </View>
);

export default function App() {
  const insets = useSafeAreaInsets();
  const HEADER_TOTAL_HEIGHT = 100 + insets.top;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* WRAPPER MODE: 
         Everything inside this tag is "captured" by the native hazeSource
      */}
      <VariableHeaderBlurView
        headerHeight={HEADER_TOTAL_HEIGHT}
        maxBlurRadius={16}
        tintOpacityTop={0.3}
        tintOpacityMiddle={0.1}
        progressiveStartY={0}
        progressiveEndY={HEADER_TOTAL_HEIGHT + 200}
        tintColor="#FFFFFF"
        style={{ flex: 1 }}
      >
        <ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={[
            styles.scrollPadding,

            { paddingTop: 100 + insets.top }, // Leave space for the glass area
          ]}
        >
          <HeroCard />
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Directory</Text>
          </View>

          <View style={styles.userList}>
            {Array.from({ length: 40 }).map((_, i) => (
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
                  name={{ ios: "chevron.right", android: "chevron_right" }}
                  size={25}
                  tintColor="lightgray"
                  weight="bold"
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </VariableHeaderBlurView>

      {/* FLOATING UI: 
         Keep this OUTSIDE the wrapper so it stays 100% sharp and interactive
      */}
      <View
        style={[styles.headerOverlay, { paddingTop: insets.top }]}
        pointerEvents="box-none"
      >
        <View style={styles.headerRow}>
          <Pressable style={styles.headerButton}>
            <Ionicons name="share-outline" size={22} color="black" />
          </Pressable>

          <View style={styles.pill}>
            <Text style={styles.pillEmoji}>🇩🇪</Text>
            <Text style={styles.pillText}>Germany</Text>
            <Ionicons name="chevron-down" size={14} color="#666" />
          </View>

          <Pressable style={styles.headerButton}>
            <Ionicons name="settings-outline" size={22} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F7" },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 64,
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
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
    elevation: 4,
    shadowOpacity: 0.1,
  },
  pillEmoji: { fontSize: 16 },
  pillText: { fontSize: 15, fontWeight: "600" },
  scrollPadding: { paddingHorizontal: 16, paddingBottom: 40 },
  sectionTitleContainer: {
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: { flex: 1 },
  title: { fontSize: 18, fontWeight: "700" },
  subtitle: { fontSize: 14, color: "#8E8E93" },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: { color: "white", fontSize: 14, fontWeight: "700" },
  userList: { gap: 2 },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5EA",
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 12, // Ensure it has a solid background
    //  backgroundColor: "white", // Ensure it has a solid background
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: { color: "#FFF", fontSize: 20, fontWeight: "700" },
  userInfo: { flex: 1 },
  userName: { fontSize: 17, fontWeight: "600" },
  userBio: { fontSize: 14, color: "#8E8E93" },
});
