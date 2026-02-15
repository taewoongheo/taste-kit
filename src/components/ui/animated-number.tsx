import { Colors, Timings, Typography } from '@/constants';
import { useColorScheme } from '@/hooks';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { TextColor, TextVariant } from './text';

export interface AnimatedNumberProps {
  /** The target number to animate to */
  value: number;
  /** Animation duration in ms (default: 400) */
  duration?: number;
  /** Custom formatter (default: Math.round → string) */
  formatter?: (v: number) => string;
  /** Typography variant (default: 'title') */
  variant?: TextVariant;
  /** Color token (default: 'text') */
  color?: TextColor;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  testID?: string;
}

export function AnimatedNumber({
  value,
  duration = Timings.slow.duration,
  formatter = (v) => String(Math.round(v)),
  variant = 'title',
  color = 'text',
  align,
  testID,
}: AnimatedNumberProps) {
  const colorScheme = useColorScheme();
  const resolvedColor = Colors[colorScheme][color];

  const [displayText, setDisplayText] = useState(() => formatter(value));
  const animatedValue = useSharedValue(value);

  useEffect(() => {
    animatedValue.value = withTiming(value, { duration });
  }, [value, duration, animatedValue]);

  useAnimatedReaction(
    () => animatedValue.value,
    (current) => {
      runOnJS(setDisplayText)(formatter(current));
    },
  );

  return (
    <Text
      testID={testID}
      style={[
        Typography[variant],
        { color: resolvedColor },
        align && { textAlign: align },
      ]}
    >
      {displayText}
    </Text>
  );
}
