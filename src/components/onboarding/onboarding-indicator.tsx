import { Springs } from '@/constants/animations';
import { Colors, Spacing } from '@/constants/design-tokens';
import { StyleSheet, View, useColorScheme } from 'react-native';
import Animated, { type SharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface OnboardingIndicatorProps {
  count: number;
  activeIndex: SharedValue<number>;
}

export function OnboardingIndicator({ count, activeIndex }: OnboardingIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed-count dots never reorder
        <Dot key={`dot-${i}`} index={i} activeIndex={activeIndex} />
      ))}
    </View>
  );
}

function Dot({ index, activeIndex }: { index: number; activeIndex: SharedValue<number> }) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const animatedStyle = useAnimatedStyle(() => {
    const isActive = Math.round(activeIndex.value) === index;
    return {
      width: withSpring(isActive ? 24 : 8, Springs.snappy),
      backgroundColor: isActive ? colors.accent : colors.fillPrimary,
      opacity: withSpring(isActive ? 1 : 0.5, Springs.snappy),
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
