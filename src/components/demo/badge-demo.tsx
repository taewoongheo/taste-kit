import { Text } from '@/components/ui';
import Badge from '@/components/ui/badge';
import { Spacing } from '@/constants';
import { StyleSheet, View } from 'react-native';

export function BadgeDemo() {
  return (
    <>
      <Text variant="subtitle">Badge</Text>
      <View style={styles.row}>
        <Badge label="Default" variant="default" />
        <Badge label="Success" variant="success" />
        <Badge label="Warning" variant="warning" />
      </View>
      <View style={styles.row}>
        <Badge label="Error" variant="error" />
        <Badge label="Pending" variant="pending" />
        <Badge label="3" variant="notifications" radius="full" />
      </View>
      <View style={styles.row}>
        <Badge label="Small" size="sm" />
        <Badge label="Medium" size="md" />
        <Badge label="Large" size="lg" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
});
