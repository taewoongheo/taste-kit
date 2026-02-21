import { Text } from '@/components/ui';
import { Avatar } from '@/components/ui/avatar';
import { Spacing } from '@/constants';
import { StyleSheet, View } from 'react-native';

export function AvatarDemo() {
  return (
    <>
      <Text variant="subtitle">Avatar</Text>
      <View style={styles.row}>
        <Avatar image={{ uri: 'https://picsum.photos/seed/a1/100/100', name: 'Alice' }} size={48} />
        <Avatar
          image={{ uri: 'https://picsum.photos/seed/a2/100/100', name: 'Bob' }}
          size={48}
          showOnlineIndicator
        />
        <Avatar
          image={{ uri: 'https://picsum.photos/seed/a3/100/100', name: 'Charlie' }}
          size={48}
          loading
        />
        <Avatar image={{ uri: '', name: 'Dan' }} size={48} />
      </View>
      <View style={styles.row}>
        <Avatar
          image={{ uri: 'https://picsum.photos/seed/a4/100/100', name: 'Eve' }}
          size={64}
          showText
          textPosition="bottom"
        />
        <Avatar
          image={{ uri: 'https://picsum.photos/seed/a5/100/100', name: 'Frank' }}
          size={64}
          showText
          textPosition="bottom"
          showOnlineIndicator
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.md, alignItems: 'flex-start' },
});
