import { TapFeedback } from '@/constants';
import * as Haptics from 'expo-haptics';
import { type ReactNode, useCallback, useState } from 'react';
import { Pressable, type ViewProps } from 'react-native';

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
  /** Style (supports Animated style) */
  style?: ViewProps['style'];
  children: ReactNode;
}

export function AnimatedPressable({
  onPress,
  disabled = false,
  scale = TapFeedback.scale,
  opacity = TapFeedback.opacity,
  haptic = Haptics.ImpactFeedbackStyle.Light,
  style,
  children,
  ...viewProps
}: AnimatedPressableProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = useCallback(() => {
    if (haptic != null) {
      Haptics.impactAsync(haptic);
    }
    setIsPressed(true);
  }, [haptic]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled}
      style={[
        style,
        {
          transform: [{ scale: isPressed ? scale : 1 }],
          opacity: isPressed ? opacity : 1,
        },
      ]}
      {...viewProps}
    >
      {children}
    </Pressable>
  );
}
