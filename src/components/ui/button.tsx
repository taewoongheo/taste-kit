import { type ColorTokens, Colors, Layout, Spacing } from '@/constants';
import type { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View, useColorScheme } from 'react-native';
import { AnimatedPressable } from './animated-pressable';
import { Text, type TextVariant } from './text';

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

const sizeConfig: Record<
  ButtonSize,
  { height: number; paddingHorizontal: number; variant: TextVariant }
> = {
  sm: { height: 34, paddingHorizontal: Spacing.sm, variant: 'label' },
  md: { height: 44, paddingHorizontal: Spacing.md, variant: 'body' },
  lg: { height: 54, paddingHorizontal: Spacing.lg, variant: 'title' },
};

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

  const variantStyles = getVariantStyles(variant, colors, isDisabled);
  const { height, paddingHorizontal, variant: textVariant } = sizeConfig[size];

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={isDisabled}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      <View
        style={[
          styles.base,
          { height, paddingHorizontal, borderRadius: Layout.radiusMd },
          variantStyles.container,
          fullWidth && styles.fullWidth,
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={variantStyles.textColor} />
        ) : (
          <View style={styles.content}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text
              variant={textVariant}
              color={variantStyles.textColor}
              weight="600"
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        )}
      </View>
    </AnimatedPressable>
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
