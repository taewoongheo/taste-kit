import { Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import { useColorScheme } from '@/hooks';
import { StyleSheet, View } from 'react-native';

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const backgroundColor = colors.background;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text>Modal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md,
  },
});
