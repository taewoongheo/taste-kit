import { type ColorTokens, Colors, Layout, Spacing } from '@/constants/design-tokens';
import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewProps, useColorScheme } from 'react-native';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends ViewProps {
  /** Visual variant (default: 'elevated') */
  variant?: CardVariant;
  /** Inner padding (default: Spacing.md) */
  padding?: number;
  children: ReactNode;
}

export function Card({
  variant = 'elevated',
  padding = Spacing.md,
  children,
  style,
  ...viewProps
}: CardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const variantStyles = getVariantStyles(variant, colors);

  return (
    <View
      style={[styles.base, { padding, borderRadius: Layout.radiusLg }, variantStyles, style]}
      {...viewProps}
    >
      {children}
    </View>
  );
}

function getVariantStyles(variant: CardVariant, colors: ColorTokens) {
  switch (variant) {
    case 'elevated':
      return {
        backgroundColor: colors.backgroundElevated,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      };
    case 'outlined':
      return {
        backgroundColor: colors.backgroundElevated,
        borderWidth: Layout.separator,
        borderColor: colors.separator,
      };
    case 'filled':
      return {
        backgroundColor: colors.backgroundGrouped,
      };
  }
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
