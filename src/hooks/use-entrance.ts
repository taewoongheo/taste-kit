import { Springs } from '@/constants';
import { useEffect } from 'react';
import type { ViewStyle } from 'react-native';
import {
  type AnimatedStyle,
  type SharedValue,
  type WithSpringConfig,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

export interface UseEntranceOptions {
  /** Animate opacity 0→1 (default: true) */
  fade?: boolean;
  /** Animate translateY from value→0 (e.g. 20 = starts 20pt below) */
  slideY?: number;
  /** Animate translateX from value→0 (e.g. -20 = starts 20pt left) */
  slideX?: number;
  /** Animate scale from value→1 (e.g. 0.9 = starts at 90%) */
  scale?: number;
  /** Spring config (default: Springs.gentle) */
  spring?: WithSpringConfig;
  /** Delay in ms before animation starts (default: 0) */
  delay?: number;
  /** Auto-play on mount (default: true) */
  autoPlay?: boolean;
}

export interface UseEntranceReturn {
  animatedStyle: AnimatedStyle<ViewStyle>;
  /** Trigger enter animation */
  enter: () => void;
  /** Reset to initial (hidden) state */
  reset: () => void;
  /** Whether currently visible */
  isVisible: SharedValue<boolean>;
}

export function useEntrance(options: UseEntranceOptions = {}): UseEntranceReturn {
  const {
    fade = true,
    slideY,
    slideX,
    scale,
    spring = Springs.gentle,
    delay = 0,
    autoPlay = true,
  } = options;

  const isVisible = useSharedValue(false);
  const opacity = useSharedValue(fade ? 0 : 1);
  const translateY = useSharedValue(slideY ?? 0);
  const translateX = useSharedValue(slideX ?? 0);
  const scaleValue = useSharedValue(scale ?? 1);

  const animate = (toVisible: boolean) => {
    const targetOpacity = toVisible ? 1 : fade ? 0 : 1;
    const targetY = toVisible ? 0 : (slideY ?? 0);
    const targetX = toVisible ? 0 : (slideX ?? 0);
    const targetScale = toVisible ? 1 : (scale ?? 1);

    const applySpring =
      delay > 0 && toVisible
        ? <T extends number>(value: T, config: WithSpringConfig) =>
            withDelay(delay, withSpring(value, config))
        : <T extends number>(value: T, config: WithSpringConfig) => withSpring(value, config);

    isVisible.value = toVisible;
    opacity.value = applySpring(targetOpacity, spring);
    translateY.value = applySpring(targetY, spring);
    translateX.value = applySpring(targetX, spring);
    scaleValue.value = applySpring(targetScale, spring);
  };

  const enter = () => animate(true);

  const reset = () => {
    isVisible.value = false;
    opacity.value = fade ? 0 : 1;
    translateY.value = slideY ?? 0;
    translateX.value = slideX ?? 0;
    scaleValue.value = scale ?? 1;
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally run only on mount
  useEffect(() => {
    if (autoPlay) {
      enter();
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scaleValue.value },
    ],
  }));

  return { animatedStyle, enter, reset, isVisible };
}
