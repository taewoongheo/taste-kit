import { Button, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import { useColorScheme } from '@/hooks';
import { Notification } from '@/lib';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export function NotificationDemo() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [pending, setPending] = useState<string[]>([]);

  const refreshPending = useCallback(async () => {
    const list = await Notification.getPending();
    setPending(list.map((n) => `${n.identifier}: ${n.content.title}`));
  }, []);

  return (
    <>
      <Text variant="subtitle">Notification</Text>

      <Button
        onPress={async () => {
          const granted = await Notification.requestPermission();
          alert(granted ? 'Permission granted' : 'Permission denied');
        }}
      >
        Request Permission
      </Button>

      <Button
        variant="secondary"
        onPress={async () => {
          await Notification.scheduleAfter('Test', 'This fires after 5 seconds', 5);
          refreshPending();
        }}
      >
        Schedule After 5s
      </Button>

      <Button
        variant="secondary"
        onPress={async () => {
          await Notification.scheduleDaily('Daily', 'Daily reminder', 9, 0);
          refreshPending();
        }}
      >
        Schedule Daily 09:00
      </Button>

      <Button
        variant="destructive"
        onPress={async () => {
          await Notification.cancelAll();
          refreshPending();
        }}
      >
        Cancel All
      </Button>

      <Button variant="ghost" onPress={refreshPending}>
        Refresh Pending
      </Button>

      {pending.length > 0 && (
        <View style={[styles.list, { backgroundColor: colors.backgroundGrouped }]}>
          <Text variant="caption" color="textSecondary">
            Pending ({pending.length})
          </Text>
          {pending.map((item) => (
            <Text key={item} variant="body">
              {item}
            </Text>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: Spacing.md,
    borderRadius: 12,
    gap: Spacing.xs,
  },
});
