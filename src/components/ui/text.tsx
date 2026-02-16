import { Colors, Typography } from '@/constants';
import { useColorScheme } from '@/hooks';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

export type TextVariant = keyof typeof Typography;
export type TextColor = keyof (typeof Colors)['light'];

export type TextWeight = '400' | '500' | '600' | '700';

export interface TextProps extends Omit<RNTextProps, 'style'> {
  /** Typography variant (default: 'body') */
  variant?: TextVariant;
  /** Color token name or raw color value (default: 'text') */
  color?: TextColor | (string & {});
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Override font weight from variant default */
  weight?: TextWeight;
}

export function Text({ variant = 'body', color = 'text', align, weight, ...rest }: TextProps) {
  const colorScheme = useColorScheme();
  const tokens = Colors[colorScheme];
  const resolvedColor = color in tokens ? tokens[color as TextColor] : color;

  return (
    <RNText
      {...rest}
      style={[
        Typography[variant],
        { color: resolvedColor },
        align && { textAlign: align },
        weight && { fontWeight: weight },
      ]}
    />
  );
}
