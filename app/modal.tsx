import { Text } from '@/components/ui';
import { Spacing } from '@/constants';
import { useThemeColor } from '@/hooks';
import { StyleSheet, View } from 'react-native';

export default function ModalScreen() {
  const backgroundColor = useThemeColor('background');

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
