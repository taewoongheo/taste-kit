import { AnimatedPressable, Text } from "@/components/ui";
import { Spacing } from "@/constants";
import { useThemeColor } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DemoScreen({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const bg = useThemeColor("background");
  const accent = useThemeColor("accent");
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: bg }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: top + Spacing.md },
        ]}
      >
        <View style={styles.header}>
          <AnimatedPressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color={accent} />
          </AnimatedPressable>
          <Text variant="title">{title}</Text>
        </View>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
    paddingBottom: Spacing["2xl"],
  },
  header: { flexDirection: "row", alignItems: "center", gap: Spacing.sm },
});
