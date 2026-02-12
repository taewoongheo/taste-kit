import { type ColorTokens, Colors, Layout, Spacing, Typography } from '@/constants/design-tokens';
import { useScalePress } from '@/hooks/useScalePress';
import type { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** Button label */
  title: string;
  /** Visual variant (default: 'primary') */
  variant?: ButtonVariant;
  /** Size (default: 'md') */
  size?: ButtonSize;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state — shows spinner, disables interaction */
  loading?: boolean;
  /** Callback on tap */
  onPress?: () => void;
  /** Left icon element */
  icon?: ReactNode;
  /** Full width button */
  fullWidth?: boolean;
  /** Test ID */
  testID?: string;
}

const sizeConfig = {
  sm: { height: 34, paddingHorizontal: Spacing.sm, typography: Typography.subheadline },
  md: { height: 44, paddingHorizontal: Spacing.md, typography: Typography.body },
  lg: { height: 54, paddingHorizontal: Spacing.lg, typography: Typography.headline },
} as const;

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onPress,
  icon,
  fullWidth = false,
  testID,
}: ButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const isDisabled = disabled || loading;

  const { gesture, animatedStyle } = useScalePress({
    onPress,
    disabled: isDisabled,
  });

  const variantStyles = getVariantStyles(variant, colors, isDisabled);
  const { height, paddingHorizontal, typography } = sizeConfig[size];

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled }}
        style={[
          styles.base,
          { height, paddingHorizontal, borderRadius: Layout.radiusMd },
          variantStyles.container,
          fullWidth && styles.fullWidth,
          animatedStyle,
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={variantStyles.textColor} />
        ) : (
          <View style={styles.content}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text
              style={[typography, { color: variantStyles.textColor, fontWeight: '600' }]}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
}

function getVariantStyles(variant: ButtonVariant, colors: ColorTokens, disabled: boolean) {
  if (disabled) {
    return {
      container: { backgroundColor: colors.fillSecondary },
      textColor: colors.textTertiary,
    };
  }

  switch (variant) {
    case 'primary':
      return {
        container: { backgroundColor: colors.accent },
        textColor: '#FFFFFF',
      };
    case 'secondary':
      return {
        container: { backgroundColor: colors.fillPrimary },
        textColor: colors.accent,
      };
    case 'destructive':
      return {
        container: { backgroundColor: colors.destructive },
        textColor: '#FFFFFF',
      };
    case 'ghost':
      return {
        container: { backgroundColor: 'transparent' },
        textColor: colors.accent,
      };
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  icon: {
    marginRight: 2,
  },
});
