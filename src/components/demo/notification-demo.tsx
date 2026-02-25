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
        <Text variant="label" color="background" bold>
          Request Permission
        </Text>
      </Button>

      <Button
        variant="secondary"
        onPress={async () => {
          await Notification.scheduleAfter('Test', 'This fires after 5 seconds', 5);
          refreshPending();
        }}
      >
        <Text variant="label" color="accent" bold>
          Schedule After 5s
        </Text>
      </Button>

      <Button
        variant="secondary"
        onPress={async () => {
          await Notification.scheduleDaily('Daily', 'Daily reminder', 9, 0);
          refreshPending();
        }}
      >
        <Text variant="label" color="accent" bold>
          Schedule Daily 09:00
        </Text>
      </Button>

      <Button
        variant="destructive"
        onPress={async () => {
          await Notification.cancelAll();
          refreshPending();
        }}
      >
        <Text variant="label" color="background" bold>
          Cancel All
        </Text>
      </Button>

      <Button variant="ghost" onPress={refreshPending}>
        <Text variant="label" color="accent" bold>
          Refresh Pending
        </Text>
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
