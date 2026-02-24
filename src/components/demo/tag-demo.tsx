import { Tag, Text } from '@/components/ui';
import { Spacing } from '@/constants';
import { StyleSheet, View } from 'react-native';

export default function TagDemo() {
  return (
    <>
      <Text variant="subtitle">Tag</Text>
      <View style={styles.row}>
        <Tag label="Default" variant="default" />
        <Tag label="Success" variant="success" />
        <Tag label="Warning" variant="warning" />
      </View>
      <View style={styles.row}>
        <Tag label="Error" variant="error" />
        <Tag label="Info" variant="info" />
        <Tag label="Muted" variant="muted" />
      </View>
      <View style={styles.row}>
        <Tag label="Success" variant="success" bordered />
        <Tag label="Error" variant="error" bordered />
        <Tag label="Muted" variant="muted" bordered />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
});
