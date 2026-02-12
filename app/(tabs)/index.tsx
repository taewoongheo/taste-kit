import { AnimatedPressable, Button, Card, Sheet } from '@/components/ui';
import { Spacing, Typography } from '@/constants';
import { useEntrance, useThemeColor } from '@/hooks';
import type BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';

export default function HomeScreen() {
  const backgroundColor = useThemeColor('background');
  const textColor = useThemeColor('text');
  const secondaryColor = useThemeColor('textSecondary');
  const { t } = useTranslation();

  const titleEntrance = useEntrance({ fade: true, slideY: 20 });
  const cardsEntrance = useEntrance({ fade: true, slideY: 30, delay: 150 });
  const buttonsEntrance = useEntrance({ fade: true, slideY: 30, delay: 300 });

  const sheetRef = useRef<BottomSheet>(null);
  const openSheet = useCallback(() => sheetRef.current?.snapToIndex(0), []);

  return (
    <ScrollView style={[styles.scroll, { backgroundColor }]} contentContainerStyle={styles.content}>
      <Animated.View style={titleEntrance.animatedStyle}>
        <Text style={[Typography.largeTitle, { color: textColor }]}>taste-kit</Text>
        <Text style={[Typography.subheadline, styles.subtitle, { color: secondaryColor }]}>
          Interaction-focused boilerplate
        </Text>
      </Animated.View>

      <Animated.View style={[styles.section, cardsEntrance.animatedStyle]}>
        <Text style={[Typography.headline, { color: textColor }]}>Cards</Text>
        <Card variant="elevated">
          <Text style={[Typography.body, { color: textColor }]}>Elevated card</Text>
        </Card>
        <Card variant="outlined">
          <Text style={[Typography.body, { color: textColor }]}>Outlined card</Text>
        </Card>
        <Card variant="filled">
          <Text style={[Typography.body, { color: textColor }]}>Filled card</Text>
        </Card>
      </Animated.View>

      <Animated.View style={[styles.section, buttonsEntrance.animatedStyle]}>
        <Text style={[Typography.headline, { color: textColor }]}>Buttons</Text>
        <Button title="Primary" variant="primary" />
        <Button title="Secondary" variant="secondary" />
        <Button title="Destructive" variant="destructive" />
        <Button title="Ghost" variant="ghost" />
        <Button title={t('common.loading')} loading />

        <Text style={[Typography.headline, styles.sectionGap, { color: textColor }]}>
          AnimatedPressable
        </Text>
        <AnimatedPressable onPress={openSheet}>
          <Card variant="filled">
            <Text style={[Typography.body, { color: textColor }]}>Tap me → Sheet</Text>
          </Card>
        </AnimatedPressable>
      </Animated.View>

      <Sheet sheetRef={sheetRef} snapPoints={['30%']}>
        <Text style={[Typography.headline, { color: textColor }]}>Bottom Sheet</Text>
        <Text style={[Typography.body, { color: secondaryColor }]}>
          {t('common.done')} — swipe down to dismiss
        </Text>
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
  },
  subtitle: {
    marginTop: Spacing.xs,
  },
  section: {
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  sectionGap: {
    marginTop: Spacing.md,
  },
});
