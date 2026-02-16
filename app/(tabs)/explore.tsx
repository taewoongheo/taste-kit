import { AnimatedPressable, Button, Card, Text, useEntrance } from '@/components/ui';
import { Spacing, Springs, Timings } from '@/constants';
import { useThemeColor } from '@/hooks';
import { Haptic } from '@/lib';
import { type ThemeMode, useAppStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const themeMode = useAppStore((s) => s.themeMode);
  const setThemeMode = useAppStore((s) => s.setThemeMode);

  const s1 = useEntrance({ fade: true, slideY: 30, delay: 0 });
  const s2 = useEntrance({ fade: true, slideY: 30, delay: 100 });
  const s3 = useEntrance({ fade: true, slideY: 30, delay: 200 });

  return (
    <>
      {/* Spring Presets */}
      <Animated.View style={[styles.section, s1.animatedStyle]}>
        <Text variant="subtitle">Spring Presets</Text>
        {Object.entries(Springs).map(([name, config]) => (
          <Card key={name} variant="filled">
            <Text variant="subtitle" color="accent">
              {name}
            </Text>
            <Text variant="caption" color="textSecondary">
              damping: {config.damping} · stiffness: {config.stiffness}
            </Text>
          </Card>
        ))}
      </Animated.View>

      {/* Timing Presets */}
      <Animated.View style={[styles.section, s2.animatedStyle]}>
        <Text variant="subtitle">Timing Presets</Text>
        {Object.entries(Timings).map(([name, config]) => (
          <Card key={name} variant="filled">
            <Text variant="subtitle" color="accent">
              {name}
            </Text>
            <Text variant="caption" color="textSecondary">
              duration: {config.duration}ms
            </Text>
          </Card>
        ))}
      </Animated.View>

      {/* Theme Mode */}
      <Animated.View style={[styles.section, s2.animatedStyle]}>
        <Text variant="subtitle">Theme</Text>
        <View style={styles.themeRow}>
          {themeModes.map(({ mode, label }) => (
            <Button
              key={mode}
              title={label}
              variant={themeMode === mode ? 'primary' : 'secondary'}
              size="sm"
              onPress={() => setThemeMode(mode)}
            />
          ))}
        </View>
      </Animated.View>

      {/* Spacing */}
      <Animated.View style={[styles.section, s3.animatedStyle]}>
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
