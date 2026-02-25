import { Colors, Typography } from '@/constants';
import { useColorScheme } from '@/hooks';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

export type TextVariant = keyof typeof Typography;
export type TextColor = keyof (typeof Colors)['light'];

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  bold?: boolean;
  color?: TextColor | (string & {});
}

export function Text({ variant = 'body', bold, color = 'text', style, ...rest }: TextProps) {
  const colorScheme = useColorScheme();
  const tokens = Colors[colorScheme];
  const resolvedColor = color in tokens ? tokens[color as TextColor] : color;

  const textStyle = Typography[variant];

  return (
    <RNText
      {...rest}
      style={[textStyle, { color: resolvedColor }, bold && { fontWeight: 'bold' }, style]}
    />
  );
}
