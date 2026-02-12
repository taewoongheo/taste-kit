import { Springs, TapFeedback } from '@/constants';
import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import type { ViewStyle } from 'react-native';
import { Gesture, type GestureType } from 'react-native-gesture-handler';
import {
  type AnimatedStyle,
  type SharedValue,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export interface UseScalePressOptions {
  /** Scale value on press (default: 0.97) */
  scale?: number;
  /** Opacity value on press (default: 0.8) */
  opacity?: number;
  /** Spring config (default: Springs.snappy) */
  spring?: Parameters<typeof withSpring>[1];
  /** Haptic feedback style (default: Light, null to disable) */
  haptic?: Haptics.ImpactFeedbackStyle | null;
  /** Callback on tap */
  onPress?: () => void;
  /** Disabled state — skips animation and haptic */
  disabled?: boolean;
}

export interface UseScalePressReturn {
  gesture: GestureType;
  animatedStyle: AnimatedStyle<ViewStyle>;
  pressed: SharedValue<boolean>;
}

export function useScalePress(options: UseScalePressOptions = {}): UseScalePressReturn {
  const {
    scale = TapFeedback.scale,
    opacity = TapFeedback.opacity,
    spring = Springs.snappy,
    haptic = Haptics.ImpactFeedbackStyle.Light,
    onPress,
    disabled = false,
  } = options;

  const pressed = useSharedValue(false);
  const scaleValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);

  const triggerHaptic = useCallback(() => {
    if (haptic != null) {
      Haptics.impactAsync(haptic);
    }
  }, [haptic]);

  const triggerPress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  const gesture = Gesture.Tap()
    .enabled(!disabled)
    .onBegin(() => {
      'worklet';
      pressed.value = true;
      scaleValue.value = withSpring(scale, spring);
      opacityValue.value = withSpring(opacity, spring);
    })
    .onFinalize(() => {
      'worklet';
      pressed.value = false;
      scaleValue.value = withSpring(1, spring);
      opacityValue.value = withSpring(1, spring);
    })
    .onEnd(() => {
      'worklet';
      runOnJS(triggerHaptic)();
      if (onPress) {
        runOnJS(triggerPress)();
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
    opacity: opacityValue.value,
  }));

  return { gesture, animatedStyle, pressed };
}
