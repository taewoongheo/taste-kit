import { AnimatedPressable, Button, Text } from '@/components/ui';
import { Colors, Spacing, Springs, Timings } from '@/constants';
import { useThemeColor } from '@/hooks';
import { Haptic } from '@/lib';
import { type ThemeMode, useAppStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Staggered entrance animation — shared value + withDelay + withSpring
function useEntranceStyle(delay: number) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const spring = Springs.gentle;

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally run only on mount
  useEffect(() => {
    opacity.value = delay > 0 ? withDelay(delay, withSpring(1, spring)) : withSpring(1, spring);
    translateY.value = delay > 0 ? withDelay(delay, withSpring(0, spring)) : withSpring(0, spring);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return animatedStyle;
}

const themeModes: { mode: ThemeMode; label: string }[] = [
  { mode: 'system', label: 'System' },
  { mode: 'light', label: 'Light' },
  { mode: 'dark', label: 'Dark' },
];

export default function ExploreScreen() {
  const bg = useThemeColor('background');
  const accent = useThemeColor('accent');

  const { top } = useSafeAreaInsets();
  const [renderKey, setRenderKey] = useState(0);

  const handleReplay = useCallback(() => {
    Haptic.tap();
    setRenderKey((k) => k + 1);
  }, []);

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: bg }]}
      contentContainerStyle={[styles.content, { paddingTop: top + Spacing.md }]}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text variant="hero">Tokens</Text>
          <Text variant="label" color="textSecondary">
            디자인 토큰 & 애니메이션 프리셋
          </Text>
        </View>
        <AnimatedPressable onPress={handleReplay}>
          <View style={[styles.replayButton, { backgroundColor: accent }]}>
            <Ionicons name="refresh" size={20} color="#fff" />
          </View>
        </AnimatedPressable>
      </View>

      <TokensContent key={renderKey} />
    </ScrollView>
  );
}

function TokensContent() {
  const accent = useThemeColor('accent');
  const bgGrouped = useThemeColor('backgroundGrouped');
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const themeMode = useAppStore((s) => s.themeMode);
  const setThemeMode = useAppStore((s) => s.setThemeMode);

  const s1 = useEntranceStyle(0);
  const s2 = useEntranceStyle(100);
  const s3 = useEntranceStyle(200);

  return (
    <>
      {/* Spring Presets */}
      <Animated.View style={[styles.section, s1]}>
        <Text variant="subtitle">Spring Presets</Text>
        {Object.entries(Springs).map(([name, config]) => (
          <View key={name} style={[styles.filledCard, { backgroundColor: bgGrouped }]}>
            <Text variant="subtitle" color="accent">
              {name}
            </Text>
            <Text variant="caption" color="textSecondary">
              damping: {config.damping} · stiffness: {config.stiffness}
            </Text>
          </View>
        ))}
      </Animated.View>

      {/* Timing Presets */}
      <Animated.View style={[styles.section, s2]}>
        <Text variant="subtitle">Timing Presets</Text>
        {Object.entries(Timings).map(([name, config]) => (
          <View key={name} style={[styles.filledCard, { backgroundColor: bgGrouped }]}>
            <Text variant="subtitle" color="accent">
              {name}
            </Text>
            <Text variant="caption" color="textSecondary">
              duration: {config.duration}ms
            </Text>
          </View>
        ))}
      </Animated.View>

      {/* Theme Mode */}
      <Animated.View style={[styles.section, s2]}>
        <Text variant="subtitle">Theme</Text>
        <View style={styles.themeRow}>
          {themeModes.map(({ mode, label }) => (
            <Button
              key={mode}
              fullWidth={false}
              variant={themeMode === mode ? 'primary' : 'secondary'}
              size="sm"
              onPress={() => setThemeMode(mode)}
            >
              <Text variant="label" color={themeMode === mode ? 'background' : 'accent'} bold>
                {label}
              </Text>
            </Button>
          ))}
        </View>
      </Animated.View>

      {/* Spacing */}
      <Animated.View style={[styles.section, s3]}>
        <Text variant="subtitle">Spacing</Text>
        <View style={styles.spacingRow}>
          {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((key) => (
            <View key={key} style={styles.spacingItem}>
              <View
                style={[
                  styles.spacingBox,
                  { width: Spacing[key], height: Spacing[key], backgroundColor: accent },
                ]}
              />
              <Text variant="caption" color="textSecondary">
                {key}
              </Text>
              <Text variant="caption" color="textSecondary">
                {Spacing[key]}
              </Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
    paddingBottom: Spacing['2xl'],
  },
  section: {
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  spacingRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.md,
  },
  spacingItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  spacingBox: {
    borderRadius: 4,
  },
  filledCard: {
    borderRadius: 12,
    padding: Spacing.md,
    overflow: 'hidden' as const,
  },
  themeRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
  },
  replayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
});
