import { Colors } from '@/constants';
import { useColorScheme } from '@/hooks';
import { BlurView } from 'expo-blur';
import { memo } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  withAnimation?: boolean;
  onPress?: () => void;
}

const sizeStyles: Record<
  ButtonSize,
  { minHeight: number; paddingVertical: number; paddingHorizontal: number; borderRadius: number }
> = {
  sm: { minHeight: 44, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
  md: { minHeight: 44, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  lg: { minHeight: 50, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 14 },
};

function resolveVariantStyle(variant: string, colors: (typeof Colors)['light' | 'dark']) {
  switch (variant) {
    case 'secondary':
      return { backgroundColor: colors.fillPrimary };
    case 'ghost':
      return { backgroundColor: 'transparent' };
    case 'destructive':
      return { backgroundColor: colors.destructive };
    default:
      return { backgroundColor: colors.accent };
  }
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const Button = memo<ButtonProps>(function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = true,
  style,
  withAnimation = true,
  onPress,
}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const isDisabled = disabled || isLoading;

  const scale = useSharedValue<number>(1);
  const loadingProgress = useDerivedValue(() => withTiming(isLoading ? 1 : 0, { duration: 250 }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const childrenStyle = useAnimatedStyle(() => ({
    opacity: interpolate(loadingProgress.value, [0, 1], [1, 0], Extrapolation.CLAMP),
  }));

  const spinnerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(loadingProgress.value, [0, 0.5, 1], [0, 0, 1], Extrapolation.CLAMP),
  }));

  const blurProps = useAnimatedProps(() => ({
    intensity: interpolate(loadingProgress.value, [0, 1], [0, 20], Extrapolation.CLAMP),
  }));

  const handlePressIn = () => {
    if (withAnimation && !isDisabled) {
      scale.value = withTiming(0.97, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (withAnimation && !isDisabled) {
      scale.value = withTiming(1, { duration: 100 });
    }
  };

  return (
    <Animated.View style={[!fullWidth && styles.shrink, animatedStyle]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        style={[
          styles.base,
          sizeStyles[size],
          resolveVariantStyle(variant, colors),
          disabled && !isLoading && styles.disabled,
          style,
        ]}
        accessible
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled }}
      >
        {/* Children always rendered for layout sizing */}
        <Animated.View style={childrenStyle}>{children}</Animated.View>

        {/* Blur overlay — iOS only (BlurView is native) */}
        {Platform.OS === 'ios' && (
          <AnimatedBlurView
            animatedProps={blurProps}
            tint="default"
            style={[styles.overlay, { borderRadius: sizeStyles[size].borderRadius }]}
            pointerEvents="none"
          />
        )}

        {/* Spinner */}
        <Animated.View style={[styles.overlay, spinnerStyle]} pointerEvents="none">
          <ActivityIndicator color={colors.background} />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  shrink: {
    alignSelf: 'flex-start',
  },
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
