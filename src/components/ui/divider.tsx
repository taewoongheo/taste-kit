import { Colors, Layout } from '@/constants';
import { useColorScheme } from '@/hooks';
import { StyleSheet, View } from 'react-native';

export interface DividerProps {
  /** Left inset for list-style separator (default: 0) */
  inset?: number;
}

export function Divider({ inset = 0 }: DividerProps) {
  const colorScheme = useColorScheme();
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
