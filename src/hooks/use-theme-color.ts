import { Colors } from '@/constants';
import { useColorScheme } from './use-color-scheme';

export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  props?: { light?: string; dark?: string },
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props?.[theme];

  return colorFromProps ?? Colors[theme][colorName];
}
