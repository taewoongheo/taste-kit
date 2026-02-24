import { Colors, Layout } from '@/constants';
import { useEffect } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export interface SkeletonProps {
  width?: number | string;
  height?: number;
  radius?: number;
  circle?: boolean;
}

export function Skeleton({
  width = '100%',
  height = 20,
  radius = Layout.radiusSm,
  circle = false,
}: SkeletonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.4, { duration: 800 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const resolvedRadius = circle ? height / 2 : radius;
  const resolvedWidth = circle ? height : width;

  return (
    <Animated.View
      style={[
        styles.base,
        {
          width: resolvedWidth as number,
          height,
          borderRadius: resolvedRadius,
          backgroundColor: colors.fillPrimary,
        },
        animatedStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
