import { Button, Collapse, RollingCounter, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import { useThemeColor } from '@/hooks';
import * as HapticsLib from 'expo-haptics';
import { useCallback, useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export function AnimationsDemo() {
  const bgGrouped = useThemeColor('backgroundGrouped');
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [collapseExpanded, setCollapseExpanded] = useState(false);
  const [counterValue, setCounterValue] = useState(0);

  const shakeX = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));
  const shake = useCallback(() => {
    const distance = 8;
    const oscillations = 4;
    const duration = 60;
    const steps: number[] = [];
    for (let i = 0; i < oscillations; i++) {
      steps.push(i % 2 === 0 ? distance : -distance);
    }
    steps.push(0);
    shakeX.value = withSequence(...steps.map((v) => withTiming(v, { duration })));
    HapticsLib.notificationAsync(HapticsLib.NotificationFeedbackType.Error);
  }, [shakeX]);

  return (
    <>
      <Text variant="subtitle">Animations</Text>

      <Button
        height={34}
        backgroundColor={colors.fillPrimary}
        onPress={() => setCollapseExpanded((v) => !v)}
      >
        <Text variant="label" color="accent" weight="600">
          {collapseExpanded ? 'Collapse 닫기' : 'Collapse 열기'}
        </Text>
      </Button>
      <Collapse expanded={collapseExpanded}>
        <View style={[styles.card, { backgroundColor: bgGrouped }]}>
          <Text>접힌 콘텐츠가 여기에 표시됩니다.</Text>
          <Text color="textSecondary" variant="caption">
            height 애니메이션으로 자연스럽게 열고 닫힙니다.
          </Text>
        </View>
      </Collapse>

      <Animated.View style={shakeStyle}>
        <Button height={34} backgroundColor={colors.destructive} onPress={shake}>
          <Text variant="label" color="background" weight="600">
            Shake!
          </Text>
        </Button>
      </Animated.View>

      <RollingCounter
        value={counterValue}
        color={colors.text}
        height={40}
        width={28}
        fontSize={32}
      />
      <View style={styles.row}>
        <Button
          height={34}
          backgroundColor={colors.fillPrimary}
          onPress={() => setCounterValue((v) => v + 100)}
        >
          <Text variant="label" color="accent" weight="600">
            +100
          </Text>
        </Button>
        <Button
          height={34}
          backgroundColor={colors.fillPrimary}
          onPress={() => setCounterValue((v) => v - 50)}
        >
          <Text variant="label" color="accent" weight="600">
            -50
          </Text>
        </Button>
        <Button height={34} backgroundColor="transparent" onPress={() => setCounterValue(0)}>
          <Text variant="label" color="accent" weight="600">
            Reset
          </Text>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm },
  card: { borderRadius: 12, padding: Spacing.md, overflow: 'hidden' as const },
});
