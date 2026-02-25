import { Image, Text } from '@/components/ui';
import { Spacing } from '@/constants';
import { StyleSheet, View } from 'react-native';

export function ImageDemo() {
  return (
    <>
      <Text variant="subtitle">Image</Text>
      <Image source="https://picsum.photos/seed/taste-kit/400/200" radius="lg" contentFit="cover" />
      <View style={styles.row}>
        <Image
          source="https://picsum.photos/seed/avatar1/100/100"
          radius="full"
          style={styles.avatar}
        />
        <Image
          source="https://picsum.photos/seed/avatar2/100/100"
          radius="full"
          style={styles.avatar}
        />
        <Image
          source="https://picsum.photos/seed/avatar3/100/100"
          radius="full"
          style={styles.avatar}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm },
  avatar: { width: 48, height: 48 },
});
