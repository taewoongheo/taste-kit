import { AnimatedPressable, Button, Card, Sheet } from '@/components/ui';
import { Spacing, Typography } from '@/constants';
import { useEntrance, useThemeColor } from '@/hooks';
import { Haptic } from '@/lib';
import { useAppStore } from '@/stores';
import type BottomSheet from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useCallback, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function HomeScreen() {
  const bg = useThemeColor('background');
  const text = useThemeColor('text');
  const secondary = useThemeColor('textSecondary');

  const headerEntrance = useEntrance({ fade: true, slideY: 20 });
  const cardsEntrance = useEntrance({ fade: true, slideY: 30, delay: 100 });
  const buttonsEntrance = useEntrance({ fade: true, slideY: 30, delay: 200 });
  const interactionEntrance = useEntrance({ fade: true, slideY: 30, delay: 300 });

  const sheetRef = useRef<BottomSheet>(null);
  const openSheet = useCallback(() => sheetRef.current?.snapToIndex(0), []);

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: bg }]}
      contentContainerStyle={styles.content}
    >
      <Animated.View style={headerEntrance.animatedStyle}>
        <Text style={[Typography.largeTitle, { color: text }]}>Components</Text>
        <Text style={[Typography.subheadline, styles.subtitle, { color: secondary }]}>
          UI 컴포넌트 카탈로그
        </Text>
      </Animated.View>

      {/* Cards */}
      <Animated.View style={[styles.section, cardsEntrance.animatedStyle]}>
        <Text style={[Typography.headline, { color: text }]}>Card</Text>
        <Card variant="elevated">
          <Text style={[Typography.body, { color: text }]}>Elevated</Text>
        </Card>
        <Card variant="outlined">
          <Text style={[Typography.body, { color: text }]}>Outlined</Text>
        </Card>
        <Card variant="filled">
          <Text style={[Typography.body, { color: text }]}>Filled</Text>
        </Card>
      </Animated.View>

      {/* Buttons */}
      <Animated.View style={[styles.section, buttonsEntrance.animatedStyle]}>
        <Text style={[Typography.headline, { color: text }]}>Button</Text>
        <View style={styles.row}>
          <Button title="Primary" variant="primary" size="sm" />
          <Button title="Secondary" variant="secondary" size="sm" />
        </View>
        <View style={styles.row}>
          <Button title="Destructive" variant="destructive" size="sm" />
          <Button title="Ghost" variant="ghost" size="sm" />
        </View>
        <Button title="Full Width" fullWidth />
        <Button title="Loading" loading fullWidth />
        <Button title="Disabled" disabled fullWidth />
      </Animated.View>

      {/* Interactions */}
      <Animated.View style={[styles.section, interactionEntrance.animatedStyle]}>
        <Text style={[Typography.headline, { color: text }]}>Interactions</Text>
        <AnimatedPressable onPress={openSheet}>
          <Card variant="filled">
            <Text style={[Typography.body, { color: text }]}>AnimatedPressable → Sheet</Text>
          </Card>
        </AnimatedPressable>
        <AnimatedPressable onPress={() => Haptic.success()}>
          <Card variant="filled">
            <Text style={[Typography.body, { color: text }]}>Haptic: success</Text>
          </Card>
        </AnimatedPressable>
        <AnimatedPressable onPress={() => Haptic.warning()}>
          <Card variant="filled">
            <Text style={[Typography.body, { color: text }]}>Haptic: warning</Text>
          </Card>
        </AnimatedPressable>
        <AnimatedPressable onPress={() => Haptic.error()}>
          <Card variant="filled">
            <Text style={[Typography.body, { color: text }]}>Haptic: error</Text>
          </Card>
        </AnimatedPressable>
      </Animated.View>

      {/* Navigation */}
      <Animated.View style={[styles.section, interactionEntrance.animatedStyle]}>
        <Text style={[Typography.headline, { color: text }]}>Navigation</Text>
        <Button
          title="온보딩 다시 보기"
          variant="secondary"
          fullWidth
          onPress={() => {
            useAppStore.getState().setOnboarded(false);
            router.replace('/onboarding');
          }}
        />
      </Animated.View>

      <Sheet sheetRef={sheetRef} snapPoints={['30%']}>
        <Text style={[Typography.headline, { color: text }]}>Bottom Sheet</Text>
        <Text style={[Typography.body, { color: secondary }]}>Swipe down to dismiss</Text>
      </Sheet>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.md,
    paddingTop: Spacing.xl * 2,
    gap: Spacing.md,
    paddingBottom: Spacing.xl * 2,
  },
  subtitle: {
    marginTop: Spacing.xs,
  },
  section: {
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
});
