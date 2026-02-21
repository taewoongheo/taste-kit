import { AnimatedPressable, Button, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import { useThemeColor } from '@/hooks';
import { Haptic } from '@/lib';
import { StyleSheet, View, useColorScheme } from 'react-native';

interface InteractionsDemoProps {
  onOpenSheet: () => void;
  showToast: (msg: string) => void;
}

export function InteractionsDemo({ onOpenSheet, showToast }: InteractionsDemoProps) {
  const bgGrouped = useThemeColor('backgroundGrouped');
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <>
      <Text variant="subtitle">Interactions</Text>
      <AnimatedPressable onPress={onOpenSheet}>
        <View style={[styles.card, { backgroundColor: bgGrouped }]}>
          <Text>Sheet 열기</Text>
        </View>
      </AnimatedPressable>
      <View style={styles.row}>
        <Button
          height={34}
          backgroundColor={colors.fillPrimary}
          onPress={() => showToast('저장되었습니다')}
        >
          <Text variant="label" color="accent" weight="600">
            Toast: success
          </Text>
        </Button>
        <Button
          height={34}
          backgroundColor={colors.fillPrimary}
          onPress={() => showToast('오류 발생')}
        >
          <Text variant="label" color="accent" weight="600">
            Toast: error
          </Text>
        </Button>
      </View>
      <View style={styles.row}>
        <Button height={34} backgroundColor="transparent" onPress={() => Haptic.tap()}>
          <Text variant="label" color="accent" weight="600">
            Haptic: tap
          </Text>
        </Button>
        <Button height={34} backgroundColor="transparent" onPress={() => Haptic.success()}>
          <Text variant="label" color="accent" weight="600">
            Haptic: success
          </Text>
        </Button>
        <Button height={34} backgroundColor="transparent" onPress={() => Haptic.error()}>
          <Text variant="label" color="accent" weight="600">
            Haptic: error
          </Text>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
  card: { borderRadius: 12, padding: Spacing.md, overflow: 'hidden' as const },
});
