import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import type { ViewStyle } from 'react-native';
import {
  type AnimatedStyle,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export interface UseShakeOptions {
  /** 흔들림 거리 px (default: 8) */
  distance?: number;
  /** 진동 횟수 (default: 4) */
  oscillations?: number;
  /** 진동당 ms (default: 60) */
  duration?: number;
  /** Haptic feedback type (default: Error, null to disable) */
  haptic?: Haptics.NotificationFeedbackType | null;
}

export interface UseShakeReturn {
  animatedStyle: AnimatedStyle<ViewStyle>;
  shake: () => void;
}

export function useShake(options: UseShakeOptions = {}): UseShakeReturn {
  const {
    distance = 8,
    oscillations = 4,
    duration = 60,
    haptic = Haptics.NotificationFeedbackType.Error,
  } = options;

  const translateX = useSharedValue(0);

  const shake = useCallback(() => {
    const steps: number[] = [];
    for (let i = 0; i < oscillations; i++) {
      steps.push(i % 2 === 0 ? distance : -distance);
    }
    steps.push(0);

    translateX.value = withSequence(
      ...steps.map((v) => withTiming(v, { duration })),
    );

    if (haptic != null) {
      Haptics.notificationAsync(haptic);
    }
  }, [translateX, distance, oscillations, duration, haptic]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return { animatedStyle, shake };
}
