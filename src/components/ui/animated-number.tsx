import { Timings } from '@/constants';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimatedReaction, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { Text, type TextColor, type TextVariant } from './text';

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
  const [displayText, setDisplayText] = useState(() => formatter(value));
  const animatedValue = useSharedValue(value);

  // Keep latest formatter in ref to avoid stale closure in worklet
  const formatterRef = useRef(formatter);
  formatterRef.current = formatter;

  const updateDisplay = useCallback((v: number) => {
    const text = formatterRef.current(v);
    setDisplayText((prev) => (prev === text ? prev : text));
  }, []);

  useEffect(() => {
    animatedValue.value = withTiming(value, { ...Timings.slow, duration });
  }, [value, duration, animatedValue]);

  useAnimatedReaction(
    () => animatedValue.value,
    (current) => {
      scheduleOnRN(updateDisplay, current);
    },
  );

  return (
    <Text testID={testID} variant={variant} color={color} align={align}>
      {displayText}
    </Text>
  );
}
