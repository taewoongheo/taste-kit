import { Timings } from '@/constants';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface CollapseProps {
  /** Whether the content is expanded */
  expanded: boolean;
  children: ReactNode;
  /** Animation duration in ms (default: 250) */
  duration?: number;
  testID?: string;
}

export function Collapse({
  expanded,
  children,
  duration = Timings.normal.duration,
  testID,
}: CollapseProps) {
  const measuredHeight = useRef(0);
  const hasLayout = useRef(false);
  const height = useSharedValue(expanded ? 0 : 0);

  useEffect(() => {
    if (!hasLayout.current) return;
    height.value = withTiming(expanded ? measuredHeight.current : 0, { duration });
  }, [expanded, duration, height]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden' as const,
  }));

  return (
    <Animated.View style={animatedStyle} testID={testID}>
      <View
        style={{ position: 'absolute', width: '100%' }}
        onLayout={(e) => {
          const h = e.nativeEvent.layout.height;
          measuredHeight.current = h;
          if (!hasLayout.current) {
            hasLayout.current = true;
            // First layout: set immediately without animation
            height.value = expanded ? h : 0;
          }
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
}
