import { Colors, Layout } from '@/constants';
import { StyleSheet, View, useColorScheme } from 'react-native';

export interface DividerProps {
  /** Left inset for list-style separator (default: 0) */
  inset?: number;
}

export function Divider({ inset = 0 }: DividerProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View
      style={[styles.divider, { backgroundColor: colors.separator, marginLeft: inset }]}
      accessibilityRole="none"
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: Layout.separator,
  },
});
