import { Colors, Spacing } from '@/constants';
import { useColorScheme } from '@/hooks';
import { type ReactNode, memo, useMemo } from 'react';
import {
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

type TagVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'muted';

interface TagProps {
  readonly label: string;
  readonly variant?: TagVariant;
  readonly style?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
  readonly icon?: ReactNode;
  readonly bordered?: boolean;
}

interface VariantStyle {
  bg: string;
  text: string;
}

// 8-digit hex: base color + 1A (10% opacity) for tinted backgrounds
const getVariantStyles = (
  tokens: (typeof Colors)['light'] | (typeof Colors)['dark'],
): Record<TagVariant, VariantStyle> => ({
  default: { bg: tokens.fillSecondary, text: tokens.text },
  success: { bg: `${tokens.success}1A`, text: tokens.success },
  warning: { bg: `${tokens.warning}1A`, text: tokens.warning },
  error: { bg: `${tokens.destructive}1A`, text: tokens.destructive },
  info: { bg: `${tokens.accent}1A`, text: tokens.accent },
  muted: { bg: 'transparent', text: tokens.textSecondary },
});

export const Tag = memo<TagProps>(
  ({ label, variant = 'default', style, textStyle, icon, bordered }) => {
    const colorScheme = useColorScheme();
    const vs = useMemo(
      () => getVariantStyles(Colors[colorScheme])[variant],
      [colorScheme, variant],
    );

    return (
      <View
        style={[
          styles.tag,
          {
            backgroundColor: vs.bg,
            borderColor: bordered ? vs.text : undefined,
            borderWidth: bordered ? 1 : undefined,
          },
          style,
        ]}
      >
        {icon}
        {label ? (
          <Text
            style={[
              styles.text,
              { color: vs.text },
              icon ? { marginLeft: 4 } : undefined,
              textStyle,
            ]}
          >
            {label}
          </Text>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm / 2,
    paddingHorizontal: Spacing.md,
    borderRadius: 999,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export type { TagProps, TagVariant };
