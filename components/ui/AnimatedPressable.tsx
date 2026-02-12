import { useScalePress } from '@/hooks/useScalePress';
import type * as Haptics from 'expo-haptics';
import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import type { WithSpringConfig } from 'react-native-reanimated';

export interface AnimatedPressableProps extends Omit<ViewProps, 'style'> {
  /** Callback on tap */
  onPress?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Scale on press (default: 0.97) */
  scale?: number;
  /** Opacity on press (default: 0.8) */
  opacity?: number;
  /** Haptic style (null to disable) */
  haptic?: Haptics.ImpactFeedbackStyle | null;
  /** Spring config */
  spring?: WithSpringConfig;
  /** Style (supports Animated style) */
  style?: ViewProps['style'];
  children: ReactNode;
}

export function AnimatedPressable({
  onPress,
  disabled = false,
  scale,
  opacity,
  haptic,
  spring,
  style,
  children,
  ...viewProps
}: AnimatedPressableProps) {
  const { gesture, animatedStyle } = useScalePress({
    scale,
    opacity,
    haptic,
    spring,
    onPress,
    disabled,
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style, animatedStyle]} {...viewProps}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
